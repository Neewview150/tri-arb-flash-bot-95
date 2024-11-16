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

export const initiateFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    console.log(`Initiating flash loan for amount: ${ethers.utils.formatEther(amount)} with tokens: ${tokens.join(', ')}`);
    const contract = getFlashLoanContract(signer, tokens);
    const tx = await contract.initiateFlashLoan(amount, tokens);
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`Flash loan initiated successfully. Transaction confirmed: ${tx.hash}`);
  } catch (error) {
    console.error(`Error initiating flash loan for amount: ${ethers.utils.formatEther(amount)} with tokens: ${tokens.join(', ')}`, error);
    throw new Error('Failed to initiate flash loan: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

export const executeFlashLoan = async (amount: bigint, tokens: string[], signer: ethers.Signer) => {
  try {
    console.log(`Executing flash loan for amount: ${ethers.utils.formatEther(amount)} with tokens: ${tokens.join(', ')}`);
    const contract = getFlashLoanContract(signer, tokens);
    const tx = await contract.executeFlashLoan(amount, tokens);
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`Flash loan executed successfully. Transaction confirmed: ${tx.hash}`);
  } catch (error) {
    console.error(`Error executing flash loan for amount: ${ethers.utils.formatEther(amount)} with tokens: ${tokens.join(', ')}`, error);
    throw new Error('Failed to execute flash loan: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Function to check contract balance
export const getContractBalance = async (signer: ethers.Signer) => {
  try {
    const contract = getFlashLoanContract(signer, []);
    const balance = await contract.provider.getBalance(contract.address);
    console.log('Contract balance:', ethers.utils.formatEther(balance));
    return balance;
  } catch (error) {
    console.error('Error fetching contract balance:', error);
    throw new Error('Failed to fetch contract balance: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Function to retrieve loan details
export const getLoanDetails = async (transactionHash: string, signer: ethers.Signer) => {
  try {
    const receipt = await signer.provider.getTransactionReceipt(transactionHash);
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }
    console.log('Loan details:', receipt);
    return receipt;
  } catch (error) {
    console.error('Error retrieving loan details:', error);
    throw new Error('Failed to retrieve loan details: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};
