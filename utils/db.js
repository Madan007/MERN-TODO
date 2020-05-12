const utils = require('util');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let state = {
  db: null,
};

// exports.connect = async (url) => {
//   try {
//     if (!state.db) {
//       utils.promisify(MongoClient.connect);
//       const db = await MongoClient.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       state.db = db;

//     }
//   } catch (error) {
//     throw error;
//   }
// };

exports.connect = (url, done) => {
  if (state.db) return done();
  console.log('connecting to db.....');
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, db) => {
      if (err) return done(err);
      state.db = db;
      done();
    }
  );
};

exports.get = () => state.db;

exports.close = async () => {
  try {
    if (state.db) {
      utils.promisify(state.db.close);
      await state.db.close();
      state.db = null;
      return;
    }
  } catch (error) {
    throw error;
  }
};

exports.isValid = (id) => {
  const res = mongodb.ObjectID.isValid(id) ? true : false;
  return res;
};
