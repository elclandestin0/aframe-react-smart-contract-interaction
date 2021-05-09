// react imports
import React, { useEffect, useState } from "react";

// ethereum imports
import web3 from "./ethereum/web3";
import messageCreator from "./ethereum/messageCreator";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";
require("aframe-super-keyboard");

const App = () => {
  // messages state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
    };
    const getMessages = async () => {
      const messages = await messageCreator.methods.messages().call();
      setMessages(messages);
    };
    getAccount();
    getMessages();
  }, []);

  const returnSquares = messages.map((element, index) => {
    let position = `1, 2, ${index * -2}`;
    let positionMessage = `-1, 2.75, ${index * -2}`;
    let positionOwner = `-1, 1, ${index * -2}`;
    return (
      <Entity>
        <Entity geometry={{ primitive: "box" }} position={position}></Entity>{" "}
        <Entity
          position={positionMessage}
          text={{ value: element.message }}
          scale="5 5 5"
          rotation="0 180 0"
          align="center"
        ></Entity>
        <Entity
          position={positionOwner}
          text={{ value: element.owner }}
          scale="5 5 5"
          rotation="0 180 0"
          align="center"
        ></Entity>
      </Entity>
    );
  });

  return (
    <a-scene>
      <a-sky color="#333333"></a-sky>
      <a-camera></a-camera>
      {returnSquares}
      {/* Mouse cursor */}
      <Entity id="mouseCursor" cursor="rayOrigin: mouse" mouse-cursor></Entity>{" "}
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
      <Entity
        id="keyboard"
        super-keyboard={{ hand: "#mouseCursor" }}
        position="-1 1.3 -1"
        rotation="-30 0 0"
        scale="4 4 4"
        events={{
          superkeyboardchange: (e) => {
            console.log(e.detail.value);
            setMessage(e.detail.value);
          },
        }}
      ></Entity>
    </a-scene>
  );
};

export default App;
