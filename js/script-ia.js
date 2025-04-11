const chatButton = document.getElementById('chat-button');
const chatBox = document.getElementById('chat-box');
const closeChat = document.getElementById('close-chat');
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const promptSuggestions = document.getElementById('prompt-suggestions');

const prompts = [
  "Cuéntame sobre el proyecto CasiSAT.",
  "¿Qué retos enfrentó Jonathan en el proyecto Movie Explorer?",
  "¿Qué tecnologías se usaron en Gemini Writer API?",
  "¿Cuál es el proyecto más visual de Jonathan?",
  "¿Cómo puedo contactar a Jonathan para una colaboración?",
  "¿Tiene Jonathan proyectos en GitHub?",
  "¿Jonathan acepta trabajos freelance o colaboraciones externas?",
  "¿Quién es Jonathan Caballero y qué experiencia tiene en desarrollo?",
  "¿Dónde puedo ver el portafolio de Jonathan?",
  "¿Cuál es la especialidad principal de Jonathan?",
  "¿En qué tecnologías se siente más cómodo trabajando?"
];

const welcomeMessage = "¡Hola! Soy el asistente del portafolio de Jonathan Caballero. Puedo contarte sobre sus proyectos, habilidades y experiencia. Aquí tienes algunas preguntas que podrías hacerme:";
let hasShownWelcome = false;
let isFirstInteraction = true;

function showRandomPrompts() {
  promptSuggestions.innerHTML = '';
  
  const shuffled = [...prompts].sort(() => 0.5 - Math.random());
  const selectedPrompts = shuffled.slice(0, 3);
  
  selectedPrompts.forEach(prompt => {
    const suggestion = document.createElement('div');
    suggestion.className = 'prompt-suggestion';
    suggestion.textContent = prompt;
    suggestion.addEventListener('click', () => {
      userInput.value = prompt;
      userInput.focus();
    });
    promptSuggestions.appendChild(suggestion);
  });
}

chatButton.addEventListener('click', () => {
  if (chatBox.style.display !== 'flex') {
    chatBox.style.display = 'flex';
    
    if (chatMessages.children.length === 0 && !hasShownWelcome) {
      setTimeout(() => {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          appendMessage('bot', welcomeMessage, true);
          hasShownWelcome = true;
          showRandomPrompts();
        }, 1500);
      }, 500);
    } else {
      showRandomPrompts();
    }
  } else {
    chatBox.style.display = 'none';
  }
});

closeChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

sendButton.addEventListener('click', sendMessage);

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';
  promptSuggestions.innerHTML = '';
  
  showTypingIndicator();

  const url = 'https://magicloops.dev/api/loop/c930ac10-8b90-4a24-9b9f-05e1e47d532b/run';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: message
      })
    });

    const data = await response.json(); 
    
    setTimeout(() => {
      removeTypingIndicator();
       
      let botReply = data;
      
      if (typeof data === 'object' && data !== null) {
        botReply = data.response || data.respuesta || data.message || data.output || JSON.stringify(data);
      }
      
      if (typeof botReply !== 'string') {
        botReply = 'Recibí una respuesta en formato no esperado.';
      }
      
      if (!isFirstInteraction) {
        const unwantedGreetings = ["¡Hola! Soy tu asistente virtual. ", "¡Hola! "];
        unwantedGreetings.forEach(greeting => {
          if (botReply.startsWith(greeting)) {
            botReply = botReply.substring(greeting.length);
          }
        });
      } else {
        isFirstInteraction = false;
      }
      
      appendMessage('bot', botReply, true);
      showRandomPrompts();
    }, 1000 + Math.random() * 1000);

  } catch (error) {
    console.error('Error:', error);
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage('bot', 'Ocurrió un error al conectar con el asistente. Por favor, intenta de nuevo más tarde.');
      showRandomPrompts();
    }, 1000);
  }
}

function showTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'message bot typing-indicator-container';
  div.id = 'typing-indicator';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  
  const icon = document.createElement('div');
  icon.className = 'message-icon';
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="3" width="14" height="10" rx="2"></rect>
        <line x1="12" y1="3" x2="12" y2="1"></line>
        <circle cx="9" cy="8" r="1"></circle>
        <circle cx="15" cy="8" r="1"></circle>
        <path d="M8 12h8"></path>
        <rect x="6" y="15" width="12" height="6" rx="1"></rect>
    </svg>
  `;
  
  const typingDots = document.createElement('div');
  typingDots.className = 'typing-indicator';
  typingDots.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;
  
  messageContent.appendChild(icon);
  messageContent.appendChild(typingDots);
  div.appendChild(messageContent);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function appendMessage(sender, text, animate = false) {
  const div = document.createElement('div');
  div.className = `message ${sender} message-appear`;
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  
  const icon = document.createElement('div');
  icon.className = 'message-icon';
  
  if (sender === 'user') {
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
  } else {
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="3" width="14" height="10" rx="2"></rect>
        <line x1="12" y1="3" x2="12" y2="1"></line>
        <circle cx="9" cy="8" r="1"></circle>
        <circle cx="15" cy="8" r="1"></circle>
        <path d="M8 12h8"></path>
        <rect x="6" y="15" width="12" height="6" rx="1"></rect>
      </svg>
    `;
  }
  
  const textDiv = document.createElement('div');
  textDiv.className = 'message-text';
  
  if (animate && sender === 'bot') {
    const words = text.split(' ');
    let currentText = '';
    let wordIndex = 0;
    
    textDiv.textContent = '';
    
    const typeWriter = () => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        textDiv.textContent = currentText;
        wordIndex++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        const speed = 30 + Math.random() * 50;
        setTimeout(typeWriter, speed);
      }
    };
    
    typeWriter();
  } else {
    textDiv.textContent = text;
  }
  
  messageContent.appendChild(icon);
  messageContent.appendChild(textDiv);
  div.appendChild(messageContent);
  
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}