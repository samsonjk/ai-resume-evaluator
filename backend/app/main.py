from fastapi import FastAPI, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.analyse import analyze_resume
import os

app = FastAPI()

# Get allowed origins from environment variable
raw_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

#  Enable CORS for Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Resume Evaluator API"}


@app.post("/analyze-resume")
async def analyze_resume_route(resume_file_name: str = Form(...), job_description: str = Form(...)):
    try:
        return analyze_resume(resume_file_name,job_description)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    

@app.get("/user/resume/list")
def get_user_resumes(userid: str = Query(..., description="User ID")):
    # Simulated database query result
    fake_resumes = [
        {
            "filename": "CV_Samson_Sargunadoss.pdf",
            "uploaded_at": "2025-04-15T10:00:00Z",
            "status": "Evaluated",
            "score": 87
        },
        {
            "filename": "resume_2_uuid.docx",
            "uploaded_at": "2025-04-16T11:30:00Z",
            "status": "Pending",
            "score": None
        },
        {
            "filename": "resume_3_uuid.pdf",
            "uploaded_at": "2025-04-17T14:45:00Z",
            "status": "Evaluated",
            "score": 92
        },
        {
            "filename": "resume_4_uuid.doc",
            "uploaded_at": "2025-04-18T09:20:00Z",
            "status": "Rejected",
            "score": 40
        },
        {
            "filename": "resume_5_uuid.pdf",
            "uploaded_at": "2025-04-19T08:10:00Z",
            "status": "Evaluated",
            "score": 75
        }
    ]

    return {
        "user_id": userid,
        "resumes": fake_resumes
    }