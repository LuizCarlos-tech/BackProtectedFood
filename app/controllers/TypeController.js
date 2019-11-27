const { types } = require("../models");

//Listar todos os tipos
module.exports = {
    async index(req, res) {
      try {
        const type = await types.findAll();

        return res.send({ type });

      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possível listar os tipos"
        });
      }
    },

    //Listar apenas um tipo
  async showId(req, res) {
    try {
      const type = await types.findOne({
        where: { id: req.params.id }
      });

      return res.send({ type });
    } catch (error) {

      return res.send({
        error: "Erro ",
        description: "Não foi possivel listar o tipo"
      });
    }
  },
  async showType(req, res) {
    try {
      const type = await types.findOne({
        where: { type: req.params.type }
      });

      return res.send({ type });
    } catch (error) {

      return res.send({
        error: "Erro ",
        deion: "Não foi possivel listar o tipo"
      });
    }
  },
    //Cadastrar tipo
    async create(req, res) {
        const { type } = req.body;
      
        if (!type)
          return res.send({
            error: "Erro ao Cadastrar",
            deion: "Falha no cadastro."
          });
  
        const newType = { type };
          
        try {
          
          const verifica = await types.findOne({
            where: { type: type }
          });

          if(verifica == null){
            const ty = await types.create(newType);
          return res.json(ty);
        }else{
            return res.json("Type já existe");
        }
        } catch (err) {

          return res.json({
            error: "Erro ao Cadastrar",
            deion: "Erro no Servidor.",
            err
          });
        }
      },
    

      //Atualização de Type
      async update(req, res) {
        const { type } = req.body;
    
        if (!type)
          return res.send({
            error: "Erro ao Atualizar",
            description: "Falha na atualização"
          });
    
        try {
          const newType = await types.update(
            {
              type,
              updatedAt: Date.now
            },
            { where: { id: req.params.id } }
          );

          return res.send({ newType });
        } catch (err) {
          
          return res.send({
            error: "Erro ao Atualizar",
            description: "Erro no Servidor",
            err
          });
        }
      },

      async delete(req, res) {
        //Deletar type
        try {
          const type = await types.destroy({
            where: { id: req.params.id }
          });

          return res.send({ type });
        } catch (err) {

          return res.send({
            error: "Erro ao Deletar",
            deion: "Erro no Servidor",
            err
          });
        }
      }
    };