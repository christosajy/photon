from fastapi import FastAPI, WebSocket, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import asyncio
from stock_generator import get_stock_data

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        stocks = get_stock_data()

        await websocket.send_json(stocks)

        await asyncio.sleep(1)
