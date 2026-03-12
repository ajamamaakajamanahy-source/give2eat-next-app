from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import food
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Give2Eat API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for MVP, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(food.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to Give2Eat API"}

@app.get("/health")
async def health():
    return {"status": "ok"}
