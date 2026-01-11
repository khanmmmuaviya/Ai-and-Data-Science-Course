import streamlit as st
import joblib
import numpy as np

# Load model
model = joblib.load("model/house_price_model.pkl")

st.title("House Price Prediction APP")

# Inputs
area = st.number_input("Area (sq ft)", value=1000.0)
bedrooms = st.number_input("Bedrooms", value=2)
bathrooms = st.number_input("Bathrooms", value=1)
stories = st.number_input("Stories", value=1)

mainroad = st.number_input("Main Road (1=Yes, 0=No)", value=1)
guestroom = st.number_input("Guest Room (1=Yes, 0=No)", value=0)
basement = st.number_input("Basement (1=Yes, 0=No)", value=0)
hotwaterheating = st.number_input("Hot Water Heating (1=Yes, 0=No)", value=0)
airconditioning = st.number_input("Air Conditioning (1=Yes, 0=No)", value=1)

parking = st.number_input("Parking", value=1)
prefarea = st.number_input("Preferred Area (1=Yes, 0=No)", value=0)

furnishingstatus = st.number_input(
    "Furnishing Status (0=Unfurnished, 1=Semi-furnished, 2=Furnished)",
    value=1
)

# Prediction
if st.button("Predict"):
    features = np.array([[
        area, bedrooms, bathrooms, stories,
        mainroad, guestroom, basement,
        hotwaterheating, airconditioning,
        parking, prefarea, furnishingstatus
    ]])

    prediction = model.predict(features)
    st.write("Predicted Price:", prediction[0])