import { useState, useCallback, useEffect, useRef } from 'react';
import { createFeedback } from './feedbackServices.js';
import styles from './FeedbackForm.module.css';

export default function FeedbackForm({ onFeedbackAdded }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const resetTimerRef = useRef(null);

  const validate = useCallback(({ name, email, message }) => {
    if (!name.trim() || !message.trim()) {
      return 'Please fill all fields.';
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email.';
    }
    if (message.trim().length < 2) {
      return 'Message is too short.';
    }
    return '';
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm((prev) => ({ ...prev, [name]: value }));
      if (error) setError('');
    },
    [error],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationError = validate(form);
      if (validationError) {
        setError(validationError);
        setStatus('error');
        return;
      }

      setStatus('loading');
      setError('');
      try {
        await createFeedback({
          Name: form.name,
          Email: form.email || undefined, // opcional
          Message: form.message,
        });

        setForm({ name: '', email: '', message: '' });
        setStatus('success');
        onFeedbackAdded?.();

        resetTimerRef.current = setTimeout(() => setStatus('idle'), 2000);
      } catch (err) {
        setStatus('error');
        setError('Failed to submit.');
      }
    },
    [form, onFeedbackAdded, validate],
  );

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.nameEmail}>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />

        <label htmlFor="email" className="sr-only">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email (optional)"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <label htmlFor="message" className="sr-only">
        Feedback
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="Your feedback"
        value={form.message}
        onChange={handleChange}
        rows="2"
        className={styles.textarea}
        required
      />

      {error && (
        <p className={styles.error} role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <button disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Add Feedback'}
      </button>

      {status === 'success' && (
        <p className={styles.success} aria-live="polite">
          Feedback added ✅
        </p>
      )}
    </form>
  );
}
