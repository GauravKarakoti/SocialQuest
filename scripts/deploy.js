const { ethers } = require("hardhat");

async function main() {
    const SocialRewards = await ethers.getContractFactory("SocialRewards");
    
    // Deploy with EIP-1559 gas parameters
    const social = await SocialRewards.deploy({
        maxPriorityFeePerGas: ethers.parseUnits("1.5", "gwei"),
        maxFeePerGas: ethers.parseUnits("10", "gwei")
    });
    
    await social.waitForDeployment();
    console.log("SocialRewards deployed to:", social.target);

    const treasuryAddress = "0xeB4F0Cb1644FA1f6dd01Aa2F7c49099d2267F3A8"; 
    const vrfCoordinator = "0xA292c308Bf0054c0c8b85bA5872499533343483a"; 
    const linkToken = "0xAc595172a85f5Ad53AcF0704cad01f94066aB823"; 
    const keyHash = "0x9f9c0ab6050a7b3588a398b7f3f3c6c832d7a45d4b2256b1c4ca7e3b4f0b3e8f"; 

    const DiceRoll = await ethers.getContractFactory("DiceRoll");
    const dice = await DiceRoll.deploy(
        social.target,          // _questToken (SocialRewards address)
        treasuryAddress,        // _treasury
        vrfCoordinator, // _vrfCoordinator 
        linkToken,     // _linkToken 
        keyHash,                // _keyHash (bytes32)
        {
            maxPriorityFeePerGas: ethers.parseUnits("1.5", "gwei"),
            maxFeePerGas: ethers.parseUnits("10", "gwei")
        }
    );
    
    await dice.waitForDeployment();
    console.log("DiceRoll deployed to:", dice.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});