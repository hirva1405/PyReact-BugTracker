from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(
    prefix="/issues",
    tags=["issues"]
)

@router.get("/", response_model=List[schemas.Issue])
def read_issues(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    issues = crud.get_issues(db, skip=skip, limit=limit)
    return issues

@router.post("/", response_model=schemas.Issue)
def create_issue_for_user(
    issue: schemas.IssueCreate,
    user_id: int,
    db: Session = Depends(database.get_db)
):
    return crud.create_issue(db=db, issue=issue, user_id=user_id)