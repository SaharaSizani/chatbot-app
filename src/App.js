import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true); // State to control pop-up visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [showHeader, setShowHeader] = useState(false); // State to control header visibility
  const mainDivRef = useRef(null);

  const trigger = [
    ["hi", "hey", "hello", "good morning", "good afternoon"],
    ["how are you", "how is life", "how are things"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you"],
    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice"],
    ["thanks", "thank you"],
    ["bye", "good bye", "goodbye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"]
  ];

  const reply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    [
      "Fine... how are you?",
      "Pretty well, how are you?",
      "Fantastic, how are you?"
    ],
    [
      "Nothing much",
      "About to go to sleep",
      "Can you guess?",
      "I don't know actually"
    ],
    ["I am infinite"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, JavaScript"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Bye", "Goodbye", "See you later"],
    ["Sushi", "Pizza"],
    ["Bro!"],
    ["Yes?"]
  ];

  const alternative = [
    "Same",
    "Go on...",
    "Bro...",
    "Try again",
    "I'm listening..."
  ];

  const coronavirus = ["Please stay home"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter") {
        e.preventDefault(); // Prevent form submission
        output(input);
        setInput('');
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]); // Only re-run the effect if 'input' changes

  function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");

    if (compare(trigger, reply, text)) {
      product = compare(trigger, reply, text);
    } else if (text.match(/coronavirus/gi)) {
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    addChat(input, product);
  }

  function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray[x].length; y++) {
        if (triggerArray[x][y] === string) {
          let items = replyArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    return item;
  }

  function addChat(input, product) {
    // Use useRef to get the main div element
    const mainDiv = mainDivRef.current;

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.innerHTML = `Chatbot: <span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);

    speak(product);
  }

  function speak(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; // 0-1 interval
    u.rate = 1;
    u.pitch = 1; // 0-2 interval
    window.speechSynthesis.speak(u);
  }

  // Function to handle login
  function handleLogin() {
    setIsLoggedIn(true);
    setShowPopup(false);
    setShowHeader(true);
  }

  // Function to handle sign up
  function handleSignUp() {
    // Implement sign-up logic
    setIsLoggedIn(true);
    setShowPopup(false);
    setShowHeader(true);
  }

  // Function to handle staying logged out
  function handleStayLoggedOut() {
    setShowPopup(false);
    setShowHeader(true);
  }

  return (
    <div className="App">
      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <h2>Thank you for trying MK Chatbot.</h2>
          <p>Chose an option either Login,Sign up to get smarter responses,upload files and images and more.</p>
          {!isLoggedIn && (
            <div className="popup-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignUp}>Sign Up</button>
              <button className="link-style" onClick={handleStayLoggedOut}>Stay Logged Out</button>
            </div>
          )}
        </div>
      )}

      {/* AppHeader */}
      {showHeader && (
        <AppHeader />
      )}

      <div id="main" ref={mainDivRef}>
        <div>
          <input
            id="input"
            type="text"
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
function AppHeader() {
  return (
    <header className="App-header">
      {/* Additional header content */}
    </header>
  );
}
export default App;
