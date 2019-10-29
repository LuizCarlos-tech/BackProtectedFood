const router = require('express').Router();
const { users } = require('../app/models');


router.delete('/UsersDelete/:id', async (req, res) => {
    const user = await users.destroy({
        where:{
            id: req.params.id
        }
    });
    res.send('Deletado');
}); //Deletar

router.put('/UsersUpdate/:id', async (req, res) => {
    const user = await users.update(
        {name: req.body.name},
        {where: {id: req.params.id} }
    );  
      res.send('Updatado');
    });


module.exports = router;