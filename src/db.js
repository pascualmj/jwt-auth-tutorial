const mongoose = require('mongoose')

// Mongo DB URI
// You may also need to modify the cluster name
const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@cluster0-hcahg.mongodb.net/${process.env.MONGO_ATLAS_DBNAME}?retryWrites=true`

// Connect to local's mongo database
mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database >> Succesfully connected.')
}).catch((error) => {
    console.log(error)
})