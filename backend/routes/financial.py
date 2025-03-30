from fastapi import APIRouter, HTTPException, Query
from models.db import financial_schemes

router = APIRouter()

# Add Financial Scheme
@router.post("/financial-schemes")
def add_scheme(scheme: dict):
    financial_schemes.insert_one(scheme)
    return {"message": "Scheme added successfully"}

# Get All Schemes
@router.get("/financial-schemes")
def get_all_schemes():
    schemes = list(financial_schemes.find())
    for scheme in schemes:
        scheme["_id"] = str(scheme["_id"])
    return schemes

# Filter Schemes by Category
@router.get("/financial-schemes/filter")
def filter_schemes(category: str = Query(None), location: str = Query(None)):
    query = {}
    if category:
        query["category"] = category
    if location:
        query["location"] = location

    results = list(financial_schemes.find(query))
    
    for scheme in results:
        scheme["_id"] = str(scheme["_id"])
    
    return results
