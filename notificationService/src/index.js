var azure = require('azure-sb');
var connectionstring = 'Endpoint=sb://anhns-dev.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=SIkapc+eZ91VXcNTgREd1ekJiJzSgSAVbVzwf2sNOBw=';
var notificationHubService = azure.createNotificationHubService('anhns-dev', connectionstring);
var notificationMessage = /** @class */ (function () {
    function notificationMessage(validation, message, detailedMessage, icon, receivers, simpleMessage) {
        this.validation = validation;
        this.message = message;
        this.simpleMessage = simpleMessage;
        this.detailedMessage = detailedMessage,
            this.icon = icon,
            this.receivers = receivers;
    }
    notificationMessage.prototype.sendMessage = function () {
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
        notificationHubService.gcm.send(null, payload, function (error) {
            if (!error) {
                console.log("Messsage successfully sent");
            }
            else {
                console.log(error);
            }
        });
        //return payload;
    };
    return notificationMessage;
}());
var message = new notificationMessage(Date.now(), "Hello World", "Hello ..", '../../icon.png', ['android', 'ios', 'web']);
console.log(message);
console.log(message.sendMessage());
