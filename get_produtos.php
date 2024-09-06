<?php
header('Content-Type: application/json');
$host = "localhost";
$db   = "tabela";
$user = "root";
$pass = "";

// conecta banco de dados
$con = new mysqli($host, $user, $pass, $db);

if ($con->connect_error) {
    die(json_encode(['error' => 'Falha na conexão: ' . $con->connect_error]));
}

// seleciona e puxa lista
$query = "SELECT id, nome, preco FROM novos";

$result = $con->query($query);
// verifica
if ($result) {
    $produtos = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($produtos); // Retorna os dados no formato JSON
} else {
    echo json_encode(['error' => 'Erro na consulta: ' . $con->error]);
}
// retornar e fechar
$result->free();
$con->close();
?>

