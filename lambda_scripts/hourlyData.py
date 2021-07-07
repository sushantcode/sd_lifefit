from datetime import datetime, timedelta, date
import csv
from apiCalls import getActivities
from apiCalls import getCalories
from apiCalls import getSteps
from apiCalls import getDistance
from apiCalls import getFloors
from apiCalls import getElevation
from apiCalls import getHeart

def getIntraHeart(user_id, access_token, curr_date):
    heart_list = getHeart(user_id, access_token, curr_date)["activities-heart-intraday"]["dataset"]
    date_time_obj = datetime(100,1,1,0,0,0)

    for i in range(0, 96):
        time_only = date_time_obj.time()
        time_str = time_only.strftime("%H:%M:%S")
        isPresent = False
        for item in heart_list:
            if time_str == item["time"]:
                isPresent = True
                break
        if not isPresent:
            new_item = {"time": time_str, "value": 0}
            heart_list.append(new_item)
        date_time_obj = date_time_obj + timedelta(minutes=15)
    heart_list = sorted(heart_list, key=lambda x:(x["time"]))
    return heart_list

######## Get Intra day data for a day ###########

def getQuarterlyData(user_id, access_token, id):
    print("Getting reporting date...")
    today_date = date.today()
    last_day = today_date - timedelta(days=0)
    curr_date = last_day.strftime("%Y-%m-%d")
    print("Reporting date = ", curr_date)

    activity_summary = getActivities(user_id, access_token, curr_date)["summary"]
    intraday_calorie = getCalories(user_id, access_token, curr_date)["activities-calories-intraday"]["dataset"]
    intraday_steps = getSteps(user_id, access_token, curr_date)["activities-steps-intraday"]["dataset"]
    intraday_distance = getDistance(user_id, access_token, curr_date)["activities-distance-intraday"]["dataset"]
    intraday_floors = getFloors(user_id, access_token, curr_date)["activities-floors-intraday"]["dataset"]
    intraday_elevation = getElevation(user_id, access_token, curr_date)["activities-elevation-intraday"]["dataset"]
    intraday_heart = getIntraHeart(user_id, access_token, curr_date)

    if activity_summary and intraday_calorie and intraday_steps and intraday_distance and intraday_floors and intraday_elevation and intraday_heart:
        fileName = "Date_" + curr_date + "_User_id_" + id + "_hourlydata.csv"
        with open(fileName, "w", newline="") as file:
            csv_file = csv.writer(file, delimiter=",")
            csv_file.writerow(["time", "calories", "caloriesLevel", "caloriesMets", 
            "steps", "distance", "floors", "elevation", "heartRate", 
            "minutesSedentary", "minutesLightlyActive", "minutesFairlyActive", 
            "minutesVeryActive", "activityCalories", "caloriesBMR"])
            size = len(intraday_calorie)
            for i in range(0, size):
                if i == 0:
                    csv_file.writerow([intraday_calorie[i]["time"], intraday_calorie[i]["value"], intraday_calorie[i]["level"], intraday_calorie[i]["mets"], 
                    intraday_steps[i]["value"], intraday_distance[i]["value"], intraday_floors[i]["value"], 
                    intraday_elevation[i]["value"], intraday_heart[i]["value"], activity_summary["sedentaryMinutes"], activity_summary["lightlyActiveMinutes"], 
                    activity_summary["fairlyActiveMinutes"], activity_summary["veryActiveMinutes"], 
                    activity_summary["activityCalories"], activity_summary["caloriesBMR"]])
                else:
                    csv_file.writerow([intraday_calorie[i]["time"], intraday_calorie[i]["value"], intraday_calorie[i]["level"], intraday_calorie[i]["mets"], 
                    intraday_steps[i]["value"], intraday_distance[i]["value"], intraday_floors[i]["value"], 
                    intraday_elevation[i]["value"], intraday_heart[i]["value"]])
        print("Intraday data recorded successfully!")
    else:
        print("Could not get data")
