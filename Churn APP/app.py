import streamlit as st
import joblib
import numpy as np
import pandas as pd

label_encoder = joblib.load("churn_label_encoder.pkl")
ohe = joblib.load("churn_One_hot_encoder.pkl")
scaler = joblib.load("churn_scalar.pkl")
model = joblib.load("churn_logistic_regression_model.pkl")

st.set_page_config(page_title="Churn Prediction")
st.title("Customer Churn Prediction")

geography = st.selectbox("Geography", ohe.categories_[0].tolist())
gender = st.selectbox("Gender", ["Male", "Female"])

numeric_features = [f for f in scaler.feature_names_in_ if not f.startswith("Geography_") and f != "Gender"]
inputs = {}
for feature in numeric_features:
    inputs[feature] = st.number_input(feature, value=0)

inputs["Gender"] = 1 if gender == "Male" else 0
X_numeric = pd.DataFrame([inputs])
geo_encoded = ohe.transform([[geography]])
X_geo = pd.DataFrame(geo_encoded, columns=ohe.get_feature_names_out(["Geography"]))
X_full = pd.concat([X_numeric.reset_index(drop=True), X_geo.reset_index(drop=True)], axis=1)

# Reorder columns to match the scaler
X_full = X_full[scaler.feature_names_in_]

X_scaled = scaler.transform(X_full)

if st.button("Predict"):
    prediction = model.predict(X_scaled)[0]

    if prediction == 1:
      
      st.success("Churn Prediction: Yes")
    else:
      st.success("Churn Prediction: No")

