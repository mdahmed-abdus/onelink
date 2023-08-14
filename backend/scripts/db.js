const mongoose = require('mongoose');

const clearDemoUsers = async () => {
  const usersCollection = mongoose.connection.collection('users');

  await usersCollection.find().forEach(doc => {
    const ONE_DAY = 60 * 60 * 24 * 1000;
    const now = +new Date();

    if (doc.accountType === 'demo' && now - doc.createdAt > ONE_DAY) {
      usersCollection.deleteOne({ _id: doc._id });
    }
  });
};

module.exports = { clearDemoUsers };
