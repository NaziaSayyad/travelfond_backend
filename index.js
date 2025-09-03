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
const WeekendModel = require("./Models/Weekend");
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

app.get("/domestic", async (req, res) => {
  const response = await DomesticModel.find();
  res.send(response);
});

app.get("/weekend", async (req, res) => {
    try {
        const states = await WeekendModel.find();
        res.send(states); // return array of state names
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch states" });
      }
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


app.get("/international", async (req, res) => {
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
       const { enquiry_form } = req.body;
    try {
    // Configure transporter for Hostinger SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",   // Hostinger SMTP
      port: 465,                    // SSL port (or 587 for TLS)
      secure: true,                 // true for 465, false for 587
      auth: {
        user: "operationteam@thetravelfond.com", // your mailbox
        pass: "Travelfond@756",             // mailbox password
      },
    });
    // Send mail
    await transporter.sendMail({
      from: `"Travel Fond Newsletter" <operationteam@thetravelfond.com>`,
      to: "operationteam@thetravelfond.com",  // your receiving email
      subject: "Get Quotes",
      text: `A new user customize the trip with this ${enquiry_form}`,
    });

    res.json({ message: "Booking Enquiry successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.post("/enquiry", async (req, res) => {
  const { enquiry_form } = req.body;
    try {
    // Configure transporter for Hostinger SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",   // Hostinger SMTP
      port: 465,                    // SSL port (or 587 for TLS)
      secure: true,                 // true for 465, false for 587
      auth: {
        user: "operationteam@thetravelfond.com", // your mailbox
        pass: "Travelfond@756",             // mailbox password
      },
    });
    // Send mail
    await transporter.sendMail({
      from: `"Travel Fond Newsletter" <operationteam@thetravelfond.com>`,
      to: "operationteam@thetravelfond.com",  // your receiving email
      subject: "Get Quotes",
      text: `A new user customize the trip with this ${enquiry_form}`,
    });

    res.json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});


// Subscribe API
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    // Configure transporter for Hostinger SMTP
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",   // Hostinger SMTP
      port: 465,                    // SSL port (or 587 for TLS)
      secure: true,                 // true for 465, false for 587
      auth: {
        user: "operationteam@thetravelfond.com", // your mailbox
        pass: "Travelfond@756",             // mailbox password
      },
    });
    // Send mail
    await transporter.sendMail({
      from: `"Travel Fond Newsletter" <operationteam@thetravelfond.com>`,
      to: "operationteam@thetravelfond.com",  // your receiving email
      subject: "New Newsletter Subscription",
      text: `A new user subscribed with email: ${email}`,
    });

    res.json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
app.get("/", async (req, res) => {
  res.send("API is running")
});
app.listen(PORT, async () => {
  await connect();
  console.log(`listening to localhost${PORT} and the database is:${DB_URL}`);
});
