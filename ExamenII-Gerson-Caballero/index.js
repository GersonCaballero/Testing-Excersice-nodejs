const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
app.use(bodyParser());

const mongo = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

var server = app.listen(8081, function () {
});

module.exports = {
    InteresAnual (capital, interes, tiempo) {
        var interesanual = (capital*(interes/100))*tiempo;
        return interesanual;
    },
    InteresTotal(capital, interesanual) {
        var interestotal = capital+interesanual;
        return interestotal;
    }

}; 

    app.post('/api/interes/anual', function(req, res){
        var capital = req.body.capital;
        var interes = req.body.interes;
        var tiempo = req.body.tiempo;

        mongo.connect(url, { useMongoClient: true}, (err, client) => {
            if (err) {
              console.error(err)
              return
            }
        
            const db = client.db('interes');
            const collection = db.collection('interes');

        var interesAnual = module.exports.InteresAnual(capital, interes, tiempo);
        
        var interesTotal = module.exports.InteresTotal(capital, interesAnual);

        collection.insertOne({capital: capital, interes: interes, tiempo: tiempo, interesAnual: interesAnual, interesTotal: interesTotal}, (err, result) => {
            if (err) {
                console.error(err)
            }
            res.send({success: true, 
                message: "Se realizo con exito el ingreso de datos.", 
                interesAnual: interesAnual, 
                interesTotal: interesTotal});
        });
    });
});
