const EventEmitter = require('events');

class Carrinho extends EventEmitter {

    constructor(){
        super();

        this.carrinho = [];
    }

    addItem(nome, valor){
        this.carrinho.push({nome,valor});
    }

    finalizarPedido(){
        this.verificarEstoque();
        this.baixaNoEstoque();
        this.criarPedido();
    }

    verificarEstoque(){ 
        const status = "Produtos com Estoque!";
        this.emit('verificarEstoque', {status});
    }

    baixaNoEstoque(){ 
        const status = "Baixa de estoque realizada!";
        this.emit('baixaNoEstoque', {status});
    }

    criarPedido(){ 
        const status = "Pedido criado com sucesso!";
        this.emit('criarPedido', {status, carrinho: this.carrinho});
    }
}

module.exports = new Carrinho;