var serviceApp =  angular.module('starter.welcomeController', ['ionic','ngKookies','ngCordova']);
/*,'ngCookies'*/

/***********************************************************************************
* Service : sessionService
* $timeout :  Serviço criar session
* $http : Serviços para estabelecer acesso http.
***********************************************************************************/

serviceApp.service('cookieAcces', function($kookies) {
	
		
		/*$cookieStore,$cookies,$cookieStore,$window, */
		this.set = function(name,value,days){
				
			/*var now = new Date(); */ 
			 // this will set the expiration to 12 months     exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());	
			
			/* $kookies.set(name, value);
 
			// 2. create expiring cookie 
			$kookies.set(name, value, {expires: 7});*/
		 
			// 3. Create expiring cookie, valid across entire site 
			$kookies.set(name, value, {expires: 7, path: '/App-IOS/www'});
			/*$cookieStore.put('fruit','Apple');	*/
			/*$cookies.name = value;
			platformCookie = $cookies.name;
			
			$cookieStore.put('flower','Rose');
		
			$cookieStore.put('someToken','blabla',{ 'expires': now });*/
			 
			/*var expires = "";
			if (days) {
				var date = new Date();
				date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
				expires = "{expires:" + date.toGMTString()+"}";
			}
			*/
			
			
			/*
			document.cookie = name + "=" + value + expires + "; path=/App-IOS/www";*/
			
			/*var expireDate = new Date();
			expireDate.setSeconds((expireDate.getSeconds()+day*24*60*60*1000))	;
			document.cookie = "Name=" + name + ";path=/;expires=" + expireDate.toGMTString();	*/	
			
	
                          
			
				
			/*$window.sessionStorage.token = value;*/
			/*$cookieStore.put('myFavorite',value);*/
			// Get cookie
			
			// Removing a cookie
			
  
			/*var favoriteCookie = $cookies.username;*/
			/*$cookies.username = value;
			document.cookie = "username="+value+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/App-IOS/www	";*/
		};
		this.remove = function(name){
			/*this.set(name, "", -1 );*/
			/*$cookieStore.remove('myFavorite');*/
			/*delete $window.sessionStorage.token;*/
			/*document.cookie = 'myFavorite=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';*/
			$kookies.remove(name); 
		};
		this.get = function(name){

			/*token= $cookieStore.get(name);*/

			if ($kookies.get(name) > ''){
				console.log('existente');
				return true;
			}else{
				console.log('nao existente');
				return false;
			}
		};
 
});


/***********************************************************************************
* Service : sessionService
* $timeout :  Serviço criar session
* $http : Serviços para estabelecer acesso http.
***********************************************************************************/

/*serviceApp.service('sessionService', function($http) {

		this.set = function(key,value){
			return sessionStorage.setItem(key,value);
		};
		this.get = function(key){
			return sessionStorage.getItem(key);
		};
		this.destroy = function(key){
			return sessionStorage.removeItem(key);
		};
		this.islogged = function(key){
			if(sessionStorage.getItem(key) > ''){ 
				return true;
			}else{
				return false;
			}
		};

});*/


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
* Controller : WelcomeCtrl
* $ionicModal: Serviço para abilitar modal IONIC, exemplo : Login , Cadastro, Esqueci minha senha
* $timeout :  Serviço com metodos com temporizadores
* $state : Serviço utilizado na app para direcionar para paginas
* $ionicLoading : Serviço loading IONIC
* $ionicPopup : Serviço Popup IONIC (Alertas e Notificações)
* $http : Serviços para estabelecer acesso http.
***********************************************************************************/
serviceApp.controller('WelcomeCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, $http, statesService, cookieAcces, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform) {
	 $scope.notifications = [];

    // call to register automatically upon device ready
    ionPlatform.ready.then(function (device) {
        $scope.register();
    });


    // Register
    $scope.register = function () {
        var config = null;

        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "YOUR_GCM_PROJECT_ID" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
            };
        }
        else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            }
        }

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);

            $cordovaToast.showShortCenter('Registered for push notifications');
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
            if (ionic.Platform.isIOS()) {
                $scope.regId = result;
                storeDeviceToken("ios");
            }
        }, function (err) {
            console.log("Register error " + err)
        });
    }

    // Notification Received
    $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
        console.log(JSON.stringify([notification]));
        if (ionic.Platform.isAndroid()) {
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.alert));
            })
        }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
        //             via the console fields as shown.
        console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
        if (notification.event == "registered") {
            $scope.regId = notification.regid;
            storeDeviceToken("android");
        }
        else if (notification.event == "message") {
            $cordovaDialogs.alert(notification.message, "Push Notification Received");
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.message));
            })
        }
        else if (notification.event == "error")
            $cordovaDialogs.alert(notification.msg, "Push notification error event");
        else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
    }

    // IOS Notification Received Handler
    function handleIOS(notification) {
        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
        // the notification when this code runs (weird).
        if (notification.foreground == "1") {
            // Play custom audio if a sound specified.
            if (notification.sound) {
                var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
            }

            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

            if (notification.badge) {
                $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                    console.log("Set badge success " + result)
                }, function (err) {
                    console.log("Set badge error " + err)
                });
            }
        }
        // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
        // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
        // the data in this situation.
        else {
            if (notification.body && notification.messageFrom) {
                $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
            }
            else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
        }
    }

    // Stores the device token in a db using node-pushserver (running locally in this case)
    //
    // type:  Platform type (ios, android etc)
    function storeDeviceToken(type) {
        // Create a random userid to store with it
        var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $scope.regId };
        console.log("Post token for registered device with data " + JSON.stringify(user));

        $http.post('http://192.168.1.16:8000/subscribe', JSON.stringify(user))
            .success(function (data, status) {
                console.log("Token stored, device is successfully subscribed to receive push notifications.");
            })
            .error(function (data, status) {
                console.log("Error storing device token." + data + " " + status)
            }
        );
    }

    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    function removeDeviceToken() {
        var tkn = {"token": $scope.regId};
        $http.post('http://192.168.1.16:8000/unsubscribe', JSON.stringify(tkn))
            .success(function (data, status) {
                console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
            })
            .error(function (data, status) {
                console.log("Error removing device token." + data + " " + status)
            }
        );
    }

    // Unregister - Unregister your device token from APNS or GCM
    // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
    //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
    //
    // ** Instead, just remove the device token from your db and stop sending notifications **
    $scope.unregister = function () {
        console.log("Unregister called");
        removeDeviceToken();
        $scope.registerDisabled=false;
        //need to define options here, not sure what that needs to be but this is not recommended anyway
//        $cordovaPush.unregister(options).then(function(result) {
//            console.log("Unregister success " + result);//
//        }, function(err) {
//            console.log("Unregister error " + err)
//        });
    }
//********************************************* LOGIN  ***********************************************// 


	console.log("cookieAcces:"+cookieAcces.get('username'));
	console.dir("cookieAcces:"+cookieAcces.get('username'));
	
	$scope.logout = function() {
		$scope.show();	
		cookieAcces.remove('username');
		cookieAcces.get('username');
		$timeout(function() {
			statesService.deletDatas();
			$state.go('welcome');
		}, 3000);
	};
	
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
				cookieAcces.set('username',$scope.loginData.username,10);
				cookieAcces.get('username');
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
	};
 
  
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
