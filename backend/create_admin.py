from app.database import SessionLocal
from app import models
import bcrypt


def create_manual_user():
    db = SessionLocal()
    email = "admin@bug.com"


    existing_user = db.query(models.User).filter(models.User.email == email).first()

    if existing_user:
        print(f"--- User {email} already exists! ---")
    else:

        password = "password123"
        salt = bcrypt.gensalt()
        hashed_pwd = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

        new_user = models.User(
            email=email,
            full_name="Admin User",
            hashed_password=hashed_pwd
        )
        db.add(new_user)
        db.commit()
        print(f"--- SUCCESS: User {email} created! ---")
    db.close()


if __name__ == "__main__":
    create_manual_user()