
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { connectWallet, isWeb3Available, supportedNetworks, switchNetwork } from '@/utils/Web3Utils';

interface WalletOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export function ConnectWallet() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [walletAvailable, setWalletAvailable] = useState(false);
  
  // Check for wallet on component mount
  useEffect(() => {
    setWalletAvailable(isWeb3Available());
    
    // Check if already connected
    const checkConnection = async () => {
      if (isWeb3Available()) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setConnected(true);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };
    
    checkConnection();
    
    // Set up listeners for account changes
    if (isWeb3Available()) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setConnected(true);
        } else {
          setAccount(null);
          setConnected(false);
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        // Handle chain change
        console.log('Network changed');
      });
    }
    
    return () => {
      // Clean up listeners
      if (isWeb3Available()) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);
  
  const walletOptions: WalletOption[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.8144 2L13.3279 8.2603L14.9519 4.34229L21.8144 2Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.18573 2L10.5946 8.33835L9.04826 4.34229L2.18573 2Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.7404 17.1176L16.4023 20.8333L21.3493 22.2617L22.7777 17.198L18.7404 17.1176Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.23291 17.198L2.651 22.2617L7.58744 20.8333L5.26 17.1176L1.23291 17.198Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.31343 10.863L5.93286 13.0322L10.8261 13.2732L10.6654 7.91748L7.31343 10.863Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.6868 10.863L13.2812 7.83936L13.1741 13.2732L18.0674 13.0322L16.6868 10.863Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.58728 20.8333L10.5069 19.3314L7.98593 17.2358L7.58728 20.8333Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.4932 19.3314L16.4022 20.8333L16.0142 17.2358L13.4932 19.3314Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.9999 15V9C20.9999 5.13401 17.866 2 13.9999 2H9.99994C6.13395 2 2.99994 5.13401 2.99994 9V15C2.99994 18.866 6.13395 22 9.99994 22H13.9999C17.866 22 20.9999 18.866 20.9999 15Z" fill="url(#paint0_linear_1_2)"/>
          <path d="M14.5 8H9.5C9.22386 8 9 8.22386 9 8.5V13.5C9 13.7761 9.22386 14 9.5 14H11.5C11.7761 14 12 13.7761 12 13.5V12.5C12 12.2239 12.2239 12 12.5 12H14.5C14.7761 12 15 11.7761 15 11.5V8.5C15 8.22386 14.7761 8 14.5 8Z" fill="white"/>
          <path d="M14.5 16H12.5C12.2239 16 12 16.2239 12 16.5V17.5C12 17.7761 11.7761 18 11.5 18H9.5C9.22386 18 9 17.7761 9 17.5V14.5C9 14.2239 9.22386 14 9.5 14H14.5C14.7761 14 15 14.2239 15 14.5V15.5C15 15.7761 14.7761 16 14.5 16Z" fill="white"/>
          <defs>
            <linearGradient id="paint0_linear_1_2" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#534BB1"/>
              <stop offset="1" stopColor="#551BF9"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#3B99FC"/>
          <path d="M8.7499 9.5625C10.1249 8.1875 12.3749 8.1875 13.7499 9.5625L14.0624 9.875C14.1874 10 14.1874 10.1875 14.0624 10.3125L13.3749 11C13.3124 11.0625 13.1874 11.0625 13.1249 11L12.6874 10.5625C11.7499 9.625 10.7499 9.625 9.8124 10.5625L9.3124 11.0625C8.3749 12 8.3749 13 9.3124 13.9375L9.7499 14.375C10.6874 15.3125 11.6874 15.3125 12.6249 14.375L13.0624 13.9375C13.1249 13.875 13.2499 13.875 13.3124 13.9375L13.9999 14.625C14.1249 14.75 14.1249 14.9375 13.9999 15.0625L13.6874 15.375C12.3124 16.75 10.0624 16.75 8.6874 15.375L6.8749 13.5625C5.4999 12.1875 5.4999 9.9375 8.7499 9.5625Z" fill="white"/>
        </svg>
      ),
    },
  ];

  const handleConnectWallet = async (walletId: string) => {
    console.log(`Connecting to ${walletId}...`);
    
    if (walletId === 'metamask' && isWeb3Available()) {
      const connectedWallet = await connectWallet();
      if (connectedWallet) {
        setAccount(connectedWallet.walletAddress);
        setConnected(true);
        setOpen(false);
      }
    } else {
      // Handle other wallet types
      console.log(`${walletId} connection not implemented yet`);
    }
  };
  
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-full border border-border bg-white/70 backdrop-blur-md hover:bg-white/90 transition duration-300 shadow-subtle"
        >
          {connected ? (
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium">
                {account ? shortenAddress(account) : "Connected"}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">Connect Wallet</span>
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        
        {!walletAvailable ? (
          <div className="p-4 border border-yellow-400/20 rounded-lg bg-yellow-400/10 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm">Web3 wallet not detected</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please install MetaMask or another Web3 wallet extension to continue.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                asChild
              >
                <a 
                  href="https://metamask.io/download/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Install MetaMask
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-muted"
                onClick={() => handleConnectWallet(wallet.id)}
              >
                <div className="flex items-center gap-3">
                  {wallet.icon}
                  <span className="font-medium">{wallet.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
        
        {connected && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-medium text-sm mb-3">Switch Network</h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(supportedNetworks).map((network) => (
                <Button
                  key={network}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => switchNetwork(network as keyof typeof supportedNetworks)}
                >
                  {network.charAt(0).toUpperCase() + network.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
