# Triangular Arbitrage Flash Loan Bot

A Python script for executing triangular arbitrage trades using flash loans on various DEXs.

## Prerequisites

1. **Python & pip**
   - Install Python (version 3.8 or higher) and pip.
   - It's recommended to use a virtual environment to manage dependencies.
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
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the root directory:
   ```sh
   VITE_BLOCKCHAIN_PROVIDER_URL=your_provider_url_here
   VITE_FLASH_LOAN_CONTRACT_ADDRESS=your_flash_loan_contract_address
   VITE_PRIVATE_KEY=your_wallet_private_key
   ```

## Running the Bot

1. Execute the Python script:
   ```sh
   python flash_loan_bot.py
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

## Using the Bot

### Enhanced Features

1. **AI Recommendations**:
   - The arbitrage table now highlights AI-recommended trades based on profitability analysis.
   - These trades are marked for easy identification and are likely to be profitable.

2. **Detailed Simulation**:
   - The simulation panel provides a breakdown of potential slippage, network fees, and estimated profits.
   - Users can view detailed results to make informed decisions before executing trades.

3. **Trade History Management**:
   - The trade history section now includes sorting, filtering, and pagination.
   - Users can sort trades by date or profit and filter by success or failure status.
   - Pagination allows easy navigation through large datasets.

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

3. **AI Agent Issues**:
   - If AI recommendations are not appearing, ensure the profit threshold is set correctly in `AIService.ts`.
   - Verify that the AI agent is enabled and configured properly.

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
