#!/usr/bin/env python
# coding: utf-8

# # 1. Import and Install All necessary libraries for health score calculation

# In[107]:


pip install papermill[all]


# In[108]:


get_ipython().system('pip install pickle5')


# In[109]:


pip install scikit-learn==0.22.2.post1


# In[110]:


import boto3, re, sys, math, json, os, sagemaker, urllib.request, tempfile, joblib
from sagemaker import get_execution_role
import numpy as np
import pandas as pd
import random
import matplotlib.pyplot as plt
from IPython.display import Image
from IPython.display import display
from time import gmtime, strftime
from sagemaker.predictor import csv_serializer
from sklearn.tree import DecisionTreeClassifier
import seaborn as sns
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, recall_score, precision_score, f1_score, roc_auc_score,accuracy_score
from sklearn.metrics import precision_recall_fscore_support
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import export_graphviz
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.naive_bayes import CategoricalNB
from sklearn.model_selection import RandomizedSearchCV
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import KFold
import pickle5 as pickle
from joblib import load
from sagemaker import get_execution_role
from io import BytesIO
import decimal
import pprint as pp
import io
from datetime import date


# # 2. Connect to "mlbucketstatefarm" s3 bucket and get .sav file for ML Model

# In[5]:


s3_resource = boto3.client('s3')
bucket_name = "mlbucketstatefarm"
key = "finalized_model_rfc.sav"


# READ
with tempfile.TemporaryFile() as fp:
    s3_resource.download_fileobj(Fileobj=fp, Bucket=bucket_name, Key=key)
    fp.seek(0)
    ml_model = joblib.load(fp)


# In[111]:


ml_model


# # 3. Get Role of sagemaker notebook

# In[7]:


role = get_execution_role()
role


# # 4. Display all contents of "mlbucketstatefarm"

# In[8]:


bucket = 'mlbucketstatefarm'
subfolder = ''
conn = boto3.client('s3')
contents = conn.list_objects(Bucket=bucket, Prefix=subfolder)['Contents']
files = []
for f in contents:
    print(f['Key'])
    files.append(f)


# # Convert .sav ml model to bytes

# In[9]:


from io import BytesIO
import joblib

bytes_container = BytesIO()
joblib.dump(ml_model, bytes_container)
bytes_container.seek(0)  # update to enable reading

bytes_model = bytes_container.read()


# # Connect to dynamodb table and get all user-ids and age for each user

# In[112]:


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserDetails-y243fkkjqreqpiwavsqlwjf62a-dev')
in_table = table.scan()

response = in_table['Items']
user_ids = []
ages_for_users = []
for i in range(len(response)):
    uid = response[i]['id']
    age = int(response[i]['age'])
    user_ids.append(uid)
    ages_for_users.append(age)

print(user_ids)
print(ages_for_users)


# # Connect to S3 bucket "mobilebucket" and get all users' health data. Calculate health Score for that particular day. Every day score calculation.

# In[121]:


s3 = boto3.resource('s3') 
the_bucket = s3.Bucket('mobilebucket')

avg_calories = 0
avg_sleep_score = 0
from datetime import date
today = date.today()
d1 = today.strftime("%Y-%m-%d")
print("d1 =", d1)
results = []
count = 0
dates = []


for userid in user_ids:
    num_data_fitbit = 0
    num_data_hourly = 0
    calories = 0
    calories_mets = 0
    steps = 0
    distance = 0
    floors = 0
    heart_rate = 0
    sleep_score = 0
    for obj in the_bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
        
        con1 = ('Date_'+str(d1)+'_User_id_'+str(userid)+'_fitbitdata.csv')
        con2 = ('Date_'+str(d1)+'_User_id_'+str(userid)+'_hourlydata.csv')
        if con1 in key:
            summary = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories = summary.at[0,'caloriesOut']
            sleep_score = summary.at[0,'efficiency']
        if con2 in key:
            hourly = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories_mets = hourly['caloriesMets'].sum() / (96 * 15)
            steps = hourly['steps'].sum()
            distance = hourly['distance'].sum()
            floors = hourly['floors'].sum()
            elevation = hourly['elevation'].sum()
            try:
                heart_rate = hourly['heartRate'].sum()/96
            except:
                heart_rate = 0
    age = ages_for_users[count]
    print("User id : {}, Age : {}, calories : {}, calories_mets : {}, steps : {}, distance : {},    floors : {}, heart rate : {}, sleep score : {}".format(userid,age,calories, calories_mets, steps,          distance, floors, heart_rate, sleep_score))
    temp_list = [age,calories, calories_mets, steps, distance, floors,heart_rate, sleep_score]   
    x = np.array([temp_list])
    result = int(ml_model.predict(x))
    if result == 8:
        result = random.randint(8,10)
    results.append(result)
    dates.append(d1)
    count = count + 1
