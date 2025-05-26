// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SocialRewards is ERC20 {
    address public owner;
    mapping(address => uint256) public lastPostTime;

    constructor() ERC20("Quest Token", "QUEST") {
        owner = msg.sender;
    }

    function createPost() external {
        require(block.timestamp > lastPostTime[msg.sender] + 1 minutes, "Cooldown");
        _mint(msg.sender, 10 * 10**18);
        lastPostTime[msg.sender] = block.timestamp;
    }

    function createLike(address postAuthor) external {
        _mint(postAuthor, 2 * 10**18);
    }
}