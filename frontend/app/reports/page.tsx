'use client';

import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [reportData, setReportData] = useState<
    { id: number; filename: string; date: string }[]
  >([]);

  useEffect(() => {
    // Fake data
    const fakeReports = [
      { id: 1, filename: 'CV_Samson_Sargunadoss.pdf', date: '2025-04-15' },
      { id: 2, filename: 'CV_Jane_Doe.pdf', date: '2025-04-16' },
      { id: 3, filename: 'CV_John_Smith.pdf', date: '2025-04-17' },
      { id: 4, filename: 'CV_Mary_Jones.pdf', date: '2025-04-18' },
      { id: 5, filename: 'CV_Rahul_Kumar.pdf', date: '2025-04-19' }
    ];
    setReportData(fakeReports);
  }, []);

  const handleView = (filename: string) => {
    alert(`Viewing ${filename}`);
    // Add logic to open the file if hosted or accessible
  };

  const handleDownload = (filename: string) => {
    alert(`Downloading ${filename}`);
    // Replace with actual download logic or route
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📊 Resume Reports
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Resume</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {reportData.map((report, index) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.filename}</td>
                <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button onClick={() => handleView(report.filename)} className='primary'>
                    View
                  </button>
                  <button onClick={() => handleDownload(report.filename)} className='warning'>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
