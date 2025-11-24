import { useEffect, useState } from 'react';

interface Adapter {
  id: string;
  name: string;
  adapterName: string;
  description?: string;
  isActive: boolean;
  config?: Record<string, any> | null;
}

export default function AdaptersPage() {
  const [adapters, setAdapters] = useState<Adapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Adapter | null>(null);
  const [saving, setSaving] = useState(false);

  // form state
  const [name, setName] = useState('');
  const [adapterName, setAdapterName] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchAdapters();
  }, []);

  const fetchAdapters = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/adapter');
      if (!res.ok) throw new Error(`Failed to fetch adapters (${res.status})`);
      const data = await res.json();
      setAdapters(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setName('');
    setAdapterName('');
    setDescription('');
    setConfig('');
    setIsActive(false);
    setIsModalOpen(true);
  };

  const openEdit = (a: Adapter) => {
    setEditing(a);
    setName(a.name || '');
    setAdapterName(a.adapterName || '');
    setDescription(a.description || '');
    setConfig(a.config ? JSON.stringify(a.config, null, 2) : '');
    setIsActive(!!a.isActive);
    setIsModalOpen(true);
  };

  const saveAdapter = async () => {
    setSaving(true);
    setError(null);
    try {
      const body = {
        name,
        adapterName,
        description,
        config: config ? JSON.parse(config) : null,
        isActive,
      } as any;

      let res: Response;
      if (editing) {
        res = await fetch(`/api/adapter/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(`/api/adapter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      await fetchAdapters();
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  const removeAdapter = async (id: string) => {
    if (!confirm('Delete this adapter?')) return;
    try {
      const res = await fetch(`/api/adapter/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      await fetchAdapters();
    } catch (err: any) {
      setError(err.message || 'Delete error');
    }
  };

  const toggleActive = async (id: string, activate: boolean) => {
    try {
      const path = activate ? `/api/adapter/${id}/activate` : `/api/adapter/${id}/deactivate`;
      const res = await fetch(`${path}`, { method: 'PATCH' });
      if (!res.ok) throw new Error(`Action failed (${res.status})`);
      await fetchAdapters();
    } catch (err: any) {
      setError(err.message || 'Action error');
    }
  };

  const syncAdapter = async (name?: string) => {
    try {
      const path = name ? `/api/sync/${encodeURIComponent(name)}` : '/api/sync';
      const res = await fetch(`${path}`, { method: 'POST' });
      if (!res.ok) throw new Error(`Sync failed (${res.status})`);
      alert('Sync started');
    } catch (err: any) {
      setError(err.message || 'Sync error');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Adapter Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => syncAdapter()}
            className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
          >
            Sync All
          </button>
          <button
            onClick={openCreate}
            className="px-3 py-2 bg-white border border-gray-200 rounded-md hover:shadow"
          >
            New Adapter
          </button>
        </div>
      </div>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Adapter Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center">Loading...</td></tr>
            ) : adapters.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center">No adapters found</td></tr>
            ) : (
              adapters.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-3 align-top">{a.name}</td>
                  <td className="px-4 py-3 align-top">{a.adapterName}</td>
                  <td className="px-4 py-3 align-top">{a.description || '—'}</td>
                  <td className="px-4 py-3 align-top">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${a.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                      {a.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(a)} className="px-2 py-1 text-sm bg-white border rounded">Edit</button>
                      <button onClick={() => toggleActive(a.id, !a.isActive)} className="px-2 py-1 text-sm bg-white border rounded">{a.isActive ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => syncAdapter(a.adapterName)} className="px-2 py-1 text-sm bg-white border rounded">Sync</button>
                      <button onClick={() => removeAdapter(a.id)} className="px-2 py-1 text-sm bg-red-50 text-red-700 border rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Adapter' : 'Create Adapter'}</h3>

            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-2 border rounded" />

              <label className="text-sm">Adapter Name (unique)</label>
              <input value={adapterName} onChange={(e) => setAdapterName(e.target.value)} className="px-3 py-2 border rounded" />

              <label className="text-sm">Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="px-3 py-2 border rounded" />

              <label className="text-sm">Config (JSON)</label>
              <textarea value={config} onChange={(e) => setConfig(e.target.value)} rows={6} className="px-3 py-2 border rounded font-mono text-sm" />

              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span className="text-sm">Active</span>
              </label>
            </div>

            <div className="mt-4 flex.justify-end flex-row-reverse gap-2 flex">
              <button onClick={() => setIsModalOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
              <button onClick={saveAdapter} disabled={saving} className="px-3 py-2 bg-emerald-500 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
