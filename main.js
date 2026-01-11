import './style.css';
import { createIcons, icons } from 'lucide';
import { generateUsers, generateMessage } from './src/mockData.js';

// State
let state = {
  currentUser: null,
  users: [],
  activeChatId: null,
  messages: {}, // Map of userId -> array of messages
  isMobile: window.innerWidth <= 768,
  showSidebar: true
};

const app = document.getElementById('app');

// Initialize
function init() {
  // Check for session (mock)
  const storedUser = localStorage.getItem('chat_user');
  if (storedUser) {
    state.currentUser = JSON.parse(storedUser);
    loadChatApp();
  } else {
    renderLogin();
  }
  
  // Handle resize
  window.addEventListener('resize', () => {
    state.isMobile = window.innerWidth <= 768;
    if (!state.isMobile) {
      state.showSidebar = true;
      updateLayout();
    }
  });
}

// Render Login
function renderLogin() {
  app.innerHTML = `
    <div class="login-container">
      <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
        <i data-lucide="message-circle" style="width: 48px; height: 48px; color: var(--accent-color);"></i>
      </div>
      <h1 class="login-title">Welcome Back</h1>
      <p class="login-subtitle">Sign in to start chatting with your friends</p>
      
      <form id="loginForm">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" placeholder="you@example.com" required value="demo@dualite.dev">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" placeholder="••••••••" required value="password">
        </div>
        <button type="submit" class="btn">
          Sign In <i data-lucide="arrow-right" style="width: 18px;"></i>
        </button>
      </form>
    </div>
  `;
  
  createIcons({ icons });
  
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Mock login
    const user = {
      id: 'current-user',
      name: 'Demo User',
      email: e.target[0].value,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
      isOnline: true
    };
    
    state.currentUser = user;
    localStorage.setItem('chat_user', JSON.stringify(user));
    loadChatApp();
  });
}

// Load Chat App
function loadChatApp() {
  // Generate mock users if empty
  if (state.users.length === 0) {
    state.users = generateUsers(12);
  }
  
  renderChatLayout();
}

// Render Main Layout
function renderChatLayout() {
  app.innerHTML = `
    <div class="chat-layout">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="user-profile">
            <img src="${state.currentUser.avatar}" alt="Profile" class="avatar">
            <span class="current-user-name">${state.currentUser.name}</span>
          </div>
          <button class="logout-btn" id="logoutBtn" title="Logout">
            <i data-lucide="log-out" style="width: 20px;"></i>
          </button>
        </div>
        <div class="users-list" id="usersList">
          <!-- Users injected here -->
        </div>
      </aside>
      
      <main class="chat-main" id="chatMain">
        <!-- Chat content injected here -->
      </main>
    </div>
  `;
  
  createIcons({ icons });
  
  // Event Listeners
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('chat_user');
    state.currentUser = null;
    state.activeChatId = null;
    renderLogin();
  });
  
  renderUserList();
  renderChatArea();
  updateLayout();
}

// Render User List
function renderUserList() {
  const list = document.getElementById('usersList');
  list.innerHTML = state.users.map(user => `
    <div class="user-item ${state.activeChatId === user.id ? 'active' : ''}" data-id="${user.id}">
      <div style="position: relative;">
        <img src="${user.avatar}" alt="${user.name}" class="avatar">
        ${user.isOnline ? '<span class="status-dot online" style="position: absolute; bottom: 0; right: 0; border: 2px solid white;"></span>' : ''}
      </div>
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-status">
          <span class="status-dot ${user.isOnline ? 'online' : ''}"></span>
          ${user.isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click listeners
  list.querySelectorAll('.user-item').forEach(item => {
    item.addEventListener('click', () => {
      const userId = item.getAttribute('data-id');
      setActiveChat(userId);
    });
  });
}

// Set Active Chat
function setActiveChat(userId) {
  state.activeChatId = userId;
  
  if (state.isMobile) {
    state.showSidebar = false;
    updateLayout();
  }
  
  renderUserList(); // Re-render to update active class
  renderChatArea();
}

// Update Layout for Mobile
function updateLayout() {
  const sidebar = document.getElementById('sidebar');
  if (state.isMobile) {
    if (state.showSidebar) {
      sidebar.classList.remove('hidden');
    } else {
      sidebar.classList.add('hidden');
    }
  } else {
    sidebar.classList.remove('hidden');
  }
}

// Render Chat Area
function renderChatArea() {
  const main = document.getElementById('chatMain');
  
  if (!state.activeChatId) {
    main.innerHTML = `
      <div class="empty-state">
        <i data-lucide="message-square" class="empty-icon" style="width: 64px; height: 64px;"></i>
        <h2>Select a conversation</h2>
        <p>Choose a user from the sidebar to start chatting</p>
      </div>
    `;
    createIcons({ icons });
    return;
  }
  
  const activeUser = state.users.find(u => u.id === state.activeChatId);
  const messages = state.messages[state.activeChatId] || [];
  
  main.innerHTML = `
    <header class="chat-header">
      <button class="back-btn" id="backBtn">
        <i data-lucide="arrow-left"></i>
      </button>
      <img src="${activeUser.avatar}" class="avatar" style="width: 32px; height: 32px;">
      <div class="chat-header-info">
        <h3>${activeUser.name}</h3>
        <span class="user-status" style="font-size: 0.75rem;">
          ${activeUser.isOnline ? 'Active now' : 'Last seen recently'}
        </span>
      </div>
    </header>
    
    <div class="chat-messages" id="messagesContainer">
      ${messages.map(msg => `
        <div class="message ${msg.senderId === state.currentUser.id ? 'sent' : 'received'}">
          <div class="message-bubble">${msg.text}</div>
          <span class="message-time">
            ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      `).join('')}
    </div>
    
    <div class="chat-input-area">
      <form class="input-form" id="messageForm">
        <input type="text" class="message-input" placeholder="Type a message..." autocomplete="off">
        <button type="submit" class="send-btn">
          <i data-lucide="send" style="width: 20px;"></i>
        </button>
      </form>
    </div>
  `;
  
  createIcons({ icons });
  
  // Scroll to bottom
  const container = document.getElementById('messagesContainer');
  container.scrollTop = container.scrollHeight;
  
  // Event Listeners
  if (state.isMobile) {
    document.getElementById('backBtn').addEventListener('click', () => {
      state.showSidebar = true;
      state.activeChatId = null;
      updateLayout();
      renderUserList(); // Clear active selection
    });
  }
  
  document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const text = input.value.trim();
    
    if (text) {
      sendMessage(text);
      input.value = '';
    }
  });
}

// Send Message Logic
function sendMessage(text) {
  if (!state.activeChatId) return;
  
  const newMessage = generateMessage(state.currentUser.id, text);
  
  if (!state.messages[state.activeChatId]) {
    state.messages[state.activeChatId] = [];
  }
  
  state.messages[state.activeChatId].push(newMessage);
  renderChatArea();
  
  // Simulate reply
  setTimeout(() => {
    const reply = generateMessage(state.activeChatId);
    state.messages[state.activeChatId].push(reply);
    
    // Only re-render if still on the same chat
    if (state.activeChatId === reply.senderId) {
      renderChatArea();
    }
  }, 1000 + Math.random() * 2000);
}

// Start
init();
