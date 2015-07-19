<?php
include('connection.php');

$email = $_GET['email'];

$result = mysql_query("SELECT * FROM cliente WHERE email='$email'");

$num_rows = mysql_num_rows($result);	
//se tiver  + de 1 cadastrado
if($num_rows >= 1){
	//faz um while para vc coloar os dados nas variavels
	$row_email = mysql_fetch_array($result);
	$rowemail = $row_email['email'];
	$rowsenha = $row_email['senha'];
	//enviar um email para variavel email juntamente com a variável senha;
	$mensage = '<img src="http://app.rjag.com.br/app-IOS/logo3.png" width="90px" height="100px" /><br /><p><p>';
	$mensage .='<p>Você solicitou a recuperação de senha, confira seus dados abaixo:<p><br>';
	$mensage .=' E-mail: '.$rowemail.'<p>';
	$mensage .=' Senha: '.$rowsenha.'<p>';
	
	$headers='MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html;charset=iso-8859-1' . "\r\n";
	$headers .= 'From: Lets Eat <recuperacao@letseat.com>' . "\r\n";

	$mail = mail($rowemail, "Lets Eat, Recuperação de Senha", $mensage, $headers);
	
	if(!$mail) { 
		echo "Problemas ao enviar email"; 
	} else {
		echo "E-mail enviado sucesso.";
	}

	/*$mail = mail($to, $subject, $body, $headers);*/

	$response = array();
	$json['cadastro'] = '1';
	array_push($response, $json);
}
/* Criando o arquivo cadastro_status.json para o APP alimentar*/
$fp = fopen('esqueci_response.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);
?>