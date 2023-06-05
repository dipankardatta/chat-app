const express = require('express')
const cors = require('cors')
const sequelize = require('./util/database')
const User = require('./models/user')
const chatMessage = require('./models/chatmsg')
const app = express()
app.use(express.json())
app.use(cors({
    origin : "*",
    credentials: true,
}))

// relationships
User.hasMany(chatMessage)
chatMessage.belongsTo(User)

// Import Routes
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chatmsg')


// User Routes
app.use('/users',userRoutes)

// Chat Routes
app.use('/user',chatRoutes)

sequelize
.sync({force: true})
// .sync()
.then(res=>{
  app.listen(3000);
})
.catch(e=>console.log(e))

