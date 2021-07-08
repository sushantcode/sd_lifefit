import csv
from datetime import datetime
import calendar

def activitiesRelatedData(activity_response):
    activity_data = {
            "activeScore": 0,
            "caloriesOut": 0,
            "trackerdistance": 0,
            "loggedActivitiesdistance": 0
        }
    activity_data["activeScore"] = activity_response["summary"]["activeScore"]
    activity_data["caloriesOut"] = activity_response["summary"]["caloriesOut"]
    for item in activity_response["summary"]["distances"]:
        if item["activity"] == "tracker":
            activity_data["trackerdistance"] = item["distance"]
        elif item["activity"] == "loggedActivities":
            activity_data["loggedActivitiesdistance"] = item["distance"]
    return activity_data

def sleepRelatedData(sleep_response):
    sleep_data = {
            "duration": 0,
            "efficiency": 0,
            "totalMinutesAsleep": 0,
            "deepCount": 0,
            "deepMinutes": 0,
            "deepAvg": 0,
            "lightCount": 0,
            "lightMinutes": 0,
            "lightAvg": 0,
            "remCount": 0,
            "remMinutes": 0,
            "remAvg": 0,
            "wakeCount": 0,
            "wakeMinutes": 0,
            "wakeAvg": 0,
            "minutesAwake": 0,
            "timeToSleep": 0,
            "startTime": ""
        }

    if sleep_response["sleep"]:
        for item in sleep_response["sleep"]:
            if item["isMainSleep"]:
                sleep_data["duration"] = item["duration"]
                sleep_data["efficiency"] = item["efficiency"]
                sleep_data["totalMinutesAsleep"] = item["minutesAsleep"]
                sleep_data["deepCount"] = item["levels"]["summary"]["deep"]["count"]
                sleep_data["deepMinutes"] = item["levels"]["summary"]["deep"]["minutes"]
                sleep_data["deepAvg"] = item["levels"]["summary"]["deep"]["thirtyDayAvgMinutes"]
                sleep_data["lightCount"] = item["levels"]["summary"]["light"]["count"]
                sleep_data["lightMinutes"] = item["levels"]["summary"]["light"]["minutes"]
                sleep_data["lightAvg"] = item["levels"]["summary"]["light"]["thirtyDayAvgMinutes"]
                sleep_data["remCount"] = item["levels"]["summary"]["rem"]["count"]
                sleep_data["remMinutes"] = item["levels"]["summary"]["rem"]["minutes"]
                sleep_data["remAvg"] = item["levels"]["summary"]["rem"]["thirtyDayAvgMinutes"]
                sleep_data["wakeCount"] = item["levels"]["summary"]["wake"]["count"]
                sleep_data["wakeMinutes"] = item["levels"]["summary"]["wake"]["minutes"]
                sleep_data["wakeAvg"] = item["levels"]["summary"]["wake"]["thirtyDayAvgMinutes"]
                sleep_data["minutesAwake"] = item["minutesAwake"]
                sleep_data["timeToSleep"] = item["minutesToFallAsleep"]
                sleep_data["startTime"] = item["startTime"].split("T")[1]
    return sleep_data

def heartRelatedData(heart_response):
    heart_data = {
            "restingHeartRate": -1,
            "(Out of Range)": -1,
            "caloriesOut1": 0,
            "min1": 0,
            "max1": 0,
            "minutes1": 0,
            "(Fat Burn)": -1,
            "caloriesOut2": 0,
            "min2": 0,
            "max2": 0,
            "minutes2": 0,
            "(Cardio)": -1,
            "caloriesOut3": 0,
            "min3": 0,
            "max3": 0,
            "minutes3": 0,
            "(Peak)": -1,
            "caloriesOut4": 0,
            "min4": 0,
            "max4": 0,
            "minutes4": 0
        }

    if heart_response["activities-heart"]:
        heart_value = heart_response["activities-heart"][0]["value"]
        if "restingHeartRate" in heart_value:
            heart_data["restingHeartRate"] = heart_value["restingHeartRate"]

        for item in heart_value["heartRateZones"]:
            if item["name"] == "Out of Range":
                heart_data["caloriesOut1"] = item["caloriesOut"]
                heart_data["min1"] = item["min"]
                heart_data["max1"] = item["max"]
                heart_data["minutes1"] = item["minutes"]
            elif item["name"] == "Fat Burn":
                heart_data["caloriesOut2"] = item["caloriesOut"]
                heart_data["min2"] = item["min"]
                heart_data["max2"] = item["max"]
                heart_data["minutes2"] = item["minutes"]
            elif item["name"] == "Cardio":
                heart_data["caloriesOut3"] = item["caloriesOut"]
                heart_data["min3"] = item["min"]
                heart_data["max3"] = item["max"]
                heart_data["minutes3"] = item["minutes"]
            elif item["name"] == "Peak":
                heart_data["caloriesOut4"] = item["caloriesOut"]
                heart_data["min4"] = item["min"]
                heart_data["max4"] = item["max"]
                heart_data["minutes4"] = item["minutes"]
    return heart_data

