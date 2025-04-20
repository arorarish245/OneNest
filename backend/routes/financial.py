from fastapi import APIRouter, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import Optional
from bson import ObjectId
from models.financial_scheme_model import FinancialScheme
from models.db import financial_schemes
import re

router = APIRouter()

@router.get("/financial-schemes")
async def get_schemes(
    support: Optional[str] = None,
    situation: Optional[str] = None,
    goal: Optional[str] = None,
    region: Optional[str] = None
):
    # Step 1: Normalize and combine all search terms
    search_terms = [term.strip().lower() for term in [support, situation, goal] if term]

    query = {}

    if search_terms:
        or_conditions = []
        for term in search_terms:
            regex = {"$regex": re.escape(term), "$options": "i"}
            or_conditions.extend([
                {"tags": regex},
                {"region": regex},
                {"description": regex}
            ])
        query["$or"] = or_conditions

    # Region-based fallback filter (includes "nationwide" support)
    if region:
        region = region.strip().lower()
        region_filter = {
            "$or": [
                {"region": {"$regex": region, "$options": "i"}},
                {"region": {"$regex": "nationwide", "$options": "i"}}
            ]
        }
        if "$or" in query:
            query = {
                "$and": [
                    query,
                    region_filter
                ]
            }
        else:
            query = region_filter

    # Step 2: Fetch matching schemes from DB
    schemes = list(financial_schemes.find(query))

    # Step 3: Calculate match score
    for scheme in schemes:
        scheme_tags = [tag.lower() for tag in scheme.get("tags", [])]
        match_score = 0
        for term in search_terms:
            if term in scheme_tags:
                match_score += 2  # Higher weight for tag matches
            if re.search(term, scheme.get("description", ""), re.IGNORECASE):
                match_score += 1
            if re.search(term, scheme.get("region", ""), re.IGNORECASE):
                match_score += 1
        scheme["match_score"] = match_score
        scheme["_id"] = str(scheme["_id"])

    # Step 4: Sort by match_score
    schemes = sorted(schemes, key=lambda x: x["match_score"], reverse=True)

    return JSONResponse(content=schemes[:5])
