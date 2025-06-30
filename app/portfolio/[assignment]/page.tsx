'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function AssignmentPage() {
  const params = useParams();
  const assignment = params.assignment as string;

  if (!assignment) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">正在加载...</h1>
      </div>
    );
  }

  const assignmentUrl = `/assignments/${decodeURIComponent(assignment)}`;
  const assignmentName = decodeURIComponent(assignment)
    .replace('.html', '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Link href="/portfolio" className="text-blue-400 hover:underline">
          &larr; 返回作品集列表
        </Link>
        <h1 className="text-3xl font-bold mt-2">{assignmentName}</h1>
      </div>
      <iframe
        src={assignmentUrl}
        title={assignmentName}
        className="w-full h-[calc(100vh-220px)] border-2 border-gray-700 rounded-lg"
      />
    </div>
  );
} 