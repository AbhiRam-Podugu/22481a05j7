import React, { useEffect } from 'react';
import './App.css';
import UrlShortenerPage from './UrlShortenerPage';
import { logEvent } from './logger';

function App() {
  // Insert your latest valid access token EXACTLY here.
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpcmFtcG9kdWd1NzcyMkBnbWFpbC5jb20iLCJleHAiOjE3NTQzODE4NjUsImlhdCI6MTc1NDM4MDk2NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjEzMTQwN2QzLTllNjctNDliZS1hYTgyLWNjZjVjZjc1YjEwYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBvZHVndSBiYWxhIG5hZ2EgYWJoaXJhbSIsInN1YiI6Ijg1ZmZhYjFlLTMwYmItNDBmMS1iYjYzLTgxMjc0ODhlYTZhNCJ9LCJlbWFpbCI6ImFiaGlyYW1wb2R1Z3U3NzIyQGdtYWlsLmNvbSIsIm5hbWUiOiJwb2R1Z3UgYmFsYSBuYWdhIGFiaGlyYW0iLCJyb2xsTm8iOiIyMjQ4MWEwNWo3IiwiYWNjZXNzQ29kZSI6IkhiRHBwRyIsImNsaWVudElEIjoiODVmZmFiMWUtMzBiYi00MGYxLWJiNjMtODEyNzQ4OGVhNmE0IiwiY2xpZW50U2VjcmV0IjoiRWNNZ1VlVlpRVGFLY1dkcCJ9.bT9wr6p0jwl7XaLLvgbP4dB_Mew2NMSdwb8YCuMDFWE";

  // Log when the App component loads
  useEffect(() => {
    logEvent({
      stack: "frontend",
      level: "info",
      package: "component",
      message: "App component loaded",
      token: AUTH_TOKEN
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener Demo</h1>
      </header>
      {/* Pass the token to child pages */}
      <UrlShortenerPage authToken={AUTH_TOKEN} />
    </div>
  );
}

export default App;