def getFitbitSummary(curr_date, id, activities, sleeps, heart):
    activities_col = activitiesRelatedData(activities)
    sleep_col = sleepRelatedData(sleeps)
    heart_col = heartRelatedData(heart)

    curr_datetime = datetime.now()
    dayName = calendar.day_name[curr_datetime.weekday()][0:3]
    month = calendar.month_name[curr_datetime.weekday()][0:3]
    dayNum = curr_datetime.strftime("%m")
    year = curr_datetime.strftime("%Y")
    time = curr_datetime.time().strftime("%H:%M:%S")
    datetime_now = dayName + " " + month + " " + dayNum + " " + time + " " + "CDT " + year

    fileName = "Date_" + curr_date + "_User_id_" + id + "_hourlydata.csv"
    with open(fileName, "w", newline="") as file:
        csv_file = csv.writer(file, delimiter=",")
        csv_file.writerow(["ID", "Date", "activeScore", "caloriesOut", "trackerdistance", "loggedActivitiesdistance", 
            "duration", "efficiency", "totalMinutesAsleep", "restingHeartRate", "(Out of Range)", "caloriesOut", 
            "min", "max", "minutes", "(Fat Burn)", "caloriesOut", "min", "max", "minutes", "(Cardio)", "caloriesOut", 
            "min", "max", "minutes", "(Peak)", "caloriesOut", "min", "max", "minutes", "deepCount", "deepMinutes", 
            "deepAvg", "lightCount", "lightMinutes", "lightAvg", "remCount", "remMinutes", "remAvg", "wakeCount", 
            "wakeMinutes", "wakeAvg", "minutesAwake", "timeToSleep", "startTime"])
        csv_file.writerow([id, datetime_now, activities_col["activeScore"], activities_col["caloriesOut"], 
                activities_col["trackerdistance"], activities_col["loggedActivitiesdistance"], 
                sleep_col["duration"], sleep_col["efficiency"], sleep_col["totalMinutesAsleep"], 
                heart_col["restingHeartRate"], 
                heart_col["(Out of Range)"], heart_col["caloriesOut1"], heart_col["min1"], heart_col["max1"], heart_col["minutes1"],
                heart_col["(Fat Burn)"], heart_col["caloriesOut2"], heart_col["min2"], heart_col["max2"], heart_col["minutes2"],
                heart_col["(Cardio)"], heart_col["caloriesOut3"], heart_col["min3"], heart_col["max3"], heart_col["minutes3"],
                heart_col["(Peak)"], heart_col["caloriesOut4"], heart_col["min4"], heart_col["max4"], heart_col["minutes4"],
                sleep_col["deepCount"], sleep_col["deepMinutes"], sleep_col["deepAvg"], 
                sleep_col["lightCount"], sleep_col["lightMinutes"], sleep_col["lightAvg"], 
                sleep_col["remCount"], sleep_col["remMinutes"], sleep_col["remAvg"],
                sleep_col["wakeCount"], sleep_col["wakeMinutes"], sleep_col["wakeAvg"],
                sleep_col["minutesAwake"], sleep_col["timeToSleep"], sleep_col["startTime"]])
    print("Intraday data recorded successfully!")