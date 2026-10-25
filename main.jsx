import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const paths = [
  { age: "1–4", name: "Tiny Talkers", icon: "🧸", color: "pink", desc: "A gentle, parent-guided start with sounds, words and playful everyday phrases.", level: "Parent-guided" },
  { age: "5–9", name: "Little Speakers", icon: "🪁", color: "orange", desc: "Build a word garden through stories, pictures, listening and fun mini-games.", level: "Play & learn" },
  { age: "10–17", name: "Young Communicators", icon: "🚀", color: "blue", desc: "Grow your grammar, vocabulary and confidence for school and everyday conversations.", level: "Build confidence" },
  { age: "18–25", name: "Career & Confidence", icon: "🎯", color: "purple", desc: "Practice interviews, presentations, professional English and clear communication.", level: "Real-world English" },
  { age: "26+", name: "Fluent Life", icon: "🌍", color: "green", desc: "Strengthen fluency for travel, work, relationships and lifelong learning.", level: "Keep progressing" }
];

const words = [
  { word: "Confident", meaning: "Believing in your ability to do something.", example: "I feel confident when I practise every day." },
  { word: "Curious", meaning: "Wanting to learn or know more.", example: "A curious learner asks good questions." },
  { word: "Improve", meaning: "To become better at something.", example: "I improve my English little by little." },
  { word: "Express", meaning: "To share a thought or feeling.", example: "Try to express your idea in one clear sentence." }
];

const questions = [
  { q: "Choose the correct sentence.", options: ["She go to class every day.", "She goes to class every day.", "She going to class every day."], answer: 1, explain: "With he, she or it, we usually add -s to the verb in the simple present." },
  { q: "What does “curious” mean?", options: ["Wanting to learn more", "Feeling sleepy", "Moving very quickly"], answer: 0, explain: "Curious means eager to learn, discover or understand something." },
  { q: "Complete the sentence: “I ___ practising English.”", options: ["am", "is", "are"], answer: 0, explain: "Use “I am” with an -ing verb: I am practising." }
];

