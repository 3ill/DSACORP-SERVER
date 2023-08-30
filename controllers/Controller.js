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

  let existingEmail;
  try {
    existingEmail = await Subscribe.findOne({ email });
  } catch (error) {
    console.error(error, 'An error occurred');
  }
  if (existingEmail) {
    return res.status(400).json({ message: 'Already Subscribed' });
  }

  const newSubscriber = new Subscribe({
    email: email,
  });
  try {
    await newSubscriber.save();
  } catch (error) {
    console.error(error, 'An error occurred');
  }
  return res.status(201).json({ newSubscriber });
};

//? function to create a new user
export const addUser = async (req, res) => {
  const { name, email, social } = req.body;

  let existingUSer;
  let existingMail;

  try {
    existingUSer = await Users.findOne({ name });
    existingMail = await Users.findOne({ email });
  } catch (err) {
    console.error(err, 'An error occurred');
  }

  if (existingUSer && existingMail) {
    return res.status(400).json({ message: 'Reservation already exists' });
  }

  const newUser = new Users({
    name: name,
    email: email,
    social: social,
  });
  try {
    await newUser.save();
  } catch (error) {
    console.log(error, ' An error occurred');
  }
  return res.status(200).json({ newUser });
};
