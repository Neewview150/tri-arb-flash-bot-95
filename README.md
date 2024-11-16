# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3c9cc6a5-69cc-4b56-bc7a-6c771905ac15

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3c9cc6a5-69cc-4b56-bc7a-6c771905ac15) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?
## Setting up Blockchain Provider and Environment Variables

To execute live trades using flash loans, you need to set up a blockchain provider and configure necessary environment variables.

### Step 1: Set up Blockchain Provider

- Choose a blockchain provider like Infura or Alchemy.
- Sign up and create a project to get your provider URL.

### Step 2: Configure Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```sh
BLOCKCHAIN_PROVIDER_URL=<YOUR_PROVIDER_URL>
FLASH_LOAN_CONTRACT_ADDRESS=<YOUR_FLASH_LOAN_CONTRACT_ADDRESS>
PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
```

- Replace `<YOUR_PROVIDER_URL>` with the URL from your blockchain provider.
- Replace `<YOUR_FLASH_LOAN_CONTRACT_ADDRESS>` with the address of your deployed flash loan contract.
- Replace `<YOUR_WALLET_PRIVATE_KEY>` with your wallet's private key (ensure this is kept secure).

## Deploying and Interacting with Smart Contracts

To deploy and interact with smart contracts for flash loans, follow these steps:

1. **Deploy the Smart Contract**: Use a tool like Remix or Hardhat to deploy your flash loan smart contract to the blockchain.
2. **Interact with the Contract**: Use the provided functions in `flashLoanService.ts` to initiate and execute flash loans.

## How can I deploy this project?
Simply open [Lovable](https://lovable.dev/projects/3c9cc6a5-69cc-4b56-bc7a-6c771905ac15) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
