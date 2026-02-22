import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  useEffect(() => {
    fetchEntries();
    const script = document.createElement('script');
    script.src = "https://dimden.dev/scripts/stars.js"; 
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); }
  }, []);

  async function fetchEntries() {
    try {
      const response = await fetch(`${API_URL}/api/guestbook`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Transmission error:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ name: '', message: '' });
        fetchEntries(); 
      }
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  return (
    <div className="container">
      {/* Left Column: Personal Info */}
      <div className="left-side">
        <header>
          <h1>Klein's Personal Webpages</h1>
        </header>

        <section className="profile-card section">
          <div className="profile-flex">
            <img src="/Image.jpg" alt="Klein Vincent De Guzman" className="avatar" />
            <div className="bio">
              <h2>Klein Vincent De Guzman</h2>
              <p>20 years old.</p>
              <p>Welcome to my personal web profile. I am from SF241. BSCS Cybersecurity and Forensics.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h3>Click to see my projects</h3>
          <div className="links-grid">
            <a href="https://github.com/cozytan" target="_blank" rel="noreferrer" className="p-link">GitHub</a>
            <a href="#" className="p-link">Coming soon</a>
            <a href="#" className="p-link">Coming soon</a>
          </div>
        </section>

        <section className="section build-box">
          <h3>Build</h3>
          <p><strong>Frontend:</strong> React (Vite)</p>
          <p><strong>Backend:</strong> NestJS (REST API)</p>
          <p><strong>Database:</strong> Supabase</p>
          <p><strong>Hosting:</strong> Vercel</p>
        </section>

        <footer>
          <h3>Contact</h3>
          <p>Email: <a href="mailto:kleindeguzman05@icloud.com" className="contact-link">kleindeguzman05@icloud.com</a></p>
          <p>Phone: 09956694610</p>
        </footer>
      </div>

      {/* Right Column: Terminal Guestbook */}
      <div className="right-side">
        <section className="section guestbook-section">
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
            {entries.length === 0 ? <div className="entry">No logs found...</div> : 
              entries.map((e, index) => (
                <div key={index} className="entry">
                  <span><span className="user-name">[{e.name}]</span>: {e.message}</span>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;