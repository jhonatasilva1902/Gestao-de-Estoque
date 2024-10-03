// Variáveis globais
let materiais = JSON.parse(localStorage.getItem('materiais')) || []; // Recupera materiais salvos no localStorage ou inicia um array vazio
let totalEntrada = 0; // Total de entradas
let totalRetirada = 0; // Total de retiradas
let saldoTotal = 0; // Saldo total entre entradas e retiradas
let editingIndex = null; // Índice do material que está sendo editado

// Elementos do formulário
const quantidadeInput = document.getElementById('quantidade'); // Campo de quantidade
const valorUnitarioInput = document.getElementById('valor-unitario'); // Campo de valor unitário
const subtotalInput = document.getElementById('subtotal'); // Campo de subtotal

// Elementos da DOM
const btnCadastrar = document.getElementById('btn-cadastrar'); // Botão para exibir o formulário de cadastro
const btnConsultar = document.getElementById('btn-consultar'); // Botão para exibir a consulta de estoque
const formContainer = document.getElementById('form-container'); // Contêiner do formulário de cadastro
const consultaContainer = document.getElementById('consulta-container'); // Contêiner da consulta de estoque
const btnAdd = document.getElementById('btn-add'); // Botão para adicionar material
const form = document.getElementById('material-form'); // Formulário de cadastro de materiais
const editModal = document.getElementById('edit-modal'); // Modal de edição de materiais
const editForm = document.getElementById('edit-form'); // Formulário dentro do modal de edição
const btnSaveEdit = document.getElementById('btn-save-edit'); // Botão para salvar as edições
const searchInput = document.getElementById('search'); // Campo de busca

// Exibir o formulário de cadastro
btnCadastrar.addEventListener('click', () => {
    formContainer.classList.toggle('hidden'); // Alterna a visibilidade do formulário de cadastro
    consultaContainer.classList.add('hidden'); // Oculta a consulta de estoque
});

// Exibir a consulta de estoque
btnConsultar.addEventListener('click', () => {
    consultaContainer.classList.toggle('hidden'); // Alterna a visibilidade da consulta de estoque
    formContainer.classList.add('hidden'); // Oculta o formulário de cadastro
    atualizarTabela(); // Atualiza a tabela de materiais
    atualizarTotais(); // Atualiza os totais de entrada, retirada e saldo
});

// Adicionar material
btnAdd.addEventListener('click', () => {
    const material = {
        dataMov: document.getElementById('data-mov').value, // Data da movimentação
        movimentacao: document.getElementById('movimentacao').value, // Tipo de movimentação (Entrada ou Retirada)
        codigo: document.getElementById('codigo').value, // Código do material
        produto: document.getElementById('produto').value, // Nome do produto
        quantidade: parseFloat(document.getElementById('quantidade').value), // Quantidade do material
        unidade: document.getElementById('unidade').value, // Unidade de medida
        valorUnitario: parseFloat(document.getElementById('valor-unitario').value), // Valor unitário do material
        subtotal: parseFloat(document.getElementById('quantidade').value) * parseFloat(document.getElementById('valor-unitario').value) // Subtotal calculado
    };

    materiais.push(material); // Adiciona o material ao array
    salvarLocalStorage(); // Salva o array de materiais no localStorage
    atualizarTabela(); // Atualiza a tabela de materiais
    atualizarTotais(); // Atualiza os totais
    form.reset(); // Limpa o formulário
    subtotalInput.value = ''; // Limpa o campo subtotal
});

// Função para calcular o subtotal em tempo real
function calcularSubtotal() {
    const quantidade = parseFloat(quantidadeInput.value) || 0; // Obtém a quantidade, ou 0 se estiver vazia
    const valorUnitario = parseFloat(valorUnitarioInput.value) || 0; // Obtém o valor unitário, ou 0 se estiver vazio
    const subtotal = quantidade * valorUnitario; // Calcula o subtotal
    subtotalInput.value = subtotal.toFixed(2); // Exibe o subtotal com duas casas decimais
}

