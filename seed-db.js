const db = require('./models');

const createHouseStark = async () => {
  const house1 = await db.House.create({
    name: 'Stark',
  });

  const user1 = await db.User.create({
    name: 'Neddard',
    email: 'test13@jamesliu.cc',
    password: 'asdfasdf',
  });

  const user2 = await db.User.create({
    name: 'Arya',
    email: 'test14@jamesliu.cc',
    password: 'qwerasdf',
  });
  await db.User.findById(user1._id, (err, user1) => {
    console.log(user1);
    if (err) return err;
    db.House.update({ name: 'Stark' }, { $push: user1._id });
  });
  await db.User.findById(user2._id, (err, user2) => {
    console.log(user2);
    if (err) return err;
    db.House.update({ name: 'Stark' }, { $push: user2._id });
  });
  console.log(house1);
};

createHouseStark().then(console.log('Done'));
