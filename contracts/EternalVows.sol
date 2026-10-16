
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EternalVows {
    struct Vow {
        string partner1;
        string partner2;
        string message;
        uint256 timestamp;
        address creator;
    }

    Vow[] public vows;

    event VowRecorded(uint256 indexed vowId, string partner1, string partner2, address indexed creator);

    function recordVow(string memory _partner1, string memory _partner2, string memory _message) public returns (uint256) {
        vows.push(Vow({
            partner1: _partner1,
            partner2: _partner2,
            message: _message,
            timestamp: block.timestamp,
            creator: msg.sender
        }));

        uint256 newId = vows.length - 1;
        emit VowRecorded(newId, _partner1, _partner2, msg.sender);
        return newId;
    }

    function getTotalVows() public view returns (uint256) {
        return vows.length;
    }

    function getVow(uint256 _id) public view returns (string memory, string memory, string memory, uint256, address) {
        require(_id < vows.length, "Vow does not exist");
        Vow memory v = vows[_id];
        return (v.partner1, v.partner2, v.message, v.timestamp, v.creator);
    }
}

