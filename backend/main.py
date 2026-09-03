from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from analyzer import analyze_image


app = FastAPI(
    title="Chai Verdict API",
    description="Backend for the Chai Verdict hackathon project"
)


# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "☕ Chai Verdict backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    image_bytes = await file.read()

    result = analyze_image(image_bytes)

    return result