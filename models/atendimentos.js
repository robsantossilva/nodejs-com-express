const moment = require('moment');
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento');

class Atendimento {

    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = (tamanho) => tamanho >= 5;
        this.validacoes = [
            {
                nome:'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo;
            const parametro = parametros[nome];

            console.log(nome, parametro);

            return !campo.valido(parametros);
        })
        
    }

    adiciona(atendimento, res) {
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        const dataCriacao = moment(new Date).format('YYYY-MM-DD hh:mm:ss');
        
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if(existemErros){
            return new Promise((resolve, reject) => reject(erros));
            //res.status(400).json(erros);
        }else{
            atendimento = {...atendimento, dataCriacao, data};

            return repositorio.adiciona(atendimento)
                .then(resultados => {
                    const id = resultados.insertId;
                    return {...atendimento, id};
                });
        }
    }

    lista(){

        return repositorio.lista();
        // const sql = 'SELECT * FROM atendimentos';

        // conexao.query(sql, (erro, resultados) => {
        //     if(erro){
        //         res.status(400).json(erro);
        //     }else{
        //         res.status(200).json(resultados);
        //     }
        // });
    }

    buscaPorId(id, res){
        const sql = 'SELECT * FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {

            const atendimento = resultados[0];
            const cpf = atendimento.cliente;

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