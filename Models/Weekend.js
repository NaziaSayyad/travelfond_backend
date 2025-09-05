const { Schema, model } = require("mongoose");
const CitySchema = new Schema({
    city_id: Number,
    City: String,
    image: String,
    itenaries: [
        {
            iteanries: String,
            data: String
        }
    ]
});
const WeekendSchema = new Schema({
    id: Number,
    Name: String,
    image: String,
    city: [CitySchema]
});
const WeekendModel = model("Weekend", WeekendSchema);
module.exports = WeekendModel;
