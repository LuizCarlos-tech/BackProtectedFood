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
    async create(id, symptoms_list, res) {
      let ids = [];

      for(symptom of symptoms_list){
        let symp = await symptoms.findOrCreate({
          where: { description: symptom }
          ,defaults: { description: symptom }
        })
        .then(([val, created]) => {
          ids.push(val.id);
        })
        .catch(err => res.send(err));
      }

      return ([id, ids]);
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