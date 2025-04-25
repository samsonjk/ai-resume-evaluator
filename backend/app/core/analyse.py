import fitz  # PyMuPDF
from dotenv import load_dotenv
import os 
import google.generativeai as genai

load_dotenv() ##load all the environment variables

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# prompt template 
input_prompt="""
Hey you are a Experienced recruiter.You need to find the canditate is perfect match for the role you are 
trying to hire. You have the following job description (JD) and resume. 
Please analyze them and provide the percentage match based on skills, qualifications, 
and job responsibilities. The higher the overlap between the resume and JD,
the higher the percentage. Please focus on matching key skills, experience, 
and educational qualifications. All I want you to say is 
how the candiate match with job description, what are the missing skill. Apart from this information i dont 
need anything else. In simple words how much percentage the candiate match this job profile and what are lack?
Provide a detailed explanation for the score.
resume:{text}
description:{jd}
"""

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts and returns all text content from the specified PDF file.

    Parameters:
    pdf_path (str): The path to the PDF file.

    Returns:
    str: Extracted text from the PDF.
    """
    text = ""

    try:
        with fitz.open(pdf_path) as doc:
            for page in doc:
                text += page.get_text()

    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

    return text
    
##gemini pro response
def get_gemini_response(input):
    model=genai.GenerativeModel('gemini-1.5-pro')
    response=model.generate_content(input)
    return response.text 

    
def analyze_resume(filename: str, jobDescription: str):
    try:
        # Get absolute path to project root directory (assumes you're running from project root)
        project_root = os.getcwd()
        upload_path = os.path.join(project_root, 'uploads', filename)

        if not os.path.exists(upload_path):
            raise FileNotFoundError(f"Resume file not found at: {upload_path}")

        resume_content = extract_text_from_pdf(upload_path)
        formatted_prompt = input_prompt.format(text=resume_content, jd=jobDescription)
        response = get_gemini_response(formatted_prompt)
        return response

    except Exception as e:
        print(f"Error during resume analysis: {e}")
        return f"Error analyzing resume: {str(e)}"
        
