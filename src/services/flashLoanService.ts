import { ethers } from 'ethers';

// Configuration for the blockchain provider and contract
const providerUrl = import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL;
const contractAddresses = {
  default: import.meta.env.VITE_FLASH_LOAN_CONTRACT_ADDRESS,
  // Add more contract addresses if needed
};

if (!providerUrl) {
  throw new Error('VITE_BLOCKCHAIN_PROVIDER_URL environment variable is not set');
}

if (!contractAddresses.default) {
  throw new Error('VITE_FLASH_LOAN_CONTRACT_ADDRESS environment variable is not set');
}

const contractABIs = {
  default: [
    // ABI of the flash loan contract
    "function initiateFlashLoan(uint256 amount, string[] calldata tokens) external",
    "function executeFlashLoan(uint256 amount, string[] calldata tokens) external"
  ],
  // Add more ABIs if needed
};

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
const getFlashLoanContract = (signer: ethers.Signer, tokens: string[]) => {
  // Logic to select contract based on tokens or other criteria
  const contractKey = tokens.includes('ETH') ? 'default' : 'default'; // Example logic
  const address = contractAddresses[contractKey];
  const abi = contractABIs[contractKey];
  return new ethers.Contract(address, abi, signer);
};

// Function to initiate a flash loan
export const initiateFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    const contract = getFlashLoanContract(signer, tokens);
    const tx = await contract.initiateFlashLoan(amount, tokens);
    await tx.wait();
    console.log('Flash loan initiated successfully');
  } catch (error) {
    console.error('Error initiating flash loan:', error);
    throw new Error('Failed to initiate flash loan: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Function to execute a flash loan
export const executeFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    const contract = getFlashLoanContract(signer, tokens);
    const tx = await contract.executeFlashLoan(amount, tokens);
    await tx.wait();
    console.log('Flash loan executed successfully');
  } catch (error) {
    console.error('Error executing flash loan:', error);
    throw new Error('Failed to execute flash loan: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
