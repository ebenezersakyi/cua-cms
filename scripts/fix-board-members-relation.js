async function fixBoardMembersRelation(strapi) {
  try {
    console.log('Fixing board members relation...');

    // Get all board members using documents API
    const boardMembersResult = await strapi.documents('api::board-member.board-member').findMany({
      populate: '*',
    });

    const boardMembers = boardMembersResult || [];
    console.log(`Found ${boardMembers.length} board members`);

    if (boardMembers.length === 0) {
      console.log('No board members found. Creating sample board members...');

      // Create sample board members
      const sampleMembers = [
        {
          fullName: 'Mr. Kwame Agyeman',
          position: 'Chairman',
          bio: 'Mr. Kwame Agyeman brings over 25 years of experience in cooperative financial services and strategic leadership.',
          displayOrder: 1,
          isActive: true,
          publishedAt: new Date()
        },
        {
          fullName: 'Dr. Akosua Mensah',
          position: 'Vice Chairman',
          bio: 'Dr. Akosua Mensah is a renowned economist with extensive experience in microfinance and cooperative development.',
          displayOrder: 2,
          isActive: true,
          publishedAt: new Date()
        },
        {
          fullName: 'Mr. Kofi Asante',
          position: 'Board Secretary',
          bio: 'Mr. Kofi Asante has been instrumental in advancing credit union governance and regulatory compliance.',
          displayOrder: 3,
          isActive: true,
          publishedAt: new Date()
        }
      ];

      for (const member of sampleMembers) {
        const created = await strapi.documents('api::board-member.board-member').create({
          data: member,
        });
        boardMembers.push(created);
        console.log(`Created board member: ${member.fullName}`);
      }
    }

    // Get the board-of-directors page using documents API
    const boardPageResult = await strapi.documents('api::board-of-directors-page.board-of-directors-page').findFirst({
      populate: {
        board_members: true,
      },
    });

    const boardPage = boardPageResult;

    if (!boardPage) {
      console.error('Board of Directors page not found');
      process.exit(1);
    }

    console.log('Current board page documentId:', boardPage.documentId);
    console.log('Current linked board members:', boardPage.board_members?.length || 0);

    // Get all board member document IDs (in Strapi v5, relations use documentId)
    const boardMemberDocumentIds = boardMembers.map(member => member.documentId);
    console.log('Board member document IDs to link:', boardMemberDocumentIds);

    // Update the board-of-directors page with all board members using documents API
    const updatedPage = await strapi.documents('api::board-of-directors-page.board-of-directors-page').update({
      documentId: boardPage.documentId,
      data: {
        board_members: boardMemberDocumentIds,
      },
      populate: {
        board_members: true,
      },
    });

    console.log('Successfully linked board members to the page');
    console.log('Updated page now has', updatedPage.board_members?.length || 0, 'board members');

    // Verify the update by fetching again
    const verifyPage = await strapi.documents('api::board-of-directors-page.board-of-directors-page').findFirst({
      populate: {
        board_members: {
          populate: '*',
        },
      },
    });

    console.log('\nVerification:');
    console.log('Board members linked:', verifyPage.board_members?.length || 0);
    if (verifyPage.board_members?.length > 0) {
      console.log('\nLinked board members:');
      verifyPage.board_members.forEach(member => {
        console.log(`- ${member.fullName} (${member.position})`);
      });
    }

    console.log('\n✅ Board members relation fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing board members relation:', error);
    console.error(error.stack);
    throw error;
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await fixBoardMembersRelation(app);
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});