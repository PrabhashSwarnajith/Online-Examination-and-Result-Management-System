import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/api';

const EMPTY = { studentName: '', email: '', course: '', contactNumber: '' };

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);

  const load = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch { setStudents([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (s) => { setEditing(s); setForm({ ...s }); setModal(true); };
  const closeModal = () => { setModal(false); setForm(EMPTY); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateStudent(editing.id, form);
      } else {
        await createStudent(form);
      }
      closeModal();
      load();
    } catch { alert('Error saving student.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try { await deleteStudent(id); load(); }
    catch { alert('Error deleting student.'); }
  };

  const filtered = students.filter(s =>
    s.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.course?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>;

  return (
    <>
      <div className="page-toolbar">
        <div className="search-input">
          <span className="icon">🔍</span>
          <input
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          + Add Student
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Students</h3>
          <span className="badge badge-info">{filtered.length} records</span>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👨‍🎓</div>
            <h4>No students found</h4>
            <p>{search ? 'Try a different search.' : 'Add your first student to get started.'}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0
                        }}>
                          {s.studentName?.charAt(0)}
                        </div>
                        <strong>{s.studentName}</strong>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{s.email}</td>
                    <td><span className="badge badge-purple">{s.course}</span></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{s.contactNumber}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-icon edit" onClick={() => openEdit(s)} title="Edit">✏️</button>
                        <button className="btn-icon delete" onClick={() => handleDelete(s.id)} title="Delete">🗑️</button>
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
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Student' : 'Add New Student'}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-control" name="studentName" placeholder="Alice Johnson"
                      value={form.studentName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-control" name="email" type="email" placeholder="alice@uni.edu"
                      value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Course *</label>
                    <input className="form-control" name="course" placeholder="Computer Science"
                      value={form.course} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Number *</label>
                    <input className="form-control" name="contactNumber" placeholder="0123456789"
                      value={form.contactNumber} onChange={handleChange} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
