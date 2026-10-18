'use client';

import dynamic from 'next/dynamic';
import { use } from 'react';

const MapPanel = dynamic(() => import('./MapPanel'), {
  ssr: false,
  loading: () => (
    <div className="h-80 w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 font-medium text-sm">
      Loading interactive map...
    </div>
  ),
});

export default function TrackPage({ params }) {
  const { id } = use(params);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tracking Order #{id}</h1>
            <p className="text-slate-600 text-sm">Estimated Delivery Time: 25-35 mins</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            In Transit
          </span>
        </div>

        <MapPanel />
      </div>
    </div>
  );
}