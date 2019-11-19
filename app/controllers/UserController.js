const { User } = require('../models');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../../config/passport/config').jwtSecret;
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');

module.exports = {
    // List all users
    async index(req, res) {
        try {
            const users = await User.findAll();
            
            users.password = undefined;
            return res.status(200).json({users});
        } catch (err) {
            return res.status(422).json({ error : 'Unable to list all users' });
        }
    },
    // List only one user
    async show(req, res) {
        try {
            const id = await jwt.verify(req.params.token, jwtSecret).id;
            const user = await User.findOne({where : { id }});

            user.password = undefined;
            res.status(200).json(user);
        } catch (err) {
            return res.status(422).json({ error : 'Unable to list user' });
        }
    },
    // Create a new user
    async create(req, res) {
        const { name, email, password, admin, url_image } = req.body;
        const newUser = { name, email, password, admin, url_image };
        const user = await User.findOne({where : { email }});
        
        if( user === null ){
            try {
                const user = await User.create(newUser);
                
                user.password = undefined;
                res.status(200).json(user);
            } catch (err) {
                return res.status(422).json({ error: 'error registering new user' });
            }
        } else {
            if(email !== user.email) {
                try {
                    const user = await User.create(newUser);
                    user.password = undefined;
                    res.status(200).json(user);
                } catch (err) {
                    return res.status(422).json({ error: 'error registering new user' });
                }
            } else {
                res.status(422).json('Erro ao registrar usuário, email já cadastrado');
            }
        }
    },
    // Update user data
    async update(req, res) {
        const { name, newpassword, url_image } = req.body;
        
        let { password } = req.body

        const id = await jwt.verify(req.params.token, jwtSecret).id;
        const user = await User.findOne({where: { id }});
        
        if(!await bcryptjs.compare(password, user.password))
            return res.status(422).json({ error:'invalid password' });

        bcrypt.genSalt(8, async (err, salt)=> {
            if (err) {
                return res.status(422).json({ error: 'Error generating password' });
            }
            bcrypt.hash(newpassword, salt, async (err, hash) => {
                if (err) {
                    return res.status(422).json({ error: 'Error generating password' });
                }
                password = hash;
                
                try {
                    const user = await User.update({
                        name, password, url_image, updatedAt: Date.now
                    }, { where : { id }});
                    return res.status(200).json( 'Name and password successfully changed' );
                } catch (err) {
                    return res.status(422).json({ error: 'Error Updating' });
                }
            });
        });
    },
    // Delete a user
    async delete(req, res) {
        try {
            const id = await jwt.verify(req.params.token, jwtSecret).id;
            const user = await User.destroy({where : {id}});
            return res.status(200).json('User successfully removed');
        } catch (err) {
            return res.status(422).json({ error: 'Error deleting user' });
        }
    },
}