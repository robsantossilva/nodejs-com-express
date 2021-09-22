const moment = require('moment');
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        const dataCriacao = moment(new Date).format('YYYY-MM-DD hh:mm:ss');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }else{
            atendimento = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO atendimentos SET ?';

            conexao.query(sql, atendimento, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(atendimento);
                }
            });
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res){
        const sql = 'SELECT * FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados[0]);
            }
        });
    }

    altera(id, atendimento, res){

        const sql = 'SELECT * FROM atendimentos WHERE id = ?';

        let atendimentoAtual = {};
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                console.log(resultados, resultados.length);
                if(resultados.length <= 0){
                    res.status(400).json([
                        {
                            nome:'atendimento',
                            valido: false,
                            mensagem: 'Atendimento não encontrado'
                        }
                    ]);
                }else{
                    atendimentoAtual = resultados[0];
                }                   
            }
        });

        // ---

        let dataEhValida = true;
        if(atendimento.data!==undefined){
            const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
            const dataCriacao = moment(atendimentoAtual.dataCriacao).format('YYYY-MM-DD hh:mm:ss');
            atendimento = {...atendimento, data};
            dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        }        

        let clienteEhValido = true;
        if(atendimento.cliente!==undefined){
            clienteEhValido = atendimento.cliente.length >= 5;
        }        

        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }else{
            const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
            conexao.query(sql, [atendimento, id], (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(200).json({...atendimento, id});
                }
            });
        }
    }

    deleta(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimento;