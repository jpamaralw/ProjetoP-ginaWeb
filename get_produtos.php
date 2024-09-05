<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root"; // Ajuste o nome de usuário conforme necessário
$password = ""; // Ajuste a senha conforme necessário
$dbname = "tabela"; // Nome do banco de dados

// Cria uma conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Consulta SQL para buscar produtos
$sql = "SELECT id, nome, preco FROM novos"; // 'novos' é o nome da tabela
$result = $conn->query($sql);

// Cria um array para armazenar os produtos
$produtos = array();

// Se houver resultados, armazena no array
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
} else {
    echo "Nenhum produto encontrado.";
}

// Retorna os dados em formato JSON
echo json_encode($produtos);

// Fecha a conexão com o banco de dados
$conn->close();
?>
