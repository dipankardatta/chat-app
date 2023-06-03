const express = require('express')
const cors = require('cors')
const sequelize = require('./util/database')
const app = express()
app.use(express.json())
app.use(cors())

// Import Routes
const userRoutes = require('./routes/user')


// Use Routes
app.use('/users',userRoutes)

sequelize
.sync({force: true})
// .sync()
.then(res=>{
  app.listen(3000);
})
.catch(e=>console.log(e))

