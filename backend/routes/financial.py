from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import Optional
from bson import ObjectId
from models.financial_scheme_model import FinancialScheme
from models.db import financial_schemes

router = APIRouter()

@router.get("/financial-schemes")
async def get_schemes(
    support: Optional[str] = None,
    situation: Optional[str] = None,
    goal: Optional[str] = None,
    region: Optional[str] = None
):
    # Step 1: Combine all tags
    tags_filter = []
    if support:
        tags_filter.append(support)
    if situation:
        tags_filter.append(situation)
    if goal:
        tags_filter.append(goal)

    query = {}

    # Step 2: Use $in for tags if any
    if tags_filter:
        query["tags"] = {"$in": tags_filter}

    # Step 3: Region logic (match region or 'Nationwide')
    if region:
        query["$or"] = [
            {"region": {"$regex": region, "$options": "i"}},
            {"region": {"$regex": "Nationwide", "$options": "i"}}
        ]

    # Step 4: Fetch matching schemes
    schemes = list(financial_schemes.find(query))

    # Step 5: Prioritize schemes by tag match count
    for scheme in schemes:
        scheme["match_score"] = sum(1 for tag in tags_filter if tag in scheme.get("tags", []))
        scheme["_id"] = str(scheme["_id"])  # Convert ObjectId

    # Sort by match_score (higher is better)
    schemes = sorted(schemes, key=lambda x: x["match_score"], reverse=True)

    return JSONResponse(content=schemes[:5])  # Return top 5 matches
