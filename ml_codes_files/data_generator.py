# Create dataset for ML.

from random import seed
from random import randint
from random import uniform
import csv
import sys

# seed random number generator.
a = int(sys.argv[1])
seed(a)

'''
    define 5 classifications:
        Healthy (H1):
        "Could do better" healthy (H2):
        "Slacker" Unhealthy (H3):
        "Does not care" Unhealthy (H4):
        "Critical Condition" Unhealthy (H5):
'''

def randomize(data_writer, Age, calories, caloriesMets, steps, distance, floors, heartRate, SleepScore):
    for i in range(100):
        A = randint(Age-5,Age+5);
        # give a bigger range so the data is more dispersed and make it hard for model to predict score,
        #reflecting the real world
        # wrong classifications.
        C1 = uniform(calories-500,calories+500)
        if(C1 < 0):
            C1 = 0
        C2 = uniform(caloriesMets-7,caloriesMets+7)
        if(C2 < 0):
            C2 = 0
        S = randint(steps-1000,steps+1000)
        if(S < 0):
            S = 0
        D = uniform(distance-5,distance+5)
        if(D < 0):
            D = 0
        F = randint(floors-7,floors+7)
        if(F < 0):
            F = 0
        H = randint(heartRate-10,heartRate+10)
        SS = randint(SleepScore-10,SleepScore+5)
        if(SS < 0):
            SS = 0
        if(SS > 100):
            SS = 100
        L = label

        data_writer.writerow([A,C1,C2,S,D,F,H,SS,L])



