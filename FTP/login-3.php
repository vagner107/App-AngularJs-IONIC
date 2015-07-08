<?php
include('connection.php');

$email = $_GET['email'];;
$senha = $_GET['senha'];

$sql1 = "SELECT
			cliente.cod_cliente,
			nome,
			email,
			voucher.data_validade_voucher,
			produto,
			voucher_usado
			FROM cliente
			INNER JOIN voucher
			ON voucher.cod_cliente = cliente.cod_cliente
			INNER JOIN produto
			ON voucher.cod_produto = produto.cod_produto
			WHERE 
			cliente.email = '$email'
			AND cliente.senha = '$senha'";

$sql1 = @mysql_query($sql1);
$response = array();

 while ($row = mysql_fetch_array($sql1)) {
     $json["cod_cliente"] = $row[0];
     $json["nome"] = $row[1];
	 $json["email"] = $row[2];
	 $json["data_validade_voucher"] = $row[3];
	 $json["produto"] = $row[4];
	 $json["voucher_usado"] = $row[5];
     array_push($response, $json);  
}

$string = "minha string";
$fp = fopen('login.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);
?>