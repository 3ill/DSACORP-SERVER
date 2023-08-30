import Subscribe from '../model/Subscribe.js';
import Users from '../model/Users.js';

/**
 * !All Logic to fetch Data and Upload data to the Database are defined here
 */

//? Function to get emails of all subscribers
export const getAllSubscribers = async (req, res, next) => {
  let mails;

  try {
    mails = await Subscribe.find();
  } catch (error) {
    console.log(error, 'An error occurred');
  }
  if (!mails) {
    return res.status(404).json({ message: 'No mails found' });
  }
  return res.status(200).json({ mails });
};

//? Function to get all users
export const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await Users.find();
  } catch (error) {
    console.error(error, 'An error occurred');
  }

  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }
  return res.status(200).json({ users });
};

//? function to create a new subscriber
export const subscriber = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscribe.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Already Subscribed' });
    }

    const newSubscriber = new Subscribe({
      email: email,
    });

    await newSubscriber.save();

    return res
      .status(201)
      .json({ newSubscriber, message: 'Subscription Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

//? function to create a new user
export const addUser = async (req, res) => {
  const { name, email, social } = req.body;

  try {
    const existingUser = await Users.findOne({ $or: [{ name }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Users({
      name: name,
      email: email,
      social: social,
    });

    await newUser.save();

    return res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
