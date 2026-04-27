import streamlit as st
import pickle
from tensorflow.keras.models import load_model
from utils import predict_next_word

# load model + tokenizer
model = load_model("model.keras")

with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

with open("config.pkl", "rb") as f:
    max_sequence_len = pickle.load(f)

# UI
st.set_page_config(page_title="Next Word Predictor", layout="centered")

st.title("🧠 Next Word Prediction (LSTM)")
st.write("Type a sentence and generate next words")

user_input = st.text_input("Enter your text:", "how are")

num_words = st.slider("Number of words to generate", 1, 20, 5)

if st.button("Generate"):
    text = user_input

    for _ in range(num_words):
        next_word = predict_next_word(model, tokenizer, text, max_sequence_len)
        text += " " + next_word

    st.success(text)