// import React from 'react'

function DashboardCard({
  title,
  value,
  caption,
}: {
  title: string;
  value: number;
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-5 p-5 border border-gray-400 rounded-sm bg-gray-100">
      <h1 className="text-lg font-bold">{title}</h1>
      <h1 className="text-5xl font-bold">${Number (value)}</h1>
      <p className="text-xs font-gray-700">{caption}</p>
    </div>
  );
}

export default DashboardCard;
