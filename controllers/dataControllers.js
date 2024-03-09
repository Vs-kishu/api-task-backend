const { User } = require("../model/authModel");

// API to add data

const addData = async (req, res) => {
  const userId =req.body.userId
  try {
    // Basic validation example, adjust as needed
    if (!req.body.data.name || !req.body.data.age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    // Find the document where you want to push the new data
    const existingData = await User.findOne({ _id:userId });

  existingData.addCount+=1
    // Push the new data into the array
    existingData.table.push({
      name: req.body.data.name,
      age: req.body.data.age,
    });

    // Save the updated document
    await existingData.save();

    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateData = async (req, res) => {
  try {
    const dataId = req.params.id;
    const userId = req.body.userId;

    // Basic validation example, adjust as needed
    if (!req.body.data.name || !req.body.data.age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    // Increment the updateCount in the schema for the specific user
    await User.findOneAndUpdate({ _id: userId }, { $inc: { updateCount: 1 } });

    // Update the specific data based on the provided dataId
    await User.findOneAndUpdate(
      { 'table._id': dataId },
      {
        $set: {
          'table.$.name': req.body.data.name, // Use req.body.data.name instead of req.body.name
          'table.$.age': req.body.data.age,   // Use req.body.data.age instead of req.body.age
        },
      }
    );

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



 const getDatas=async(req,res)=>{
  const userId=req.params.userId
try {
  const allData=await User.findOne({_id:userId})
  
  res.json({allData})
} catch (error) {
  console.log(error)
}
 }

  module.exports={addData,getDatas,updateData}