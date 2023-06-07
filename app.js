const express = require('express')
const cors = require('cors')
const sequelize = require('./util/database')
const User = require('./models/user')
const ChatMessage = require('./models/chatmsg')
const Group = require('./models/groups');
const GroupMessage = require('./models/groupmsgs');
const GroupMember = require('./models/groupmembers');
const app = express()
app.use(express.json())
app.use(cors({
    origin : "*",
    credentials: true,
}))

// relationships
User.hasMany(ChatMessage)
ChatMessage.belongsTo(User)

//group relationships
Group.hasMany(GroupMessage);
GroupMessage.belongsTo(Group);
GroupMessage.belongsTo(User);


Group.belongsToMany(User, { through: GroupMember });
User.belongsToMany(Group, { through: GroupMember });


// Import Routes
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chatmsg')
const groupRoutes = require('./routes/group')


// User Routes
app.use('/users',userRoutes)

// Chat Routes
app.use('/user',chatRoutes)

//group routes
app.use('/groups',groupRoutes)
sequelize
// .sync({force: true})
.sync()
.then(res=>{
  app.listen(3000);
})
.catch(e=>console.log(e))

