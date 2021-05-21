import pymongo
import boto3
import pandas as pd
from joblib import load
import numpy as np
import io


# Main logic controller of cron job
def calculateScores():
    #Load the classifier models
    print("Loading classifier models")
    model = load('xgboost.model')
    scaler = load('xgboost.scaler')

    #Get all the users
    users = getUsers()
    print("Users found: " + str(len(list(users.clone()))))

    #Iterate users into model
    for u in users:
        print("Classifying user: " + str(int(u["user_id"])))
        retrieveHealthStatus(u, model, scaler)



# Retrieve a list of all users in the database
def getUsers():
    #Connect to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017")
    db = client["novutree"]
    col = db["users"]

    return col.find() # Return list of all users



def retrieveHealthStatus(user, model, scaler):
    ID = str(int(user["user_id"]))
    num_data_fitbit = 0
    num_data_hourly = 0
    avg_calories = 0
    avg_calories_mets = 0
    avg_steps = 0
    avg_distance = 0
    avg_floors = 0
    avg_elevation = 0
    avg_heart_rate = 0
    avg_sleep_score = 0
    result = 0

    # Load access file information
    file = open("aws.txt")
    text = file.readlines()
    name=""
    reg_name=""
    access_key=""
    secret_key=""

    # Parse the file
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

    # Create instance to bucket
    bucket = s3.Bucket('mobilebucket')

    for obj in bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
    
        if(str(ID + '_fitbitdata') in key):
            summary = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories = summary.at[0,'caloriesOut']
            sleep_score = summary.at[0,'efficiency']
            # compute running total
            num_data_fitbit = num_data_fitbit + 1
            avg_calories = avg_calories + calories
            avg_sleep_score = avg_sleep_score + sleep_score
        
        if(str(ID + '_hourlydata') in key):
            hourly = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories_mets = hourly['caloriesMets'].sum() / (96 * 15)
            steps = hourly['steps'].sum()
            distance = hourly['distance'].sum()
            floors = hourly['floors'].sum()
            elevation = hourly['elevation'].sum()
            try: 
                heart_rate = hourly['heartRate'].sum() / 96
            except:
                heart_rate = 0

            # compute running total
            num_data_hourly = num_data_hourly + 1
            avg_calories_mets = avg_calories_mets + calories_mets
            avg_steps = avg_steps + steps
            avg_distance = avg_distance + distance
            avg_floors = avg_floors + floors
            avg_elevation = avg_elevation + elevation
            avg_heart_rate = avg_heart_rate + heart_rate

    try:
        avg_calories = avg_calories / num_data_fitbit
        avg_calories_mets = avg_calories_mets / num_data_hourly
        avg_steps = avg_steps / num_data_hourly
        avg_distance = avg_distance / num_data_hourly
        avg_floors = avg_floors / num_data_hourly
        avg_elevation = avg_elevation / num_data_hourly
        avg_heart_rate = avg_heart_rate / num_data_hourly
        avg_sleep_score = avg_sleep_score / num_data_fitbit
        

        age = 31
        # make the array
        test = [age, avg_calories, avg_calories_mets, avg_steps, avg_distance, avg_floors, avg_elevation, avg_heart_rate, avg_sleep_score]
    
        x = np.array([test])

        # compute the classification result
        result = int(model.predict(scaler.transform(x)))
    except:
        result = 0
        print("Error in processing")
    

    print("           Score: " + str(result))

    # update or write score to ml_user_score file in s3: first load the file from s3, then edit the file, then upload it back to s3.
    s3 = boto3.client( # note: boto3.client allows to do low level API calls whereas, boto3.resource allows only high level API calls
        service_name=sname,
        region_name=reg_name,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key
    )
    obj = s3.get_object(Bucket = 'mobilebucket', Key = 'ml_user_scores.csv')
    ml_scores = pd.read_csv(io.BytesIO(obj['Body'].read()), encoding='utf8')
    if int(ID) in ml_scores.values:
        d = {'userid':[int(ID)], 'score':[result]}
        dfn = pd.DataFrame(data=d)
        ml_scores.update(ml_scores[['userid']].merge(dfn, 'left'))
    else:
        ml_scores.loc[len(ml_scores.index)] = [int(ID), result]

    # Save file back
    ml_scores.to_csv('ml_user_scores.csv', sep=',', encoding='utf-8', index=False)
    s3.upload_file('ml_user_scores.csv','mobilebucket','ml_user_scores.csv')








# # # # # # # # # # # # # Start the script # # # # # # # # # # # # # # # # # #
calculateScores()