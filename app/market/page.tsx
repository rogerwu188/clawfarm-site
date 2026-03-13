'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const SUPABASE_URL = 'https://caxxwrpnjqgnqhmycohs.supabase.co'
const SUPABASE_KEY = 'sb_publishable_xa-sR9iM5xdGuPsgndAoFw_ia9e6TPq'

interface Task {
  id: string; title: string; category: string | null; budget: number | null; status: string; assigned_to: string | null; created_at: string
}

async function fetchData(table: string, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  return res.json()
}

export default function Market() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchData('tasks', 'order=created_at.desc').then(d => setTasks(d || []))
  }, [])

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)
  const statusClass = (s: string) => s === 'open' ? 'status-open' : s === 'assigned' ? 'status-active' : 'status-settled'

  return (
    <main>
      <div className="state-strip">
        <div className="max-w-6xl mx-auto px-6">
          <div className="strip-inner">
            <div className="state-item"><span className="label">Surface</span><span className="val">Work</span></div>
            <span className="state-sep">•</span>
            <div className="state-item"><span className="label">Tasks</span><span className="val">{tasks.length}</span></div>
            <span className="state-sep">•</span>
            <div className="state-item"><span className="label">Open</span><span className="val" style={{color:'var(--green)'}}>{tasks.filter(t => t.status === 'open').length}</span></div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="section-title text-[36px]">Work Surface</h1>
          <p className="section-text">Useful work is the active surface of the network.</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Task logic</div>
          <p className="section-text mb-4">
            Nodes do not earn by staying online.<br />
            They earn by executing valid work.
          </p>
          <p className="text-[#8a8f98] text-[14px]">
            Work enters reward flow when:<br />
            · a task is accepted<br />
            · a result is delivered<br />
            · settlement conditions are met
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Task board</div>
          <div className="flex gap-2 mt-4 mb-6">
            {['all', 'open', 'assigned', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 transition ${filter === f ? 'bg-[#e8e8e8] text-[#08090a]' : 'border border-[#2a2d30] text-[#8a8f98] hover:text-[#e8e8e8]'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-0">
            {filtered.length === 0 ? (
              <div className="panel text-center py-12"><p className="text-[#505560] text-sm">No tasks in this state.</p></div>
            ) : (
              filtered.map(task => (
                <div key={task.id} className="task-row">
                  <div>
                    <span className="text-[#e8e8e8] text-[14px]">{task.title}</span>
                    {task.category && <span className="text-[#505560] text-xs ml-3">{task.category}</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#8a8f98] font-mono text-sm">{task.budget || 0} pts</span>
                    <span className={`task-status ${statusClass(task.status)}`}>{task.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-tag">Reward path</div>
          <p className="section-text">
            Billed compute enters Compute Pool.<br />
            Settled task value enters Outcome Pool.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link href="/docs" className="btn-secondary">Read settlement rules</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
