import requests
import logging
from typing import List, Dict

# Constants
POLONIEX_API_URL = "https://poloniex.com/public?command=returnTicker"

# Function to fetch market data from Poloniex
def fetch_market_data(api_key: str, api_secret: str) -> Dict[str, Dict[str, float]]:
    try:
        response = requests.get(POLONIEX_API_URL)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logging.error(f"Error fetching market data: {e}")
        return {}

# Function to identify triangular arbitrage opportunities
def identify_arbitrage_opportunities(market_data: Dict[str, Dict[str, float]]) -> List[Dict[str, str]]:
    opportunities = []
    # Extract all trading pairs
    pairs = list(market_data.keys())
    
    # Iterate over each pair to find potential arbitrage paths
    for i, pair1 in enumerate(pairs):
        for j, pair2 in enumerate(pairs):
            if i == j:
                continue
            for k, pair3 in enumerate(pairs):
                if k == i or k == j:
                    continue
                
                # Check if the pairs form a triangular path
                if pair1.split('_')[1] == pair2.split('_')[0] and pair2.split('_')[1] == pair3.split('_')[0] and pair3.split('_')[1] == pair1.split('_')[0]:
                    # Calculate potential profit
                    rate1 = market_data[pair1]['last']
                    rate2 = market_data[pair2]['last']
                    rate3 = market_data[pair3]['last']
                    
                    # Calculate arbitrage profit
                    profit = (1 / rate1) * rate2 * rate3 - 1
                    if profit > 0:
                        opportunities.append({
                            "pair1": pair1,
                            "pair2": pair2,
                            "pair3": pair3,
                            "profit": profit
                        })
    
    return opportunities

# Main function to scan for arbitrage opportunities
def scan_arbitrage_opportunities(api_key: str, api_secret: str) -> List[Dict[str, str]]:
    market_data = fetch_market_data(api_key, api_secret)
    if not market_data:
        return []
    
    opportunities = identify_arbitrage_opportunities(market_data)
    return opportunities
