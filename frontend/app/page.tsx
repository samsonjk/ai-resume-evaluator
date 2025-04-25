"use client"

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const uuid = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const newFileName = `${uuid}.${fileExtension}`;

    const formData = new FormData();
    formData.append("file", new File([file], newFileName, { type: file.type }));

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      console.log("File uploaded successfully.");
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const features = [
    "AI-Powered Resume Evaluation",
    "Instant Feedback",
    "ATS Optimization Tips",
    "Grammar & Spell Checks",
    "Keyword Suggestions",
    "Professional Formatting Tips",
    "Score Based on Job Matching",
    "Customizable Templates",
    "Real-Time Resume Insights",
    "Action Verb Recommendations",
    "Section-Wise Scoring",
    "Privacy First – Secure Upload",
    "Unlimited Evaluations (With Plan)"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <main className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="text-5xl font-light text-gray-800 mb-12 mt-10 transition-all hover:scale-105">Resume AI</h1>

        <div
          {...getRootProps()}
          className="w-full max-w-xl px-6 py-20 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out hover:border-blue-500"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500 animate-pulse">Drop the resume here...</p>
          ) : (
            <p className="text-gray-500">
              {uploading ? "Uploading your resume..." : "Drag & drop your resume here, or click to browse"}
            </p>
          )}
        </div>

        <p className="mt-10 text-sm text-gray-400">AI-powered resume evaluator – instantly!</p>

        {/* Motivational Section */}
        <section className="mt-16 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            You are one step away from landing into your dream career.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-blue-500">✔</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center">
            <Image src="/career-growth.png" alt="Career growth" width={300} height={200} />

            <button
              onClick={() => router.push(session ? "/dashboard" : "/login")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
