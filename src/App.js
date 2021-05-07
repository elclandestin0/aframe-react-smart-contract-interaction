// react imports
import React, { useEffect } from "react";

// ethereum imports
import web3 from "./ethereum/web3";

const App = () => {
  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
    };
    getAccount();
  }, []);
  return <div>hello</div>;
};

export default App;
