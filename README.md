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

## AI Agent Feature

The AI agent is integrated into the bot to enhance decision-making by analyzing arbitrage opportunities. It evaluates each opportunity based on a predefined profit threshold and recommends trades that are likely to be profitable.

### How It Works
- The AI agent scans the list of arbitrage opportunities and filters them based on a profit percentage threshold.
- Opportunities that exceed this threshold are marked as AI-recommended.
- Users can view these recommendations in the arbitrage table and simulation panel.

### Interpreting Recommendations
- AI-recommended trades are highlighted in the UI, allowing users to quickly identify potentially profitable trades.
- The simulation panel displays expected profit margins for AI-recommended trades, helping users make informed decisions.

### Configuration
- The AI agent uses a default profit threshold of 1.0%. This can be adjusted in the `AIService.ts` file if needed.

## Running the Bot

1. Start the development server:
   ```sh
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## AI Agent Feature

The AI agent is integrated into the bot to enhance decision-making by analyzing arbitrage opportunities. It evaluates each opportunity based on a predefined profit threshold and recommends trades that are likely to be profitable.

### How It Works
- The AI agent scans the list of arbitrage opportunities and filters them based on a profit percentage threshold.
- Opportunities that exceed this threshold are marked as AI-recommended.
- Users can view these recommendations in the arbitrage table and simulation panel.

### Interpreting Recommendations
- AI-recommended trades are highlighted in the UI, allowing users to quickly identify potentially profitable trades.
- The simulation panel displays expected profit margins for AI-recommended trades, helping users make informed decisions.

### Configuration
- The AI agent uses a default profit threshold of 1.0%. This can be adjusted in the `AIService.ts` file if needed.

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

## Disclaimer

Trading cryptocurrencies carries risk. This bot is for educational purposes only. Always do your own research and trade responsibly.
