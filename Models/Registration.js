const { Schema, model, default: mongoose } = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob: String,
    batch: String,
    cost: String,
    people: Number,
    tripdate : Number
  });
  
const RegistrationModel = model("booking",RegistrationSchema);
module.exports = RegistrationModel;