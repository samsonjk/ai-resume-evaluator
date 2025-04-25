'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

type Resume = {
  filename: string;
  uploaded_at: string;
  status: string;
  score: number | null;
};

export default function JobDescriptionMatchingPage() {
  const [resumeFiles, setResumeFiles] = useState<string[]>([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('/api/resume/list?userid=12345');
        const data = await response.json();
  
        const resumeList = data?.resumes?.resumes?.map((resume: Resume) => resume.filename) || [];
        setResumeFiles(resumeList);
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
      }
    };
  
    fetchResumes();
  }, []);
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResume || !jobDescription) {
      toast.error('Please select a resume and enter job description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/analyze-resume',
        new URLSearchParams({
          resume_file_name: selectedResume,
          job_description: jobDescription
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
          }
        }
      );
      setResponseText(response.data);
      toast.success('Analysis completed successfully!');
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to analyze resume.');
      console.error(error);
      setResponseText('Error occurred while analyzing resume.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatResponse = (text: string) => {
    const lines = text.split('**').map((line, index) => {
      if (line.startsWith('Candidate Match:')) {
        return <h2 key={index} className="text-xl font-bold text-green-600 mt-6">✅ {line.trim()}</h2>;
      }
      if (line.startsWith('Matching Skills/Experience:')) {
        return <h3 key={index} className="text-lg font-semibold text-blue-600 mt-4">🧠 {line.trim()}</h3>;
      }
      if (line.startsWith('Missing/Lacking Skills:')) {
        return <h3 key={index} className="text-lg font-semibold text-red-600 mt-4">⚠️ {line.trim()}</h3>;
      }
      if (line.startsWith('Explanation of Score:')) {
        return <h3 key={index} className="text-lg font-semibold text-purple-600 mt-4">📊 {line.trim()}</h3>;
      }
      if (line.startsWith('*')) {
        return <li key={index} className="ml-6 list-disc">{line.replace('*', '').trim()}</li>;
      }
      return <p key={index} className="mt-2">{line.trim()}</p>;
    });

    return <div className="mt-6">{lines}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Job Description Matching
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Select Resume
          </label>
          <select
            id="resume"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
          >
            <option value="">-- Select a Resume --</option>
            {resumeFiles.map((file) => (
              <option key={file} value={file}>{file}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
      {responseText && (
        <div className="bg-gray-50 border rounded-xl p-6 mt-8 shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">📝 Analysis Result</h2>
          {formatResponse(responseText)}
        </div>
      )}
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
