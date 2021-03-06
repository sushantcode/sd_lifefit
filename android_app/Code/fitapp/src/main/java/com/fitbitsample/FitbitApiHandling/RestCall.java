package com.fitbitsample.FitbitApiHandling;

import android.content.Context;

import retrofit2.Call;
/**
 * This class helps retro service client api calling and utilizes NetworkListener
 */
public class RestCall<T> {

    private Context context;
    private boolean progressBar = true;
    private NetworkHandler<T> networkHandler;

    private RestCall() {
    }

    public RestCall(Context context) {
        this.context = context;
    }

    public RestCall(Context context, boolean noProgressBar) {
        this.context = context;
        this.progressBar = !noProgressBar;
    }

    public void execute(Call<T> call, NetworkListener<T> networkListener) {
        execute(call, 0, networkListener);
    }

    public void execute(Call<T> call, int retryCount, NetworkListener<T> networkListener) {
        execute(call, retryCount, false, networkListener);
    }

    public void execute(Call<T> call, boolean askUserForRetry, NetworkListener<T> networkListener) {
        execute(call, 0, askUserForRetry, networkListener);
    }

    private void execute(Call<T> call, int retryCount, boolean askUser, NetworkListener<T> networkListener) {
        networkHandler = new NetworkHandler<>(context, call);
        networkHandler.setProgressBar(progressBar);
        networkHandler.setRetryCount(retryCount);
        networkHandler.askUserForRetry(askUser);
        networkHandler.execute(networkListener);
    }

    public void cancel() {
        if (networkHandler != null) {
            networkHandler.cancel();
        }
    }
}
