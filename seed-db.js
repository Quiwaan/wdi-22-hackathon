const db = require('./models');

const createTestDb = async () => {
  const user1 = await db.User.create({
    name: 'Test User 1',
    email: 'test@jamesliu.cc',
    password: 'asdfasdf',
  });

  const user2 = await db.User.create({
    name: 'Test User 2',
    email: 'test2@jamesliu.cc',
    password: 'qwerasdf',
    housemates: [user1._id],
  });
  user1.
};

createTestDb();
