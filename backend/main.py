from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import testing_router

app = FastAPI()



app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root() -> dict[str, str]:
    return {"Hello": "World"}

app.include_router(router = testing_router)