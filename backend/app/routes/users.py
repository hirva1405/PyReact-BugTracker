from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import crud, schemas, database, auth

router = APIRouter(prefix="/users", tags=["users"])


# --- Keep your existing create_user route here ---

@router.post("/login")
def login(db: Session = Depends(database.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    # 1. Find user by email (using username field from form)
    user = db.query(models.User).filter(models.User.email == form_data.username).first()

    # 2. Check if password is correct
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    # 3. Create and return the Token
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}