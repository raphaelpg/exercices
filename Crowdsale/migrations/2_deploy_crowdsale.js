const Crowdsale = artifacts.require("Crowdsale");

module.exports = function(deployer) {
  deployer.deploy(Crowdsale, "0xCD3F68265720450519c4A62289a4eC2141FcA26D", 10);
};
