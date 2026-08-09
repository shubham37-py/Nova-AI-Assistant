from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes.task import router
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nova API",
    version="0.1.0",
    description="AI Productivity Assistant Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Nova Backend Running 🚀"}