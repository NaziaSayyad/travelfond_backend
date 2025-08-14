const { Schema, model } = require("mongoose");

    const SpitiSchema = new Schema({
        name : String,
        days : String,
        location : String,
        dates : String,
        overviewheighlights: String,
    });
const SpitiModel = model("Spiti",SpitiSchema);
module.exports = SpitiModel;