function App() {
  const [active, setActive] = useState("Home");
  const [selectedPath, setSelectedPath] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savedWords, setSavedWords] = useState(() => Number(localStorage.getItem("ss-words") || 0));
  const [showLogin, setShowLogin] = useState(false);

  const go = (name) => { setActive(name); setSelectedPath(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const saveWord = () => {
    const next = savedWords + 1;
    setSavedWords(next);
    localStorage.setItem("ss-words", String(next));
  };
  const chooseAnswer = (i) => {
    if (answer !== null) return;
    setAnswer(i);
    if (i === questions[qIndex].answer) setScore(score + 1);
  };
  const nextQuestion = () => {
    if (qIndex < questions.length - 1) { setQIndex(qIndex + 1); setAnswer(null); }
    else setFinished(true);
  };
  const restartQuiz = () => { setQIndex(0); setAnswer(null); setScore(0); setFinished(false); };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one"></div><div className="ambient ambient-two"></div>
      <header className="topbar">
        <button className="brand" onClick={() => go("Home")} aria-label="SpeakSphere home">
          <span className="brand-mark">S<span>✦</span></span><span>Speak<span className="brand-accent">Sphere</span><small>Your Journey to Confident English</small></span>
        </button>
        <nav className="desktop-nav">
          {["Home", "Learning paths", "Vocabulary", "Practice"].map(n => <button key={n} className={active === n ? "nav-link active" : "nav-link"} onClick={() => go(n)}>{n}</button>)}
        </nav>
        <button className="sign-in" onClick={() => setShowLogin(true)}>Get started <span>↗</span></button>
      </header>

      <main>
        {active === "Home" && <>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span className="pulse-dot"></span> YOUR ENGLISH, YOUR PACE</div>
              <h1>Find your voice.<br /><span className="gradient-text">Unlock your world.</span></h1>
              <p className="hero-text">English confidence is built one little moment at a time. Explore words, practise real-life conversations and celebrate every step forward.</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => go("Learning paths")}>Find your learning path <span>→</span></button>
                <button className="text-btn" onClick={() => go("Practice")}><span className="play">▶</span> Try a quick lesson</button>
              </div>
              <div className="social-proof"><div className="avatar-stack"><span>🌱</span><span>💬</span><span>✨</span></div><div><strong>Small steps. Real progress.</strong><small>Learn at a pace that feels right for you.</small></div></div>
            </div>
            <div className="hero-visual">
              <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div>
              <div className="floating-chip chip-top"><span>✦</span> Confidence grows here</div>
              <div className="sphere"><div className="sphere-shine"></div><div className="sphere-core">Aa<span>✦</span></div><div className="sphere-ring"></div></div>
              <div className="floating-chip chip-bottom"><span className="mini-check">✓</span> One word at a time</div>
              <div className="spark spark-one">✧</div><div className="spark spark-two">✦</div><div className="spark spark-three">·</div>
            </div>
          </section>
          <section className="stats-strip">
            <div><strong>05</strong><span>learning paths</span></div><i></i><div><strong>01</strong><span>step at a time</span></div><i></i><div><strong>∞</strong><span>ways to express yourself</span></div>
          </section>
          <section className="section-block">
            <div className="section-heading"><div><span className="eyebrow">A PATH FOR EVERY STAGE</span><h2>Where are you <span className="gradient-text">starting?</span></h2><p>Choose a learning path that fits your age and your goals.</p></div><button className="text-btn desktop-only" onClick={() => go("Learning paths")}>Explore all paths →</button></div>
            <div className="path-grid">{paths.slice(0,3).map(p => <PathCard key={p.name} path={p} onClick={() => {setSelectedPath(p);setActive("Learning paths");}} />)}</div>
          </section>
          <section className="practice-banner"><div className="banner-icon">🎧</div><div><span className="eyebrow">YOUR DAILY 5-MINUTE BOOST</span><h2>Practise a little. Grow a lot.</h2><p>A tiny lesson today can make tomorrow's conversation easier.</p></div><button className="primary-btn" onClick={() => go("Practice")}>Start practising <span>→</span></button></section>
        </>}

        {active === "Learning paths" && <section className="page-section">
          <div className="page-intro"><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h1>Choose your <span className="gradient-text">learning path.</span></h1><p>Every learner is different. Find a path that matches your stage of life and what you want to achieve.</p></div>
          {selectedPath && <div className="selected-note"><span>{selectedPath.icon}</span><div><strong>{selectedPath.name} selected</strong><p>{selectedPath.desc}</p></div><button onClick={() => setSelectedPath(null)} aria-label="Close">×</button></div>}
          <div className="path-grid all-paths">{paths.map(p => <PathCard key={p.name} path={p} onClick={() => setSelectedPath(p)} selected={selectedPath?.name === p.name} />)}</div>
          <p className="privacy-note">🔒 For young learners, a parent or trusted adult should help set up and guide learning.</p>
        </section>}

        {active === "Vocabulary" && <section className="page-section">
          <div className="page-intro"><span className="eyebrow">WORD BY WORD</span><h1>Grow your <span className="gradient-text">word garden.</span></h1><p>Discover a useful word, understand it and try it in a sentence.</p></div>
          <div className="word-card"><div className="word-card-top"><span className="word-label">WORD OF THE MOMENT</span><span className="word-count">{wordIndex + 1} / {words.length}</span></div><div className="big-word">{words[wordIndex].word}<span>✦</span></div><p className="meaning">{words[wordIndex].meaning}</p><div className="example-box"><span>EXAMPLE</span><p>“{words[wordIndex].example}”</p></div><div className="word-actions"><button className="secondary-btn" onClick={saveWord}>＋ Save word</button><button className="primary-btn" onClick={() => setWordIndex((wordIndex + 1) % words.length)}>Next word →</button></div></div>
          <p className="progress-caption">Words saved on this device: <strong>{savedWords}</strong></p>
        </section>}

        {active === "Practice" && <section className="page-section">
          <div className="page-intro"><span className="eyebrow">NO PRESSURE, JUST PRACTICE</span><h1>A little <span className="gradient-text">practice goes far.</span></h1><p>Try this short English check-in. Learn from every answer.</p></div>
          {!finished ? <div className="quiz-card"><div className="quiz-top"><span className="word-label">QUICK CHECK-IN</span><span className="word-count">QUESTION {qIndex + 1} OF {questions.length}</span></div><div className="progress-track"><div style={{width: `${((qIndex + 1) / questions.length) * 100}%`}}></div></div><h2>{questions[qIndex].q}</h2><div className="answer-list">{questions[qIndex].options.map((opt,i)=><button key={opt} className={`answer-option ${answer !== null && i === questions[qIndex].answer ? "correct" : ""} ${answer === i && i !== questions[qIndex].answer ? "incorrect" : ""}`} onClick={() => chooseAnswer(i)}><span className="option-letter">{String.fromCharCode(65+i)}</span>{opt}<span className="option-end">{answer !== null && i === questions[qIndex].answer ? "✓" : ""}</span></button>)}</div>{answer !== null && <div className="feedback"><strong>{answer === questions[qIndex].answer ? "Nicely done! ✨" : "Good try — keep going!"}</strong><p>{questions[qIndex].explain}</p><button className="primary-btn" onClick={nextQuestion}>{qIndex === questions.length - 1 ? "See my result" : "Next question →"}</button></div>}</div> : <div className="result-card"><div className="result-icon">🎉</div><span className="eyebrow">PRACTICE COMPLETE</span><h2>You showed up. That's progress.</h2><p>You answered <strong>{score} out of {questions.length}</strong> correctly. Review the explanations and try again whenever you like.</p><button className="primary-btn" onClick={restartQuiz}>Try again ↻</button></div>}
        </section>}
      </main>

      <footer className="footer"><button className="brand footer-brand" onClick={() => go("Home")}><span className="brand-mark">S<span>✦</span></span><span>Speak<span className="brand-accent">Sphere</span><small>Your Journey to Confident English</small></span></button><p>Learn gently. Speak boldly. Keep growing. ✦</p><span className="copyright">© 2026 SpeakSphere · Learning demo</span></footer>

      {showLogin && <div className="modal-backdrop" onClick={() => setShowLogin(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowLogin(false)}>×</button><div className="modal-logo">S✦</div><h2>Your journey starts here.</h2><p>This starter version is a working front-end demo. Secure accounts and password reset need to be connected to Supabase before real sign-in is enabled.</p><button className="primary-btn full-btn" onClick={() => {setShowLogin(false);go("Learning paths")}}>Explore learning paths →</button></div></div>}
    </div>
  );
}

function PathCard({path, onClick, selected}) {
  return <button className={`path-card ${selected ? "path-selected" : ""}`} onClick={onClick}><div className={`path-icon ${path.color}`}>{path.icon}</div><div className="path-age">AGES {path.age}</div><h3>{path.name}</h3><p>{path.desc}</p><div className="path-footer"><span>{path.level}</span><span className="arrow-circle">↗</span></div></button>;
}

createRoot(document.getElementById("root")).render(<App />);