module.exports = function (RED) {
    "use strict";
    const internalIp = require('internal-ip');
    const publicIp = require('public-ip');

	function ip(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        var node = this;
        node.on("input", function(msg) {
            msg.payload = {};
            Promise.all([getInternalIpV4(), getInternalIpV6(),getPublicIpV4(),getPublicIpV6()]).then((values) => {
                for(let i in values){
                    if(i == 0 && values[i] !== undefined){
                        if(!msg.payload.internal){
                            msg.payload.internal = {};
                        }
                        msg.payload.internal.v4 = values[i];
                    }else if(i == 1 && values[i] !== undefined){
                        if(!msg.payload.internal){
                            msg.payload.internal = {};
                        }
                        msg.payload.internal.v6 = values[i];
                    }else if(i == 2 && values[i] !== undefined){
                        if(!msg.payload.public){
                            msg.payload.public = {};
                        }
                        msg.payload.public.v4 = values[i];
                    }else if(i == 3 && values[i] !== undefined){
                        if(!msg.payload.public){
                            msg.payload.public = {};
                        }
                        msg.payload.public.v6 = values[i];
                    }
                }
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("ip", ip);

    function getInternalIpV4(){
        return new Promise((resolve, reject) => {
            internalIp.v4().then(ip => {
                resolve(ip);
            }).catch(err =>{
                resolve(undefined);
            });
        });
    }

    function getInternalIpV6(){
        return new Promise((resolve, reject) => {
            internalIp.v6().then(ip => {
                resolve(ip);
            }).catch(err =>{
                resolve(undefined);
            });
        });
    }

    function getPublicIpV4(){
        return new Promise((resolve, reject) => {
            publicIp.v4().then(ip => {
                resolve(ip);
            }).catch(err =>{
                resolve(undefined);
            });
        });
    }

    function getPublicIpV6(){
        return new Promise((resolve, reject) => {
            publicIp.v6().then(ip => {
                resolve(ip);
            }).catch(err =>{
                resolve(undefined);
            });
        });
    }
};
