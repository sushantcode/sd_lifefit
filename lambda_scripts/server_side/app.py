import os
import io
import boto3
from flask import Flask
import pandas as pd

app = Flask(__name__)

# Route to retrive the daily summary
@app.route('/getFitbitSummary/<string:fileName>')
def retrieveFitbitSummary(fileName):
    file = open("aws.txt")
    text = file.readlines()
    sname = ""
    reg_name = ""
    access_key = ""
    secret_key = ""

    for line in text:
        line = line.rstrip("\n")
        linetokens = list(line.split(","))
        sname = str(linetokens[0])
        reg_name = str(linetokens[1])
        access_key = str(linetokens[2])
        secret_key = str(linetokens[3])

    s3 = boto3.resource(
        service_name=sname,
        region_name=reg_name,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key
    )

    try:
        s3.Bucket('mobilebucket').Object(fileName).get()
    except:  # Will go here if no data on S3 for current day
        Summary = {
            "idd": 0,
            "activeScore": 0,
            "efficiency": 0,
            "restingHeartRate": 0,
            "OutOfRange": 0,
            "caloriesOut": 0,
            "SleepData": 0
        }
        return Summary

    obj = s3.Bucket('mobilebucket').Object(fileName).get()
    foo = pd.read_csv(obj['Body'])
    idd = 0
    activeScore = 0
    efficiency = 0
    restingHeartRate = 0
    outOfRange = 0
    caloriesOut = 0
    for index, row in foo.iterrows():
        idd = row['ID']
        activeScore = row['activeScore']
        efficiency = row['efficiency']
        restingHeartRate = row['restingHeartRate']
        outOfRange = row['(Out of Range)']
        caloriesOut = row['caloriesOut']
        SleepData = row['totalMinutesAsleep']

    Summary = {
        "idd": idd,
        "activeScore": activeScore,
        "efficiency": efficiency,
        "restingHeartRate": restingHeartRate,
        "OutOfRange": outOfRange,
        "caloriesOut": caloriesOut,
        "SleepData": SleepData
        }
    return Summary

# Function to get total for the day from the hourly data
@app.route('/getDailyTotal/<string:fileName>')
def retrieveHourlyData(fileName):
    file = open("aws.txt")
    text = file.readlines()
    sname=""
    reg_name=""
    access_key=""
    secret_key=""

    for line in text:
        line = line.rstrip("\n")
        linetokens = list(line.split(","))
        sname=str(linetokens[0])
        reg_name=str(linetokens[1])
        access_key=str(linetokens[2])
        secret_key=str(linetokens[3])


    s3 = boto3.resource(
        service_name=sname,
        region_name=reg_name,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key
    )
    try:
        obj = s3.Bucket('mobilebucket').Object(fileName).get()
    except: # Will go here if no data on S3 for current day
        HourlyData = [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0]]
        return HourlyData

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

    todayData = [hourlyCalories, hourlySteps, hourlyDistance,
                 hourlyFloors, hourlyElevation, sedentaryMinutes, lightlyActiveMinutes, veryActiveMinutes, fairlyActiveMinutes]
    todayData.append(hourlyHeartRate)

    dailyTotal = HourlyToDaily(todayData)
    result = {
           "DailyCalories": dailyTotal[0],
           "DailySteps": dailyTotal[1],
           "DailyDistance": dailyTotal[2],
           "DailyFloors": dailyTotal[3],
           "DailyElevation": dailyTotal[4],
           "sedentaryMinutes": dailyTotal[5],
           "ActiveMinutes": dailyTotal[6] + dailyTotal[7] + dailyTotal[8],
           "DailyHeartRate": dailyTotal[9]
        }
    return result

# this function sums up the hourly daily for each attribute
def HourlyToDaily(HourlyData):
    DailyCalories = sum(HourlyData[0])
    DailySteps = sum(HourlyData[1])
    DailyDistance = sum(HourlyData[2])
    DailyFloors = sum(HourlyData[3])
    DailyElevation = sum(HourlyData[4])
    DailyHeartRate = sum(HourlyData[9])
    DailyHeartRate = round(DailyHeartRate/24)

    DailyData = [DailyCalories, DailySteps, DailyDistance,
                 DailyFloors, DailyElevation, HourlyData[5], HourlyData[6], HourlyData[7], HourlyData[8], DailyHeartRate]
    return DailyData

if __name__ == '__main__':
    app.run(debug=True)
