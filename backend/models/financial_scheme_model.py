from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from bson import ObjectId

class FinancialScheme(BaseModel):
    title: str = Field(..., example="Beti Bachao Beti Padhao")
    description: str = Field(..., example="A government scheme promoting education for girl children.")
    eligibility: str = Field(..., example="Only for single mothers with income below ₹2L per annum.")
    benefits: str = Field(..., example="Scholarship up to ₹50,000/year for girl child.")
    application_process: str = Field(..., example="Apply through the nearest Anganwadi center or online portal.")
    tags: List[str] = Field(default=[], example=["education", "women", "central"])
    official_link: Optional[HttpUrl] = Field(None, example="https://myscheme.gov.in/schemes/bbbp")
    region: Optional[str] = Field(None, example="All India")

    class Config:
        schema_extra = {
            "example": {
                "title": "Beti Bachao Beti Padhao",
                "description": "A government scheme promoting education for girl children.",
                "eligibility": "Only for single mothers with income below ₹2L per annum.",
                "benefits": "Scholarship up to ₹50,000/year for girl child.",
                "application_process": "Apply through the nearest Anganwadi center or online portal.",
                "tags": ["education", "women", "central"],
                "official_link": "https://myscheme.gov.in/schemes/bbbp",
                "region": "All India"
            }
        }
