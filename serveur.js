const express = require('express');
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; // le pilote MongoDB
const ObjectID = require('mongodb').ObjectID;
var util = require("util");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template

app.get('/membres', (req, res) => {
    var cursor = db.collection('adresse').find().toArray(function (err, resultat) {
        if (err) return console.log(err)

        res.render('membres.ejs', {
            membres: resultat
        })
    })
});


app.get('/', (req, res) => {
    res.render('index.ejs');
})


app.get('/trier/:cle/:ordre', function (req, res) {

    let cle = req.params.cle;

    let ordre = (req.params.ordre == 'asc' ? 1 : -1);

    let cursor = db.collection('adresse').find().sort(cle, ordre).toArray(function (err, resultat) {

        if (ordre == 1) {
            ordre = 'desc';
        } else {
            ordre = 'asc';
        }

        res.render('membres.ejs', {
            membres: resultat,
            ordre_url: ordre
        });
    })
})


app.get('/ajouter', function (req, res) {

    db.collection('adresse').save(req.query, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/membres')

    })
})


app.get('/supprimer/:id', (req, res) => {

    var id = req.params.id

    db.collection('adresse').findOneAndDelete({
        "_id": ObjectID(req.params.id)
    }, (err, resultat) => {

        if (err) return console.log(err)
        res.redirect('/membres');
    })
})


app.post('/modifier', function (req, res) {


    var oModif = {
        "_id": ObjectID(req.body['_id']),
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        courriel: req.body.courriel
    }


    db.collection('adresse').save(oModif, (err, result) => {
        if (err) return console.log(err)

        res.redirect('/membres')

    })
})

let db;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err)
    db = database.db('carnet_adresse');
    // lancement du serveur Express sur le port 8081
    app.listen(8081, () => {})

})
