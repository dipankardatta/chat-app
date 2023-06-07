const Group = require('../models/groups');
const GroupMessage = require('../models/groupmsgs');
const GroupMember = require('../models/groupmembers');
const User = require('../models/user');

// Create a group
exports.createGroup = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new group
    const group = await Group.create({ name });

    // Add the creator (logged-in user) as a member of the group
    await GroupMember.create({
      groupId: group.id,
      userId: req.user.id
    });

    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Invite users to a group
exports.invite = async (req, res) => {
  const { groupId } = req.params;
  const { userIds } = req.body;

  try {
    // Find the group
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Find the users to invite
    const users = await User.findAll({ where: { id: userIds } });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Add the users as members of the group
    await GroupMember.bulkCreate(
      userIds.map((userId) => ({ groupId, userId }))
    );

    res.status(200).json({ message: 'Users invited successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a chat message in a group
exports.createChat = async (req, res) => {
  const { groupId } = req.params;
  const { name,message } = req.body;

  try {
    // Find the group
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Create a new chat message
    const chatMessage = await GroupMessage.create({
      groupId,
      userId: req.user.id,
      name,
      message
    });

    res.status(201).json(chatMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all chat messages in a group
exports.getAllMessages = async (req, res) => {
  const { groupId } = req.params;
  console.log(groupId)
  try {
    // Find the group
    const group = await Group.findByPk(groupId);
    console.log(group)
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if the user is a member of the group
    const userId = req.user.id;
    const isMember = await GroupMember.findOne({
      where: { groupId, userId }
      
    });
    console.log(isMember)
    if (!isMember) {
      return res.status(403).json({ error: 'Access denied' });
    }
    // Fetch all chat messages for the group
    const messages = await GroupMessage.findAll({
      where: { groupId },
      include: [{ model: User, attributes: ['id', 'name'] }]
    });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all groups
exports.getAllGroups = async (req, res) => {
    try {
      // Fetch all groups
      const groups = await Group.findAll();
  
      res.status(200).json(groups);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
