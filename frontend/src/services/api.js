import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({ baseURL: BASE_URL });

// ── Auth ──
export const login = (credentials) => api.post('/auth/login', credentials);

// ── Students ──
export const getStudents    = ()           => api.get('/students');
export const getStudent     = (id)         => api.get(`/students/${id}`);
export const createStudent  = (data)       => api.post('/students', data);
export const updateStudent  = (id, data)   => api.put(`/students/${id}`, data);
export const deleteStudent  = (id)         => api.delete(`/students/${id}`);

// ── Exams ──
export const getExams       = ()           => api.get('/exams');
export const getExam        = (id)         => api.get(`/exams/${id}`);
export const createExam     = (data)       => api.post('/exams', data);
export const updateExam     = (id, data)   => api.put(`/exams/${id}`, data);
export const deleteExam     = (id)         => api.delete(`/exams/${id}`);

// ── Questions ──
export const getQuestions           = ()       => api.get('/questions');
export const getQuestionsByExam     = (examId) => api.get(`/questions/exam/${examId}`);
export const createQuestion         = (data)   => api.post('/questions', data);
export const updateQuestion         = (id, d)  => api.put(`/questions/${id}`, d);
export const deleteQuestion         = (id)     => api.delete(`/questions/${id}`);

// ── Results ──
export const getResults     = ()           => api.get('/results');
export const createResult   = (data)       => api.post('/results', data);
export const updateResult   = (id, data)   => api.put(`/results/${id}`, data);
export const deleteResult   = (id)         => api.delete(`/results/${id}`);
