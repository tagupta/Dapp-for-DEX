const Vechain = artifacts.require("Vechain");

module.exports = function (deployer) {
  deployer.deploy(Vechain);
};
