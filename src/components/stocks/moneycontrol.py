import requests
import time
import pandas as pd
from datetime import datetime

def datetotimestamp(date):
    if isinstance(date, datetime):
        timestamp = int(date.timestamp())
        return timestamp
    return 0

def timestamptodate(timestamp):
    return datetime.fromtimestamp(timestamp)

start = datetotimestamp(datetime(2023, 7, 20))
end = datetotimestamp(datetime.today())
symbol = 'TATACONSUM'

url = 'https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=' + symbol + '&resolution=5&from=' + str(start) + '&to=' + str(end) + '&countback=1000&currencyCode=INR'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

try:
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()  # Check if the request was successful
    data = resp.json()  # Try to parse the JSON response

except requests.exceptions.HTTPError as http_err:
    print(f'HTTP error occurred: {http_err}')  # Handle HTTP error
except requests.exceptions.RequestException as err:
    print(f'Other error occurred: {err}')  # Handle other request errors
except ValueError as e:
    print(f'Error in decoding JSON: {e}')  # Handle JSON decoding error

pddata = pd.DataFrame(data)

date = []
for dt in pddata['t']:
    date.append({'Date': timestamptodate(dt)})

dt = pd.DataFrame(date)

intraday_data = pd.concat([dt, pddata['o'], pddata['h'], pddata['l'], pddata['c'], pddata['v']], axis=1).rename(columns={'o': 'Open', 'h': 'High', 'l': 'Low', 'c': 'Close', 'v': 'Volume'})

intraday_data['Date'] = pd.to_datetime(intraday_data['Date'])
intraday_data['Time'] = intraday_data['Date'].dt.time
intraday_data['Date'] = intraday_data['Date'].dt.date

print(intraday_data)


import matplotlib.pyplot as plt

# Plotting the closing price over time
plt.figure(figsize=(12, 6))
plt.plot(intraday_data['Date'], intraday_data['Close'], marker='o', linestyle='-')
plt.title('Stock Closing Price Over Time')
plt.xlabel('Date')
plt.ylabel('Closing Price')
plt.xticks(rotation=45)
plt.grid(True)
plt.show()
