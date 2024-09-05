// Função para buscar produtos do servidor usando Fetch API
function buscarProdutos() {
    fetch('get_produtos.php') // Faz a requisição ao arquivo PHP
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            const tbody = document.getElementById('produtos-lista'); // Seleciona o corpo da tabela
            tbody.innerHTML = ''; // Limpa o conteúdo da tabela

            // Verifica se há dados retornados
            if (data && data.length > 0) {
                // Percorre cada produto recebido e adiciona uma nova linha na tabela
                data.forEach(produto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${novos.id}</td>
                        <td>${novos.nome}</td>
                        <td>R$ ${parseFloat(novos.preço).toFixed(2).replace('.', ',')}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error('Nenhum produto encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar produtos:', error)); // Tratamento de erros
}

// Função para filtrar produtos na tabela
function filtrarProdutos() {
    const input = document.getElementById('search'); // Seleciona o campo de pesquisa
    const filter = input.value.toUpperCase(); // Converte o texto de pesquisa para maiúsculas
    const table = document.getElementById('produtos-lista'); // Seleciona o corpo da tabela
    const tr = table.getElementsByTagName('tr'); // Obtém todas as linhas da tabela

    // Percorre todas as linhas e verifica se há correspondência com o filtro
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[1]; // Seleciona a célula da coluna "Nome"
        if (td) {
            const txtValue = td.textContent || td.innerText; // Obtém o texto da célula
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none'; // Mostra ou esconde a linha
        }
    }
}

// Chama a função para buscar produtos quando a página carrega
window.onload = buscarProdutos;