const mongoose = require('mongoose');

// a schema is similar to a table in databases
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

//we want to export our model
//we give our model a name = 'Author' - essentially the name of our table inside DB
//then we pass it the schema which defines our database = authorSchema
module.exports = mongoose.model('Author', authorSchema)