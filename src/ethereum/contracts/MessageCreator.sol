// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageCreator {
    Message[] private _messages;
    struct Message {
        string message;
        address owner;
    }

    function addPaper(string memory message_) public {
        _messages.push(Message(message_, msg.sender));
    }

    function messages() public view returns (Message[] memory) {
        return _messages;
    }
}