# create filename.
filename = 'data_final_unlabelled.csv'
with open(filename, mode='a', newline='') as file:
    data_writer = csv.writer(file, delimiter=',')

    # write header to file.
    #data_writer.writerow(['Age','Calories', 'CaloriesMets', 'Steps', 'Distance', 'Floors', 'HeartRate', 'SleepScore'])

    H1_Label = 8 # An extremely Healthy Individual
    H2_Label = 7 # A very health Individual
    H3_Label = 6 # A healthy Individual
    H4_Label = 5 # A moderately Healthy Individual
    H5_Label = 4 # Could Do better
    H6_Label = 3 # not healthy
    H7_Label = 2 # very Unhealthy
    H8_Label = 1 # extremely Unhealthy


    ################################################################################################################################################
    # H1 Health Category

    # Age range 20-30 and is "An extremely Healthy Individual"
    Age = 25
    H1_calories = 3500
    H1_caloriesMets = 12.1
    H1_Steps = 12500
    H1_Distance = 8
    H1_Floors = 30
    H1_HeartRate = 65
    H1_SleepScore = 95
    randomize(data_writer, Age, H1_calories, H1_caloriesMets, H1_Steps, H1_Distance, H1_Floors, H1_HeartRate, H1_SleepScore,H1_Label)

    # Age range 30-40 and is "An extremely Healthy Individual"
    Age = 35
    H1_calories = 3350
    H1_caloriesMets = 11.5
    H1_Steps = 11000
    H1_Distance = 7.5
    H1_Floors = 27
    H1_HeartRate = 65
    H1_SleepScore = 95
    randomize(data_writer, Age, H1_calories, H1_caloriesMets, H1_Steps, H1_Distance, H1_Floors, H1_HeartRate, H1_SleepScore,H1_Label)

    # Age range 40-50 and is "An extremely Healthy Individual"
    Age = 45
    H1_calories = 3150
    H1_caloriesMets = 10.7
    H1_Steps = 10000
    H1_Distance = 7
    H1_Floors = 24
    H1_HeartRate = 65
    H1_SleepScore = 95
    randomize(data_writer, Age, H1_calories, H1_caloriesMets, H1_Steps, H1_Distance, H1_Floors, H1_HeartRate, H1_SleepScore,H1_Label)

    ################################################################################################################################################





    ################################################################################################################################################
    # H2 Health Category

    # Age range 20-30 and is "A very health Individual"
    Age = 25
    H2_calories = 3000
    H2_caloriesMets = 10.4
    H2_Steps = 9500
    H2_Distance = 6.5
    H2_Floors = 20
    H2_HeartRate = 60
    H2_SleepScore = 90
    randomize(data_writer, Age, H2_calories, H2_caloriesMets, H2_Steps, H2_Distance, H2_Floors, H2_HeartRate, H2_SleepScore)

    # Age range 30-40 and is "A very health Individual"
    Age = 35
    H2_calories = 2850
    H2_caloriesMets = 10.0
    H2_Steps = 9000
    H2_Distance = 6.0
    H2_Floors = 17
    H2_HeartRate = 65
    H2_SleepScore = 90
    randomize(data_writer, Age, H2_calories, H2_caloriesMets, H2_Steps, H2_Distance, H2_Floors, H2_HeartRate, H2_SleepScore)

    # Age range 40-50 and is "A very health Individual"
    Age = 45
    H2_calories = 2750
    H2_caloriesMets = 9.6
    H2_Steps = 8500
    H2_Distance = 5.5
    H2_Floors = 14
    H2_HeartRate = 67
    H2_SleepScore = 90
    randomize(data_writer, Age, H2_calories, H2_caloriesMets, H2_Steps, H2_Distance, H2_Floors, H2_HeartRate, H2_SleepScore)

    ################################################################################################################################################




    ################################################################################################################################################
    #H3 Health Category

    # Age range 20-30 and is "A healthy Individual"
    Age = 25
    H3_calories = 2600
    H3_caloriesMets = 9.0
    H3_Steps = 8000
    H3_Distance = 5.0
    H3_Floors = 10
    H3_HeartRate = 70
    H3_SleepScore = 85
    randomize(data_writer, Age, H3_calories, H3_caloriesMets, H3_Steps, H3_Distance, H3_Floors, H3_HeartRate, H3_SleepScore)

    # Age range 30-40 and is "A healthy Individual"
    Age = 35
    H3_calories = 2550
    H3_caloriesMets = 8.5
    H3_Steps = 7500
    H3_Distance = 4.5
    H3_Floors = 10
    H3_HeartRate = 70
    H3_SleepScore = 85
    randomize(data_writer, Age, H3_calories, H3_caloriesMets, H3_Steps, H3_Distance, H3_Floors, H3_HeartRate, H3_SleepScore)

    # Age range 40-50 and is "A healthy Individual"
    Age = 45
    H3_calories = 2475
    H3_caloriesMets = 8.1
    H3_Steps = 7000
    H3_Distance = 4.2
    H3_Floors = 10
    H3_HeartRate = 70
    H3_SleepScore = 85
    randomize(data_writer, Age, H3_calories, H3_caloriesMets, H3_Steps, H3_Distance, H3_Floors, H3_HeartRate, H3_SleepScore)

    ################################################################################################################################################



    ################################################################################################################################################
    #H4 Health Category

    # Age range 20-30 and is " A moderately Healthy Individual"
    Age = 25
    H4_calories = 2400
    H4_caloriesMets = 7.0
    H4_Steps = 6500
    H4_Distance = 4
    H4_Floors = 6
    H4_HeartRate = 75
    H4_SleepScore = 80
    randomize(data_writer, Age, H4_calories, H4_caloriesMets, H4_Steps, H4_Distance, H4_Floors, H4_HeartRate, H4_SleepScore)

    # Age range 30-40 and is " A moderately Healthy Individual"
    Age = 35
    H4_calories = 2325
    H4_caloriesMets = 6.5
    H4_Steps = 6100
    H4_Distance = 3.6
    H4_Floors = 6
    H4_HeartRate = 75
    H4_SleepScore = 80
    randomize(data_writer, Age, H4_calories, H4_caloriesMets, H4_Steps, H4_Distance, H4_Floors, H4_HeartRate, H4_SleepScore)

    # Age range 40-50 and is " A moderately Healthy Individual"
    Age = 45
    H4_calories = 2270
    H4_caloriesMets = 6.0
    H4_Steps = 6000
    H4_Distance = 3.2
    H4_Floors = 6
    H4_HeartRate = 75
    H4_SleepScore = 80
    randomize(data_writer, Age, H4_calories, H4_caloriesMets, H4_Steps, H4_Distance, H4_Floors, H4_HeartRate, H4_SleepScore)


    ################################################################################################################################################




    ################################################################################################################################################
    #H5 Health Category

    # Age range 20-30 and is "Could Do better"
    Age = 25
    H5_calories = 2180
    H5_caloriesMets = 5.0
    H5_Steps = 5500
    H5_Distance = 3.0
    H5_Floors = 5
    H5_HeartRate = 80
    H5_SleepScore = 75
    randomize(data_writer, Age, H5_calories, H5_caloriesMets, H5_Steps, H5_Distance, H5_Floors, H5_HeartRate, H5_SleepScore)

    # Age range 30-40 and is "Could Do better"
    Age = 35
    H5_calories = 2100
    H5_caloriesMets = 4.4
    H5_Steps = 5250
    H5_Distance = 2.7
    H5_Floors = 4
    H5_HeartRate = 80
    H5_SleepScore = 70
    randomize(data_writer, Age, H5_calories, H5_caloriesMets, H5_Steps, H5_Distance, H5_Floors, H5_HeartRate, H5_SleepScore)

    # Age range 40-50 and is "Could Do better"
    Age = 45
    H5_calories = 2050
    H5_caloriesMets = 4.0
    H5_Steps = 5000
    H5_Distance = 2.4
    H5_Floors = 4
    H5_HeartRate = 80
    H5_SleepScore = 65
    randomize(data_writer, Age, H5_calories, H5_caloriesMets, H5_Steps, H5_Distance, H5_Floors, H5_HeartRate, H5_SleepScore)

    ################################################################################################################################################



    ################################################################################################################################################
    #H6 Health Category

    # Age range 20-30 and is "not healthy"
    Age = 25
    H6_calories = 1950
    H6_caloriesMets = 3.6
    H6_Steps = 4500
    H6_Distance = 2.0
    H6_Floors = 3
    H6_HeartRate = 85
    H6_SleepScore = 75
    randomize(data_writer, Age, H6_calories, H6_caloriesMets, H6_Steps, H6_Distance, H6_Floors, H6_HeartRate, H6_SleepScore)

    # Age range 30-40 and is "not healthy"
    Age = 35
    H6_calories = 1830
    H6_caloriesMets = 3.2
    H6_Steps = 4300
    H6_Distance = 1.7
    H6_Floors = 3
    H6_HeartRate = 85
    H6_SleepScore = 70
    randomize(data_writer, Age, H6_calories, H6_caloriesMets, H6_Steps, H6_Distance, H6_Floors, H6_HeartRate, H6_SleepScore)

    # Age range 40-50 and is "not healthy"
    Age = 45
    H6_calories = 1740
    H6_caloriesMets = 2.7
    H6_Steps = 4100
    H6_Distance = 1.4
    H6_Floors = 3
    H6_HeartRate = 85
    H6_SleepScore = 65
    randomize(data_writer, Age, H6_calories, H6_caloriesMets, H6_Steps, H6_Distance, H6_Floors, H6_HeartRate, H6_SleepScore)

    ################################################################################################################################################




    ################################################################################################################################################
    #H7 Health Category

    # Age range 20-30 and is "very Unhealthy"
    Age = 25
    H7_calories = 1670
    H7_caloriesMets = 2.3
    H7_Steps = 3200
    H7_Distance = 1.2
    H7_Floors = 2
    H7_HeartRate = 95
    H7_SleepScore = 75
    randomize(data_writer, Age, H7_calories, H7_caloriesMets, H7_Steps, H7_Distance, H7_Floors, H7_HeartRate, H7_SleepScore)

    # Age range 30-40 and is "very Unhealthy"
    Age = 35
    H7_calories = 1530
    H7_caloriesMets = 1.9
    H7_Steps = 3000
    H7_Distance = 1.0
    H7_Floors = 2
    H7_HeartRate = 95
    H7_SleepScore = 70
    randomize(data_writer, Age, H7_calories, H7_caloriesMets, H7_Steps, H7_Distance, H7_Floors, H7_HeartRate, H7_SleepScore)

    # Age range 40-50 and is "very Unhealthy"
    Age = 45
    H7_calories = 1445
    H7_caloriesMets = 1.4
    H7_Steps = 2700
    H7_Distance = 1.0
    H7_Floors = 2
    H7_HeartRate = 95
    H7_SleepScore = 65
    randomize(data_writer, Age, H7_calories, H7_caloriesMets, H7_Steps, H7_Distance, H7_Floors, H7_HeartRate, H7_SleepScore)

    ################################################################################################################################################



    ################################################################################################################################################
    #H8 Health Category

    # Age range 20-30 and is "extremely Unhealthy"
    Age = 25
    H8_calories = 1380
    H8_caloriesMets = 1.3
    H8_Steps = 2200
    H8_Distance = 0.7
    H8_Floors = 2
    H8_HeartRate = 100
    H8_SleepScore = 75
    randomize(data_writer, Age, H8_calories, H8_caloriesMets, H8_Steps, H8_Distance, H8_Floors, H8_HeartRate, H8_SleepScore)

    # Age range 30-40 and is "extremely Unhealthy"
    Age = 35
    H8_calories = 1300
    H8_caloriesMets = 1.2
    H8_Steps = 1570
    H8_Distance = 0.7
    H8_Floors = 1
    H8_HeartRate = 100
    H8_SleepScore = 70
    randomize(data_writer, Age, H8_calories, H8_caloriesMets, H8_Steps, H8_Distance, H8_Floors, H8_HeartRate, H8_SleepScore)

    # Age range 40-50 and is "extremely Unhealthy"
    Age = 45
    H8_calories = 1200
    H8_caloriesMets = 1.1
    H8_Steps = 1200
    H8_Distance = 0.7
    H8_Floors = 1
    H8_HeartRate = 100
    H8_SleepScore = 65
    randomize(data_writer, Age, H8_calories, H8_caloriesMets, H8_Steps, H8_Distance, H8_Floors, H8_HeartRate, H8_SleepScore)

    ################################################################################################################################################
