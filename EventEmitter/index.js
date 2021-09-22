const Carrinho = require('./carrinho');


Carrinho.addItem("Notebook", 3500.00);
Carrinho.addItem('Monitor 20 polegadas', 1000.00);

Carrinho.on("verificarEstoque", (param)=>{
    console.log(param);
});

Carrinho.on("baixaNoEstoque", (param)=>{
    console.log(param);
});

Carrinho.on("criarPedido", (param)=>{
    console.log(param);
})

Carrinho.finalizarPedido();

