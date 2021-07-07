import requests

######## Get data for a day ###########

def getActivities(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/date/" + curr_date + ".json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get activities...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Activities received successfully!")
        return resJson
    else:
        print("Could not get activities data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getHeart(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/heart/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get heart rate data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Heart rate data recorded successfully!")
        return resJson
    else:
        print("Could not get heart data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getElevation(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/elevation/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get elevation data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Elevation data recorded successfully!")
        return resJson
    else:
        print("Could not get elevation data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getFloors(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/floors/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get floors data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Floors data recorded successfully!")
        return resJson
    else:
        print("Could not get floors data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getDistance(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/distance/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get distance data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Distance data recorded successfully!")
        return resJson
    else:
        print("Could not get distance data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getSteps(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/steps/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get steps data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Steps data recorded successfully!")
        return resJson
    else:
        print("Could not get steps data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getCalories(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1/user/" + user_id + "/activities/calories/date/" + curr_date + "/1d/15min.json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get calorie data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Calories data recorded successfully!")
        return resJson
    else:
        print("Could not get calories data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
        return None

def getSleeps(user_id, access_token, curr_date):
    endpoint = "https://api.fitbit.com/1.2/user/" + user_id + "/sleep/date/" + curr_date + ".json"
    header = {'Authorization': 'Bearer ' + access_token}
    print("Making api call to get sleep data...")
    response = requests.get(endpoint, headers=header)
    print("Received status code = ", response.status_code)
    resJson = response.json()
    if response.status_code == 200:
        print("Sleep data retrieved successfully!")
        return resJson
    else:
        print("Could not get data. Error type = ", resJson['errors'][0]['errorType'], ". Error Message = ", resJson['errors'][0]['message'])
