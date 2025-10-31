async function testBoardAPI() {
  const baseUrl = 'http://localhost:1337';

  console.log('Testing Board of Directors API with different populate configurations...\n');

  // Test 1: Deep populate
  console.log('1. Testing with populate=deep:');
  const response1 = await fetch(`${baseUrl}/api/board-of-directors-page?populate=deep`);
  const data1 = await response1.json();
  console.log('Board members count:', data1.data?.board_members?.length || 0);
  if (data1.data?.board_members?.[0]) {
    console.log('First member has photo?', !!data1.data.board_members[0].photo);
    console.log('Photo data:', data1.data.board_members[0].photo);
  }

  // Test 2: Specific nested populate
  console.log('\n2. Testing with nested populate for board_members.photo:');
  const response2 = await fetch(`${baseUrl}/api/board-of-directors-page?populate[board_members][populate]=photo`);
  const data2 = await response2.json();
  console.log('Board members count:', data2.data?.board_members?.length || 0);
  if (data2.data?.board_members?.[0]) {
    console.log('First member has photo?', !!data2.data.board_members[0].photo);
    if (data2.data.board_members[0].photo) {
      console.log('Photo URL:', data2.data.board_members[0].photo.url);
    }
  }

  // Test 3: Populate all fields in board_members
  console.log('\n3. Testing with populate[board_members][populate]=*:');
  const response3 = await fetch(`${baseUrl}/api/board-of-directors-page?populate[board_members][populate]=*`);
  const data3 = await response3.json();
  console.log('Board members count:', data3.data?.board_members?.length || 0);
  if (data3.data?.board_members?.[0]) {
    console.log('First member has photo?', !!data3.data.board_members[0].photo);
    if (data3.data.board_members[0].photo) {
      console.log('Photo details:', {
        url: data3.data.board_members[0].photo.url,
        formats: Object.keys(data3.data.board_members[0].photo.formats || {})
      });
    }
  }

  // Test 4: Check board-members directly
  console.log('\n4. Testing board-members endpoint directly:');
  const response4 = await fetch(`${baseUrl}/api/board-members?populate=*`);
  const data4 = await response4.json();
  console.log('Board members count:', data4.data?.length || 0);
  if (data4.data?.[0]) {
    console.log('First member has photo?', !!data4.data[0].photo);
    if (data4.data[0].photo) {
      console.log('Photo URL:', data4.data[0].photo.url);
    }
  }
}

testBoardAPI().catch(console.error);