import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore import endpoint
from refreshTokens import getNewTokens
from hourlyData import getQuarterlyData
from sleepData import getSleepData

############### Tests Import ##############
from apiCalls import getActivities
from apiCalls import getSleeps
from apiCalls import getHeart


# Global Initialization of AWS dynamoDb

# Get the service resource.

dynamodb = boto3.resource('dynamodb')

# Instantiate a table resource object without actually
# creating a DynamoDB table. Note that the attributes of this table
# are lazy-loaded: a request is not made nor are the attribute
# values populated until the attributes
# on the table resource are accessed or its load() method is called.

table = dynamodb.Table('FitbitTokens-y243fkkjqreqpiwavsqlwjf62a-dev')


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
    # response = table.scan()
    # items = response["Items"]
    # for eachRecord in items:
    #     # To update tokens in database
    #     print("Calling for new tokens...")
    #     newTokens = getNewTokens(eachRecord['refresh_token'])
    #     if not newTokens:
    #         print("Error fetching new tokens. Please check the credentials.")
    #         exit()
    #     else:
    #         print("New tokens received successfully...")
    #         print("Updating database with new tokens...")
    #         updateToken(newTokens, eachRecord['id'])
    #         print("Database updated successfully!!!")
    access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkMySjIiLCJzdWIiOiI5Q1BTVzUiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNjI1NTQzMjgxLCJpYXQiOjE2MjU1MTQ0ODF9.dQ3-t_xIaYvC0wqt1N_Hv7WFW5xUHRzMNsHlnjZuiak"
    user_id = "9CPSW5"
    id = "2cb32af6-acd1-43e1-91fe-db8e3b695ff5"
    # getSleepData(user_id, access_token, id)
    # getQuarterlyData(user_id, access_token, id)
    print(getHeart(user_id, access_token, "2021-07-04"))