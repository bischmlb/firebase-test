var azure = require('azure-sb');
const connectionstring = 'Endpoint=sb://anhns-dev.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=SIkapc+eZ91VXcNTgREd1ekJiJzSgSAVbVzwf2sNOBw=';
var notificationHubService = azure.createNotificationHubService('anhns-dev', connectionstring);



interface notificationMessageType {
    validation: number,
    message: string,
    detailedMessage: string,
    icon: string,
    simpleMessage?: string,
}

class notificationMessage implements notificationMessageType{
    validation: number
    message: string
    simpleMessage: string
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



var message = new notificationMessage(Date.now(),"Hello World", "Hello ..", '../../icon.png', ['android', 'ios', 'web']);
console.log(message);
console.log(message.sendMessage());