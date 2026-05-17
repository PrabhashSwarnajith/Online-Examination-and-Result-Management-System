import React, { useEffect, useState } from 'react';
import { getExams, createExam, updateExam, deleteExam } from '../services/api';

const EMPTY = { examName: '', subject: '', examDate: '', duration: '' };

export default function Exams() {
  const [exams, setExams]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);

  const load = async () => {
    try { const r = await getExams(); setExams(r.data); }
    catch { setExams([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (e) => { setEditing(e); setForm({ ...e }); setModal(true); };
  const close    = () => { setModal(false); setForm(EMPTY); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      editing ? await updateExam(editing.id, form) : await createExam(form);
      close(); load();
    } catch { alert('Error saving exam.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this exam?')) return;
    try { await deleteExam(id); load(); }
    catch { alert('Error deleting exam.'); }
  };

  const filtered = exams.filter(e =>
    e.examName?.toLowerCase().includes(search.toLowerCase()) ||
    e.subject?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>;

  return (
    <>
      <div className="page-toolbar">
        <div className="search-input">
          <span className="icon">🔍</span>
          <input placeholder="Search exams…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Exam</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Exams</h3>
          <span className="badge badge-info">{filtered.length} records</span>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h4>No exams found</h4>
            <p>{search ? 'Try a different search.' : 'Add your first exam to get started.'}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exam Name</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ex, i) => (
                  <tr key={ex.id}>
                    <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                    <td><strong>{ex.examName}</strong></td>
                    <td><span className="badge badge-purple">{ex.subject}</span></td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      📅 {ex.examDate}
                    </td>
                    <td>
                      <span className="badge badge-info">{ex.duration} min</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-icon edit" onClick={() => openEdit(ex)}>✏️</button>
                        <button className="btn-icon delete" onClick={() => handleDelete(ex.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Exam' : 'Add New Exam'}</h3>
              <button className="modal-close" onClick={close}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Exam Name *</label>
                    <input className="form-control" name="examName" placeholder="Midterm Exam"
                      value={form.examName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <input className="form-control" name="subject" placeholder="Data Structures"
                      value={form.subject} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Exam Date *</label>
                    <input className="form-control" name="examDate" type="date"
                      value={form.examDate} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (minutes) *</label>
                    <input className="form-control" name="duration" type="number" placeholder="90"
                      value={form.duration} onChange={handleChange} required min="1" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Exam' : 'Add Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
