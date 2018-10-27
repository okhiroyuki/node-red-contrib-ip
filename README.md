# node-red-contrib-ip
This node provides the IP address (internal &amp; public) of the machine hosting the Node-red.

## install
From your node-red directory:
```
$ npm install node-red-contrib-ip
```
or

in the Node-red, Manage palette, Install node-red-contrib-ip

## Usage
This node provides the IP address of the machine hosting the Node-red.

The output message contains all IP addresses.

The output <b>msg.payload</b> contains for each address :
* `internal.v4` : the internal IPv4 address.
* `internal.v6` : the internal IPv6 address.
* `public.v4` : the public IPv4 address.
* `public.v6` : the public IPv6 address.

## License

MIT License
