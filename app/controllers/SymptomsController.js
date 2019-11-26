const { symptoms } = require("../models");
const { microorganisms } = require("../models");

module.exports = {
    //Listar todos os symptoms

    async index(req, res) {
      try {
        const symptom = await symptoms.findAll();

        return res.send({ symptom });
      } catch (error) {

        return res.send({
          error: "Erro",
          description: "Não foi possível listar os sintomas"
        });
      }
    },
  
    //Listar apenas um symptom
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
          description: "Não foi possivel listar o sintoma"
        });
      }
    },
  
    //Cadastrar categoria
    async create(req, res, next) {
      const sympList = req.body.symptoms;
      let idsSymptoms = [];

      sympList.map( async symptom => {
         const x = await symptoms.findOrCreate({
           where: {
             description: symptom
           }, defaults: { description: symptom }
         })
         .then(([val, created]) => {
            idsSymptoms.push(val.id);
            req.idsSymptoms = idsSymptoms;
            console.log(req.idsSymptoms);
            
         })
         .catch(err => {
           res.send(err);
         });

      });
      next();

    },
  
    async update(req, res) {
      //Atualização de symptoms
      const { description } = req.body;
      
      if (!description)
        return res.send({
          error: "Erro ao Atualizar",
          description: "Falha na atualização"
        });
  
      try {
        const symptom = await symptoms.update(
          {
            description,
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
      //Deletar symptoms
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