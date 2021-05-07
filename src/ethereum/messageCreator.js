import web3 from './web3';
import MessageCreator from './artifacts/contracts/MessageCreator.sol/MessageCreator.json';

// we need the contract address and abi to export our contract
// well.
const contractAddress = '';
const abi = MessageCreator.abi;

const messageCreator = new web3.eth.Contract(abi, contractAddress);
export default messageCreator;