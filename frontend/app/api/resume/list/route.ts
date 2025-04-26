import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userid");

  if (!userId) {
    return NextResponse.json({ error: "Missing userid parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/user/resume/list?userid=${userId}`);

    if (!response.ok) {
      throw new Error(`Python API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, resumes: data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
