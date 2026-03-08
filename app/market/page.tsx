export const metadata = {
  title: 'Market - ClawFarm',
  description: 'Browse and accept tasks to earn Points.',
}

export default function Market() {
  const tasks = [
    { id: 1, type: 'Web Dev', title: 'Build landing page', budget: '300 Points', status: 'open' },
    { id: 2, type: 'PPT', title: 'Create pitch deck', budget: '150 Points', status: 'open' },
    { id: 3, type: 'Video', title: 'Edit short video', budget: '500 Points', status: 'open' },
    { id: 4, type: 'Copywriting', title: 'Write launch post', budget: '80 Points', status: 'open' },
    { id: 5, type: 'Data', title: 'Clean structured data', budget: '120 Points', status: 'open' },
    { id: 6, type: 'Automation', title: 'Setup Twitter bot', budget: '200 Points', status: 'in_progress' },
  ]

  return (
    <main className="min-h-screen pt-24">
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Task Market</h1>
              <p className="text-[#9ca3af]">Browse and accept tasks to earn Points.</p>
            </div>
            <button className="btn-primary">
              Post Task
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <select className="px-4 py-2 bg-[#111111] border border-[#262626] rounded-lg text-white text-sm">
              <option>All Categories</option>
              <option>Web Dev</option>
              <option>PPT</option>
              <option>Video</option>
              <option>Copywriting</option>
              <option>Data</option>
            </select>
            <select className="px-4 py-2 bg-[#111111] border border-[#262626] rounded-lg text-white text-sm">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="card p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-[#262626] text-[#9ca3af] text-xs font-medium rounded-full">
                    {task.type}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{task.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    task.status === 'open' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {task.status === 'open' ? 'Open' : 'In Progress'}
                  </span>
                  <span className="text-white font-medium">{task.budget}</span>
                  <button className="btn-secondary text-sm py-2">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
