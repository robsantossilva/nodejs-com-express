const Atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        // console.log(req.headers, {depth:null});
        // res.status(200).json();
        Atendimento.lista()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, res);
    });

    // app.post('/atendimentos', (req, res) => {
    //     const atendimento = req.body;
    //     Atendimento.adiciona(atendimento, res);
    // });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => {
                console.log(atendimentoCadastrado);
                res.status(201).json(atendimentoCadastrado);    
            })
            .catch(erros => res.status(400).json(erros));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const atendimento = req.body;
        Atendimento.altera(id, atendimento, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    });
}