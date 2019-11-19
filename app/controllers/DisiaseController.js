const { diseases } = require("../models");

module.exports = {
    //Listar todas as doenças

    async index(req, res) {
      try {
        const disease = await diseases.findAll();
        return res.send({ disease });

      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possível listar as doenças"
        });
      }
    },
  
    //Listar apenas uma doença
    async show(req, res) {
      try {
        const disease = await diseases.findOne({
          where: { id: req.params.id }
        });

        return res.send({ disease });
      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a doença"
        });
      }
    },
  
    //Cadastrar doença
    async create(req, res) {
      const { name} = req.body;
      
      if (!name)
        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newDisease = { name};
        
      try {
        const disease = await diseases.create(newDisease);

        return res.json(disease);
      } catch (err) {

        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    async update(req, res) {
      //Atualização de Doença
      const { name } = req.body;
      
      if (!name )

        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const disease = await diseases.update(
          {
            name,
            updatedAt: Date.now
          },
          { where: { id: req.params.id } }
        );

        return res.send({ disease });
      } catch (err) {

        return res.send({
          error: "Erro ao Atualizar",
          description: "Erro no Servidor",
          err
        });
      }
    },
  
    async delete(req, res) {
      //Deletar doença
      try {
        const disease = await diseases.destroy({
          where: { id: req.params.id }
        });

        return res.send({ disease });
      } catch (err) {

        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };