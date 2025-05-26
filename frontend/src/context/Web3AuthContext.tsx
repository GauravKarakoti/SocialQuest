import { createContext, useContext, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";

interface Web3AuthContextType {
  provider: SafeEventEmitterProvider | null;
  userInfo: any;
  isLoading: boolean;
  login(): Promise<void>;
  logout(): Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  provider: null,
  userInfo: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const Web3AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
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

        const modal = new Web3Auth(rawOptions as any);
        await modal.init();

        setWeb3Auth(modal);
        if (modal.provider) {
          setProvider(modal.provider);
          setUserInfo(await modal.getUserInfo());
        }
      } catch (e) {
        console.error("Web3Auth init failed:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async () => {
    if (!web3Auth) return;
    setIsLoading(true);
    try {
      const p = await web3Auth.connect();   // opens the modal
      setProvider(p);
      setUserInfo(await web3Auth.getUserInfo());
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!web3Auth) return;
    setIsLoading(true);
    try {
      await web3Auth.logout();
      setProvider(null);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Web3AuthContext.Provider value={{ provider, userInfo, isLoading, login, logout }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const ctx = useContext(Web3AuthContext);
  if (!ctx) throw new Error("useWeb3Auth must be used inside Web3AuthProvider");
  return ctx;
};
