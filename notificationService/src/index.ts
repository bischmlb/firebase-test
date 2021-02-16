var azure = require('azure-sb');
var request = require('request');

const connectionstring = 'Endpoint=sb://anhns-dev.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=SIkapc+eZ91VXcNTgREd1ekJiJzSgSAVbVzwf2sNOBw=';
var notificationHubService = azure.createNotificationHubService('anhns-dev', connectionstring);
var installations: any = []
request('https://testd-912f0-default-rtdb.firebaseio.com/notifications/installations.json', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  for (var i in body){
    installations.push(body[i]);
  }
  console.log(installations);
});


notificationHubService.createRegistrationId((error:any, registrationId:string, response:any) => {
    registrationId = "4e628fe93da93b89";
    if(!error){
      console.log(response);


          notificationHubService.gcm.createOrUpdateNativeRegistration(registrationId, "<token>", "username:<user identifier>", function(error, response){
  
              if(!error){
                console.log('Inside : createOrUpdateNativeRegistration' + response);
                var payload = "";
  
                  notificationHubService.apns.send(null, payload, function(error){
                  if(!error){
                    // notification sent
  
                    console.log('Success: Inside the notification send call to Hub.');
  
                  }
                });
  
              }
              else{
                console.log('Error in registering the device with Hub' + error);
              }
  
          });
  
        }
        else{
          console.log('Error in generating the registration Id' + error);
        }
  
    });


class notificationMessage{
    validation: number
    message: string
    simpleMessage?: string
    detailedMessage: string
    icon: string
    receivers: string[]

    constructor(validation: number, message: string, detailedMessage: string,
        icon: string,receivers: string[], simpleMessage?:string) {

        this.validation = validation
        this.message = message;
        this.simpleMessage = simpleMessage
        this.detailedMessage = detailedMessage,
        this.icon = icon,
        this.receivers = receivers;
    }

    sendMessage() {
        
        var payload = {
            data: {
                validation: this.validation,
                message: this.message,
                simpleMessage: this.simpleMessage,
                detailedMessage: this.detailedMessage,
                icon: this.icon,
                receivers: this.receivers
            }
        };
        notificationHubService.gcm.send(null, payload, (error) => {
            if(!error){
                console.log("Messsage successfully sent");
            } else {
                console.log(error);
            }
        })
        //return payload;
        }
    }
