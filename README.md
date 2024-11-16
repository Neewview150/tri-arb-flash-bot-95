# Triangular Arbitrage Flash Loan Bot

A React-based application for executing triangular arbitrage trades using flash loans on various DEXs.

## Prerequisites

1. **Node.js & npm**
   - Install Node.js and npm using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)
   ```sh
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

2. **Blockchain Provider Account**
   - Sign up for a free account at [Infura](https://infura.io) or [Alchemy](https://alchemy.com)
   - Create a new project and copy your provider URL

3. **Crypto Wallet**
   - Create an Ethereum wallet (e.g., using MetaMask)
   - Securely store your private key
   - Fund your wallet with some ETH for gas fees

## Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd tri-arb-flash-bot
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```sh
   VITE_BLOCKCHAIN_PROVIDER_URL=your_provider_url_here
   VITE_FLASH_LOAN_CONTRACT_ADDRESS=your_flash_loan_contract_address
   VITE_PRIVATE_KEY=your_wallet_private_key
   ```

## Configuration

1. **Provider URL**: 
   - Go to your Infura/Alchemy dashboard
   - Copy your project's endpoint URL
   - Paste it as `VITE_BLOCKCHAIN_PROVIDER_URL` in `.env`

2. **Flash Loan Contract**:
   - Choose a flash loan protocol (e.g., Aave V3: `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2`)
   - Set it as `VITE_FLASH_LOAN_CONTRACT_ADDRESS` in `.env`

3. **Private Key**:
   - Export your wallet's private key
   - Set it as `VITE_PRIVATE_KEY` in `.env`
   - ⚠️ Never share or commit your private key

## Running the Bot

1. Start the development server:
   ```sh
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Using the Bot

1. **Monitor Opportunities**:
   - The arbitrage table shows real-time opportunities
   - Profit percentage and estimated profits are displayed
   - Gas costs are estimated for each trade

2. **Simulate Trades**:
   - Click "Simulate" on any opportunity
   - Review the simulation results in the simulation panel
   - Check estimated profits, gas costs, and slippage

3. **Execute Trades**:
   - Only execute trades that show profitable simulation results
   - Click "Execute" to perform the flash loan trade
   - Monitor the transaction status in your wallet

## Safety Tips

- Always start with small amounts for testing
- Monitor gas prices before executing trades
- Double-check all contract addresses
- Never share your private key
- Test thoroughly on testnets first

## Troubleshooting

1. **Transaction Failures**:
   - Check gas price and limits
   - Verify contract addresses
   - Ensure sufficient ETH for gas

2. **Connection Issues**:
   - Verify provider URL
   - Check network status
   - Confirm wallet connection

## Support

For issues and feature requests, please open an issue in the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Architectural Design

The Triangular Arbitrage Flash Loan Bot is designed with a modular architecture using React components to facilitate ease of development and maintenance. The main components of the application are:

1. **ArbitrageTable**: This component is responsible for displaying real-time arbitrage opportunities. It fetches data from various exchanges and presents potential trades with profit estimates and gas costs.

2. **SimulationPanel**: This component allows users to simulate trades before execution. It provides insights into potential profits, gas costs, and slippage, helping users make informed decisions.

3. **TradeHistory**: This component displays a history of executed trades, showing details such as profit/loss, gas costs, and timestamps. It helps users track their trading performance over time.

### Technologies Used

- **React**: The application is built using React, a popular JavaScript library for building user interfaces. React's component-based architecture allows for efficient rendering and state management.

- **ethers.js**: This library is used for interacting with the Ethereum blockchain. It provides utilities for managing wallets, sending transactions, and interacting with smart contracts.

The choice of these technologies ensures a robust and scalable application, capable of handling real-time data and blockchain interactions efficiently.

## Disclaimer

Trading cryptocurrencies carries risk. This bot is for educational purposes only. Always do your own research and trade responsibly.
