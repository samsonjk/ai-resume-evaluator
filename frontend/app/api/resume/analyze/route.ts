import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume_file_name = formData.get('resume_file_name') as string;
    const job_description = formData.get('job_description') as string;

    const params = new URLSearchParams({
      resume_file_name,
      job_description,
    });

    const response = await axios.post(
      `${process.env.BASE_API_URL}/analyze-resume`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }
    );
    console.log("response.data", response.data)
    return NextResponse.json(response.data);
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
