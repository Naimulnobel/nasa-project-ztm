const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const http = require('http')
const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model')
const server = http.createServer(app)
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})
mongoose.connection.on('error', (err) => {
    console.error(err)
})
async function startServer() {
    await mongoose.connect('mongodb://localhost:27017/nasa')
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}
startServer()

