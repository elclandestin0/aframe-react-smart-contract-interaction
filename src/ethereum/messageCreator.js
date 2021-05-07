import web3 from './web3';
import MessageCreator from './artifacts/contracts/MessageCreator.sol/MessageCreator.json';

// we need the contract address and abi to export our contract
// well.
const contractAddress = '0xEd593bBd5C8cBba51fA034Dbd5EE09875e2D6F79';
const abi = MessageCreator.abi;

const messageCreator = new web3.eth.Contract(abi, contractAddress);
export default messageCreator;