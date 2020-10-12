# TypeScript Rest API

## Setup

### HTTPS

    $ openssl
    OpenSSL> req -newkey rsa:2048 -nodes -keyout keytemp.pem -x509 -days 365 -out cert.pem
    OpenSSL> rsa -in keytemp.pem -out key.pem
    OpenSSL> exit

    $ mkdir config
    $ mv cert.pem key.pem config/

### Secret Key

    $ node -e "console.log(require('crypto').randomBytes(20).toString('hex'))"
    <secret>

### MongoDB Account

    $ mongo
    > use CRMdb
    > db.createUser(
    ... {
    ...   user: <username>,
    ...   pwd: <password>,
    ...   roles: [ { role: 'readWrite', db: 'CRMdb'} ]
    ... }
    ... )

- enable MongoDB access control

### RabbitMQ Account

- add user in [admin page](http://localhost:15672/#/users)
- set permission to access virtual hosts

### Environment Variable

    $ export SECRET_KEY=<secret>
    $ export MONGODB_USERNAME=<mongodb_username>
    $ export MONGODB_PASSWORD=<mongodb_password>
    $ export RABBITMQ_USERNAME=<rabbitmq_username>
    $ export RABBITMQ_PASSWORD=<rabbitmq_password>

### Package

    $ npm install

## Development

    $ npm run dev
    $ ts-node ./lib/receiver.ts

## Test

    $ npm run test
