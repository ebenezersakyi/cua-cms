# AWS Deployment Guide for CUA CMS

This guide covers deploying the CUA Strapi CMS to AWS EC2 with SQLite database and S3 for media storage.

## Prerequisites

- AWS Account
- Domain name (optional but recommended)
- Basic knowledge of AWS services (EC2, S3, IAM)

---

## Part 1: AWS Infrastructure Setup

### 1.1 Create an S3 Bucket for Media Storage

1. **Go to S3 Console** and click "Create bucket"
2. **Bucket Settings:**
   - Bucket name: `cua-cms-media` (must be globally unique)
   - Region: `us-east-1` (or your preferred region)
   - Block Public Access: **Uncheck "Block all public access"**
   - Check the acknowledgment box
   - Create bucket

3. **Configure Bucket Policy:**
   - Go to the bucket > Permissions > Bucket Policy
   - Add this policy (replace `cua-cms-media` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cua-cms-media/*"
    }
  ]
}
```

4. **Configure CORS:**
   - Go to Permissions > CORS configuration
   - Add this configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

### 1.2 Create IAM User for S3 Access

1. **Go to IAM Console** > Users > Create user
2. **User Details:**
   - Username: `cua-cms-s3-user`
   - Access type: Programmatic access
3. **Permissions:**
   - Attach existing policies: `AmazonS3FullAccess` (or create a custom policy with limited access)
4. **Save Credentials:**
   - **Important:** Save the Access Key ID and Secret Access Key (you won't see them again)

### 1.3 Create S3 Bucket for Database Backups (Recommended)

1. **Create another S3 bucket** for database backups
2. **Bucket Settings:**
   - Bucket name: `cua-cms-db-backups` (must be globally unique)
   - Region: Same as your media bucket
   - Keep "Block all public access" **ENABLED** (backups should be private)
   - Enable versioning for extra protection
   - Create bucket

3. **Update IAM User Permissions:**
   - Give your IAM user access to this backup bucket as well

### 1.4 Launch EC2 Instance

1. **Go to EC2 Console** > Launch Instance
2. **Instance Configuration:**
   - Name: `cua-cms-server`
   - AMI: Ubuntu Server 22.04 LTS
   - Instance type: t2.small or larger (t2.micro may work but is tight)
   - Key pair: Create new or use existing
   - Network settings:
     - VPC: Default VPC
     - Auto-assign public IP: Enable
     - Security group: Create new
       - Allow SSH (22) from your IP
       - Allow HTTP (80) from anywhere
       - Allow HTTPS (443) from anywhere
       - Allow Custom TCP (1337) from anywhere (for testing; remove in production)
   - Storage: 20 GB or more (SSD recommended)

3. **Launch instance** and wait for it to start

4. **Attach Elastic IP (Recommended):**
   - Go to Elastic IPs > Allocate Elastic IP address
   - Associate it with your EC2 instance
   - This ensures your IP doesn't change on restart

---

## Part 2: EC2 Server Setup

### 2.1 Connect to EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 2.2 Update System and Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Git
sudo apt install -y git

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx (for reverse proxy)
sudo apt install -y nginx

# Install AWS CLI (for database backups)
sudo apt install -y awscli
```

### 2.3 Configure AWS CLI

```bash
aws configure
```

Enter your AWS credentials:
- AWS Access Key ID: (from IAM user)
- AWS Secret Access Key: (from IAM user)
- Default region: us-east-1 (or your region)
- Default output format: json

### 2.4 Clone Your Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository (replace with your repo URL)
git clone https://github.com/your-username/cua-cms.git
cd cua-cms
```

### 2.5 Install Dependencies

```bash
npm install
```

### 2.6 Create Production Environment File

```bash
# Create .env file
nano .env
```

Add the following (replace with your actual values):

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Secrets - Generate new values using:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS="your-generated-key-1,your-generated-key-2"
API_TOKEN_SALT=your-generated-salt
ADMIN_JWT_SECRET=your-generated-secret
TRANSFER_TOKEN_SALT=your-generated-salt
JWT_SECRET=your-generated-secret
ENCRYPTION_KEY=your-generated-key

# Database Configuration (SQLite)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com,https://www.your-frontend-domain.com

# Upload Provider
UPLOAD_PROVIDER=aws-s3

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_BUCKET=cua-cms-media

# Public URLs
STRAPI_URL=https://cms.cuaghana.org
STRAPI_ADMIN_URL=https://cms.cuaghana.org/admin

# Email Configuration (optional)
SMTP_HOST=
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_DEFAULT_FROM=noreply@cuaghana.org
EMAIL_DEFAULT_REPLY_TO=info@cuaghana.org
```

**Important:** Generate secure secrets using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2.7 Build Strapi

```bash
NODE_ENV=production npm run build
```

### 2.8 Update PM2 Ecosystem Config

```bash
nano ecosystem.config.js
```

Update the `cwd` path to match your actual path (usually `/home/ubuntu/cua-cms`):

```javascript
cwd: '/home/ubuntu/cua-cms',
```

### 2.9 Create Logs Directory

```bash
mkdir logs
```

### 2.10 Create Database Directory

```bash
mkdir -p .tmp
```

### 2.11 Seed Database (Optional)

If you need to populate initial data:

```bash
npm run seed:cua
npm run seed:about
npm run seed:ourwork
npm run seed:credit-unions
npm run seed:careers
npm run seed:site-settings
npm run permissions:create
```

### 2.12 Start Application with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Copy and run the command that PM2 outputs to enable startup on system boot.

---

## Part 3: Database Backup Strategy

### 3.1 Create Backup Script

Since we're using SQLite, regular backups are crucial:

```bash
# Create backup script
nano ~/backup-db.sh
```

Add this content:

```bash
#!/bin/bash

# Configuration
DB_PATH="/home/ubuntu/cua-cms/.tmp/data.db"
BACKUP_DIR="/home/ubuntu/backups"
S3_BUCKET="cua-cms-db-backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_FILE="cua-cms-backup-${DATE}.db"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Create backup
cp ${DB_PATH} ${BACKUP_DIR}/${BACKUP_FILE}

# Compress backup
gzip ${BACKUP_DIR}/${BACKUP_FILE}

# Upload to S3
aws s3 cp ${BACKUP_DIR}/${BACKUP_FILE}.gz s3://${S3_BUCKET}/

# Keep only last 7 days of local backups
find ${BACKUP_DIR} -name "cua-cms-backup-*.db.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"
```

Make it executable:

```bash
chmod +x ~/backup-db.sh
```

### 3.2 Set Up Automated Backups with Cron

```bash
crontab -e
```

Add these lines for daily backups at 2 AM:

```cron
# Backup database daily at 2 AM
0 2 * * * /home/ubuntu/backup-db.sh >> /home/ubuntu/logs/backup.log 2>&1
```

### 3.3 Test Backup

```bash
~/backup-db.sh
```

Check if the backup appears in S3:

```bash
aws s3 ls s3://cua-cms-db-backups/
```

### 3.4 Restore from Backup

To restore from a backup:

```bash
# Stop Strapi
pm2 stop cua-cms

# Download backup from S3
aws s3 cp s3://cua-cms-db-backups/cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db.gz ~/

# Decompress
gunzip cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db.gz

# Restore (backup current first!)
cp ~/cua-cms/.tmp/data.db ~/cua-cms/.tmp/data.db.old
cp ~/cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db ~/cua-cms/.tmp/data.db

# Start Strapi
pm2 start cua-cms
```

---

## Part 4: Nginx Configuration

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/cua-cms
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name cms.cuaghana.org; # Replace with your domain

    client_max_body_size 250M;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
}
```

### 4.2 Enable Configuration

```bash
sudo ln -s /etc/nginx/sites-available/cua-cms /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## Part 5: SSL Certificate (HTTPS)

### 5.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d cms.cuaghana.org
```

Follow the prompts. Certbot will automatically configure Nginx for HTTPS.

### 5.3 Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

## Part 6: Security Best Practices

### 6.1 Update EC2 Security Group

Once Nginx is working:
- **Remove port 1337** access (use Nginx proxy only)
- **Restrict SSH** to your IP only
- Keep HTTP (80) and HTTPS (443) open for web traffic

### 6.2 Enable UFW Firewall

```bash
# Enable firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 6.3 Set Up CloudWatch Monitoring

1. Go to CloudWatch Console
2. Set up alarms for:
   - CPU utilization > 80%
   - Disk usage > 80%
   - Status check failures

### 6.4 S3 Bucket Lifecycle Policies

1. Go to S3 Console > your backup bucket
2. Management > Create lifecycle rule
3. Move old backups to cheaper storage:
   - After 30 days: Glacier
   - After 90 days: Delete

### 6.5 Enable EBS Volume Snapshots

1. Go to EC2 > Volumes
2. Select your instance's volume
3. Actions > Create Snapshot
4. Set up automated snapshots using AWS Backup or Data Lifecycle Manager

---

## Part 7: Monitoring and Maintenance

### 7.1 View Application Logs

**PM2 Logs:**
```bash
pm2 logs cua-cms
```

**Specific log files:**
```bash
tail -f ~/cua-cms/logs/out.log
tail -f ~/cua-cms/logs/err.log
```

### 7.2 Restart Application

```bash
pm2 restart cua-cms
```

### 7.3 Monitor Application

```bash
pm2 monit
```

### 7.4 Check Nginx Status

```bash
sudo systemctl status nginx
```

### 7.5 View Nginx Logs

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 7.6 Check Disk Usage

```bash
df -h
du -sh ~/cua-cms/.tmp/
du -sh ~/cua-cms/public/uploads/
```

---

## Part 8: Deployment Updates

### 8.1 Deploy Code Updates

```bash
cd ~/cua-cms

# Backup database before updates
~/backup-db.sh

# Pull latest code
git pull origin main

# Install any new dependencies
npm install

# Rebuild
NODE_ENV=production npm run build

# Restart application
pm2 restart cua-cms
```

### 8.2 Rollback if Needed

```bash
# Stop application
pm2 stop cua-cms

# Restore previous database backup
cp ~/backups/cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db.gz ~/
gunzip cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db.gz
cp ~/cua-cms-backup-YYYY-MM-DD_HH-MM-SS.db ~/cua-cms/.tmp/data.db

# Checkout previous version
git log  # Find the commit hash
git checkout <previous-commit-hash>

# Rebuild
npm install
NODE_ENV=production npm run build

# Start application
pm2 start cua-cms
```

---

## Part 9: Cost Optimization

### 9.1 EC2 Considerations

- **Reserved Instances:** Save up to 75% for long-term commitments
- **Right-sizing:** Monitor usage and downgrade if possible
- **Stop instances** during non-business hours if appropriate
- **Use Spot Instances** for dev/test environments

### 9.2 S3 Cost Management

- **Lifecycle policies:** Move old media to cheaper storage tiers
- **Enable S3 Intelligent-Tiering** for automatic cost optimization
- **Monitor uploads:** Review what's being uploaded
- **Delete unused files:** Clean up old/unused media periodically

### 9.3 Data Transfer Costs

- **CloudFront CDN:** Consider adding CloudFront in front of S3 for global distribution
- **Compression:** Enable gzip compression in Nginx
- **Optimize images:** Ensure images are optimized before upload

---

## Part 10: Scaling Considerations

### 10.1 When to Upgrade Database

SQLite works well for small to medium applications. Consider PostgreSQL when:
- Concurrent users > 100
- Database size > 5 GB
- Need for advanced features (replication, etc.)
- Multiple server instances needed

### 10.2 Load Balancing

For high traffic:
1. Set up Application Load Balancer
2. Launch multiple EC2 instances
3. **Important:** Switch to PostgreSQL (SQLite doesn't support multi-instance)
4. Use EFS or shared database for uploads (or keep using S3)

### 10.3 CDN Setup

1. Create CloudFront distribution
2. Point to S3 bucket
3. Update Strapi to use CloudFront URLs
4. Improves performance globally

---

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs cua-cms

# Check if port is in use
sudo lsof -i :1337

# Check environment variables
cat .env

# Check database file exists
ls -lh .tmp/data.db
```

### Database Locked Error

SQLite can have issues with concurrent writes:

```bash
# Check if multiple processes are accessing DB
lsof .tmp/data.db

# Restart PM2
pm2 restart cua-cms
```

### S3 Upload Issues

```bash
# Test AWS credentials
aws s3 ls s3://cua-cms-media

# Check IAM permissions
# Ensure IAM user has S3 PutObject permission

# Check environment variables
echo $AWS_ACCESS_KEY_ID
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check logs
sudo tail -f /var/log/nginx/error.log
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clear old logs
pm2 flush
sudo journalctl --vacuum-time=7d

# Clear old backups
rm ~/backups/cua-cms-backup-old*.db.gz

# Clear npm cache
npm cache clean --force
```

---

## Production Checklist

- [ ] All secrets generated with strong random values
- [ ] Database backup script created and tested
- [ ] Automated backups configured with cron
- [ ] S3 bucket configured with proper permissions
- [ ] SSL certificate installed and auto-renewal tested
- [ ] Security groups properly configured
- [ ] UFW firewall enabled
- [ ] PM2 configured to start on system boot
- [ ] Elastic IP attached to EC2 instance
- [ ] Domain DNS pointed to Elastic IP
- [ ] Frontend CORS properly configured
- [ ] CloudWatch alarms set up
- [ ] EBS volume snapshots configured
- [ ] Nginx reverse proxy working
- [ ] Regular backup strategy implemented
- [ ] Update/deployment procedure documented and tested

---

## Additional Resources

- [Strapi Deployment Docs](https://docs.strapi.io/dev-docs/deployment)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

## Migration to PostgreSQL (Future)

If you need to migrate to PostgreSQL later:

1. **Export SQLite data:**
   ```bash
   sqlite3 .tmp/data.db .dump > dump.sql
   ```

2. **Install PostgreSQL:**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

3. **Create database and user:**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE cua_cms;
   CREATE USER strapi WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE cua_cms TO strapi;
   ```

4. **Update .env:**
   ```env
   DATABASE_CLIENT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=cua_cms
   DATABASE_USERNAME=strapi
   DATABASE_PASSWORD=your-password
   ```

5. **Rebuild and restart:**
   ```bash
   NODE_ENV=production npm run build
   pm2 restart cua-cms
   ```

Note: Data migration between SQLite and PostgreSQL may require additional tools or manual intervention.

---

## Support

For issues specific to this deployment:
1. Check PM2 logs: `pm2 logs cua-cms`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check Strapi logs in the `logs/` directory
4. Review this guide's troubleshooting section
5. Check database backup integrity
6. Verify S3 permissions and connectivity
