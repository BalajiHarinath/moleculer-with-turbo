import { ServiceBroker, ServiceEventHandler } from 'moleculer';
import ApiService from 'moleculer-web';
import sendGreetingEmailAction from './src/actions/sendGreetingEmail/index';
import handleUserCreatedEvent from './src/events/handleUserCreated';

const broker = new ServiceBroker({
    nodeID: 'email-service',
    transporter: 'nats://nats:4222',
});

broker.createService({
    name: 'email',
    mixins: [ApiService],
    settings: {
        port: 3001,
    },
    actions: {
        sendGreetingEmail: sendGreetingEmailAction
    },
    events:{
        'user.created': handleUserCreatedEvent as ServiceEventHandler,
    },
})

broker.start();