#health_score_daily = pd.DataFrame({'userid': user_ids,'healthscore': results})
health_score_daily = pd.DataFrame({'userid': user_ids,'healthscore': results,'on_date':dates})


# # Connect to S3 bucket "mobilebucket" and get all users' health data. Calculate Health Score for historical data of each user.

# In[13]:


s3 = boto3.resource('s3') 
the_bucket = s3.Bucket('mobilebucket')

from datetime import date
today = date.today()
results = []
count = 0



for userid in user_ids:
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
    for obj in the_bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
        con1 = (str(userid)+'_fitbitdata.csv')
        con2 = (str(userid)+'_hourlydata.csv')
        if con1 in key:
            summary = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories = summary.at[0,'caloriesOut']
            sleep_score = summary.at[0,'efficiency']
            num_data_fitbit = num_data_fitbit + 1
            avg_calories = avg_calories + calories
            avg_sleep_score = avg_sleep_score + sleep_score
        if con2 in key:
            hourly = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories_mets = hourly['caloriesMets'].sum() / (96 * 15)
            steps = hourly['steps'].sum()
            distance = hourly['distance'].sum()
            floors = hourly['floors'].sum()
            elevation = hourly['elevation'].sum()
            try:
                heart_rate = hourly['heartRate'].sum()/96
            except:
                heart_rate = 0
            num_data_hourly = num_data_hourly + 1
            avg_calories_mets = avg_calories_mets + calories_mets
            avg_steps = avg_steps + steps
            avg_distance = avg_distance + distance
            avg_floors = avg_floors + floors
            avg_elevation = avg_elevation + elevation
            avg_heart_rate = avg_heart_rate + heart_rate
            
            
        if(num_data_fitbit == 0 or num_data_hourly == 0):
            num_data_fitbit = 1
            num_data_hourly = 1
            avg_calories = 0
            avg_calories = 0
            avg_calories_mets = 0
            avg_steps = 0
            avg_distance = 0
            avg_floors = 0
            avg_elevation = 0
            avg_heart_rate = 0
            avg_sleep_score = 0
        
    avg_calories = avg_calories / num_data_fitbit
    avg_calories_mets = avg_calories_mets / num_data_hourly
    avg_steps = avg_steps / num_data_hourly
    avg_distance = avg_distance / num_data_hourly
    avg_floors = avg_floors / num_data_hourly
    avg_elevation = avg_elevation / num_data_hourly
    avg_heart_rate = avg_heart_rate / num_data_hourly
    avg_sleep_score = avg_sleep_score / num_data_fitbit
        
    
    
    age = ages_for_users[count]
    print("User id : {}, Age : {}, calories : {}, calories_mets : {}, steps : {}, distance : {},    floors : {}, heart rate : {}, sleep score : {}".format(userid,age,avg_calories, avg_calories_mets, avg_steps,          avg_distance, avg_floors, avg_heart_rate, avg_sleep_score))
    temp_list = [age,avg_calories, avg_calories_mets, avg_steps,avg_distance, avg_floors, avg_heart_rate, avg_sleep_score]  
    x = np.array([temp_list])
    result = int(ml_model.predict(x))
    results.append(result)
    if result == 8:
        result = random.randint(8,10)
    count = count + 1
health_score_historical = pd.DataFrame({'userid': user_ids,'healthscore': results})


# In[14]:


health_score_historical


# In[14]:


# table_update = boto3.resource('dynamodb').Table('UserDetails-y243fkkjqreqpiwavsqlwjf62a-dev')
for index,row in health_score_daily.iterrows():

    # get item
    response = table.get_item(Key={'id': str(row['userid'])})
    item = response['Item']

    # update
    item['score'] = int(row['healthscore'])

    # put (idempotent)
    table.put_item(Item=item)


