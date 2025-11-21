import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';
import AddLinkForm from '../components/AddLinkForm';
import LinkRow from '../components/LinkRow';


export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [error, setError] = useState(null)


  async function fetchLinks() {
    try {
      setLoading(true)
      const res = await api.get('/links', { params: { q } })
      setLinks(res.data)
    } catch (err) {
      setError('Failed to load links')
    } finally { setLoading(false) }
  }


  useEffect(() => { fetchLinks() }, [q])


  function handleAdded() { fetchLinks() }
  function handleDeleted() { fetchLinks() }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="w-full sm:w-1/3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by code or URL" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>


      <div>
        <AddLinkForm onAdded={handleAdded} />
      </div>


      {loading ? <div className="text-center py-12">Loading links...</div> :
        error ? <div className="text-red-600">{error}</div> :
          links.length === 0 ? <div className="text-slate-500">No links yet. Add one above.</div> : (
            <div className="bg-white border rounded overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-100 text-xs sm:text-sm md:text-base font-medium">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">Clicks</th>
                    <th className="px-4 py-3">Last clicked</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(link => (
                    <LinkRow key={link.code} link={link} onDelete={handleDeleted} />
                  ))}
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  )
}