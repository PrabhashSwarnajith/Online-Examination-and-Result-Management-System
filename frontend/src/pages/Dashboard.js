import React, { useEffect, useState } from 'react';
import { getStudents, getExams, getQuestions, getResults } from '../services/api';

export default function Dashboard() {
  const [stats, setStats]   = useState({ students: 0, exams: 0, questions: 0, results: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, e, q, r] = await Promise.all([
          getStudents(), getExams(), getQuestions(), getResults()
        ]);
        setStats({
          students:  s.data.length,
          exams:     e.data.length,
          questions: q.data.length,
          results:   r.data.length,
        });
        setRecent(r.data.slice(0, 5));
      } catch {
        /* backend not connected yet */
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const gradeClass = (g) => ({
    'A+': 'badge badge-success grade-ap',
    'A':  'badge badge-success grade-a',
    'B':  'badge badge-info grade-b',
    'C':  'badge badge-warning grade-c',
    'D':  'badge badge-warning grade-d',
    'F':  'badge badge-danger grade-f',
  }[g] || 'badge badge-info');

  if (loading) return (
    <div className="loading"><div className="spinner" /> Loading dashboard…</div>
  );

  return (
    <>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👨‍🎓</div>
          <div className="stat-info">
            <h4>{stats.students}</h4>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📝</div>
          <div className="stat-info">
            <h4>{stats.exams}</h4>
            <p>Total Exams</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">❓</div>
          <div className="stat-info">
            <h4>{stats.questions}</h4>
            <p>Total Questions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">🏆</div>
          <div className="stat-info">
            <h4>{stats.results}</h4>
            <p>Total Results</p>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="card">
        <div className="card-header">
          <h3>Recent Results</h3>
          <span className="badge badge-info">{recent.length} entries</span>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h4>No results yet</h4>
            <p>Results will appear here once students are graded.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>Exam ID</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--text-light)' }}>{i + 1}</td>
                    <td>Student #{r.studentId}</td>
                    <td>Exam #{r.examId}</td>
                    <td><strong>{r.marks}</strong> / 100</td>
                    <td><span className={gradeClass(r.grade)}>{r.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
