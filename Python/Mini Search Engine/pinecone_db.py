from pinecone import Pinecone
from config import *

pc = Pinecone(api_key=PINECONE_API_KEY)

index = pc.Index(PINECONE_INDEX_NAME)

from embedding import create_embedding

def upload_chunks(chunks, pdf_name):

    vectors = []

    for i, chunk in enumerate(chunks):

        vectors.append({

            "id": f"{pdf_name}_{i}",

            "values": create_embedding(chunk),

            "metadata": {

                "pdf": pdf_name,

                "text": chunk

            }

        })

    index.upsert(vectors=vectors)


def search(query):

    embedding = create_embedding(query)

    return index.query(

        vector=embedding,

        top_k=5,

        include_metadata=True

    )