import React, { useState } from 'react'
import { api } from '../api/axios'


export default function AddLinkForm({ onAdded }) {
  const [target, setTarget] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)


  async function handleSubmit(e) {
    e.preventDefault()
    setMsg(null)
    if (!target) { setMsg({ type: 'error', text: 'Target URL required' }); return }
    setLoading(true)
    try {
      const res = await api.post('/links', { target, code: code || undefined })
      setMsg({ type: 'success', text: `Created: ${res.data.code}` })
      setTarget(''); setCode('')
      onAdded && onAdded()
    } catch (err) {
      const text = err?.response?.data?.error || 'Failed to create'
      setMsg({ type: 'error', text })
    } finally { setLoading(false) }
  }


  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input className="sm:col-span-2 border rounded px-3 py-2" placeholder="https://example.com/long/path" value={target} onChange={(e) => setTarget(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Optional custom code (6-8 alnum)" value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button type="submit" disabled={loading} className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-60">{loading ? 'Creating...' : 'Create'}</button>
        {msg && <div className={msg.type === 'error' ? 'text-red-600' : 'text-green-600'}>{msg.text}</div>}
      </div>
    </form>
  )
}
