// react imports
import React, { useEffect } from "react";

// ethereum imports
import web3 from "./ethereum/web3";
import messageCreator from "./ethereum/messageCreator";

// aframe imports
import "aframe";
import {Entity} from "aframe-react";

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
  return (
    <a-scene>
      <a-sky color="#333333"></a-sky>
      <a-camera></a-camera>{" "}
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 10 }}
        position="0 0 -4"
        rotation="-90 0 0"
        material="color: blue"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="0 2.5 -9"
        rotation="0 0 0"
        material="color: yellow"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="5 2.5 -4"
        rotation="0 -90 0"
        material="color: green"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="-5 2.5 -4"
        rotation="0 90 0"
        material="color: purple"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 5 }}
        position="0 2.5 1"
        rotation="0 -180 0"
        material="color: red"
      ></Entity>
      <Entity
        geometry={{ primitive: "plane", width: 10, height: 10 }}
        position="0 5 -4"
        rotation="90 0 0"
        material="color: #7BC8A4"
      ></Entity>
    </a-scene>
  );
};

export default App;
