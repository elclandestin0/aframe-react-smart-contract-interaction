import Web3 from "web3";

let web3;
// if metamask is available in our browser ..
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // .. then enable it and add it to our web3 provider ..
  const provider = window.ethereum;
  provider.enable();
  web3 = new Web3(provider);
} else {
  // .. otherwise, use Infura Rinkeby Testnet provider
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/877a59f4a10342a5aff775080ec9fc06"
  );
  web3 = new Web3(provider);
}

// export metamask or metamask provider
export default web3;