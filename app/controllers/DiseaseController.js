const { diseases } = require("../models");

module.exports = {
    //Listar todas as doenças

    async index(req, res) {
      try {
        const disease = await diseases.findAll();
        return res.send({ disease });

      } catch (error) {

        return res.status(400).send({
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

        return res.status(400).send({
          error: "Erro",
          description: "Não foi possivel listar a doença"
        });
      }
    },
  
    //Cadastrar doença
    async create(disease, res) {
      const { name } = disease;
      
      if (!name)
        return res.status(400).send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
  
      const newDisease = { name };
        
      try {
        const verifica = await diseases.findOne({
          where: { name }
        });
  
        if(verifica == null){
          const disease = await diseases.create(newDisease);
          return disease.id;
        }else{
            return res.status(400).json({error: "Doença já existe"});
        }
      } catch (err) {

        return res.status(400).json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          erro: err.message
        });
      }
    },
  
    async update(req, res) {
      //Atualização de Doença
      const { name } = req.body;
      
      if (!name )

        return res.status(400).send({
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

        return res.status(400).send({
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

        return res.status(400).send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };