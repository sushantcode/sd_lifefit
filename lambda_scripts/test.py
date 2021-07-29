from datetime import datetime, date, timedelta
import calendar

def getDate(x):
    today_date = date.today()
    last_day = today_date - timedelta(days=x)
    curr_date = last_day.strftime("%Y-%m-%d")
    return curr_date

if __name__ == "__main__":
    arr = []
    for x in range(22, 80):
        arr.append(getDate(x))

    print(arr)
