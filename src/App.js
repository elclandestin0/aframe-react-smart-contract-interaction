// react imports
import React, { useEffect } from "react";

// ethereum imports
import web3 from "./ethereum/web3";
import messageCreator from "./ethereum/messageCreator";

const App = () => {
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
    };
    const getMessages = async () => {
      const messages = await messageCreator.methods.messages().call();
      console.log(messages);
    };
    getMessages();
    getAccount();
  }, []);
  return <div>hello</div>;
};

export default App;
