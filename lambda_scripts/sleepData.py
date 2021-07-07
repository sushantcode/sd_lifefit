from datetime import timedelta, date
import csv
from apiCalls import getSleeps


################### Get sleep data for the day ##############################
def getSleepData(user_id, access_token, id):
    print("Getting reporting date...")
    today_date = date.today()
    last_day = today_date - timedelta(days=0)
    curr_date = last_day.strftime("%Y-%m-%d")
    print("Reporting date = ", curr_date)

    sleep_response = getSleeps(user_id, access_token, curr_date)
    if sleep_response:
        fileName = "Date_" + curr_date + "_User_id_" + id + "_sleepdata.csv"
        with open(fileName, "w", newline="") as file:
            csv_file = csv.writer(file, delimiter=",")
            csv_file.writerow(["level", "seconds", "time"])
            if sleep_response["sleep"]:
                data = sleep_response["sleep"][0]['levels']['data']
                for item in data: 
                    time = item['dateTime'].split("T")[1]
                    level = item['level']
                    seconds = item['seconds']
                    csv_file.writerow([level, seconds, time])
        print("Sleep data recorded successfully!")
    else:
        print("Could not get the sleep data.")
