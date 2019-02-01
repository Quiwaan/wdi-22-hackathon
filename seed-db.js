const db = require('./models');

const createHouseStark = async () => {
  const house1 = await db.House.create({
    name: 'Stark',
  });

  const user1 = await db.User.create({
    name: 'Neddard',
    email: 'test@jamesliu.cc',
    password: 'asdfasdf',
  });

  const user2 = await db.User.create({
    name: 'Arya',
    email: 'test1@jamesliu.cc',
    password: 'qwerasdf',
  });
  db.User.findById(user1._id, (err, user1) => {
    console.log(user1._id);
    if (err) return err;
    db.House.update({ name: 'Stark' }, { $push: { members: user1._id } }).then(
      () => {
        console.log('1', house1);
      }
    );
  });
  db.User.findById(user2._id, (err, user2) => {
    console.log(user2._id);
    if (err) return err;
    db.House.update({ name: 'Stark' }, { $push: { members: user2._id } }).then(
      updatedHouse => {
        console.log('2', updatedHouse);
        return;
      }
    );
  });
};

createHouseStark();

const readDB = async () => {
  const house1 = await db.House.findOne({ name: 'Stark' });
  const house2 = await db.House.update(
    { name: 'Stark' },
    { $push: { members: '5c538a8f430f0f658b5dab9d' } }
  );
  console.log(house2);
};

// readDB();
