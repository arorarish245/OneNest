from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import Optional
from bson import ObjectId
from models.financial_scheme_model import FinancialScheme
from models.db import financial_schemes  # import from db.py

router = APIRouter()

# 1. Get All Schemes
@router.get("/financial-schemes")
async def get_schemes():
    data = list(financial_schemes.find())
    for scheme in data:
        scheme["_id"] = str(scheme["_id"])  # Convert ObjectId
    print(f"Number of schemes fetched: {len(data)}")  # Debug print
    return JSONResponse(content=data)

#2. Add New Scheme
@router.post("/financial-schemes")
async def add_scheme(scheme: FinancialScheme):
    new_scheme = jsonable_encoder(scheme)
    inserted_id = financial_schemes.insert_one(new_scheme).inserted_id
    return {"message": "Scheme added successfully", "id": str(inserted_id)}

#3. Delete Scheme
@router.delete("/financial-schemes/{scheme_id}")
async def delete_scheme(scheme_id: str):
    result = financial_schemes.delete_one({"_id": ObjectId(scheme_id)})
    if result.deleted_count == 1:
        return {"message": "Scheme deleted"}
    return {"error": "Scheme not found"}
