import { ethers } from "ethers";
import { useWeb3Auth } from "../context/Web3AuthContext";
import SocialRewardsArtifact from "../artifacts/SocialRewards.json";
const SocialRewardsABI = SocialRewardsArtifact.abi;
const SOCIAL_REWARDS_ADDRESS = "0x548bCE679243593327966eA2aC3A7AF4547Fb085";

export const GaslessButton = () => {
  const { provider } = useWeb3Auth();

  const handlePost = async () => {
    if (!provider) return;
    try {
      // Get proper signer from provider
      const web3Provider = new ethers.BrowserProvider(provider);
      const signer = await web3Provider.getSigner();
      
      const contract = new ethers.Contract(
        SOCIAL_REWARDS_ADDRESS,
        SocialRewardsABI,
        signer
      );

      // Check gas credits
      const raw = localStorage.getItem("gasCredits");
      const gasCredits = raw ? parseInt(raw, 10) : 0;

      if (gasCredits > 0) {
        const tx = await contract.createPost("ipfs_hash_123", {
          gasSponsor: true // Paymaster flag
        });
        localStorage.setItem("gasCredits", (gasCredits - 1).toString());
      } else {
        const tx = await contract.createPost("ipfs_hash_123", {
          gasToken: "QUEST",
          gasDiscount: 50
        });
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return <button onClick={handlePost}>Post (Gasless)</button>;
};