import { ServiceBroker } from 'moleculer';
import ApiService from 'moleculer-web';
import addUserAction from './src/actions/addUser/index';
import userCreatedEvent from './src/events/userCreated';

const broker = new ServiceBroker({
    nodeID: 'user-service',
    transporter: 'nats://nats:4222',
});

broker.createService({
    name: 'user',
    mixins: [ApiService],
    settings: {
        port: 3000,
    },
    actions: {
        addUser: addUserAction,
    },
    events: {
        'user.created': userCreatedEvent,
    }
});

broker.start();