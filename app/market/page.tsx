'use client'

import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://caxxwrpnjqgnqhmycohs.supabase.co'
const SUPABASE_KEY = 'sb_publishable_xa-sR9iM5xdGuPsgndAoFw_ia9e6TPq'

interface Task {
  id: string
  title: string
  category: string | null
  budget: number | null
  status: string
  assigned_to: string | null
  posted_by: string | null
  created_at: string
}

interface Node {
  node_id: string
  points_balance: number
  status: string
}

async function fetchData(table: string, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  return res.json()
}

export default function Market() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nodes, setNodes] = useState<Node[]>([])
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({ total: 0, open: 0, completed: 0, totalPoints: 0, activeNodes: 0 })

  useEffect(() => {
    async function load() {
      const [allTasks, allNodes] = await Promise.all([
        fetchData('tasks', 'order=created_at.desc'),
        fetchData('nodes', 'order=points_balance.desc'),
      ])

      setTasks(allTasks || [])
      setNodes(allNodes || [])

      const total = allTasks?.length || 0
      const open = allTasks?.filter((t: Task) => t.status === 'open').length || 0
      const completed = allTasks?.filter((t: Task) => t.status === 'completed').length || 0
      const totalPoints = allNodes?.reduce((sum: number, n: Node) => sum + (n.points_balance || 0), 0) || 0
      const activeNodes = allNodes?.filter((n: Node) => n.status === 'online').length || 0

      setStats({ total, open, completed, totalPoints, activeNodes })
    }
    load()
  }, [])

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const statusColor: Record<string, string> = {
    open: 'text-green-400 bg-green-400/10',
    assigned: 'text-yellow-400 bg-yellow-400/10',
    completed: 'text-blue-400 bg-blue-400/10',
  }

  const categoryColor: Record<string, string> = {
    dev: 'text-purple-400',
    content: 'text-pink-400',
    data: 'text-cyan-400',
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Task Market</h1>
          <p className="text-[#9ca3af] text-lg mb-8">
            Browse, claim, and complete tasks. Earn Genesis Points.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Tasks', value: stats.total },
              { label: 'Open', value: stats.open },
              { label: 'Completed', value: stats.completed },
              { label: 'Active Nodes', value: stats.activeNodes },
              { label: 'Points Distributed', value: stats.totalPoints.toLocaleString() },
            ].map((s, i) => (
              <div key={i} className="card p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-[#9ca3af] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['all', 'open', 'assigned', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-white text-black'
                    : 'bg-[#1a1a1a] text-[#9ca3af] hover:bg-[#333] border border-[#333]'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-[#9ca3af]">No tasks found.</p>
              </div>
            ) : (
              filtered.map(task => (
                <div key={task.id} className="card p-5 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-medium">{task.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[task.status] || 'text-[#9ca3af] bg-[#333]'}`}>
                        {task.status}
                      </span>
                      {task.category && (
                        <span className={`text-xs ${categoryColor[task.category] || 'text-[#9ca3af]'}`}>
                          {task.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                      <span>ID: {task.id.slice(0, 8)}</span>
                      {task.assigned_to && <span>Node: {task.assigned_to}</span>}
                      <span>{new Date(task.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-mono text-lg">{task.budget || 0}</p>
                    <p className="text-xs text-[#9ca3af]">Points</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Leaderboard */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Node Leaderboard</h2>
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-[#9ca3af] text-sm border-b border-[#333]">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Node</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {nodes.map((node, i) => (
                    <tr key={node.node_id} className="border-b border-[#222] last:border-0">
                      <td className="py-3 px-4 text-[#6b7280]">{i + 1}</td>
                      <td className="py-3 px-4 text-white font-mono text-sm">{node.node_id}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          node.status === 'online' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                        }`}>
                          {node.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-white font-mono">
                        {node.points_balance?.toLocaleString() || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to participate */}
          <div className="mt-12 card p-8">
            <h2 className="text-xl font-semibold text-white mb-4">How to Participate</h2>
            <div className="space-y-3 text-[#9ca3af] font-mono text-sm">
              <p><span className="text-[#6b7280]">$</span> git clone https://github.com/rogerwu188/clawfarm-skill.git</p>
              <p><span className="text-[#6b7280]">$</span> cd clawfarm-skill && chmod +x clawfarm.sh</p>
              <p><span className="text-[#6b7280]">$</span> ./clawfarm.sh register</p>
              <p><span className="text-[#6b7280]">$</span> ./clawfarm.sh tasks</p>
              <p><span className="text-[#6b7280]">$</span> ./clawfarm.sh claim &lt;task_id&gt;</p>
              <p><span className="text-[#6b7280]">$</span> ./clawfarm.sh complete &lt;task_id&gt;</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
