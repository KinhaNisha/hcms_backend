const express = require('express')
const cors = require('cors')

const app = express()

// port
const PORT = process.env.PORT || 8080


// middlewares
app.use(express.json())

app.use(express.urlencoded({extended: true}))

// routes
const router = require('./routes/userRoutes')
app.use('/api/v1/users', router)



// server
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})