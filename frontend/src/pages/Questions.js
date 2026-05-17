import React, { useEffect, useState } from 'react';
import { getQuestions, getExams, createQuestion, updateQuestion, deleteQuestion } from '../services/api';

const EMPTY = {
  examId: '', questionText: '',
  optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: ''
};

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [exams, setExams]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [filterExam, setFilterExam] = useState('');
  const [modal, setModal]         = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [saving, setSaving]       = useState(false);

  const load = async () => {
    try {
      const [q, e] = await Promise.all([getQuestions(), getExams()]);
      setQuestions(q.data);
      setExams(e.data);
    } catch { setQuestions([]); setExams([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (q) => { setEditing(q); setForm({ ...q }); setModal(true); };
  const close    = () => { setModal(false); setForm(EMPTY); };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      editing ? await updateQuestion(editing.id, form) : await createQuestion(form);
      close(); load();
    } catch { alert('Error saving question.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try { await deleteQuestion(id); load(); }
    catch { alert('Error deleting question.'); }
  };

  const examName = (id) => exams.find(e => e.id === id)?.examName || `Exam #${id}`;

  const filtered = questions.filter(q => {
    const matchSearch = q.questionText?.toLowerCase().includes(search.toLowerCase());
    const matchExam   = filterExam ? String(q.examId) === filterExam : true;
    return matchSearch && matchExam;
  });

  const answerBadge = (ans) => ({
    A: 'badge badge-info',
    B: 'badge badge-success',
    C: 'badge badge-warning',
    D: 'badge badge-purple',
  }[ans] || 'badge badge-info');

  if (loading) return <div className="loading"><div className="spinner" /> Loading…</div>;

  return (
    <>
      <div className="page-toolbar">
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="search-input">
            <span className="icon">🔍</span>
            <input placeholder="Search questions…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select
            className="form-control"
            style={{ width: 180 }}
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
          >
            <option value="">All Exams</option>
            {exams.map(e => <option key={e.id} value={e.id}>{e.examName}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Question</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Questions</h3>
          <span className="badge badge-info">{filtered.length} records</span>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">❓</div>
            <h4>No questions found</h4>
            <p>{search ? 'Try a different search.' : 'Add questions to your exams.'}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Exam</th>
                  <th>Options</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, i) => (
                  <tr key={q.id}>
                    <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                    <td style={{ maxWidth: 300 }}>
                      <div style={{ fontWeight: 500, marginBottom: 4 }}>{q.questionText}</div>
                      <span className="badge badge-purple" style={{ fontSize: 10 }}>MCQ</span>
                    </td>
                    <td>
                      <span className="badge badge-info">{examName(q.examId)}</span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      <div>A: {q.optionA}</div>
                      <div>B: {q.optionB}</div>
                      <div>C: {q.optionC}</div>
                      <div>D: {q.optionD}</div>
                    </td>
                    <td>
                      <span className={answerBadge(q.correctAnswer)}>{q.correctAnswer}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-icon edit" onClick={() => openEdit(q)}>✏️</button>
                        <button className="btn-icon delete" onClick={() => handleDelete(q.id)}>🗑️</button>
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
          <div className="modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Question' : 'Add New Question'}</h3>
              <button className="modal-close" onClick={close}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Exam *</label>
                  <select className="form-control" name="examId" value={form.examId}
                    onChange={handleChange} required>
                    <option value="">Select exam</option>
                    {exams.map(e => <option key={e.id} value={e.id}>{e.examName} — {e.subject}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Question Text *</label>
                  <textarea className="form-control" name="questionText" rows={3}
                    placeholder="Enter the question…"
                    value={form.questionText} onChange={handleChange} required
                    style={{ resize: 'vertical' }} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option A *</label>
                    <input className="form-control" name="optionA" value={form.optionA}
                      onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option B *</label>
                    <input className="form-control" name="optionB" value={form.optionB}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option C *</label>
                    <input className="form-control" name="optionC" value={form.optionC}
                      onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option D *</label>
                    <input className="form-control" name="optionD" value={form.optionD}
                      onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Correct Answer *</label>
                  <select className="form-control" name="correctAnswer" value={form.correctAnswer}
                    onChange={handleChange} required>
                    <option value="">Select correct answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving…' : editing ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
