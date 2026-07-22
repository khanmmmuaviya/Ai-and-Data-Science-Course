import streamlit as st

from pdf_processor import extract_text
from utils import split_text
from pinecone_db import upload_chunks, search

st.title("Mini Search Engine")

files = st.file_uploader(

    "Upload at least 5 PDFs",

    type="pdf",

    accept_multiple_files=True

)

if files:

    if len(files) < 5:

        st.warning("Upload at least five PDFs")

    else:

        if st.button("Index PDFs"):

            progress = st.progress(0)

            for i, pdf in enumerate(files):

                text = extract_text(pdf)

                chunks = split_text(text)

                upload_chunks(chunks, pdf.name)

                progress.progress((i+1)/len(files))

            st.success("Indexing Completed!")

st.divider()

query = st.text_input("Search")

if st.button("Search"):

    results = search(query)

    st.subheader("Results")

    for match in results["matches"]:

        st.write("###", match["metadata"]["pdf"])

        st.write("Similarity Score:", round(match["score"],3))

        st.write(match["metadata"]["text"])

        st.divider()