from datetime import datetime, timedelta, date
import csv
from apiCalls import getActivities
from apiCalls import getSleeps

# restingHeartRate,(Out of Range),caloriesOut,min,max,minutes,(Fat Burn),caloriesOut,min,max,minutes,(Cardio),caloriesOut,min,max,minutes,(Peak),caloriesOut,min,max,minutes,


def activitiesRelatedData(user_id, access_token, curr_date):
    activity_data = {
            "activeScore": 0,
            "caloriesOut": 0,
            "trackerdistance": 0,
            "loggedActivitiesdistance": 0
        }
    activity_response = getActivities(user_id, access_token, curr_date)
    activity_data["activeScore"] = activity_response["summary"]["activeScore"]
    activity_data["caloriesOut"] = activity_response["summary"]["caloriesOut"]
    for item in activity_response["summary"]["distances"]:
        if item["activity"] == "tracker":
            activity_data["trackerdistance"] = item["distance"]
        elif item["activity"] == "loggedActivities":
            activity_data["loggedActivitiesdistance"] = item["distance"]
    return activity_data

def sleepRelatedData(user_id, access_token, curr_date):
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
    sleep_response = getSleeps(user_id, access_token, curr_date)
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
