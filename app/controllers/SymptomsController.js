const { symptoms } = require("../models");
const { microorganisms } = require("../models");

module.exports = {
    //Listar todas categorias

    async index(req, res) {
      try {
        const symptom = await symptoms.findAll();
        return res.send({ symptom });
      } catch (error) {
        console.log(error);
        return res.send({
          error: "Erro",
          description: "Não foi possível listar as categorias"
        });
      }
    },
  
    //Listar apenas uma categoria
    async show(req, res) {
      try {
        const symptom = await symptoms.findOne(
        { include: [{model : microorganisms, as: "microorganisms"}],
        where: { id: req.params.id }
        });
        return res.send({ symptom });
      } catch (error) {
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a categoria"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res) {
      const { description, id_micro} = req.body;
      console.log(description, id_micro);
      
      if (!description || !id_micro)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newSympton = { description, id_micro };
        
      try {
        const symptom = await symptoms.create(newSympton);
        return res.json(symptom);
      } catch (err) {
        console.log(err);
        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    async update(req, res) {
      //Atualização de Categoria
      const { description, id_micro } = req.body;
      console.log(description,id_micro);
      
      if (!description || !id_micro)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const symptom = await symptoms.update(
          {
            description,
            id_micro,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );
        return res.send({ symptom });
      } catch (err) {
        return res.send({
          error: "Erro ao Atualizar",
          description: "Erro no Servidor",
          err
        });
      }
    },
  
    async delete(req, res) {
      //Deletar categoria
      try {
        const symptom = await symptoms.destroy({
          where: { id: req.params.id }
        });
        return res.send({ symptom });
      } catch (err) {
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };