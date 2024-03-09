const {User}=require('../model/authModel')

const createUser = async (req, res) => {
    const { email,password } = req.body;
    try {
      const findUser = await User.findOne({ email });
      if (!findUser) {
        const newUser = await User.create({email,password});
        
        res.status(200).json({ success: true, data:newUser });
      } else {
        res.status(409).json({ success: false, error: 'User already exists' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  module.exports={createUser}