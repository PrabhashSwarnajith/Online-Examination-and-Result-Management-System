import React, { useEffect, useState } from 'react';
import { getResults, getStudents, getExams, createResult, updateResult, deleteResult } from '../services/api';

const EMPTY = { studentId: '', examId: '', marks: '' };

const gradeInfo = {
  'A+': { cls: 'badge badge-success',  label: 'A+ (90–100)' },
  'A':  { cls: 'badge badge-success',  label: 'A (80–89)'   },
  'B':  { cls: 'badge badge-info',     label: 'B (70–79)'   },
  'C':  { cls: 'badge badge-warning',  label: 'C (60–69)'   },
  'D':  { cls: 'badge badge-warning',  label: 'D (50–59)'   },
  'F':  { cls: 'badge badge-danger',   label: 'F (< 50)'    },
};

function calcGrade(m) {
  if (m >= 90) return 'A+';
  if (m >= 80) return 'A';
  if (m >= 70) return 'B';
  if (m >= 60) return 'C';
  if (m >= 50) return 'D';
  return 'F';
}

export default function Results() {
  const [results, setResults]   = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);

  const load = async () => {
    try {
      const [r, s, e] = await Promise.all([getResults(), getStudents(), getExams()]);
      setResults(r.data); setStudents(s.data); setExams(e.data);
    } catch { setResults([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (r) => { setEditing(r); setForm({ studentId: r.studentId, examId: r.examId, marks: r.marks }); setModal(true); };
  const close    = () => { setModal(false); setForm(EMPTY); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      editing ? await updateResult(editing.id, form) : await createResult(form);
      close(); load();
    } catch { alert('Error saving result.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this result?')) return;
    try { await deleteResult(id); load(); }
    catch { alert('Error deleting result.'); }
  };

  const studentName = (id) => students.find(s => s.id === id)?.studentName || `Student #${id}`;
  const examName    = (id) => exams.find(e => e.id === id)?.examName    || `Exam #${id}`;

  const previewGrade = form.marks !== '' ? calcGrade(Number(form.marks)) : null;

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>;

  return (
    <>
      <div className="page-toolbar">
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Total: <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''}
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Result</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Student Results</h3>
          <span className="badge badge-info">{results.length} records</span>
        </div>
        {results.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏆</div>
            <h4>No results yet</h4>
            <p>Add results to track student performance.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Exam</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Performance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => {
                  const gi = gradeInfo[r.grade] || { cls: 'badge badge-info', label: r.grade };
                  const pct = Math.min(r.marks, 100);
                  const barColor = r.marks >= 70 ? '#10b981' : r.marks >= 50 ? '#f59e0b' : '#ef4444';
                  return (
                    <tr key={r.id}>
                      <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                      <td><strong>{studentName(r.studentId)}</strong></td>
                      <td style={{ color: 'var(--text-secondary)' }}>{examName(r.examId)}</td>
                      <td><strong>{r.marks}</strong> / 100</td>
                      <td><span className={gi.cls}>{r.grade}</span></td>
                      <td style={{ minWidth: 120 }}>
                        <div style={{
                          height: 6, borderRadius: 99,
                          background: '#e2e8f0', overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%', width: `${pct}%`,
                            background: barColor, borderRadius: 99,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 3 }}>
                          {pct}%
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-icon edit" onClick={() => openEdit(r)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => handleDelete(r.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Result' : 'Add New Result'}</h3>
              <button className="modal-close" onClick={close}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student *</label>
                  <select className="form-control" name="studentId" value={form.studentId}
                    onChange={handleChange} required>
                    <option value="">Select student</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.studentName} — {s.course}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Exam *</label>
                  <select className="form-control" name="examId" value={form.examId}
                    onChange={handleChange} required>
                    <option value="">Select exam</option>
                    {exams.map(e => <option key={e.id} value={e.id}>{e.examName} — {e.subject}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Marks (0–100) *</label>
                  <input className="form-control" name="marks" type="number"
                    min="0" max="100" placeholder="85"
                    value={form.marks} onChange={handleChange} required />
                </div>
                {previewGrade && (
                  <div style={{
                    padding: '12px 14px', borderRadius: 8, background: '#f8fafc',
                    border: '1px solid var(--border)', display: 'flex',
                    alignItems: 'center', gap: 10
                  }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      Calculated Grade:
                    </span>
                    <span className={(gradeInfo[previewGrade] || {}).cls || 'badge badge-info'}>
                      {previewGrade}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-light)' }}>
                      {(gradeInfo[previewGrade] || {}).label}
                    </span>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Result' : 'Add Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
