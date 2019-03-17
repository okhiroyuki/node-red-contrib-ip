module.exports = function (RED) {
    "use strict";
    const internalIp = require('internal-ip');
    const publicIp = require('public-ip');

    function getInternalIPv4(){
        return new Promise((resolve, reject) => {
            internalIp.v4().then(ip => {
                resolve(['internalIPv4', ip]);
            }).catch(err =>{
                resolve(['internalIPv4', null]);
            });
        });
    }
    function getInternalIPv6(){
        return new Promise((resolve, reject) => {
            internalIp.v6().then(ip => {
                resolve(['internalIPv6', ip]);
            }).catch(err =>{
                resolve(['internalIPv6', null]);
            });
        });
    }
    function getPublicIPv4(){
        return new Promise((resolve, reject) => {
            publicIp.v4().then(ip => {
                resolve(['publicIPv4', ip]);
            }).catch(err =>{
                resolve(['publicIPv4', null]);
            });
        });
    }
    function getPublicIPv6(){
        return new Promise((resolve, reject) => {
            publicIp.v6().then(ip => {
                resolve(['publicIPv6', ip]);
            }).catch(err =>{
                resolve(['publicIPv6', null]);
            });
        });
    }

	function ip(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        node.name = n.name;
        node.https = n.https;
        node.timeout = n.timeout;
        node.internalIPv4 = n.internalIPv4;
        node.internalIPv6 = n.internalIPv6;
        node.publicIPv4 = n.publicIPv4;
        node.publicIPv6 = n.publicIPv6;
        var opt = {};
        var promises = [];

        if(node.https) opt.https = true;
        if(node.timeout !== 5000 && node.timeout >= 5000 && node.timeout <= 10000) opt.timeout = node.timeout;
        if(node.internalIPv4) promises.push(getInternalIPv4());
        if(node.internalIPv6) promises.push(getInternalIPv6());
        if(node.publicIPv4) promises.push((opt.length > 0) ? getPublicIPv4(opt) : getPublicIPv4());
        if(node.publicIPv6) promises.push((opt.length > 0) ? getPublicIPv6(opt) : getPublicIPv6());
        
        node.on("input", function(msg) {
            if(promises.length > 0){
                msg.payload = {};
                Promise.all(promises).then((results) => {
                    for(let i=0; i < results.length; i++){
                        let result= results[i];
                        if(result !== null && result !== undefined){  
                            msg.payload[result[0]] = result[1];
                        }
                    }
                    if(Object.keys(msg.payload).length > 0){
                        node.send(msg);
                    }
                });
            }
        });
    }
    RED.nodes.registerType("ip", ip);
}
