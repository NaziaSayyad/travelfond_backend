// Backend 
const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080 || 5000;
const nodemailer = require("nodemailer");
const DB_URL = `mongodb+srv://Nazia:Dob1062000@cluster0.p4xc33c.mongodb.net/TravelFond`;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const LadakhModel = require("./Models/ladakh");
const RegistrationModel = require("./Models/Registration");
const SpitiModel = require("./Models/Spiti");
const DomesticModel = require("./Models/domestic");
const InternationalModel = require("./Models/International");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
require('dotenv').config();

// mongodb+srv://vidhyadb:12345@cluster0.w1fpi.mongodb.net/vidhyabhim

// mongodb+srv://Nazia:Dob1062000@cluster0.p4xc33c.mongodb.net/?retryWrites=true&w=majority
const connect = async () => {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

app.get("/ladakh", async (req, res) => {
  const response = await LadakhModel.find();
  res.send(response);
});

app.get("/spiti", async (req, res) => {
  const response = await SpitiModel.find();
  res.send(response);
});

app.get("/domestic", async(req,res) =>{
  const response = await DomesticModel.find();
  res.send(response);
});

app.get("/domestic/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const response = await DomesticModel.findOne({ id: Number(id) });
    res.send(response)
  }
  catch (error) {
    res.status(500).json({ message: "Eroor fetching the data" });
  }
});


app.get("/international", async(req,res) =>{
  const response = await InternationalModel.find();
  res.send(response);
});

app.get("/international/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const response = await InternationalModel.findOne({ id: Number(id) });
    res.send(response);
  }
  catch (error) {
    res.status(500).json({ message: "Eroor fetching the data" });
  }
});



app.get("/ladakh/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const response = await LadakhModel.findOne({ id: Number(id) });
    res.send(response);

  }
  catch (error) {
    res.status(500).json({ message: "Eroor fetching the data" });
  }
});


app.get("/spiti/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const response = await SpitiModel.findOne({ id: Number(id) });
    res.send(response);

  }
  catch (error) {
    res.status(500).json({ message: "Eroor fetching the data" });
  }
});


app.post("/booking", async (req, res) => {
  const { batch, people } = req.body;

  try {
    // Step 1: Calculate total people already registered in the batch
    const registrations = await RegistrationModel.find({ batch });

    const totalPeople = registrations.reduce((sum, reg) => {
      return sum + (reg.people || 0);
    }, 0);

    // Step 2: Check if adding this would exceed the limit
    if (totalPeople + Number(people) > 40) {
      return res.status(400).json({ message: "No seats available for this batch." });
    }

    // Step 3: Save the new registration
    const newEntry = new RegistrationModel(req.body);
    await newEntry.save();

    res.status(201).json({ message: "Registration successful." });

  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ message: "Failed to save registration." });
  }
});
app.post("/enquiry", async (req, res) => {
  const { name, email, phone, dob, batch, cost, people, tripdate } = req.body;
  try {
    // 🔐 Create transporter with your Gmail credentials
    const transporter = nodemailer.createTransport({
       host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'flavio.quigley@ethereal.email',
        pass: 'feuXrQYmQY6Ddx8Nqy'
    }
    });

    // 📩 Compose email
    const mailOptions = {
      from: '"Travel Booking" <sayyadnazia756@gmail.com>',
      to: "salmanahmed09117@gmail.com",  // where you want to receive emails
      subject: "New Booking Form Submission",
      html: `
        <h3>New Booking Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Number of People:</strong> ${people}</p>
      `
    };
    //  <p><strong>Batch:</strong> ${batch}</p>
    //         <p><strong>Cost:</strong> ₹${cost}</p>

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form submitted and email sent' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Error sending email', err: error });
  }
});

app.get("/", async (req, res) => {
  res.send("API is running")
});
app.listen(PORT, async () => {
  await connect();
  console.log(`listening to localhost${PORT} and the database is:${DB_URL}`);
});