// Adicionando event listeners para atualizar o subtotal em tempo real
quantidadeInput.addEventListener('input', calcularSubtotal); // Atualiza o subtotal quando a quantidade muda
valorUnitarioInput.addEventListener('input', calcularSubtotal); // Atualiza o subtotal quando o valor unitário muda

// Atualizar tabela de materiais
function atualizarTabela() {
    const tbody = document.getElementById("estoque-body"); // Corpo da tabela
    tbody.innerHTML = ""; // Limpa a tabela

    materiais.forEach((material, index) => {
        const row = document.createElement("tr"); // Cria uma nova linha

        // Adiciona as células de dados na linha
        row.innerHTML = `
            <td>${material.dataMov}</td>
            <td>${material.movimentacao}</td>
            <td>${material.codigo}</td>
            <td>${material.produto}</td>
            <td>${material.quantidade}</td>
            <td>${material.unidade}</td>
            <td>${material.valorUnitario.toFixed(2)}</td>
            <td>${material.subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-editar" onclick="abrirModalEdicao(${index})">Editar</button>
                <button class="btn-excluir" onclick="excluirMaterial(${index})">Excluir</button>
                <button class="btn-retirar" onclick="retirarMaterial(${index})">Retirar</button>
            </td>
        `;

        tbody.appendChild(row); // Adiciona a linha na tabela
    });
}

// Atualizar totais e saldo
function atualizarTotais() {
    // Calcula o total de entradas
    totalEntrada = materiais.filter(m => m.movimentacao === 'Entrada')
        .reduce((acc, m) => acc + m.subtotal, 0);

    // Calcula o total de retiradas
    totalRetirada = materiais.filter(m => m.movimentacao === 'Retirada')
        .reduce((acc, m) => acc + m.subtotal, 0);

    // Calcula o saldo total
    saldoTotal = totalEntrada - totalRetirada;

    // Atualiza os elementos DOM com os totais
    document.getElementById("total-entrada").textContent = totalEntrada.toFixed(2);
    document.getElementById("total-retirada").textContent = totalRetirada.toFixed(2);
    document.getElementById("saldo-total").textContent = saldoTotal.toFixed(2);
}

// Abrir modal de edição
function abrirModalEdicao(index) {
    editingIndex = index; // Define o índice do material que está sendo editado
    const material = materiais[index]; // Obtém os dados do material selecionado

    // Preenche o formulário de edição com os dados do material
    editForm['edit-data-mov'].value = material.dataMov;
    editForm['edit-movimentacao'].value = material.movimentacao;
    editForm['edit-codigo'].value = material.codigo;
    editForm['edit-produto'].value = material.produto;
    editForm['edit-quantidade'].value = material.quantidade;
    editForm['edit-unidade'].value = material.unidade;
    editForm['edit-valor-unitario'].value = material.valorUnitario;
    editForm['edit-subtotal'].value = material.subtotal.toFixed(2);

    editModal.classList.remove('hidden'); // Exibe o modal
}

// Salvar alterações da edição
btnSaveEdit.addEventListener('click', () => {
    const material = {
        dataMov: editForm['edit-data-mov'].value, // Data da movimentação
        movimentacao: editForm['edit-movimentacao'].value, // Tipo de movimentação
        codigo: editForm['edit-codigo'].value, // Código do material
        produto: editForm['edit-produto'].value, // Nome do produto
        quantidade: parseFloat(editForm['edit-quantidade'].value), // Quantidade
        unidade: editForm['edit-unidade'].value, // Unidade de medida
        valorUnitario: parseFloat(editForm['edit-valor-unitario'].value), // Valor unitário
        subtotal: parseFloat(editForm['edit-quantidade'].value) * parseFloat(editForm['edit-valor-unitario'].value) // Subtotal calculado
    };

    materiais[editingIndex] = material; // Atualiza o material no array
    salvarLocalStorage(); // Salva o array atualizado no localStorage
    atualizarTabela(); // Atualiza a tabela de materiais
    atualizarTotais(); // Atualiza os totais
    editModal.classList.add('hidden'); // Oculta o modal
});

