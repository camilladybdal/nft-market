require("@nomiclabs/hardhat-waffle");

// Use dotenv to load the .env-variables into process.env
require("dotenv").config({ path: ".env.local" });

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/24caf6b3f6054fd29632f1a92bf97d24",
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    mainnet: {
      url: "https://polygon-mainnet.infura.io/v3/24caf6b3f6054fd29632f1a92bf97d24",
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.4",
  },
};
