const { Schema, model } = require("mongoose");

    const InternationalSchema = new Schema({
        State : String,
        City :Array,
        Link :String
    });
const InternationalModel = model("International",InternationalSchema);
module.exports = InternationalModel;
