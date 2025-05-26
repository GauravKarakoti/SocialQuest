# SocialQuest 🌟  
*Gasless Social Gaming on NERO Chain*  

## Overview  
SocialQuest is a Web3 dApp combining SocialFi, GameFi, and DeFi. Earn tokens by socializing, play games to grow them, and stake for passive income—all without worrying about gas fees.  

## Features  
- 🎮 **Play-to-Earn Mini-Games**: Double your tokens with provably fair games.  
- 💬 **Social Rewards**: Earn $QUEST tokens for posting, liking, and sharing.  
- 🏦 **DeFi Staking**: Stake $QUEST in auto-compounding pools.  
- 🔓 **Gasless UX**: Powered by NERO’s Paymaster (sponsored or token-paid gas).  

## Tech Stack  
- **Smart Contracts**: Solidity, NERO Chain, Paymaster AA-Platform.  
- **Frontend**: React, Web3Auth, IPFS.  
- **Oracles**: Chainlink VRF for fair gaming.  

## Setup  
1. Clone the repo:  
   ```bash  
   git clone https://github.com/GauravKarakoti/socialquest.git
   ```
2. Install dependencies:
   ```bash
   cd socialquest && npm install
   ```
3. Configure Paymaster:
   - Follow [NERO’s AA-Platform Guide](https://docs.nerochain.io/en/tutorials).
4. Run the app:
   ```bash
   npm start
   ```

Contracts deployed at: 
- SocialRewards.sol: `0x548bCE679243593327966eA2aC3A7AF4547Fb085`
- DiceRoll.sol: `0xD62Dcf739F78dccf33C6346d63c033438898D24a`