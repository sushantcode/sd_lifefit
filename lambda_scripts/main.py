import boto3
from boto3.dynamodb.conditions import Key, Attr
import requests
import base64
import json

# Global Initialization of AWS dynamoDb

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# Instantiate a table resource object without actually
# creating a DynamoDB table. Note that the attributes of this table
# are lazy-loaded: a request is not made nor are the attribute
# values populated until the attributes
# on the table resource are accessed or its load() method is called.
table = dynamodb.Table('FitbitTokens-y243fkkjqreqpiwavsqlwjf62a-dev')

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
    jsonRespone = response.json()
    return jsonRespone

if __name__ == "__main__":
    response = table.scan()
    items = response['Items']
    for eachRecord in items:
        newTokens = getNewTokens(eachRecord['refresh_token'])
        updateToken(newTokens, eachRecord['id'])