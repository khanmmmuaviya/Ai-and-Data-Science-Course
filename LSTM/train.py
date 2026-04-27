import re
import string
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences

def clean_text(text):
    text = text.lower()

    text = re.sub('<.*?>', '', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)

    text = text.translate(str.maketrans('', '', string.punctuation))

    return text


def predict_next_word(model, tokenizer, text, max_sequence_len):
    token_list = tokenizer.texts_to_sequences([text])[0]

    token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')

    prediction = model.predict(token_list, verbose=0)
    predicted_index = np.argmax(prediction)

    # faster lookup
    for word, index in tokenizer.word_index.items():
        if index == predicted_index:
            return word

    return ""


import pickle
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

from utils import clean_text

# 📂 load files (replace with your paths)
with open("data/basic.txt", "r", encoding="utf-8") as f:
    data1 = f.read()

with open("data/ml.txt", "r", encoding="utf-8") as f:
    data2 = f.read()

# merge + limit
data = clean_text(data1 + "\n" + data2)
data = data[:80000]

# tokenize
tokenizer = Tokenizer()
tokenizer.fit_on_texts([data])

total_words = len(tokenizer.word_index) + 1

token_list = tokenizer.texts_to_sequences([data])[0]

# create sequences
input_sequences = []
for i in range(1, len(token_list)):
    input_sequences.append(token_list[:i+1])

max_sequence_len = max(len(x) for x in input_sequences)

input_sequences = pad_sequences(input_sequences, maxlen=max_sequence_len, padding='pre')

X, y = input_sequences[:, :-1], input_sequences[:, -1]

# model
model = Sequential([
    Embedding(total_words, 128),
    LSTM(128),
    Dense(total_words, activation='softmax')
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X, y, epochs=4, validation_split=0.2)

# save
model.save("model.keras")

with open("tokenizer.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

# save sequence length
with open("config.pkl", "wb") as f:
    pickle.dump(max_sequence_len, f)