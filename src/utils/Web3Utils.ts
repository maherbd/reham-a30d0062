
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define supported networks
export const supportedNetworks = {
  ethereum: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  polygon: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  arbitrum: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io']
  }
};

// Check if MetaMask or another Web3 provider is available
export const isWeb3Available = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

// Connect to Web3 wallet and register/update in Supabase
export const connectWallet = async () => {
  if (!isWeb3Available()) {
    toast.error('No Web3 wallet detected. Please install MetaMask or another Web3 wallet.');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      const walletAddress = accounts[0];
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Determine blockchain based on chainId
      let blockchain = 'ethereum';
      if (chainId === '0x89') blockchain = 'polygon';
      else if (chainId === '0xa4b1') blockchain = 'arbitrum';
      
      // Get wallet type (assuming MetaMask as default)
      let walletType = 'MetaMask';
      if (window.ethereum.isMetaMask) walletType = 'MetaMask';
      else if (window.ethereum.isCoinbaseWallet) walletType = 'Coinbase Wallet';
      else if (window.ethereum.isWalletConnect) walletType = 'WalletConnect';
      
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Update existing user with wallet info
        const { data, error } = await supabase
          .from('users')
          .upsert({
            id: session.user.id,
            wallet_address: walletAddress,
            wallet_type: walletType,
            blockchain: blockchain
          })
          .select();
          
        if (error) throw error;
        
        return {
          walletAddress,
          walletType,
          blockchain
        };
      } else {
        // Store wallet info in local storage for later use
        localStorage.setItem('pendingWallet', JSON.stringify({
          walletAddress,
          walletType,
          blockchain
        }));
        
        toast.info('Please login or create an account to connect your wallet');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    toast.error('Failed to connect wallet. Please try again.');
    return null;
  }
};

// Switch network
export const switchNetwork = async (networkName: keyof typeof supportedNetworks) => {
  if (!isWeb3Available()) {
    toast.error('No Web3 wallet detected.');
    return false;
  }

  const network = supportedNetworks[networkName];
  if (!network) {
    toast.error('Unsupported network');
    return false;
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
    toast.success(`Switched to ${networkName} successfully!`);
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],
        });
        toast.success(`Added and switched to ${networkName} successfully!`);
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        toast.error(`Failed to add ${networkName} network.`);
        return false;
      }
    }
    console.error('Error switching network:', switchError);
    toast.error(`Failed to switch to ${networkName} network.`);
    return false;
  }
};

// Get current network
export const getCurrentNetwork = async () => {
  if (!isWeb3Available()) {
    return null;
  }

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId;
  } catch (error) {
    console.error('Error getting current network:', error);
    return null;
  }
};

// Global declaration for TypeScript
declare global {
  interface Window {
    ethereum: any;
  }
}
