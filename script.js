document.addEventListener('DOMContentLoaded', function() {
    const tabelaProdutos = document.getElementById('tabela-produtos').getElementsByTagName('tbody')[0];
    const filtro = document.getElementById('filtro');
    const resultado = document.getElementById('resultado');
    let produtos = []; 
    //  Fetch API no JS por eu achar mais fácil, porém mandei um exemplo de Fetch no HTML também conforme pedido
    function carregarProdutos() {
        fetch('get_produtos.php') // puxa do server
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede ao buscar produtos.');
                }
                return response.json(); // retorna 
            })
            .then(data => {
                produtos = data; // atribui
                exibirProdutos(produtos); // exibe 

                // filtro enquanto digita conforme pedido
                filtro.addEventListener('input', function() {
                    const termoFiltro = filtro.value.toLowerCase(); 
                    const produtosFiltrados = produtos.filter(produto =>
                        produto.nome.toLowerCase().includes(termoFiltro) 
                    );
                    exibirProdutos(produtosFiltrados); // exibir filtrados
                });
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                resultado.innerHTML = '<p>Não foi possível carregar produtos. Tente novamente mais tarde.</p>';
            });
    }
    function exibirProdutos(produtos) {
        tabelaProdutos.innerHTML = ''; 

        if (produtos.length === 0) { 
            tabelaProdutos.innerHTML = '<tr><td colspan="3">Nenhum produto encontrado.</td></tr>';
            return;
        }

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id || 'N/A'}</td>
                <td>${produto.nome || 'N/A'}</td>
                <td>R$ ${parseFloat(produto.preco || 0).toFixed(2)}</td>
            `;
            tabelaProdutos.appendChild(linha); // Adiciona cada linha de produto na tabela
        });
    }
    carregarProdutos(); // Chama a função para carregar produtos ao carregar a página
});
