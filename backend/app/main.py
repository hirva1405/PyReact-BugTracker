from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, email=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

@app.post("/users/", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

@app.get("/issues/", response_model=list[schemas.Issue])
def read_issues(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Issue).filter(models.Issue.owner_id == user_id).all()

@app.post("/issues/", response_model=schemas.Issue)
def create_new_issue(issue: schemas.IssueCreate, user_id: int = Query(...), db: Session = Depends(get_db)):
    return crud.create_issue(db=db, issue=issue, user_id=user_id)

@app.put("/issues/{issue_id}")
def update_issue(issue_id: int, status: str, db: Session = Depends(get_db)):
    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    db_issue.status = status
    db.commit()
    return db_issue

@app.delete("/issues/{issue_id}")
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    db.delete(db_issue)
    db.commit()
    return {"message": "Deleted"}

@app.put("/issues/{issue_id}", response_model=schemas.Issue)
def update_issue(issue_id: int, status: str, db: Session = Depends(get_db)):
    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if not db_issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    db_issue.status = status
    db.commit()
    db.refresh(db_issue)
    return db_issue