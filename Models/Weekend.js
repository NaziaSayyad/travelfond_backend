const { Schema, model } = require("mongoose");

    const WeekendSchema = new Schema({
        id: Number,
        State : String,
        City :Array,
});
const WeekendModel = model("Weekend",WeekendSchema);
module.exports = WeekendModel;
