const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivos = require('../infraestrutura/arquivos/uploadDeArquivos');

class Pet {
    adiciona(pet, res) {
        const sql = 'INSERT INTO pets SET ?';

        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
            const novoPet = {nome:pet.nome, imagem: novoCaminho};

            if(erro){
                res.status(400).json({erro});
            }else{
                conexao.query(sql, pet, (erro, resultados) => {
                    if(erro){
                        res.status(400).json(erro);
                    }else{
                        res.status(201).json(novoPet);
                    }
                });
            }            
        });        
    }

    lista(res){
        
    }

    buscaPorId(id, res){
        
    }

    altera(id, atendimento, res){

        
    }

    deleta(id, res){
        
    }
}

module.exports = new Pet;