import { Web3Auth } from "@web3auth/modal";
import {
  WEB3AUTH_NETWORK,
  CHAIN_NAMESPACES,
} from "@web3auth/base";

export const initWeb3Auth = async () => {
  const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
  const rawOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.CYAN,    
    chainConfig: {                         
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x2B1",
      rpcTarget: process.env.NEXT_PUBLIC_NERO_RPC_URL!,
      displayName: "NERO Testnet",
      blockExplorerUrl: "https://testnet.neroscan.io",
      ticker: "NERO",
      tickerName: "NERO",
      logo: "",           
      isTestnet: true,        
    },
    uiConfig: {                                  
      appName: "SocialQuest",
      logoLight: "/favicon.ico",
      defaultLanguage: "en",
      theme: {                        
        primary: "#4F46E5",
      },
      mode: "dark",                            
    },
  };

  const web3Auth = new Web3Auth(rawOptions as any);

  // initialize the core kit
  await web3Auth.init();

  return web3Auth;
};
