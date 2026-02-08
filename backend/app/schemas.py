from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class IssueBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "Medium"
    status: str = "Pending"

class IssueCreate(IssueBase):
    pass

class Issue(IssueBase):
    id: int
    owner_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    issues: List[Issue] = []
    class Config:
        from_attributes = True