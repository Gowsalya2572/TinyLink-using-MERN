import React, { useState } from 'react'
import { api } from '../api/axios'
import { Link } from 'react-router-dom'

const BACKEND_URL = import.meta.env. VITE_BACKEND_URL;

function formatDate(d) { if (!d) return '-'; return new Date(d).toLocaleString() }


export default function LinkRow({ link, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [copied, setCopied] = useState(false)


  async function handleDelete() {
    if (!confirm(`Delete ${link.code}? This is permanent.`)) return
    setDeleting(true)
    try { await api.delete(`/links/${link.code}`); onDelete && onDelete() } catch (err) { alert('Failed to delete') } finally { setDeleting(false) }
  }


  function handleCopy() {
    const short = `${BACKEND_URL}/${link.code}`;
    navigator.clipboard.writeText(short).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) })
  }


  return (
   <tr className="border-t align-top text-xs sm:text-sm md:text-base lg:text-lg">
  <td className="px-4 py-3 align-top">
    <div className="font-mono">{link.code}</div>
    <div className="mt-1">
      <Link to={`/code/${link.code}`} className="text-blue-600 hover:underline">View stats</Link>
    </div>
  </td>

  <td className="px-4 py-3 align-top">
    <div className="truncate-url">{link.target}</div>
  </td>

  <td className="px-4 py-3 align-top">{link.clicks}</td>

  <td className="px-4 py-3 align-top">{formatDate(link.lastClicked)}</td>

  <td className="px-4 py-3 align-top space-x-2
  flex flex-col gap-2 sm:flex-row sm:space-x-2 sm:space-y-0">
    <button onClick={handleCopy} className="border rounded px-2 py-1">
      {copied ? 'Copied' : 'Copy'}
    </button>
    <a 
      href={`${BACKEND_URL}/${link.code}`} 
      target="_blank" 
      rel="noreferrer" 
      className="border rounded px-2 py-1"
    >
      Open
    </a>
    <button 
      onClick={handleDelete} 
      disabled={deleting} 
      className="bg-red-600 text-white px-2 py-1 rounded disabled:opacity-60"
    >
      Delete
    </button>
  </td>
</tr>

  )
}