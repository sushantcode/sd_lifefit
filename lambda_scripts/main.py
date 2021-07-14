import os
import boto3
from datetime import timedelta, date

############### Token Api Calls ###################
from refreshTokens import getNewTokens

############### Health data Api calls #############
from apiCalls import getActivities, getSleeps, getHeart, getCalories, getDistance
from apiCalls import getElevation, getFloors, getSteps

############## Formatted data #####################
from hourlyData import getQuarterlyData
from sleepData import getSleepData
from fitbitSummaryData import getFitbitSummary


# Global Initialization of AWS dynamoDb

# Get the service resource.

dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')

# Instantiate a table resource object without actually
# creating a DynamoDB table. Note that the attributes of this table
# are lazy-loaded: a request is not made nor are the attribute
# values populated until the attributes
# on the table resource are accessed or its load() method is called.

table = dynamodb.Table('FitbitTokens-y243fkkjqreqpiwavsqlwjf62a-dev')

####################### Get current date ###########################
def getDate():
    print("Getting reporting date...")
    today_date = date.today()
    last_day = today_date - timedelta(days=0)
    curr_date = last_day.strftime("%Y-%m-%d")
    print("Reporting date = ", curr_date)
    return curr_date

####################### Update new tokens in database ###########################
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

########################### Main function module ###################################
if __name__ == "__main__":
    response = table.scan()
    items = response["Items"]
    for eachRecord in items:
        # To update tokens in database
        print("Calling for new tokens...")
        newTokens = getNewTokens(eachRecord['refresh_token'])
        if not newTokens:
            print("Error fetching new tokens. Please check the credentials.")
            exit()
        else:
            print("New tokens received successfully...")
            print("Updating database with new tokens...")
            updateToken(newTokens, eachRecord['id'])
            print("Database updated successfully!!!")
            access_token = newTokens['access_token']
            user_id = eachRecord['user_id']
            id = eachRecord['id']

            curr_date = getDate()

            # Make Api calls to get all health data
            activities = getActivities(user_id, access_token, curr_date)
            sleeps = getSleeps(user_id, access_token, curr_date)
            heart = getHeart(user_id, access_token, curr_date)
            calories = getCalories(user_id, access_token, curr_date)
            distance = getDistance(user_id, access_token, curr_date)
            elevation = getElevation(user_id, access_token, curr_date)
            floors = getFloors(user_id, access_token, curr_date)
            steps = getSteps(user_id, access_token, curr_date)

            sleep_file = getSleepData(curr_date, id, sleeps)
            hourly_file = getQuarterlyData(curr_date, id, activities, calories, steps, distance, floors, elevation, heart)
            summary_file = getFitbitSummary(curr_date, id, activities, sleeps, heart)
            s3.Bucket("mobilebucket").upload_file(Filename=sleep_file, Key=sleep_file)
            s3.Bucket("mobilebucket").upload_file(Filename=hourly_file, Key=hourly_file)
            s3.Bucket("mobilebucket").upload_file(Filename=summary_file, Key=summary_file)
            os.remove(sleep_file)
            os.remove(hourly_file)
            os.remove(summary_file)