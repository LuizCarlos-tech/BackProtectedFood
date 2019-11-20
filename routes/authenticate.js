const express = require("express");
const router = express.Router();
const { User } = require('../app/models/index');
const cfg = require('../config/passport/config');
const jwtJsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

module.exports = {
  async post(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({where: { email }});
  
    if(!user)
      return res.status(400).send({ error: 'User not found' });
    
    if(!await bcryptjs.compare(password, user.password))
      return res.status(400).send({ error:'invalid password' });
  
    user.password = undefined;
    
    const token = jwtJsonwebtoken.sign({ id: user.id }, cfg.jwtSecret, {
      expiresIn: 8600,
    });
  
    res.status(200).json({ user, token});
  }
}