import WalletConnectCard from '../components/connectorCards/WalletConnectCard'
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { hooks as walletConnectHooks, walletConnect } from "../connectors/walletConnect";

export default function Home() {

  const connectors: [WalletConnect, Web3ReactHooks][] = [[walletConnect, walletConnectHooks]];

  return (
    <>
      <Web3ReactProvider connectors={connectors}>
        <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
          <WalletConnectCard />
        </div>
      </Web3ReactProvider>
    </>
  )
}
