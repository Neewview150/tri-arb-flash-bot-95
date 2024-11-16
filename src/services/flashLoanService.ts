import { ethers } from 'ethers';

// Configuration for the blockchain provider and contract
const providerUrl = import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL;
const contractAddress = import.meta.env.VITE_FLASH_LOAN_CONTRACT_ADDRESS;

if (!providerUrl) {
  throw new Error('VITE_BLOCKCHAIN_PROVIDER_URL environment variable is not set');
}

if (!contractAddress) {
  throw new Error('VITE_FLASH_LOAN_CONTRACT_ADDRESS environment variable is not set');
}

const contractABI = [
  // ABI of the flash loan contract
  "function initiateFlashLoan(uint256 amount, string[] calldata tokens) external",
  "function executeFlashLoan(uint256 amount, string[] calldata tokens) external"
];

// Initialize a provider
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Function to validate private key
const validatePrivateKey = (privateKey: string | undefined): string => {
  if (!privateKey) {
    throw new Error('VITE_PRIVATE_KEY environment variable is not set');
  }
  
  try {
    // Try to create a wallet with the private key to validate it
    const wallet = new ethers.Wallet(privateKey);
    return wallet.privateKey;
  } catch (error) {
    throw new Error('Invalid private key format: ' + error.message);
  }
};

// Function to create a contract instance
const getFlashLoanContract = (signer: ethers.Signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Function to initiate a flash loan
export const initiateFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    const contract = getFlashLoanContract(signer);
    const tx = await contract.initiateFlashLoan(amount, tokens);
    await tx.wait();
    console.log('Flash loan initiated successfully');
  } catch (error) {
    console.error('Error initiating flash loan:', error);
    throw error;
  }
};

// Function to execute a flash loan
export const executeFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    const contract = getFlashLoanContract(signer);
    const tx = await contract.executeFlashLoan(amount, tokens);
    await tx.wait();
    console.log('Flash loan executed successfully');
  } catch (error) {
    console.error('Error executing flash loan:', error);
    throw error;
  }
};
