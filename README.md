# node-red-contrib-ip

![npm](https://img.shields.io/npm/v/node-red-contrib-ip.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/7031e8a1b0784a81a8d79e19818549f3)](https://app.codacy.com/app/okhiroyuki/node-red-contrib-ip?utm_source=github.com&utm_medium=referral&utm_content=okhiroyuki/node-red-contrib-ip&utm_campaign=Badge_Grade_Dashboard) [![Build Status](https://travis-ci.org/okhiroyuki/node-red-contrib-ip.svg?branch=master)](https://travis-ci.org/okhiroyuki/node-red-contrib-ip) [![Coverage Status](https://coveralls.io/repos/github/okhiroyuki/node-red-contrib-ip/badge.svg?branch=develop)](https://coveralls.io/github/okhiroyuki/node-red-contrib-ip?branch=develop)

This simple node returns the internal or public IP address of the Node-red host.

## install

From your node-red directory:

    $ npm install node-red-contrib-ip

or

in the Node-red, Manage palette, Install node-red-contrib-ip

## Usage

Possible options:

Internal:

-   'IPv4'
-   'IPv6'

Public:

-   'IPv4'
-   'IPv6'
-   'Https' - more secure but slower metod, which using the icanhazip.com service.
-   'Timeout' - time in milliseconds until the request is considered to be exceeded.

Any positive msg. sent to the node input will generate msg.payload on the output. The msg.payload will contain only ip addresses set in the node configuration.

Example of output message (msg.payload):

-   'internalIPv4' : 192.168.200.62
-   'internalIPv6' : fe80::64ef:a771:73e4:d1e1%11
-   'publicIPv4' : 216.58.216.164
-   'publicIPv6' : 2607:f8b0:400a:807::2004

## License

MIT License
