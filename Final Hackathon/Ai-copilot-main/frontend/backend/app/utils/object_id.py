from bson import ObjectId


def is_valid_object_id(value: str) -> bool:
    return ObjectId.is_valid(value)


def to_object_id(value: str) -> ObjectId:
    return ObjectId(value)


def serialize_document(document):
    if document is None:
        return None
    item = dict(document)
    item["id"] = str(item.pop("_id"))
    for key, value in list(item.items()):
        if isinstance(value, ObjectId):
            item[key] = str(value)
        elif hasattr(value, "isoformat"):
            item[key] = value.isoformat()
    return item


def serialize_documents(documents):
    return [serialize_document(document) for document in documents]
