import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/links/${code}`);
        setLink(res.data);
      } catch (err) {
        setLink(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (!link) return <div className="text-red-600">Not found</div>;

  return (
    <div className="space-y-4">

  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
    Stats for <span className="font-mono">{link.code}</span>
  </h1>

  <div className="bg-white border rounded p-4 max-w-3xl text-sm sm:text-base md:text-lg">

    <div className="mb-2">
      <strong>Short URL:</strong>{" "}
      <a
        className="text-blue-600 text-sm sm:text-base md:text-lg"
        href={`${BACKEND_URL}/${link.code}`}
        target="_blank"
        rel="noreferrer"
      >
        {link.code}
      </a>
    </div>

    <div className="mb-2 text-sm sm:text-base md:text-lg">
      <strong>Target:</strong>{" "}
      <span className="truncate-url">{link.target}</span>
    </div>

    <div className="mb-2 text-sm sm:text-base md:text-lg">
      <strong>Clicks:</strong> {link.clicks}
    </div>

    <div className="mb-2 text-sm sm:text-base md:text-lg">
      <strong>Created:</strong> {new Date(link.createdAt).toLocaleString()}
    </div>

    <div className="mb-2 text-sm sm:text-base md:text-lg">
      <strong>Last clicked:</strong>{" "}
      {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "—"}
    </div>

  </div>

</div>

  
  );
}

