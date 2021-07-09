import csv

################### Get sleep data for the day ##############################
def getSleepData(curr_date, id, sleep_response):
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
        return fileName
    else:
        print("Could not get the sleep data.")