# # Simulation of Score Drop and Increase.

# In[86]:


#So if we have 7 days worth of data and 21 days worth of data added on to it how would it affect the health score
#This would happen in the code written above but since we don't have data we have to simulate it.
#Let's assume some values for the user_id of 
#"2cb32af6-acd1-43e1-91fe-db8e3b695ff5". Currently the health_score is 5. Let's see if we can increase it to 7 or 8
# by giving it high values

age = 31
avg_calories = 1638
avg_calories_mets = 9.895833333333334
avg_steps = 7234
avg_distance = 4.23
avg_floors = 7
avg_heart_rate = 77
avg_sleep_score = 85


temp_list = [age,avg_calories, avg_calories_mets, avg_steps,avg_distance, avg_floors,avg_heart_rate, avg_sleep_score]  
x = np.array([temp_list])
result = int(ml_model.predict(x))
print("Current result after 7 Days worth of data collection is : ",result)


# In[87]:


for i in range(21):
    avg_calories = avg_calories + random.randint(3000,3500)
    avg_calories_mets = avg_calories_mets + random.uniform(10.0,12.5)
    avg_steps = avg_steps + random.randint(9500,10000)
    avg_distance = avg_distance + random.uniform(5.5,6.5)
    avg_floors = avg_floors + random.randint(15,20)
    avg_heart_rate = avg_heart_rate + random.randint(55,70)
    avg_sleep_score = avg_sleep_score + random.randint(90,95)
    
    
avg_calories = avg_calories/(i+1)
avg_calories_mets = avg_calories_mets/(i+1)
avg_steps = avg_steps/(i+1)
avg_distance = avg_distance/(i+1)
avg_floors = avg_floors/(i+1)
avg_heart_rate = avg_heart_rate/(i+1)
avg_sleep_score = avg_sleep_score/(i+1)
print(i,age,avg_calories, avg_calories_mets, avg_steps,          avg_distance, avg_floors, avg_heart_rate, avg_sleep_score)


# In[89]:


temp_list = [age,avg_calories, avg_calories_mets, avg_steps,avg_distance, avg_floors,avg_heart_rate, avg_sleep_score]  
x = np.array([temp_list])
result = int(ml_model.predict(x))
print("Heatlh Score after {} days worth of data collected is {}".format(i+1,result))


# # Uploading and Updating Health_score_daily to s3 bucket to keep track of each user's health score for record

# In[115]:


csv_files = []
for s in user_ids:
    for obj in the_bucket.objects.all():
        key = obj.key
    #body = obj.get()['Body'].read()
        con3 = ("User_id_"+str(s)+"_scorehistory.csv")
        if con3 in key:
            if key not in csv_files:
                csv_files.append(key)
        else:
            if con3 not in csv_files:
                csv_files.append(con3)


# In[116]:


csv_files


# In[150]:


s3 = boto3.resource('s3') 
the_bucket = s3.Bucket('mobilebucket')
keys_in_bucket = []
for file in the_bucket.objects.all():
    keys_in_bucket.append(file.key)


# In[169]:


s3 = boto3.client('s3') 
which = 0
for index,e in health_score_daily.iterrows():  
    if csv_files[which] not in keys_in_bucket:
        temp_list = [[str(e["userid"]),int(e["healthscore"]),str(e["on_date"])]]
        temp_df = pd.DataFrame(temp_list)
        bytes_to_write = temp_df.to_csv(None, header=['userid','healthscore','on_date'], index=False).encode()
        s3.put_object(Body=bytes_to_write,Bucket="mobilebucket",Key=csv_files[which]) 
    elif csv_files[which] in keys_in_bucket:
        current_data = s3.get_object(Bucket='mobilebucket', Key=csv_files[which])
        df = pd.read_csv(io.BytesIO(current_data['Body'].read()), encoding='utf8')
        temp_list = [[str(e["userid"]),int(e["healthscore"]),str(e["on_date"])]]
        df = df.append(pd.DataFrame(temp_list, columns=['userid','healthscore','on_date']))
        bytes_to_write = df.to_csv(None,header=['userid','healthscore','on_date'],index=False).encode()
        s3.put_object(Body=bytes_to_write,Bucket="mobilebucket",Key=csv_files[which]) 
    which = which + 1


# In[ ]:




