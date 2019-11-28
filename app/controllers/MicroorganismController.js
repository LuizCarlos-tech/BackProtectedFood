const { microorganisms } = require("../models");
const { diseases } = require("../models");
const { symptoms } = require("../models");

module.exports = {
    //Listar todos microorganisms

    async index(req, res) {
      try {
        const microorganism = await microorganisms.findAll(
          { include: [{model : diseases, as: "diseases"}]}
        );

        return res.send({ microorganism });
      } catch (error) {

        return res.status(400).send({
          error: "Erro",
          description: "Não foi possível listar os microorganismos"
        });
      }
    },
  
    //Listar apenas um microorganism
    async show(req, res) {
      try {
        const microorganism = await microorganisms.findOne(
          { include: [{model : diseases, as: "diseases"}],
          where: { id: req.params.id }
        }
        );

        return res.send(microorganism);
      } catch (error) {

        return res.status(400).send({
          error: "Erro",
          description: "Não foi possivel listar o microorganismo"
        });
      }
    },
  
    //Cadastrar microorganisms
    async create(req, res) {
      const { name, description, id_disease } = req.body;
      
      if (!name || !description || !id_disease)
        return res.status(400).send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newMicroorganism = { name, description, id_disease };
        
      try {
      const verifica = await microorganisms.findOne({
        where: { name: name }
      });

      if(verifica == null){
        const microorganism = await microorganisms.create(newMicroorganism);
      return res.json(microorganism);
      }else{
          return res.status(400).json("Microorganismo já existe");
      }
      } catch (err) {

        return res.status(400).json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    async update(req, res) {
      //Atualização de microorganisms
      const { name, description, id_disease } = req.body;
      
      if (!name || !description || !id_disease)

        return res.status(400).send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const microorganism = await microorganisms.update(
          {
            name,
            description,
            id_disease,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );

        return res.send({ microorganism });
      } catch (err) {

        return res.status(400).send({
          error: "Erro ao Atualizar",
          description: "Erro no Servidor",
          err
        });
      }
    },
  
    async delete(req, res) {
      //Deletar microorganisms
      try {
        const microorganism = await microorganisms.destroy({
          where: { id: req.params.id }
        });

        return res.send({ microorganism });
      } catch (err) {

        return res.status(400).send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };