module.exports = {
  apps: [
    {
      name: 'cua-cms',
      script: 'npm',
      args: 'start',
      cwd: '/home/ubuntu/cua-cms', // Update this path on EC2
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
        HOST: '0.0.0.0',
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.tmp', 'public/uploads'],
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 5000,
    },
  ],
};
