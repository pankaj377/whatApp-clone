import React, { useState, useEffect, useRef } from 'react';
import { db, auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  // 1. Auth Logic
  const login = () => signInWithPopup(auth, provider).then(res => setUser(res.user));

  // 2. Real-time Listener (useEffect)
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  // 3. Auto-scroll (useRef)
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: input,
      uid: user.uid,
      displayName: user.displayName,
      timestamp: serverTimestamp()
    });
    setInput('');
  };

  if (!user) return <div className="login-screen"><button onClick={login}>Login with Google</button></div>;

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3>Chats</h3>
        <div className="chat-item active">Global Group</div>
      </div>
      <div className="chat-window">
        <div className="messages-container">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.uid === user.uid ? 'sent' : 'received'}`}>
              <p className="user-name">{msg.displayName}</p>
              <div className="bubble">{msg.text}</div>
              <div ref={scrollRef} />
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="input-area">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;