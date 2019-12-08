const should = require("should");
const helper = require("node-red-node-test-helper");
helper.init(require.resolve("node-red"));

const node = require("../ip.js");

describe("IP Node", () => {

  before(function(done) {
    helper.startServer(done);
  });

  after((done) => {
    helper.stopServer(done);
  });

  afterEach(() => {
    helper.unload();
  });

  it("should be loaded", (done) => {
    const flow = [{ id: "n1", type: "ip", name: "test" }];
    helper.load(node, flow, () => {
      const n1 = helper.getNode("n1");
      n1.should.have.property("name", "test");
      done();
    });
  });

  it("internalIPv4", function (done) {
    const flow = [
      { id: "n1", type: "ip", internalIPv4: true, internalIPv6: false, publicIPv4: false, publicIPv6: false, timeout: "5000", https: false, name: "test", wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(node, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");
      n2.on("input", (msg) => {
        msg.payload.should.have.keys("internalIPv4");
        done();
      });
      n1.receive({ });
    });
  });

  it("internalIPv6", function (done) {
    const flow = [
      { id: "n1", type: "ip", internalIPv4: false, internalIPv6: true, publicIPv4: false, publicIPv6: false, timeout: "5000", https: false, name: "test", wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(node, flow, () => {
      const n2 = helper.getNode("n2");
      const n1 = helper.getNode("n1");
      n2.on("input", (msg) => {
        msg.payload.should.have.keys("internalIPv6");
        done();
      });
      n1.receive({ });
    });
  });

  describe("publicIpv4", () => {
    it("onlyHttps: true", function (done) {
      const flow = [
        { id: "n1", type: "ip", internalIPv4: false, internalIPv6: false, publicIPv4: true, publicIPv6: false, timeout: "5000", https: true, name: "test", wires:[["n2"]] },
        { id: "n2", type: "helper" }
      ];
      helper.load(node, flow, () => {
        const n2 = helper.getNode("n2");
        const n1 = helper.getNode("n1");
        n2.on("input", (msg) => {
          msg.payload.should.have.keys("publicIPv4");
          done();
        });
        n1.receive({ });
      });
    });

    it("onlyHttps: false", function (done) {
      const flow = [
        { id: "n1", type: "ip", internalIPv4: false, internalIPv6: false, publicIPv4: true, publicIPv6: false, timeout: "5000", https: false, name: "test", wires:[["n2"]] },
        { id: "n2", type: "helper" }
      ];
      helper.load(node, flow, () => {
        const n2 = helper.getNode("n2");
        const n1 = helper.getNode("n1");
        n2.on("input", (msg) => {
          msg.payload.should.have.keys("publicIPv4");
          done();
        });
        n1.receive({ });
      });
    });

  });

  describe("publicIpv6", () => {
    it("onlyHttps : false", function (done) {
      this.timeout(60000);
      const flow = [
        { id: "n1", type: "ip", internalIPv4: false, internalIPv6: false, publicIPv4: false, publicIPv6: true, timeout: "5000", https: false, name: "test", wires:[["n2"]] },
        { id: "n2", type: "helper" }
      ];
      helper.load(node, flow, () => {
        const n2 = helper.getNode("n2");
        const n1 = helper.getNode("n1");
        n2.on("input", (msg) => {
          msg.payload.should.have.keys("publicIPv6");
          done();
        });
        n1.receive({ });
      });
    });  

    it("onlyHttps : true", function (done) {
      this.timeout(60000);
      const flow = [
        { id: "n1", type: "ip", internalIPv4: false, internalIPv6: false, publicIPv4: false, publicIPv6: true, timeout: "5000", https: true, name: "test", wires:[["n2"]] },
        { id: "n2", type: "helper" }
      ];
      helper.load(node, flow, () => {
        const n2 = helper.getNode("n2");
        const n1 = helper.getNode("n1");
        n2.on("input", (msg) => {
          msg.payload.should.have.keys("publicIPv6");
          done();
        });
        n1.receive({ });
      });
    });  
  });
});
