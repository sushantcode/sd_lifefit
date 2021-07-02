import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore import endpoint
import requests
import base64
import json
from datetime import date
from datetime import timedelta
import csv

# Global Initialization of AWS dynamoDb

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# Instantiate a table resource object without actually
# creating a DynamoDB table. Note that the attributes of this table
# are lazy-loaded: a request is not made nor are the attribute
# values populated until the attributes
# on the table resource are accessed or its load() method is called.
table = dynamodb.Table('FitbitTokens-y243fkkjqreqpiwavsqlwjf62a-dev')

def getSleepData(user_id, access_token, id):
    print("Getting today's date...")
    curr_date = date.today()
    last_date = curr_date - timedelta(days=1)
    today_date = last_date.strftime("%Y-%m-%d")
    print("Today's date = ", today_date)

    endpoint = "https://api.fitbit.com/1.2/user/" + user_id + "/sleep/date/" + today_date + ".json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    if response.status_code == 200:
        resJson = response.json()
        fileName = "Date_" + today_date + "_User_id_" + id + "_sleepdata.csv"
        with open(fileName, "w", newline="") as file:
            csv_file = csv.writer(file, delimiter=",")
            csv_file.writerow(["level", "seconds", "time"])
            if resJson["sleep"]:
                data = resJson["sleep"][0].levels.data
                for item in data: 
                    time = item.datatime.split("T")[1]
                    level = item.level
                    seconds = item.seconds
                    csv_file.writerow([level, seconds, time])
            else:
                csv_file.writerow(["", 0, ""])
        file.close()

def updateToken(newTokens, id):
    table.update_item(
        Key={
            'id': id
        },
        UpdateExpression='SET access_token = :val1, refresh_token = :val2',
        ExpressionAttributeValues={
            ':val1': newTokens['access_token'],
            ':val2': newTokens['refresh_token']
        }
    )

def getNewTokens(refreshToken):
    endPoint = 'https://api.fitbit.com/oauth2/token'
    client_id = '23B8HB'
    client_secret = '6f49618da8da741629d35f179eae8eca'
    combinedStr = client_id + ':' + client_secret
    encodedBytes = base64.b64encode(combinedStr.encode('utf-8'))
    encodedStr = str(encodedBytes, 'utf-8')
    header = {'Authorization': 'Basic ' + encodedStr, 'Content-Type': 'application/x-www-form-urlencoded'}
    parameters = {'grant_type': 'refresh_token', 'refresh_token': refreshToken}
    response = requests.post(endPoint, headers=header, params=parameters)
    if response.status_code == 200:
        jsonRespone = response.json()
        return jsonRespone
    else:
        return None

if __name__ == "__main__":
    response = table.scan()
    items = response['Items']
    for eachRecord in items:
        # # To update tokens in database
        # print("Calling for new tokens...")
        # newTokens = getNewTokens(eachRecord['refresh_token'])
        # if not newTokens:
        #     print("Error fetching new tokens. Please check the credentials.")
        # else:
        #     print("New tokens received successfully...")
        #     print("Updating database with new tokens...")
        #     updateToken(newTokens, eachRecord['id'])
        #     print("Database updated successfully!!!")

        # To get Sleep data
        getSleepData(eachRecord['user_id'], eachRecord['access_token'], eachRecord["id"])
        
        