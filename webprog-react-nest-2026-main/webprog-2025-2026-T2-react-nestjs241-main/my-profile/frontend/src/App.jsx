import React, { useEffect, useState } from 'react';
import './App.css';

// This will point to your live NestJS Vercel URL later
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  useEffect(() => {
    fetchEntries();
  }, []);

  // GET Method
  async function fetchEntries() {
    try {
      const response = await fetch(`${API_URL}/api/guestbook`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Transmission error:", error);
    }
  }

  // POST Method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/api/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ name: '', message: '' });
      fetchEntries(); // Refresh the list
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Klein's Personal Webpages</h1>
      </header>

      {/* ABOUT ME */}
      <section className="profile-card section">
        <div className="profile-flex">
          <img src="/profile.jpg" alt="Klein Vincent De Guzman" className="avatar" />
          <div className="bio">
            <h2>Klein Vincent De Guzman</h2>
            <p>20 years old.</p>
            <p>Full-stack developer engineering secure, responsive, and data-driven web applications.</p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section">
        <h3>Click to see my projects</h3>
        <div className="links-grid">
          <a href="#" className="p-link">Project Alpha</a>
          <a href="#" className="p-link">Project Beta</a>
          <a href="#" className="p-link">Project Gamma</a>
        </div>
      </section>

      {/* BUILD TOOLS */}
      <section className="section build-box">
        <h3>Build</h3>
        <p><strong>Frontend:</strong> React (Vite)</p>
        <p><strong>Backend:</strong> NestJS (REST API)</p>
        <p><strong>Database:</strong> Supabase (PostgreSQL)</p>
        <p><strong>Hosting:</strong> Vercel</p>
      </section>

      {/* GUESTBOOK API */}
      <section className="section">
        <h3>Terminal Guestbook</h3>
        <form onSubmit={handleSubmit} className="guest-form">
          <input 
            type="text" placeholder="Alias (Name)" required
            value={form.name} onChange={e => setForm({...form, name: e.target.value})} 
          />
          <textarea 
            placeholder="Enter transmission log..." required
            value={form.message} onChange={e => setForm({...form, message: e.target.value})}
          />
          <button type="submit">Submit Log</button>
        </form>

        <div className="entry-list">
          {entries.map((e, index) => (
            <div key={index} className="entry">
              <span><span className="user-name">[{e.name}]</span>: {e.message}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <footer>
        <h3>Contact</h3>
        <p>Email: <a href="mailto:kleindeguzman05@icloud.com" className="contact-link">kleindeguzman05@icloud.com</a></p>
        <p>Phone: 09956694610</p>
      </footer>
    </div>
  );
}

export default App;