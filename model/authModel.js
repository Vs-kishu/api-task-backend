const mongoose =require ("mongoose");

// Define the schema and model for your data
const userSchema = new mongoose.Schema({
    email:String,
    table: {
      type: [
        {
          // Define the structure of each object in the array
          name: {
            type: String,
            required: true,
          },
          age: {
            type: Number,
            required: true,
          },
          // Add other fields as needed
        },
      ],
      default: [],
    },
    password:String,
    addCount:{type:Number, default:0},
    updateCount:{type:Number, default:0}


  });

  const User = mongoose.model('User', userSchema);

  module.exports={User}