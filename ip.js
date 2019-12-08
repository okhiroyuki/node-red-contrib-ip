module.exports = function (RED) {
    "use strict";
    const internalIp = require('internal-ip');
    const publicIp = require('public-ip');

	function ip(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.name = n.name;
        node.opt = {};
        node.requests = [];

        if(n.https) node.opt.onlyHttps = true;
        if((parseInt(n.timeout)) !== 5000 && (parseInt(n.timeout)) >= 5000 && (parseInt(n.timeout)) <= 10000){
            node.opt.timeout = parseInt(n.timeout);
        }

        function getIP(name, request, args){
            return async () => {
                try{
                    let ip = await request(args);
                    return [name, ip];
                }catch(e){
                    return [name, null];
                }
            };
        }

        if(n.internalIPv4) node.requests.push(getIP('internalIPv4', internalIp.v4));
        if(n.internalIPv6) node.requests.push(getIP('internalIPv6', internalIp.v6));
        if(n.publicIPv4) node.requests.push(getIP('publicIPv4', publicIp.v4, node.opt));
        if(n.publicIPv6) node.requests.push(getIP('publicIPv6', publicIp.v6, node.opt));

        node.on("input", function(msg) {
            msg.payload = {};
            (async () =>{
                let requests = node.requests;
                let promises = [];
                for (let i = 0; i < requests.length; i++) {
                    promises.push(requests[i]());
                }
                let results = await Promise.all(promises);

                for(let i = 0; i < results.length; i++){
                    let result = results[i];
                    if(result !== null && result !== undefined){
                        msg.payload[result[0]] = result[1];
                    }
                }
                if(Object.keys(msg.payload).length > 0){
                    node.send(msg);
                }
            })();
        });
    }
    RED.nodes.registerType("ip", ip);
};
