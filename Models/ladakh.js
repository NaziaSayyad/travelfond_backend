const { Schema, model } = require("mongoose");

    const LadakhSchema = new Schema({
        name : String,
        days : String,
        location : String,
        dates : String,
        overviewheighlights: String,
    });
const LadakhModel = model("ladakh",LadakhSchema);
module.exports = LadakhModel;
