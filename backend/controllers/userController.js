const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>
    {
        return jwt.sign(
            {_id,},process.env.SECRET,{expiresIn: '3d'}
    )}


//login user
const loginUser = async (req, res) => {

    const {email, password}= req.body

    try{
        const user = await User.login(email, password)
        console.log(user)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token,userId: user._id,blocked:user.blocked})
    }catch(err){
            res.status(500).json({error: err.message})
    }
}
//signup user
const signupUser = async (req, res) => {
    const {name,place,age,phone,education,email, password}= req.body
    const blocked = false; 
    try{
        const user = await User.signup(name,place,age,phone,education,email, password,blocked)
        console.log(blocked)
        //create token
        const token = createToken(user._id)

        res.status(200).json({email, token, userId: user._id,blocked})
    }catch(err){
            res.status(500).json({error: err.message})
    }

}

// Get notifications for the logged-in user
const getNotifications = async (req, res) => {
    const user_id = req.user._id;
    console.log(user_id);

    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Sort notifications by date in descending order (latest first)
        const sortedNotifications = user.notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json(sortedNotifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a notification
const addNotification = async (req, res) => {
    
    const {userId, message } = req.body;
    console.log(message, userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.notifications.push({ message, date: new Date() });
        await user.save();

        res.status(200).json({ message: 'Notification added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user details
const getUserDetails = async (req, res) => {
    const user_id = req.user._id;
    try {
      const user = await User.findById(user_id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Update user details
const updateUserDetails = async (req, res) => {
  const user_id = req.user._id;
  const { name, place, age, phone, education } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (place) user.place = place;
    if (age) user.age = age;
    if (phone) user.phone = phone;
    if (education) user.education = education;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Fetch all users
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select('-password'); // Exclude passwords
      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Block/Unblock a user
const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.blocked = !user.blocked;
      await user.save();
      res.status(200).json({ message: `User ${user.blocked ? 'blocked' : 'unblocked'} successfully` });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser, addNotification, getNotifications,getUserDetails, updateUserDetails, getAllUsers,blockUser, deleteUser };