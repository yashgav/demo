from tvDatafeed import TvDatafeed, Interval

username = 'yashwant3123@gmail.com'
password = 'Yash*3123'

tv = TvDatafeed(username, password)

nifty_index_data = tv.get_hist(symbol='NIFTY',exchange='NSE',interval=Interval.in_5_minute,n_bars=10000)

print(nifty_index_data)