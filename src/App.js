// react imports
import React, { useEffect, useState } from "react";

// ethereum imports
import web3 from "./ethereum/web3";
import messageCreator from "./ethereum/messageCreator";

// aframe imports
import "aframe";
import { Entity } from "aframe-react";
require("aframe-super-keyboard");
require("aframe-ui-widgets");

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

  const sendMessage = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await messageCreator.methods.addPaper(message).send({
      from: accounts[0],
    });
  };

  return (
    <a-scene>
      {/* sky and camera */}
      <a-sky color="#333333"></a-sky>
      <a-camera>
        {/* Mouse cursor */}
        <Entity
          id="mouseCursor"
          cursor="rayOrigin: mouse"
          mouse-cursor
        ></Entity>{" "}
        <a-cursor
          id="mouseCursor"
          animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.2 0.2 0.2; to: 1 1 1"
          cursor="fuse: true; fuseTimeout: 1"
          material="color: #ffffff"
        ></a-cursor>
      </a-camera>
      {returnSquares}
      {/* Walls, floor and ceiling */}
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
      {/* Keyboard */}
      <Entity
        id="keyboard"
        super-keyboard={{ hand: "#mouseCursor" }}
        position="-1 1.3 -1"
        rotation="-30 0 0"
        scale="4 4 4"
        events={{
          superkeyboardchange: (e) => {
            setMessage(e.detail.value);
          },
        }}
      ></Entity>
      {/* Button assets */}
      <a-assets>
        <a-mixin
          id="beveled-square"
          geometry="primitive: cone; radiusTop: 0.15; radiusBottom: 0.19; height: 0.02; segmentsRadial: 4; segmentsHeight: 1"
          rotation="0 45 0"
        ></a-mixin>
        <a-mixin
          id="square"
          geometry="primitive: box; width: 0.18; height: 0.025; depth: 0.18;"
          position="0 0.02 0"
        ></a-mixin>
        <a-mixin id="blue" material="color: #1E2768;"></a-mixin>
        <a-mixin id="darkgreen" material="color: #22FF90;"></a-mixin>
        <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>
        <a-mixin id="offset" position="0 0.01 0"></a-mixin>
      </a-assets>
      {/* Button */}
      <Entity
        id="buttonStd"
        ui-button={{
          base: "beveled-square, blue",
          top: "square, darkgreen",
          pressed: "yellow, offset",
        }}
        position="-1 0.4 -0.2"
        rotation="30 0 0"
        scale="3 3 3"
        events={{
          pressed: () => {
            sendMessage();
          },
        }}
      >
        <Entity
          text={{ value: "SEND" }}
          rotation="-90 0 0"
          position="0.445 0.04 0"
        ></Entity>
      </Entity>
    </a-scene>
  );
};

export default App;
