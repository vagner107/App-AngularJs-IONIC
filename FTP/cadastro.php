<?php
include('connection.php');

$nome = $_GET['nome'];
$data = $_GET['data'];
$email = $_GET['email'];
$senha = $_GET['senha'];
$data = implode("-",array_reverse(explode("/",$data)));

/*Verificar se já existe email cadastrado*/
$sql1 = "SELECT email FROM cliente
		WHERE email = '$email' ";
$sql1 = @mysql_query($sql1);
$row = mysql_fetch_array($sql1);
$j = $row['email'];
$response = array();
if($j == ''){ 

	 $sql = "INSERT INTO cliente SET 
				data_aniversario = '$data',
				nome = '$nome',
				email = '$email',
				senha = '$senha'";
				
	$sql = @mysql_query($sql);
	$response = array();
	$json['cadastro'] = 'realizado';
	array_push($response, $json);  
}

/* Criando o arquivo cadastro_status.json para o APP alimentar*/
$fp = fopen('cadastro_status.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);
?>