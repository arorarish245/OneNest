from fastapi import APIRouter, Query
from models.db import resources  # Import resources collection
from models.resource import Resource  # Import Pydantic model
from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import Optional

router = APIRouter()

# ✅ 1. Get All Resources or Filter by Category
@router.get("/resources")
async def get_resources(type: Optional[str] = None):
    query = {"type": type} if type else {}
    data = list(resources.find(query))
    for res in data:
        res["_id"] = str(res["_id"])  # Convert ObjectId to string
    return JSONResponse(content=data)
    


# ✅ 2. Add a New Resource
@router.post("/resources")
async def add_resource(resource: Resource):
    new_resource = jsonable_encoder(resource)
    inserted_id = resources.insert_one(new_resource).inserted_id
    return {"message": "Resource added successfully", "id": str(inserted_id)}

# ✅ 3. Delete a Resource
@router.delete("/resources/{resource_id}")
async def delete_resource(resource_id: str):
    result = resources.delete_one({"_id": ObjectId(resource_id)})
    if result.deleted_count == 1:
        return {"message": "Resource deleted"}
    return {"error": "Resource not found"}
