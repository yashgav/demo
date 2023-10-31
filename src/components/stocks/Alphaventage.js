import React, { useState, useEffect } from 'react';
// import Plot from 'react-plotly.js';

export default function Alphaventage() {
    const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

    const fetchStock = () => {
        const API_KEY = '2NOPQSFFBA9JZF0D';
        let StockSymbol = 'IBM';
        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DLF&interval=5min&apikey=2NOPQSFFBA9JZF0D';
    
        fetch(API_Call)
          .then(response => response.json())
          .then(data => {
              console.log(data);
            const stockDataArray = [];
            for (let key in data['Time Series (Daily)']) {
              const rowData = {
                date: key,
                open: data['Time Series (Daily)'][key]['1. open'],
                high: data['Time Series (Daily)'][key]['2. high'],
                low: data['Time Series (Daily)'][key]['3. low'],
                close: data['Time Series (Daily)'][key]['4. close'],
                adjustedClose: data['Time Series (Daily)'][key]['5. adjusted close'],
                volume: data['Time Series (Daily)'][key]['6. volume'],
              };
              stockDataArray.push(rowData);
            }
            setStockData(stockDataArray);
          });
      };
    

    useEffect(() => {
        fetchStock();
    }, []);
    return (
        <div>
      <h1>Stock Market Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Adjusted Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.open}</td>
              <td>{data.high}</td>
              <td>{data.low}</td>
              <td>{data.close}</td>
              <td>{data.adjustedClose}</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}
