

'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const unirest = require('unirest');


exports.register = (plugin, options, next) => {

    let config = {
        slash_token: 'wZjT5fyOXfeKCuMH05vm2Y3Z'
    };

    let Slack = require('./slack')

    plugin.expose(Slack);

    plugin.route({
        method: 'GET',
        config: {
            tags: ['api'],
            description: 'Get all Bookings',
            notes: 'Get all Bookings'
        },
        path: '/api/slack',
        handler: (request, reply) => {
            console.log(request.query);
            if (request.query.token === config.slash_token) {
                const slacked = Slack.process(request.query);
                reply(slacked);
            } else {
                reply('Incorrect slash token')
            }
        }
    })

    next();
};


exports.register.attributes = {
    name: 'routes-slack'
};
