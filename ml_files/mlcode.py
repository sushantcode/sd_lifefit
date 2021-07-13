#!/usr/bin/env python
# coding: utf-8

# In[79]:


import boto3, re, sys, math, json, os, sagemaker, urllib.request
from sagemaker import get_execution_role
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import Image
from IPython.display import display
from time import gmtime, strftime
from sagemaker.predictor import csv_serializer


# In[80]:


pip install scikit-learn==0.22.2.post1


# In[81]:


get_ipython().system('pip install pickle5')


# In[82]:


import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import numpy as np
import pandas as pd
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


# In[83]:


bucket = 'mlbucketstatefarm'
subfolder = ''


# In[84]:


from sagemaker import get_execution_role
role = get_execution_role()


# In[85]:


role


# In[86]:


conn = boto3.client('s3')
contents = conn.list_objects(Bucket=bucket, Prefix=subfolder)['Contents']
files = []
for f in contents:
    print(f['Key'])
    files.append(f)


# In[87]:


bucket='mlbucketstatefarm'
data_key = 'rfc_model_saved.sav'
data_location = 's3://{}/{}'.format(bucket, data_key)


# # from s3fs.core import S3FileSystem
# s3_file = S3FileSystem()
# 
# loaded_model = pickle.load(open(data_location,'rb'))

# In[88]:


from io import BytesIO
def read_joblib(path):
    ''' 
       Function to load a joblib file from an s3 bucket or local directory.
       Arguments:
       * path: an s3 bucket or local directory path where the file is stored
       Outputs:
       * file: Joblib file loaded
    '''

    # Path is an s3 bucket
    if path[:5] == 's3://':
        s3_bucket, s3_key = path.split('/')[2], path.split('/')[3:]
        s3_key = '/'.join(s3_key)
        with BytesIO() as f:
            boto3.client("s3").download_fileobj(Bucket=s3_bucket, Key=s3_key, Fileobj=f)
            f.seek(0)
            file = pickle.load(f)
    
    # Path is a local directory 
    else:
        with open(path, 'rb') as f:
            file = pickle.load(f)
    
    return file


# In[89]:


ml_model = read_joblib(data_location)


# In[90]:


ml_model


# In[13]:


from io import BytesIO
import joblib

bytes_container = BytesIO()
joblib.dump(ml_model, bytes_container)
bytes_container.seek(0)  # update to enable reading

bytes_model = bytes_container.read()


# In[ ]:





# In[91]:


csv_bucket = 'mobilebucket'
from sagemaker import get_execution_role
role2 = get_execution_role()


# In[92]:


conn2 = boto3.client('s3')
contents = conn.list_objects(Bucket=csv_bucket, Prefix=subfolder)['Contents']
files_csv = []
for f in contents:
    #print(f['Key'])
    files_csv.append(f)

file_names = []

user_ids_dupe = []
for files in files_csv:
    file_name = files['Key']
    if "User_id" in file_name:
        temp = file_name.split("_")

        if (len(temp[4]) == 36):
            user_ids_dupe.append(temp[4])



# In[93]:


user_ids = []
for id in user_ids_dupe:
       if id not in user_ids:
          user_ids.append(id)
print(user_ids)
user_ids[1] = '99fbff10-824b-4370-977e-4f435dd9d39d'
user_ids.pop()
user_ids


# In[94]:


s3 = boto3.resource('s3') 
the_bucket = s3.Bucket('mobilebucket')


# In[95]:


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


# In[96]:


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserDetails-y243fkkjqreqpiwavsqlwjf62a-dev')


# In[97]:


in_table = table.scan()


# In[98]:


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


# In[99]:


ages_for_users = []
import decimal
for i in in_table['Items']:    
    for ui in user_ids:
        if ui == i['id']:
            #print(i['age'])
            ages_for_users.append(int(i['age']))
ages_for_users


# In[101]:


from datetime import date
today = date.today()
d1 = today.strftime("%Y-%m-%d")
print("d1 =", d1)
results = []
import io
import pprint as pp
for userid in user_ids:
    for obj in the_bucket.objects.all():
        key = obj.key
        body = obj.get()['Body'].read()
        if((str(str(userid)+'_fitbitdata') in key) and (d1 in key)):
            print(key)
            summary = pd.read_csv(io.BytesIO(body), encoding='utf8')
            calories = summary.at[0,'caloriesOut']
            sleep_score = summary.at[0,'efficiency']
            # compute running total
            num_data_fitbit = num_data_fitbit + 1
            avg_calories = avg_calories + calories
            avg_sleep_score = avg_sleep_score + sleep_score

        if(str(str(userid)+'_hourlydata') in key and (d1 in key)):
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

        # compute averages
    if(num_data_fitbit == 0 or num_data_hourly == 0):
        print("in if")
        temp_1 = 1
        avg_calories = avg_calories /temp_1
        avg_calories_mets = avg_calories_mets /  temp_1 
        avg_steps = avg_steps /  temp_1 
        avg_distance = avg_distance /  temp_1 
        avg_floors = avg_floors /  temp_1 
        avg_elevation = avg_elevation /  temp_1 
        avg_heart_rate = avg_heart_rate /  temp_1 
        avg_sleep_score = avg_sleep_score /  temp_1 
        
    else:
        print("in else")
        avg_calories = avg_calories / num_data_fitbit
        avg_calories_mets = avg_calories_mets / num_data_hourly
        avg_steps = avg_steps / num_data_hourly
        avg_distance = avg_distance / num_data_hourly
        avg_floors = avg_floors / num_data_hourly
        avg_elevation = avg_elevation / num_data_hourly
        avg_heart_rate = avg_heart_rate / num_data_hourly
        avg_sleep_score = avg_sleep_score / num_data_fitbit
        
    for age in ages_for_users:
        print("{},{},{},{},{},{},{},{},{}".format(userid,age, avg_calories, avg_calories_mets, avg_steps, avg_distance, avg_floors, avg_elevation, avg_heart_rate, avg_sleep_score))
        temp_list = [age, avg_calories, avg_calories_mets, avg_steps, avg_distance, avg_floors, avg_elevation, avg_heart_rate, avg_sleep_score]   
        x = np.array([temp_list])
        result = int(ml_model.predict(x))
        results.append(result)
    
    print("User id {} Health score : {}".format(userid,str(result)))
    # age, avg_calories, avg_calories_mets, avg_steps, avg_distance, avg_floors, avg_elevation, avg_heart_rate, avg_sleep_score

health_score = pd.DataFrame({'userid': user_ids,'healthscore': results})



# In[102]:


health_score


# In[112]:


import boto3

table_update = boto3.resource('dynamodb').Table('UserDetails-y243fkkjqreqpiwavsqlwjf62a-dev')
for index,row in health_score.iterrows():
    print(row['userid'],row['healthscore'])

    # get item
    response = table.get_item(Key={'id': str(row['userid'])})
    item = response['Item']

    # update
    item['score'] = 4

    # put (idempotent)
    table.put_item(Item=item)


# In[ ]:




