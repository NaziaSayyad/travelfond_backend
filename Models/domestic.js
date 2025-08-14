const { Schema, model } = require("mongoose");

    const DomesticSchema = new Schema({
        id: Number,
        State : String,
        City :Array,
        Link :String
    });
const DomesticModel = model("domestic",DomesticSchema);
module.exports = DomesticModel;
