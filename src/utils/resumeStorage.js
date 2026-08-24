// Small wrapper around localStorage so the persistence mechanism can later
// be swapped for a backend API call without touching component code.

const STORAGE_KEY = 'aiStudentCareerMentor.resumeBuilder.data';
const STORAGE_TIMESTAMP_KEY = 'aiStudentCareerMentor.resumeBuilder.savedAt';

export function saveResumeToStorage(resumeData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, new Date().toISOString());
    return true;
  } catch (err) {
    console.error('Failed to save resume to localStorage:', err);
    return false;
  }
}

export function loadResumeFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load resume from localStorage:', err);
    return null;
  }
}

export function getLastSavedAt() {
  try {
    return localStorage.getItem(STORAGE_TIMESTAMP_KEY);
  } catch {
    return null;
  }
}

export function clearResumeFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear resume from localStorage:', err);
    return false;
  }
}
