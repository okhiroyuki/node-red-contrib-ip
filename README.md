# node-red-contrib-ip

This simple node returns the internal or public IP address of the Node-red host.

## install

From your node-red directory:
```
$ npm install node-red-contrib-ip
```
or

in the Node-red, Manage palette, Install node-red-contrib-ip

## Usage

This simple node returns the internal or public IP address of the Node-red host. By default, for determining a public IP address, it queries the DNS records of OpenDNS.

Possible options:
    Internal:
    * 'IPv4'
    * 'IPv6'
    Public:
    * 'IPv4'
    * 'IPv6'
    * 'Https' - more secure but slower metod, which using the icanhazip.com service.
    * 'Timeout' - time in milliseconds until the request is considered to be exceeded.

Example of output message:
* 'internalIPv4' : 192.168.200.62
* 'internalIPv6' : fe80::64ef:a771:73e4:d1e1%11
* 'publicIPv4' : 216.58.216.164
* 'publicIPv6' : 2607:f8b0:400a:807::2004

## License

MIT License
