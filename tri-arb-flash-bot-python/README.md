# Triangular Arbitrage Flash Loan Bot (Python)

This Python bot is designed to find and execute triangular arbitrage opportunities on Poloniex using flash loans from Equalizer Finance. It continuously scans for profitable trades and executes them automatically.

## Prerequisites

1. **Python 3.8+**: Ensure you have Python installed. You can download it from [python.org](https://www.python.org/).

2. **Poloniex API Credentials**: 
   - Sign up for a Poloniex account and create API keys.
   - Ensure your API keys have the necessary permissions for trading.

3. **Blockchain Provider Account**:
   - Sign up for a service like [Infura](https://infura.io) to get a blockchain provider URL.
   - Create a new project and copy your provider URL.

4. **Crypto Wallet**:
   - Securely store your private key for signing transactions.

## Installation

1. **Clone the Repository**:
   ```sh
   git clone <your-repo-url>
   cd tri-arb-flash-bot-python
   ```

2. **Install Dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

## Configuration

1. **Edit the `config.py` File**:
   - Replace placeholder values with your actual Poloniex API keys, blockchain provider URL, and Equalizer Finance contract address.
   - Ensure your private key is securely stored and not exposed in the code.

## Running the Bot

1. **Start the Bot**:
   ```sh
   python main.py
   ```

2. **Monitor the Output**:
   - The bot will log its activities, including found opportunities and executed trades.
   - Logs will help you track the bot's performance and any issues.

## Usage Guidelines

- **Test on Testnets**: Before using real funds, test the bot on Ethereum testnets to ensure it operates correctly.
- **Monitor Transactions**: Keep an eye on gas prices and transaction statuses.
- **Start Small**: Begin with small amounts to minimize risk.

## Troubleshooting

- **Connection Issues**: Ensure your blockchain provider URL is correct and the network is stable.
- **Transaction Failures**: Check your wallet balance for sufficient ETH to cover gas fees and verify contract addresses.

## Disclaimer

Trading cryptocurrencies involves risk. This bot is provided for educational purposes only. Use it at your own risk and always conduct thorough research before trading.
