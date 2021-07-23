import os
import io
import boto3
from flask import Flask
import pandas as pd

app = Flask(__name__)

# Route to retrive the daily summary
def retrieveFitbitSummary(fileName):
    s3 = boto3.resource("s3")

    try:
        obj = s3.Bucket('mobilebucket').Object(fileName).get()
        foo = pd.read_csv(obj['Body'])
        idd = 0
        activeScore = 0
        efficiency = 0
        restingHeartRate = 0
        caloriesOut = 0
        SleepData = 0
        # outOfRange_caloriesOut = 0
        # outOfRange_min = 0
        # outOfRange_max = 0
        # outOfRange_minutes = 0
        # fatBurn_caloriesOut = 0
        # fatBurn_min = 0
        # fatBurn_max = 0
        # fatBurn_minutes = 0
        # cardio_caloriesOut = 0
        # cardio_min = 0
        # cardio_max = 0
        # cardio_minutes = 0
        # peak_caloriesOut = 0
        # peak_min = 0
        # peak_max = 0
        # peak_minutes = 0

        for index, row in foo.iterrows():
            idd = row['ID']
            activeScore = row['activeScore']
            efficiency = row['efficiency']
            restingHeartRate = row['restingHeartRate']
            caloriesOut = row['caloriesOut']
            SleepData = row['totalMinutesAsleep']
            # outOfRange_caloriesOut = row["caloriesOut.1"]
            # outOfRange_min = row("min")
            # outOfRange_max = row("max")
            # outOfRange_minutes = row("minutes")
            # fatBurn_caloriesOut = row("caloriesOut.2")
            # fatBurn_min = row("min.1")
            # fatBurn_max = row("max.1")
            # fatBurn_minutes = row("minutes.1")
            # cardio_caloriesOut = row("caloriesOut.3")
            # cardio_min = row("min.2")
            # cardio_max = row("max.2")
            # cardio_minutes = row("minutes.2")
            # peak_caloriesOut = row("caloriesOut.4")
            # peak_min = row("min.3")
            # peak_max = row("max.3")
            # peak_minutes = row("minutes.3")

        Summary = {
            "idd": idd,
            "activeScore": activeScore,
            "efficiency": efficiency,
            "restingHeartRate": restingHeartRate,
            "caloriesOut": caloriesOut,
            "SleepData": SleepData,
            }
        return Summary
    except:  # Will go here if no data on S3 for current day
        return {}
    

# Function to get total for the day from the hourly data
def retrieveHourlyData(fileName):
    s3 = boto3.resource("s3")
    
    try:
        obj = s3.Bucket('mobilebucket').Object(fileName).get()
        foo = pd.read_csv(obj['Body'])
        calories = []
        steps = []
        distance = []
        floors = []
        elevation = []
        veryActiveMinutes = []
        lightlyActiveMinutes = []
        sedentaryMinutes = []
        fairlyActiveMinutes = []
        heartRate = []

        for index, row in foo.iterrows():

            calories.append(row['calories'])
            steps.append(row['steps'])
            distance.append(row['distance'])
            floors.append(row['floors'])
            elevation.append(row['elevation'])
            veryActiveMinutes.append(row['minutesVeryActive'])
            lightlyActiveMinutes.append(row['minutesLightlyActive'])
            sedentaryMinutes.append(row['minutesSedentary'])
            fairlyActiveMinutes.append(row['minutesFairlyActive'])
            heartRate.append(row['heartRate'])

        hourlyCalories = []
        hourlySteps = []
        hourlyDistance = []
        hourlyFloors = []
        hourlyElevation = []
        hourlyHeartRate = []

        # conversions from data in increments of 15 minutes to hourly data
        for x in range(0, 95, 4):
            hourlyCalories.append(
                calories[x]+calories[x+1]+calories[x+2]+calories[x+3])
            hourlySteps.append(steps[x]+steps[x+1]+steps[x+2]+steps[x+3])
            hourlyDistance.append(
                distance[x]+distance[x+1]+distance[x+2]+distance[x+3])
            hourlyFloors.append(floors[x]+floors[x+1]+floors[x+2]+floors[x+3])
            hourlyElevation.append(
                elevation[x]+elevation[x+1]+elevation[x+2]+elevation[x+3])
            hourlyHeartRate.append(
                (heartRate[x]+heartRate[x+1]+heartRate[x+2]+heartRate[x+3])/4)
        lightlyActiveMinutes = lightlyActiveMinutes[0]
        sedentaryMinutes = sedentaryMinutes[0]
        fairlyActiveMinutes = fairlyActiveMinutes[0]
        veryActiveMinutes = veryActiveMinutes[0]

        hourlyData = {
                "hourlyCalories": hourlyCalories, 
                "hourlySteps": hourlySteps,
                "hourlyDistance": hourlyDistance,
                "hourlyFloors": hourlyFloors,
                "hourlyElevation": hourlyElevation,
                "sedentaryMinutes": sedentaryMinutes, 
                "lightlyActiveMinutes": lightlyActiveMinutes,
                "veryActiveMinutes": veryActiveMinutes,
                "fairlyActiveMinutes": fairlyActiveMinutes,
                "hourlyHeartRate": hourlyHeartRate
            }
        return hourlyData
    except: # Will go here if no data on S3 for current day
        return {}
    

# this function sums up the hourly daily for each attribute
@app.route('/getDailyTotal/<string:uid>/<string:date>')
def HourlyToDaily(uid="", date=""):
    fileName1 = "Date_" + date + "_User_id_" + uid + "_hourlydata.csv"
    fileName2 = "Date_" + date + "_User_id_" + uid + "_fitbitdata.csv"
    HourlyData = retrieveHourlyData(fileName1)
    SleepData = retrieveFitbitSummary(fileName2)
    DailyCalories = sum(HourlyData["hourlyCalories"])
    DailySteps = sum(HourlyData["hourlySteps"])
    DailyDistance = sum(HourlyData["hourlyDistance"])
    DailyFloors = sum(HourlyData["hourlyFloors"])
    DailyElevation = sum(HourlyData["hourlyElevation"])
    DailyHeartRate = sum(HourlyData["hourlyHeartRate"])
    DailyHeartRate = round(DailyHeartRate/24)

    result = {
        "DailyCalories": DailyCalories,
        "DailySteps": DailySteps,
        "DailyDistance": DailyDistance,
        "DailyFloors": DailyFloors,
        "DailyElevation": DailyElevation,
        "sedentaryMinutes": HourlyData["sedentaryMinutes"],
        "ActiveMinutes": HourlyData["lightlyActiveMinutes"] + HourlyData["veryActiveMinutes"] + HourlyData["fairlyActiveMinutes"],
        "DailyHeartRate": DailyHeartRate,
        "SleepData": SleepData
        }
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
