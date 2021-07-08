from datetime import datetime, date, timedelta
import calendar

curr_datetime = datetime.now()
dayName = calendar.day_name[curr_datetime.weekday()][0:3]
month = calendar.month_name[curr_datetime.weekday()][0:3]
dayNum = curr_datetime.strftime("%m")
year = curr_datetime.strftime("%Y")
time = curr_datetime.time().strftime("%H:%M:%S")
datetimeNow = dayName + " " + month + " " + dayNum + " " + time + " " + "CDT " + year
print(datetimeNow)
