from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import supabase
from app.schemes import DashboardItem


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/dashboard-items")
async def get_dashboard_items():
    response = supabase.table('dashboard_items').select("*").execute()
    return response.data


@app.post("/dashboard-items")
async def create_dashboard_item(item: DashboardItem):
    response = supabase.table('dashboard_items').insert(item.dict()).execute()
    return response.data
