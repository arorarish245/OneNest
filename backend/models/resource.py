from pydantic import BaseModel
from typing import List, Optional

class Resource(BaseModel):
    title: str
    description: str
    type: str  # Category: Legal Assistance, Mental Health, etc.
    link: str
    tags: Optional[List[str]] = []
    icon: Optional[str] = None
