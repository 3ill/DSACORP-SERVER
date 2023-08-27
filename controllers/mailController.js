import Subscribe from '../model/Subscribe.js';

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
    email,
  });
  try {
    await newSubscriber.save();
  } catch (error) {
    console.error(error, 'An error occurred');
  }
  return res.status(201).json({ newSubscriber });
};
