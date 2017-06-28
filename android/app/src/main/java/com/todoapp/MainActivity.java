package com.todoapp;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private String GET_NOTES_URL = "https://androidtodoapp.herokuapp.com/getNotes";

    private ProgressDialog mProgressDialog;

    /*@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mProgressDialog = new ProgressDialog(MainActivity.this);
        mProgressDialog.setTitle("Please wait");
        mProgressDialog.setMessage("Getting Notes...");
        mProgressDialog.show();

        StringRequest stringRequest = new StringRequest(Request.Method.POST, GET_NOTES_URL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                mProgressDialog.dismiss();
                Toast.makeText(MainActivity.this, response.toString() + "", Toast.LENGTH_LONG).show();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                mProgressDialog.dismiss();
                Toast.makeText(MainActivity.this, error.toString() + "", Toast.LENGTH_LONG).show();
            }
        });

        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        requestQueue.add(stringRequest);
    }*/

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "todoapp";
    }
}
