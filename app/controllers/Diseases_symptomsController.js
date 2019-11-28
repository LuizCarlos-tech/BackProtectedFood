const { diseases_symptoms } = require("../models");
const { diseases } = require("../models");
const { symptoms } = require("../models");

module.exports = {
    //Listar todas as relaçoes Foods_Micro

    async index(req, res) {
      try {

        const diseases_symptom = await diseases_symptoms.findAll(
          { include: [{model : diseases, as: "Disease"}, {model : symptoms, as: "Symptom"}]}
        );
        
        return res.send( diseases_symptom );
      } catch (error) {

        return res.status(400).send({
          error: "Erro",
          description: "Não foi possível listar as foods-micro"
        });
      }
    },
  
    //Listar apenas uma food-micro
    async show(req, res) {
      try {
        const diseases_symptom = await diseases_symptoms.findAll(
        { include: [{model : diseases, as: "Disease"}, {model : symptoms, as: "Symptom"}],
            where: { id_disease: req.params.id }
        });

        return res.send(diseases_symptom);
      
      } catch (error) {
        
        return res.status(400).send({
          error: "Erro",
          description: "Não foi possivel listar a food-micro"
        });
      }
    },
  
    //Cadastrar food-micro
    async create(idDisease, ids, res) {
      console.log(idDisease, ids);
      
      
      ids.map(async id => {
        const x = await diseases_symptoms.create({ 
          id_disease: idDisease,
          id_symptom: id
        })
        .then(() => console.log('ok'))
        .catch(err => res.status(400).send(err));
      });

      res.status(200).send({ "status": "ok" });

    },
  
    
    async delete(req, res) {
      //Deletar food-micro
      try {
        const diseases_symptom = await diseases_symptoms.destroy({
          where: { id: req.params.id }
        });

        return res.send({ diseases_symptom });
      } catch (err) {
          
        return res.status(400).send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };