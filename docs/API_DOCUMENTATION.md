# API Documentation

This document outlines the API endpoints used by the Triangular Arbitrage Flash Loan Bot. It provides details on the purpose of each endpoint, the input parameters required, and the expected output. This documentation is intended to aid in knowledge sharing and onboarding new team members.

## Endpoints

### 1. Fetch Arbitrage Opportunities

- **Endpoint**: `/api/arbitrage-opportunities`
- **Method**: GET
- **Purpose**: Retrieves a list of current arbitrage opportunities across various exchanges.
- **Input Parameters**: None
- **Expected Output**:
  - **Status**: 200 OK
  - **Response Body**: An array of arbitrage opportunities, each containing:
    - `id` (string): Unique identifier for the opportunity.
    - `tokenA` (string): The first token in the arbitrage path.
    - `tokenB` (string): The second token in the arbitrage path.
    - `tokenC` (string): The third token in the arbitrage path.
    - `profitPercentage` (number): The estimated profit percentage.
    - `estimatedProfit` (number): The estimated profit in USD.
    - `gasEstimate` (number): The estimated gas cost in USD.
    - `timestamp` (string): The timestamp of the opportunity.
    - `exchange` (string): The exchange where the opportunity exists.

### 2. Execute Flash Loan

- **Endpoint**: `/api/execute-flash-loan`
- **Method**: POST
- **Purpose**: Executes a flash loan trade based on a specified arbitrage opportunity.
- **Input Parameters**:
  - `opportunityId` (string): The ID of the arbitrage opportunity to execute.
  - `amount` (string): The amount to trade, specified in the base currency.
- **Expected Output**:
  - **Status**: 200 OK
  - **Response Body**: A confirmation of the trade execution, including:
    - `transactionId` (string): The blockchain transaction ID.
    - `status` (string): The status of the trade execution (e.g., "success", "failed").
    - `profit` (number): The actual profit realized from the trade.
    - `gasCost` (number): The actual gas cost incurred.

### 3. Fetch Trade History

- **Endpoint**: `/api/trade-history`
- **Method**: GET
- **Purpose**: Retrieves the history of executed trades.
- **Input Parameters**: None
- **Expected Output**:
  - **Status**: 200 OK
  - **Response Body**: An array of trade history records, each containing:
    - `id` (string): Unique identifier for the trade.
    - `type` (string): The result of the trade ("success" or "failed").
    - `profit` (number): The profit or loss from the trade.
    - `gasCost` (number): The gas cost incurred for the trade.
    - `timestamp` (string): The timestamp of the trade.
    - `tokens` (array of strings): The tokens involved in the trade.

## Notes

- Ensure that all API requests include the necessary authentication headers as required by the blockchain provider.
- The response times may vary based on network conditions and the load on the exchanges.

For further assistance, please contact the development team.
