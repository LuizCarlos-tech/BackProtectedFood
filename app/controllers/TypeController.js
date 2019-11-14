const { types } = require("../models");

//Listar todos os tipos
module.exports = {
    async index(req, res) {
      try {
        const type = await types.findAll();
        //console.log(type);
        return res.send({ type });
      } catch (error) {
        //console.log(error);
        return res.send({
          error: "Erro",
          description: "Não foi possível listar os tipos"
        });
      }
    },

    //Listar apenas um tipo
  async show(req, res) {
    try {
      const type = await types.findOne({
        where: { id: req.params.id }
      });
      return res.send({ type });
    } catch (error) {
      return res.send({
        error: "Erro ",
        deion: "Não foi possivel listar a categoria"
      });
    }
  },

    //Cadastrar tipo
    async create(req, res) {
        const { type, control_measure } = req.body;
      
        if (!type || !control_measure)
          return res.send({
            error: "Erro ao Cadastrar",
            deion: "Falha no cadastro."
          });
  
        const newType = { type , control_measure };
          
        try {
          //console.log(types, type)
        
          const ty = await types.create(newType);
          return res.json(ty);
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
            deion: "Falha na atualização"
          });
    
        try {
          const type = await types.update(
            {
              type,
              updatedAt: Date.now
            },
            { where: { id: req.params.id } }
          );
          return res.send({ type });
        } catch (err) {
          return res.send({
            error: "Erro ao Atualizar",
            deion: "Erro no Servidor",
            err
          });
        }
      },

      async delete(req, res) {
        //Deletar categoria
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