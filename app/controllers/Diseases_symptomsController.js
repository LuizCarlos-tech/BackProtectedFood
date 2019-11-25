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

        return res.send({
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
        
        return res.send({
          error: "Erro",
          description: "Não foi possivel listar a food-micro"
        });
      }
    },
  
    //Cadastrar food-micro
    async create(req, res) {
      const { id_disease, id_symptom } = req.body;

      if (!id_disease || !id_symptom)

        return res.send({
          error: "Erro ao Cadastrar",
          description: "Falha no cadastro."
        });
        
      const newDiseaseSymptom = { id_disease, id_symptom };
        
      try {

          const diseases_symptom = await diseases_symptoms.create(newDiseaseSymptom);

          return res.json(diseases_symptom);
        
      } catch (err) {

        return res.json({
          error: "Erro ao Cadastrar",
          description: "Erro no Servidor.",
          err
        });
      }
    },
  
    
    async delete(req, res) {
      //Deletar food-micro
      try {
        const diseases_symptom = await diseases_symptoms.destroy({
          where: { id: req.params.id }
        });

        return res.send({ diseases_symptom });
      } catch (err) {
          
        return res.send({
          error: "Erro ao Deletar",
          description: "Erro no Servidor",
          err
        });
      }
    }
  };