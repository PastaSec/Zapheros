const ZapherosToken = artifacts.require("ZapherosToken");

module.exports = function (deployer) {
  deployer.deploy(ZapherosToken, "1000000000"); // Pass the initial supply
};

