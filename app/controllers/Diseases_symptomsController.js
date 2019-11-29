const { diseases_symptoms } = require("../models");
const { diseases } = require("../models");
const { symptoms } = require("../models");

module.exports = {
    //Listar todas as relaçoes Diseases-Symptoms

    async index(req, res) {
      try {
        const diseases_symptom = await diseases_symptoms.findAll(
          { include: [{model : diseases, as: "Disease"}, {model : symptoms, as: "Symptom"}]}
        );

          let ret = { diseases: [] };
          
          
          diseases_symptom.map( fm => ret.diseases.push({id: fm.Disease.id, name: fm.Disease.name ,
             symptoms: fm.Symptom}));
          let ids = [];

          let newarr = ret.diseases.map(nret => {  
            let symps = ret.diseases.filter(val => nret.id === val.id );

            nret.symptoms = symps.map(symp => symp.symptoms.description);

            return nret;
          }).map(nret => {

            if(ids.indexOf(nret.id) === -1){
              ids.push(nret.id);
              return nret;
            }

            return null;
          })
          .filter(val => val);

          return res.send(newarr);
      } catch (error) {
        console.log(error);
        
        return res.status(400).send({
          error: "Erro",
          description: "Não foi possível listar as doenças"
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
        const disease = await diseases.findOne(
          { where: { id: req.params.id }
          });
          let ret = { disease, symptoms: [] };
          diseases_symptom.map( fm => ret.symptoms.push( fm.Symptom.description));
        

        return res.send(ret);
      
      } catch (error) {
        
        return res.status(400).send({
          error: "Erro",
          description: "Não foi possivel listar a food-micro"
        });
      }
    },
  
    //Cadastrar food-micro
    async create(idDisease, ids, res) {
      
      
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

    async update(req, symptoms, res) {



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