import {Channel, Connection, Message} from 'amqplib/callback_api';
import {TemplateService} from '../core/service/TemplateService';
import {Template} from '../core/domain/Template';

const amqp = require('amqplib/callback_api');
const AMQP_URL = process.env.AMQP_URL || 'amqp://guest:guest@localhost:5672';

amqp.connect(AMQP_URL, (err: Error, connection: Connection) => {
    if (err) {
        throw err;
    }
    console.log('amqp connected');
    connection.createChannel((error, channel: Channel) => {
        if (error) {
            throw error;
        }
        const queue = 'templates';
        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, async (msg) => {
            const template: Template = JSON.parse((<Message>msg).content.toString());
            await TemplateService.saveTemplateIfNew(template);
            channel.ack(<Message>msg);
        });
    });
});
