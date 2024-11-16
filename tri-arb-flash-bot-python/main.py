import time
from arbitrage_scanner import scan_arbitrage_opportunities
from flash_loan_executor import execute_arbitrage
from config import POLONIEX_API_KEY, POLONIEX_API_SECRET, EQUALIZER_CONTRACT_ADDRESS, BLOCKCHAIN_PROVIDER_URL
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def main():
    logging.info("Starting Triangular Arbitrage Bot")

    while True:
        try:
            # Scan for arbitrage opportunities
            opportunities = scan_arbitrage_opportunities(POLONIEX_API_KEY, POLONIEX_API_SECRET)
            logging.info(f"Found {len(opportunities)} opportunities")

            # Execute each opportunity
            for opportunity in opportunities:
                logging.info(f"Executing arbitrage opportunity: {opportunity}")
                execute_arbitrage(opportunity, EQUALIZER_CONTRACT_ADDRESS, BLOCKCHAIN_PROVIDER_URL)
                logging.info("Arbitrage executed successfully")

        except Exception as e:
            logging.error(f"An error occurred: {e}")

        # Wait for a specified interval before scanning again
        time.sleep(60)  # Sleep for 60 seconds

if __name__ == "__main__":
    main()
