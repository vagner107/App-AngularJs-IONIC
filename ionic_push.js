var ionicPushServer = require('ionic-push-server');

var credentials = {
    IonicApplicationID : "ad0347df", //ionic_app_id
    IonicApplicationAPIsecret : "50d8b6c6e99c3cf6d21c54cd3767c3d61d3317d97ae343b1"//ionic_app_private_key
};

var notification = {
  "tokens":["DEV-b247e31f-9b4d-481d-bfb7-abb0486f2887"],
  "notification":{
    "alert":"Hi from Ionic Push Service!",
    "ios":{
      "badge":1,
      "sound":"chime.aiff",
      "expiry": 1423238641,
      "priority": 10,
      "contentAvailable": true,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    }
  } 
};

ionicPushServer(credentials, notification);