// Excluir material
function excluirMaterial(index) {
    materiais.splice(index, 1); // Remove o material do array
    salvarLocalStorage(); // Salva o array atualizado no localStorage
    atualizarTabela(); // Atualiza a tabela de materiais
    atualizarTotais(); // Atualiza os totais
}

// Retirar material (registrar movimentação)
function retirarMaterial(index) {
    const material = materiais[index]; // Obtém o material selecionado
    const quantidade = parseFloat(prompt("Digite a quantidade a ser retirada:", "0")); // Solicita a quantidade a ser retirada

    // Verifica se a quantidade é válida
    if (isNaN(quantidade) || quantidade <= 0 || quantidade > material.quantidade) {
        alert("Quantidade inválida!");
        return;
    }

    // Atualiza a quantidade do material no estoque
    material.quantidade -= quantidade;

    // Cria um registro de retirada
    const retirada = {
        dataMov: new Date().toISOString().split('T')[0], // Data atual
        movimentacao: "Retirada", // Tipo de movimentação
        codigo: material.codigo, // Código do material
        produto: material.produto, // Nome do produto
        quantidade: quantidade, // Quantidade retirada
        unidade: material.unidade, // Unidade de medida
        valorUnitario: material.valorUnitario, // Valor unitário
        subtotal: quantidade * material.valorUnitario // Subtotal calculado
    };

    materiais.push(retirada); // Adiciona o registro de retirada ao array
    salvarLocalStorage(); // Salva o array atualizado no localStorage
    atualizarTabela(); // Atualiza a tabela de materiais
    atualizarTotais(); // Atualiza os totais
}

// Persistir dados no localStorage
function salvarLocalStorage() {
    localStorage.setItem('materiais', JSON.stringify(materiais)); // Salva o array de materiais no localStorage
}

// Fechar modal de edição
document.querySelector('.close').addEventListener('click', () => {
    editModal.classList.add('hidden'); // Oculta o modal de edição
});

// Filtrar materiais na tabela de consulta
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase(); // Obtém o termo de busca em minúsculas
    const materiaisFiltrados = materiais.filter(material =>
        material.dataMov.includes(searchTerm) || // Filtra por data
        material.movimentacao.toLowerCase().includes(searchTerm) || // Filtra por movimentação
        material.codigo.toLowerCase().includes(searchTerm) || // Filtra por código
        material.produto.toLowerCase().includes(searchTerm) // Filtra por produto
    );
    atualizarTabelaFiltrada(materiaisFiltrados); // Atualiza a tabela com os resultados filtrados
});

// Atualizar tabela filtrada
function atualizarTabelaFiltrada(materiaisFiltrados) {
    const tbody = document.getElementById("estoque-body"); // Corpo da tabela
    tbody.innerHTML = ""; // Limpa a tabela

    materiaisFiltrados.forEach((material, index) => {
        const row = document.createElement("tr"); // Cria uma nova linha

        // Adiciona as células de dados na linha
        row.innerHTML = `
            <td>${material.dataMov}</td>
            <td>${material.movimentacao}</td>
            <td>${material.codigo}</td>
            <td>${material.produto}</td>
            <td>${material.quantidade}</td>
            <td>${material.unidade}</td>
            <td>${material.valorUnitario.toFixed(2)}</td>
            <td>${material.subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-editar" onclick="abrirModalEdicao(${index})">Editar</button>
                <button class="btn-excluir" onclick="excluirMaterial(${index})">Excluir</button>
                <button class="btn-retirar" onclick="retirarMaterial(${index})">Retirar</button>
            </td>
        `;

        tbody.appendChild(row); // Adiciona a linha na tabela
    });
}
