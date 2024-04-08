const User = require("../Schemas/UserSchema");



const postUser = async (req, res) => {
  const foundData = await User.find({ number: req.body.number });
  if (foundData.length === 0) {
    const user = {
      name: req.body.name,
      number: req.body.number,
      accountCreationDate: Date.now(),
      state:req.body.state,
      region:req.body.region
    };
    const newUser = new User(user);
    await newUser.save();
    res.send(newUser);
  } 
};

const getUserByNumber = async (req, res) => {
  const phone = req.params.number;
  try {
    User.find({ number: phone }).then((foundData) => res.send(foundData));
  } catch (e) {
    res.send("Could not get the user");
  }
};

const updateUserGivenRespects = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { number: req.body.number },
      { $push: { givenRespects: req.body.respects } }
    ).then(() =>
      User.findOne({ number: req.body.number }).then((foundData) =>
        res.send(foundData)
      )
    );
  } catch (e) {
    res.send("Could not update the user");
  }
};

const updateRecievedRespects = async (req, res) => {
  User.find({ number: req.body.number }).then((foundData) => {
    if (foundData?.length == 0) {
      const user = new User({
        registered: false,
        name: req.body.name,
        number: req.body.number,
        accountCreationDate: Date.now(),
        recievedRespects: [req.body.respects],
        givenRespects: [],
      });
      user.save().then(() => res.send(user));
    } else {
      User.findOneAndUpdate(
        { number: req.body.number },
        { $push: { recievedRespects: req.body.respects } }
      ).then(() => res.send("done"));
      return;
    }
  });
};

const updateUser = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { number: req.body.number },
      {
        name: req.body.name,
        image: req.body.image,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
      }
    ).then(() =>
      User.findOne({ number: req.body.number }).then((foundData) =>
        res.send(foundData)
      )
    );
  } catch (e) {
    res.send("Could not update user");
  }
};

const createNonExistingUser = async (req, res) => {
  User.find({ number: req.body.number }).then((foundData) => {
    if (foundData.length === 0) {
      const user = new User({
        registered: false,
        name: req.body.name,
        number: req.body.number,
        givenRespects: [],
        recievedRespects: [],
      });
      user.save().then(() => res.send(user));
    } else {
      User.findOneAndUpdate(
        { number: req.body.number },
        { name: req.body.name }
      ).then((doc) => res.send(doc));
    }
  });
};

const searchUserPartialNumber = async (req, res) => {
  let field = req.params.id;
  try {
    User.findOne({
      number: { $regex: field.substring(1), $options: "i" },
    }).then((foundData) => res.send(foundData));
  } catch (e) {
    res.send("Not found");
  }
};

const pushNotification = async (req, res) => {
  User.findOneAndUpdate(
    { number: req.body.postedFor },
    {
      $push: {
        notifications: {
          sender: req.body.sender,
          request: req.body.request,
          time: req.body.time,
        },
      },
    }
  ).then(() => res.send("done"));
};

const addToContacts = async (req, res) => {
  const user = await User.findOne({ number: req.body.id });
  const contact = await User.findOne({ number: req.body.number });
  try {
    if (contact && !user.contacts.includes(contact._id)) {
      user.contacts.push(contact._id);
      res.send(user);
      user.save();
    } else {
      throw new Error("Could not add contact");
    }
  } catch (e) {
    res.send(e.message);
  }
};

const getContacts = async (req, res) => {
  try {
    const user = await User.findOne({ number: req.params.id });

    if (!user) {
      throw new Error("User not found");
    }
    let contactList = [];

    for (let i = 0; i < user.contacts.length; i++) {
      let temp = await User.findOne({ _id: user.contacts[i] });
      contactList.push({
        id: temp._id,
        name: temp.name,
        number: temp.number,
        image: temp.image,
      });
    }
    res.send(contactList);
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  postUser,
  getUserByNumber,
  updateUserGivenRespects,
  updateUser,
  updateRecievedRespects,
  createNonExistingUser,
  searchUserPartialNumber,
  pushNotification,
  addToContacts,
  getContacts,
};
