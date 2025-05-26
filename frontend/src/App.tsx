import { useEffect, useState } from "react";
import { initWeb3Auth }         from "./utils/web3auth";
import { Web3Auth }             from "@web3auth/modal";
import { GaslessButton }        from "./components/GaslessButton";

function App() {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [ready, setReady]       = useState(false);

  useEffect(() => {
    (async () => {
      const auth = await initWeb3Auth();
      await auth.init();
      setWeb3Auth(auth);
      setReady(true);
    })();
  }, []);

  const connect = async () => {
    if (!web3Auth) return;
    await web3Auth.connect();
  };

  if (!ready) {
    return <div>Loading…</div>;
  }

  return (
    <div>
      <button onClick={connect}>Connect Wallet</button>
      <GaslessButton />
    </div>
  );
}

export default App;
