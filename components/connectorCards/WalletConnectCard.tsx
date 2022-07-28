import { useEffect, useState } from 'react'
import { hooks, walletConnect } from '../../connectors/walletConnect'
import { CHAINS, URLS } from '../../chains'
import { Network } from '@web3-react/network'
import { providers, ethers } from "ethers"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function WalletConnectCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [error, setError] = useState(undefined)

  useEffect(() => 
  {
  //   //Only Allows to Connect to the BSC Network (56). Disconnect and setOpen(useState) functions must be created*
  //   if (isActive && chainId != 56) {
  //     disconnect();
  //     //this setOpen function will show an alert to change network (ModalChain). Must be Created*
  //     setOpen(true);
  // }

  //Example for calling contract using ethers
    if (provider && accounts) {
      const web3Provider = new providers.Web3Provider(provider.provider);
      web3Provider.getSigner(accounts[0]);
      console.log(accounts, chainId);
  }

  }, [isActive])

  const isNetwork = walletConnect instanceof Network
  // const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '20rem',
        padding: '1rem',
        margin: '1rem',
        overflow: 'auto',
        border: '1px solid',
        borderRadius: '1rem',
      }}
    >

      {/* Shows if it's Connected or Not */}
      <div style={{ marginBottom: '1rem' }}>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
      </div>


      {/* Shows the Current Connected Addresses */}
      <div style={{ marginBottom: '1rem' }}>
      Accounts:{' '}
      <b>
        {accounts?.length === 0
          ? 'None'
          : accounts?.map((account, i) => (
              <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ENSNames?.[i] ?? account}
              </ul>
            ))}
      </b>
    </div>

     {/* Print Current Chain Network */}
    <div style={{ marginBottom: '1rem' }} >
      Chain Id: <b>{CHAINS[chainId]?.name}</b>
    </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Connection Login: */}
      { isActive ?
        <button
          onClick={ async ()=>{ await walletConnect
                      .deactivate()
                      .then(() => setError(undefined))
                      .catch(setError)
                  }
          }
          disabled={isActivating}
        >
        Disconnect
        </button>
       : <button
          onClick={
            isActivating
              ? undefined
              : async ()=>{ await walletConnect
                        .activate()
                        .then(() => setError(undefined))
                        .catch(setError)
                    }
          }
          disabled={isActivating}
        >
          Connect
        </button>
        }
      </div>
    </div>
  )
}
