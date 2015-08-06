var serviceApp =  angular.module('starter.welcomeController', ['ionic', 'ngMockE2E']);



/***********************************************************************************
* Service : AuthService

***********************************************************************************/
serviceApp.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
 
    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

/***********************************************************************************
* Service : AuthInterceptor

***********************************************************************************/
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
/***********************************************************************************
* Service : statesService
* $timeout :  Serviço com metodos com temporizadores
* $http : Serviços para estabelecer acesso http.

***********************************************************************************/


serviceApp.service('statesService', function($http, $timeout) {

	datas = {};
	var status_id;
	var email;
	var senha;
	
	 // seta os dados do login e duas ariaveis privadas
	this.setDadosLogin = function(email1,senha1){ 
		email = email1;
		senha = senha1;
		console.log(email);
		console.log(senha);		
	};
	
	// Refresh chama esse metodo para gerar novamente o JSON e assim alimentar o app com dados atuais
	this.getRefresh = function(){ 
		$http({
			url: 'http://app.rjag.com.br/app-IOS/login-3.php', 
			method: "POST",
			params: {email:email, senha:senha}
		});
	};	
	
	// Metodo que alimenta a variaveis com o JSON gerado na hora do login ou Refresh
	this.setData = function(){ 
		console.log(" chamada ao JSON Login");
		$http.get('http://app.rjag.com.br/app-IOS/login.json')			
		 .success(function(data, status, headers, config) {
			 datas = data;
			 status_id = status;
		  })
		  .error(function(data, status, headers, config) {
			 datas = data;
			 status_id = status;
		  });
	};
	
	// Metodo que apaga o meto datas, pois assim nao armazena no cash e nao loga com login incorreto
	this.deletDatas = function() {
		datas = {};
	};
	
	// retorna o valor do objeto datas		  
	this.getData = function() {
		console.dir(datas);
		return datas;
		
	};
	
	//retorna o status de conexão, sendo 1: CONEXÃO ATIVA 2: CONEXÃO INATIVA 
	this.getStatus = function() { // status de conexao, > 0 ok < 0 sem internet
		return status_id;
		
	};
	
});

app.factory(("ionPlatform"), function( $q ){
    var ready = $q.defer();

    ionic.Platform.ready(function( device ){
        ready.resolve( device );
    });

    return {
        ready: ready.promise
    }
});


/***********************************************************************************
* Controller : AppCtrl

***********************************************************************************/

serviceApp.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

/***********************************************************************************
* Controller : WelcomeCtrl
* $ionicModal: Serviço para abilitar modal IONIC, exemplo : Login , Cadastro, Esqueci minha senha
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
* $ionicLoading : Serviço loading IONIC
* $ionicPopup : Serviço Popup IONIC (Alertas e Notificações)
* $http : Serviços para estabelecer acesso http.
* statesService : servico
***********************************************************************************/
serviceApp.controller('WelcomeCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, $http, statesService, AuthService, AUTH_EVENTS) {
	
	
//********************************************* LOGIN  ***********************************************// 
	
   $scope.data = {};
 
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('app.vouchers', { }, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Falha Login!',
        template: 'Please check your credentials!'
      });
    });
  };
  
   $scope.logout = function() {
    AuthService.logout();
    $state.go('welcome');
  };
 
  $scope.performValidRequest = function() {
    $http.get('http://localhost:8100/valid').then(
      function(result) {
        $scope.response = result;
      });
  };
 
  $scope.performUnauthorizedRequest = function() {
    $http.get('http://localhost:8100/notauthorized').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
 
  $scope.performInvalidRequest = function() {
    $http.get('http://localhost:8100/notauthenticated').then(
      function(result) {
        // No result here..
      }, function(err) {
        $scope.response = err;
      });
  };
  
/*	$scope.logout = function() {
		$scope.show();	
		$timeout(function() {
			statesService.deletDatas();
			$state.go('welcome');
		}, 3000);
	};*/
	
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
			console.log('Email ou Login incorretos');
		});
	};
   	
	//ALERTA LOGIN
	$scope.showAlertConnection = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Sem Conexão a Internet',
			template: 'Tente Novamente',
			delay : '4000',
			buttons: [
				{text: '<b>Ok</b>',
				type: 'button-energized'}]
		});
		alertPopup.then(function(res) {
			console.log('Sem Conexão a Internet');
		});
	};
	
	// Objeto criado para recuperação do login
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
	$scope.loginOpen = function() {
		$scope.modal.show();
	};

/*	$scope.doLogin = function() {
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
				statesService.setDadosLogin($scope.loginData.username,$scope.loginData.password);
			}else{
				if(statesService.getStatus() == 0){
					$scope.showAlertConnection();
				}else{
					$scope.showAlert();
				}
			}
		}, 5000);
	};*/
 
  
//********************************************* CADASTRO  ***********************************************// 
 	
	// Objeto criado para recuperação do cadastro
	$scope.cadastroData = {
		data: new Date()
	};
	
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
						$scope.cadastroData = {};
					},500);
					
				}else{
					
						$scope.showAlertEmailExistente();
					
				}
			}, 4000);

		}
	
	};
  
  
//********************************************* RECUPERAR SENHA  ***********************************************//

	
		
	// Objeto criado para recuperação de senhas
	$scope.senhaData = {}; 
	
	// Alerta de senha enviada 
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
	
	//Alerta de email incorreto, nao correspondendo aos dados do Banco de Dados
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

	// Criando modal que chamara a URL
	$ionicModal.fromTemplateUrl('templates/recuperarSenha.html', {
	scope: $scope
	}).then(function(modal2) {
		$scope.modal2 = modal2;
	});

  	// Close do Moodal 
	$scope.closeSenha = function() {
		$scope.modal2.hide();
	};

	// Open do Modal
	$scope.senhaRecupera = function() {
		$scope.modal2.show();
	};
	
 	
	// objeto para armazenamento dos dados capturados do json
 	esqueci = {};
	var status_esqueci;
	// Metodo criado para obter valores do jSon
	$scope.setEsqueci = function(){  
			$http.get('http://app.rjag.com.br/app-IOS/esqueci_response.json')
			.success(function(data, status, headers, config) {
				 esqueci = data;
				 status_esqueci = status;
			  })
			  .error(function(data, status, headers, config) {
				 esqueci = data;
				 status_esqueci = status;
			  });
	  };
	
	// metodo retorna o valor dos dados capturados  
	$scope.getEsqueci = function() {
		return esqueci;
	};
	
	$scope.getStatusEsqueci = function() { // status de conexao, > 0 ok < 0 sem internet
		return status_esqueci;
		
	};
	
	$scope.doSenha = function() {
		$scope.show();
		$http({
			url: 'http://app.rjag.com.br/app-IOS/esqueci.php', 
			method: "POST",
			params: {email:$scope.senhaData.email}
		});
		
		$timeout(function() { // Obter dados do Json existente: quando o email ja existe no banco
			$scope.setEsqueci();// realizado: quando o cadastro foi concluido com exito
		}, 3000);
	
		$timeout(function() {
			if($scope.getEsqueci() > ''){	
				$scope.closeSenha();
				$timeout(function() {
					$scope.showAlertSenhaEnviada();
					$scope.senhaData = {};
				},500);
				
			}else{
				if($scope.getStatusEsqueci() == 0){
					$scope.showAlertConnection();
				}else{
					$scope.showAlertEmail();
				}
			}
		}, 4000);
	}; // fechamento $scope.doSenha
  
});// fechando serviceApp.controller
