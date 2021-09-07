const Busd = artifacts.require("Busd");

module.exports = function (deployer) {
  deployer.deploy(Busd);
};
