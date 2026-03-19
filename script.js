let proximoID = 1;
let array = []

function cadastrar(){
    const inputNome = document.getElementById('nome');
    const inputValor = document.getElementById('valor');

    const nome = inputNome.value.trim();
    const valor = parseFloat(inputValor.value);

    if (nome === "" || isNaN(valor) || valor <= 0) {
        alert("Erro: Preencha todos os campos com valores válidos!");
        return;
    }

    //desconto de 10%
    const desconto = valor * 0.10;
    const valor_desconto = valor - desconto;

    //funcionalidade que pega data e hora no momento do clique
    const agorinha = new Date();
    const dataFormatada =  agorinha.toLocaleDateString('pt-BR') + ", " + agorinha.toLocaleTimeString('pt-BR');

    const novaVenda = {
        id: proximoID,
        vendedor: nome,
        valor: valor,
        desconto: desconto,
        valorFinal: valor_desconto,
        data: dataFormatada
    };

    array.push(novaVenda);
    adicionar(novaVenda);

    //limpando a função
    proximoID++;
    inputNome.value = "";
    inputValor.value = "";
    inputNome.focus();
}

function adicionar(venda){
    const tabela = document.getElementById('table');
    const novaLinha = tabela.insertRow(-1);

    novaLinha.id = `linha-${venda.id}`;

    novaLinha.innerHTML = `
        <td>${venda.id}</td>
        <td>${venda.vendedor}</td>
        <td>R$ ${venda.valor.toFixed(2)}</td> 
        <td>R$ ${venda.desconto.toFixed(2)}</td>
        <td>R$ ${venda.valorFinal.toFixed(2)}</td>
        <td>${venda.data}</td>
        <td>
            <button class="btn-remover" onclick="removerLinha(this)">Remover</button>
        </td>    
    `;
    //tofixed transforma o numero em string e "arredonda" o valor
}

function removerLinha(botao){
    const linha = botao.parentNode.parentNode;
    linha.remove();
}

function limpar(){
    if (array.length === 0) {
        alert("Não há registros para limpar!");
        return;
    }
    
    if (confirm("Tem certeza que deseja apagar todas as vendas?")) {
        array= []; //esvazia o array
        proximoID = 1;
        
        const tabela = document.getElementById("table");
        while (tabela.rows.length > 1) {
            tabela.deleteRow(1);
        }
    }
}

function removerUltimo(){
    if (array.length === 0) {
        alert("A lista está vazia!");
        return;
    }
    const ultimo = array.pop(); //tira o último do array
    const linha = document.getElementById(`linha-${ultimo.id}`);
    if (linha) linha.remove();
}