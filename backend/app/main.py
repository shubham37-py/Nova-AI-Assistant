from fastapi import FastAPI
from app.database import engine
from app import models

# Automatically create tables in SQLite when app launches
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nova API",
    version="0.1.0",
    description="AI Productivity Assistant Backend"
)

@app.get("/")
def root():
    return {"message": "Nova Backend Running 🚀"}