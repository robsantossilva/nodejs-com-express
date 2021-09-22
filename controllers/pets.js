const Pet = require('../models/pets');
module.exports = app => {
    // app.get('/pet', (req, res) => {
    //     Pet.lista(res);
    // });

    // app.get('/pet/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     Pet.buscaPorId(id, res);
    // });

    app.post('/pet', (req, res) => {
        const pet = req.body;
        Pet.adiciona(pet, res);
    });

    // app.patch('/pet/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     const pet = req.body;
    //     Pet.altera(id, pet, res);
    // });

    // app.delete('/pet/:id', (req, res) => {
    //     const id = parseInt(req.params.id);
    //     Pet.deleta(id, res);
    // });
}