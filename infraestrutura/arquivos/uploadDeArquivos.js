const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => 
{
    const tiposValidos = ['jpg', 'png', 'jpeg']; 
    const tipo = path.extname(caminho);
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if(!tipoEhValido){
        const erro = 'Tipo é inválido';
        console.log('Erro! Tipo inválido');
        callbackImagemCriada(erro);
    }else{
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on("finish", () => callbackImagemCriada(false, novoCaminho));
    }
}

// fs.readFile('./assets/salsicha.jpg', (erro, buffer) => {
//     console.log(buffer);

//     fs.writeFile('./assets/salsicha2.jpg', buffer, (error) => {
//         console.log(error);
//     });
// });

// const soma = (a,b) => a + b;

// console.log(soma(1,1));

// setTimeout(()=>console.log('time out 1'), 2000);

// console.log(soma(2,2));

// setTimeout(()=>console.log('time out 2'), 2000);

// console.log(soma(3,3));