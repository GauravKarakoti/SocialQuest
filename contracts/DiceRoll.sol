// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./lib/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DiceRoll is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    IERC20 public questToken;
    address public treasury;
    uint256 public constant HOUSE_EDGE_BPS = 1000;
    
    struct Bet {
        address player;
        uint256 amount;
    }

    mapping(bytes32 => address) public rollToPlayer;
    mapping(bytes32 => Bet) public bets;
    
    event DiceResult(
        bytes32 indexed requestId,
        address indexed player,
        uint256 result,
        uint256 payout
    );

    constructor(
        address _questToken,
        address _treasury,
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash
    ) 
        VRFConsumerBase(_vrfCoordinator, _linkToken) {
        questToken = IERC20(_questToken);
        treasury = _treasury;
        keyHash = _keyHash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function rollDice(uint256 betAmount) external returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Need LINK");
        require(betAmount > 0, "Minimum bet required");
        require(
            questToken.transferFrom(msg.sender, address(this), betAmount),
            "Bet transfer failed"
        );
        requestId = requestRandomness(keyHash, fee);
        rollToPlayer[requestId] = msg.sender;
        bets[requestId] = Bet(msg.sender, betAmount);
        // Deduct betAmount from user
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 result = randomness % 6 + 1;
        uint256 payout = 0;
        // Payout logic
        Bet memory bet = bets[requestId];
        require(bet.player != address(0), "Invalid bet");
        if (result > 3) {
            // Calculate payout: 1.8x (after 10% fee)
            uint256 rawPayout = bet.amount * 18 / 10;
            uint256 feeAmount = (rawPayout * HOUSE_EDGE_BPS) / 10000;
            payout = rawPayout - feeAmount;
            
            // Send winnings to player
            questToken.transfer(bet.player, payout);
            
            // Send fee to treasury
            questToken.transfer(treasury, feeAmount);
        } else {
            // Send full bet amount to treasury on loss
            questToken.transfer(treasury, bet.amount);
        }

        // Clean up storage
        delete bets[requestId];

        emit DiceResult(requestId, bet.player, result, payout);
    }
}