package com.fitbitsample.FitbitDataType;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
/**
 * Creating a viewing adapter class for parsing gson file of heartratezone received from Fitbit API call
 */

public class HeartRateZone {

    @SerializedName("caloriesOut")
    @Expose
    private Float caloriesOut;
    @SerializedName("max")
    @Expose
    private Integer max;
    @SerializedName("min")
    @Expose
    private Integer min;
    @SerializedName("minutes")
    @Expose
    private Integer minutes;
    @SerializedName("name")
    @Expose
    private String name;

    public Float getCaloriesOut() {
        return caloriesOut;
    }

    public void setCaloriesOut(Float caloriesOut) {
        this.caloriesOut = caloriesOut;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "HeartRateZone{" +
                "caloriesOut=" + caloriesOut +
                "|max=" + max +
                "|min=" + min +
                "|minutes=" + minutes +
                "|name='" + name +
                '}';
    }
}
