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

### Environment Variable

    $ export MONGODB_USERNAME=<username>
    $ export MONGODB_PASSWORD=<password>
    $ export SECRET_KEY=<secret>

### Package

    $ npm install

## Development

    $ npm run dev

## Test

    $ npm run test
