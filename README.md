# Triangular Arbitrage Flash Loan Bot

A Python script for executing triangular arbitrage trades using flash loans on Poloniex exchange.

## Prerequisites

1. **Python & pip**
   - Ensure you have Python 3.7 or later installed. You can download it from [python.org](https://www.python.org/downloads/).

2. **CCXT Library**
   - The script uses the `ccxt` library to interact with the Poloniex exchange. Install it using pip:
   ```sh
   pip install ccxt
   ```

3. **Environment Variables**
   - Set up your Poloniex API credentials as environment variables:
   ```sh
   export POLONIEX_API_KEY='your_api_key'
   export POLONIEX_SECRET='your_secret_key'
   ```

## Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd tri-arb-flash-bot
   ```

2. Ensure all dependencies are installed:
   ```sh
   pip install -r requirements.txt
   ```

## Running the Bot

1. Execute the Python script:
   ```sh
   python tri_arb_flash_bot.py
   ```

2. The script will log arbitrage opportunities and execute trades if profitable opportunities are found.

## Safety Tips

- Always start with small amounts for testing.
- Monitor market conditions and adjust your strategy accordingly.
- Never share your API credentials.

## Troubleshooting

1. **Connection Issues**:
   - Verify your internet connection.
   - Ensure your API credentials are correct.

2. **Execution Errors**:
   - Check the logs for detailed error messages.
   - Ensure the `ccxt` library is up to date.

## Support

For issues and feature requests, please open an issue in the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

Trading cryptocurrencies carries risk. This bot is for educational purposes only. Always do your own research and trade responsibly.
