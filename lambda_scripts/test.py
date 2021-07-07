from datetime import datetime, timedelta

list = [{'time': '01:00:00', 'value': 73}, {'time': '01:15:00', 'value': 72}]
list1 = [
    {'time': '00:00:00', 'value': 0}, 
    {'time': '00:15:00', 'value': 0}, 
    {'time': '00:30:00', 'value': 0}, 
    {'time': '00:45:00', 'value': 0}, {'time': '01:00:00', 'value': 0}, {'time': '01:15:00', 'value': 0}, {'time': '01:30:00', 'value': 0}, {'time': '01:45:00', 'value': 0}, {'time': '02:00:00', 'value': 0}, {'time': '02:15:00', 'value': 0}, {'time': '02:30:00', 'value': 0}, {'time': '02:45:00', 'value': 0}, {'time': '03:00:00', 'value': 0}, {'time': '03:15:00', 'value': 0}, {'time': '03:30:00', 'value': 0}, {'time': '03:45:00', 'value': 0}, {'time': '04:00:00', 'value': 0}, {'time': '04:15:00', 'value': 0}, {'time': '04:30:00', 'value': 0}, {'time': '04:45:00', 'value': 0}, {'time': '05:00:00', 'value': 0}, {'time': '05:15:00', 'value': 0}, {'time': '05:30:00', 'value': 0}, {'time': '05:45:00', 'value': 0}, {'time': '06:00:00', 'value': 0}, {'time': '06:15:00', 'value': 0}, {'time': '06:30:00', 'value': 0}, {'time': '06:45:00', 'value': 0}, {'time': '07:00:00', 'value': 0}, {'time': '07:15:00', 'value': 0}, {'time': '07:30:00', 'value': 0}, {'time': '07:45:00', 'value': 0}, {'time': '08:00:00', 'value': 0}, {'time': '08:15:00', 'value': 0}, {'time': '08:30:00', 'value': 0}, {'time': '08:45:00', 'value': 0}, {'time': '09:00:00', 'value': 0}, {'time': '09:15:00', 'value': 0}, {'time': '09:30:00', 'value': 0}, {'time': '09:45:00', 'value': 0}, {'time': '10:00:00', 'value': 0}, {'time': '10:15:00', 'value': 0}, {'time': '10:30:00', 'value': 0}, {'time': '10:45:00', 'value': 0}, {'time': '11:00:00', 'value': 0}, {'time': '11:15:00', 'value': 0}, {'time': '11:30:00', 'value': 0}, {'time': '11:45:00', 'value': 0}, {'time': '12:00:00', 'value': 0}, {'time': '12:15:00', 'value': 0}, {'time': '12:30:00', 'value': 0}, {'time': '12:45:00', 'value': 0}, {'time': '13:00:00', 'value': 0}, {'time': '13:15:00', 'value': 0}, {'time': '13:30:00', 'value': 0}, {'time': '13:45:00', 'value': 0}, {'time': '14:00:00', 'value': 0}, {'time': '14:15:00', 'value': 0}, {'time': '14:30:00', 'value': 0}, {'time': '14:45:00', 'value': 0}, {'time': '15:00:00', 'value': 0}, {'time': '15:15:00', 'value': 0}, {'time': '15:30:00', 'value': 0}, {'time': '15:45:00', 'value': 0}, {'time': '16:00:00', 'value': 0}, {'time': '16:15:00', 'value': 0}, {'time': '16:30:00', 'value': 0}, {'time': '16:45:00', 'value': 0}, {'time': '17:00:00', 'value': 0}, {'time': '17:15:00', 'value': 0}, {'time': '17:30:00', 'value': 0}, {'time': '17:45:00', 'value': 0}, {'time': '18:00:00', 'value': 0}, {'time': '18:15:00', 'value': 0}, {'time': '18:30:00', 'value': 0}, {'time': '18:45:00', 'value': 0}, {'time': '19:00:00', 'value': 0}, {'time': '19:15:00', 'value': 0}, {'time': '19:30:00', 'value': 0}, {'time': '19:45:00', 'value': 0}, {'time': '20:00:00', 'value': 0}, {'time': '20:15:00', 'value': 0}, {'time': '20:30:00', 'value': 0}, {'time': '20:45:00', 'value': 0}, {'time': '21:00:00', 'value': 0}, {'time': '21:15:00', 'value': 0}, {'time': '21:30:00', 'value': 0}, {'time': '21:45:00', 'value': 0}, {'time': '22:00:00', 'value': 0}, {'time': '22:15:00', 'value': 0}, {'time': '22:30:00', 'value': 0}, {'time': '22:45:00', 'value': 0}, {'time': '23:00:00', 'value': 0}, {'time': '23:15:00', 'value': 0}, {'time': '23:30:00', 'value': 0}, {'time': '23:45:00', 'value': 0}]
date_time_obj = datetime(100,1,1,0,0,0)

for i in range(0, 96):
    time_only = date_time_obj.time()
    time_str = time_only.strftime("%H:%M:%S")
    isPresent = False
    for item in list:
        if time_str == item["time"]:
            isPresent = True
            break
    if not isPresent:
        new_item = {"time": time_str, "value": 0}
        list.append(new_item)
    date_time_obj = date_time_obj + timedelta(minutes=15)
list = sorted(list, key=lambda x:(x["time"]))

for i in range(0, 96):
    # if list[i]["time"] != list1[i]["time"]:
        print(i)
