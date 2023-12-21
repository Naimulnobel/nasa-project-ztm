const mongoose = require('mongoose');
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})
mongoose.connection.on('error', (err) => {
    console.error(err)
})
async function mongoConnect() {
    await mongoose.connect('mongodb://localhost:27017/nasa');
}
async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}