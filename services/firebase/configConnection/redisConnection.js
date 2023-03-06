const Redis = require('ioredis');
const fs = require('fs');

const redis = new Redis({
    host: 'redis-14029.c289.us-west-1-2.ec2.cloud.redislabs.com',
    port: 14029,
    password: 'rF3byetTQVSKCtkDGpJSmY71moHBqqnj'
});

module.exports = redis