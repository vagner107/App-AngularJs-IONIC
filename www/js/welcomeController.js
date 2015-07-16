var serviceApp =  angular.module('starter.welcomeController', ['ionic']);

/*
* Service : statesService
* $timeout :  Serviço com metodos com temporizadores
* $http : Serviços para estabelecer acesso http.
*/
serviceApp.service('statesService', function($http, $timeout) {

	datas = {};
	this.setData = function(){ 
		
			$http.get('http://app.rjag.com.br/app-IOS/login.json')
			.then(function(res){
				datas = res.data;
			});
	  };
	this.getData = function() {
		return datas;
	};
});

/*
* Controller : WelcomeCtrl
* $ionicModal: Serviço para abilitar modal IONIC, exemplo : Login , Cadastro, Esqueci minha senha
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
* $ionicLoading : Serviço loading IONIC
* $ionicPopup : Serviço Popup IONIC (Alertas e Notificações)
* $http : Serviços para estabelecer acesso http.
*/
serviceApp.controller('WelcomeCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, $http, statesService) {

//********************************************* LOGIN  ***********************************************// 

	// LOADING TIMER 3000 Ms
	$scope.show = function() {
		$ionicLoading.show({
		template: 'Aguarde...',
		noBackdrop : false,
		hideOnStateChange : false,
		duration : '3000'
	
		});
	};
	// LOADING TIMER 2000 Ms
	$scope.show1 = function(timer) {
		$ionicLoading.show({
		template: 'Aguarde...',
		noBackdrop : false,
		hideOnStateChange : false,
		duration : timer
	
		});
	};
	// LOADING
	$scope.hide = function(){
		$ionicLoading.hide();
	};
	//ALERTA LOGIN
	$scope.showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Email ou Login incorretos',
			template: 'Tente Novamente',
			delay : '4000',
			buttons: [
				{text: '<b>Ok</b>',
				type: 'button-energized'}]
		});
		alertPopup.then(function(res) {
			console.log('Obrigado por acessar');
		});
	};
   
	$scope.loginData = {};
		
	// CRIAR MODAL
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	})
	.then(function(modal) {
		$scope.modal = modal;
	});
	
	// FHECHAR MODAL
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};
	
	// ABRIR MODAL
	$scope.login = function() {
		$scope.modal.show();
	};

	$scope.doLogin = function() {
		//FAZ SOLICITAÇÃO PASSANDO DADOS VIA POST, QUE SEJA GERADO UM JSON  
		$http({
		url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
		method: "POST",
		params: {email: $scope.loginData.username, senha:$scope.loginData.password}
		});

		//CAPTURADO DADOS DO JSON
		$scope.show1(5000);
		$timeout(function() {
			statesService.setData();
		}, 4000);
		
		$timeout(function() {
			if(statesService.getData() > ''){	
				
				$scope.closeLogin();
				$scope.show1(1000);
				$state.go('app.vouchers');
				
			}else{
				$scope.showAlert();
			}
		}, 5000);
	};

	$scope.logout = function() {
		$state.go('welcome');
	};
  
  
//********************************************* CADASTRO  ***********************************************// 
 
	$scope.cadastroData = {};
	
	cad = {};
	$scope.setCad = function(){ 
		
			$http.get('http://app.rjag.com.br/app-IOS/cadastro_status.json')
			.then(function(res){
				cad = res.data;
			});
	  };
	$scope.getCad = function() {
		return cad;
	};
	
	$scope.showAlertName = function() {
	   var alertPopup = $ionicPopup.alert({
		title: 'Informe seu nome Completo',
		template: 'Tente Novamente !',
		delay : '4000',
		buttons: [
		{text: '<b>Ok</b>',
		type: 'button-energized'}]
	   });
	 };
	 
	$scope.showAlertSenha = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Sua senha não é Segura',
		 template: 'Tente Novamente !',
		 delay : '4000',
		 buttons: [
		{text: '<b>Ok</b>',
		type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$scope.showAlertCadastroRealizado = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Cadastro Realizado com Êxito',
		 template: 'Lets Eat !!!!!',
		 delay : '4000',
		 buttons: [
		{text: '<b>Ok</b>',
		type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$scope.showAlertEmailExistente = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'E-mail Existente',
		 template: 'Utilize outro E-mail',
		 delay : '4000',
		 buttons: [
		{text: '<b>Ok</b>',
		type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$ionicModal.fromTemplateUrl('templates/cadastro.html', {
		scope: $scope
	}).then(function(modal1) {
		$scope.modal1 = modal1;
	});
	
	
	$scope.closeCadastro = function() {
	$scope.modal1.hide();
	};
	
	
	$scope.cadastro = function() {
	$scope.modal1.show();
	};

	
	$scope.doCadastro = function() {
		if ($scope.cadastroData.password.length < 6){ // Validação Senha
			$scope.show();	
			$timeout(function() {
				$scope.showAlertSenha();
			}, 3000);
		}else if($scope.cadastroData.nome.length < 13){ // Validação Nome
			$scope.show();	
			$timeout(function() {
				$scope.showAlertName();
			}, 3000);
		}else{ // Se tudo der certi, ira enviar os dados para o PHP enviando parametros
			$scope.show();
			$http({
				url: 'http://app.rjag.com.br/app-IOS/cadastro.php', 
				method: "POST",
				params: {nome:$scope.cadastroData.nome, data:$scope.cadastroData.data, email:$scope.cadastroData.email, senha:$scope.cadastroData.			                password					            }
			});
			
			
			$timeout(function() { // Obter dados do Json existente: quando o email ja existe no banco
				$scope.setCad();// realizado: quando o cadastro foi concluido com exito
			}, 3000);
		
			$timeout(function() {
				if($scope.getCad() > ''){	
					
					$scope.closeCadastro();
					$timeout(function() {
						$scope.showAlertCadastroRealizado();
					},500);
					
				}else{
					
						$scope.showAlertEmailExistente();
					
				}
			}, 4000);

		}
	
	};
  
//********************************************* RECUPERAR SENHA  ***********************************************//

	$scope.senhaData = {};
 
	$scope.showAlertSenhaEnviada = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Senha Enviada',
		 template: 'Aguarde o E-mail!',
		 delay : '4000',
		 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};
	
	$scope.showAlertEmail = function() {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Email Incorreto',
		 template: 'Tente Novamente',
		 delay : '4000',
	  	 buttons: [
      	{text: '<b>Ok</b>',
        type: 'button-energized'}]
	   });
	   alertPopup.then(function(res) {
		 console.log('Obrigado');
	   });
	};

  // Cria modal 
  $ionicModal.fromTemplateUrl('templates/recuperarSenha.html', {
    scope: $scope
  }).then(function(modal2) {
    $scope.modal2 = modal2;
  });

  // fechar modal 
  $scope.closeSenha = function() {
    $scope.modal2.hide();
  };

  // abrir modal
  $scope.senhaRecupera = function() {
    $scope.modal2.show();
  };

   $scope.doSenha = function() {
	if ($scope.senhaData.email.length >= 9){  
		$scope.closeSenha();
		$scope.show();
		$timeout(function() {
		  $scope.showAlertSenhaEnviada();
		}, 3000);
	
  }else{
	$scope.show();	
	$timeout(function() {
		$scope.showAlertEmail();
	}, 3000);
	
	}
  };
  

});

