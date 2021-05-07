// HDWalletProvider to inject our seed phrase and the rinkeby infura node
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");

// dotenv
require('dotenv').config()

// file stream
const fs = require("fs");

// path to our landmark factory
const messageCreatorPath = path.resolve(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "MessageCreator.sol",
  "MessageCreator.json"
);

// compiled landmark factory
const compiledMessageCreator = fs.readFileSync(messageCreatorPath, "utf8");

// Set up a Truffle provider and include our mnemonic phrase
// along with the rinkeby infura node ..
const truffleProvider = new HDWalletProvider(
  process.env.SEED,
  "https://rinkeby.infura.io/v3/877a59f4a10342a5aff775080ec9fc06"
);

// .. and inject it into web3
const web3 = new Web3(truffleProvider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const MessageCreator = await new web3.eth.Contract(JSON.parse(compiledMessageCreator).abi)
    .deploy({ data: JSON.parse(compiledMessageCreator).bytecode })
    .send({ from: accounts[0], gas: "5555555" })
    .catch(err => console.log("error: ", err));
  console.log("contract deployed to: ", MessageCreator.options.address);
};
deploy();