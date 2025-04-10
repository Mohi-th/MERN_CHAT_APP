# 💬 Chit-Chat — Real-Time Chat App  

A full-stack real-time chat application with secure authentication, live messaging, media sharing, and a responsive UI. Built using **React**, **Redux Toolkit**, **Tailwind CSS**, **Node.js**, **MongoDB**, and **Socket.io**.  

---

## 🚀 Features  
- 🔐 User Authentication (Register/Login)  
- 💬 Real-time messaging with **Socket.io**  
- 👀 Online status & typing indicators  
- 🧑‍🤝‍🧑 Add friends, create groups, and group chat  
- 🔔 Notifications for friend requests  
- 🖼️ Media uploads using **Cloudinary**  
- 📱 Fully responsive UI with **Tailwind CSS** and **ShadCN UI**  
- 🎨 Clean chat interface with sidebar switching  

---

## ⚙️ Tech Stack  
**Frontend**  
- React  
- Redux Toolkit  
- Tailwind CSS  
- ShadCN UI  

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- JWT Auth  
- Socket.io  
- Cloudinary  

---

## 📸 Screenshots  

### Desktop View  
#### 1. Welcome Page  
![Welcome Page](/screenshots/welcome-desktop.png)  

#### 2. Register & Login  
| Sign Up | Login |  
|---------|-------|  
| ![Register](/screenshots/register-desktop.png) | ![Login](/screenshots/login-desktop.png) |  

#### 3. Chat Interface  
![Chat Page](/screenshots/chat-desktop.png)  

#### 4. Create Group  
![Create Group](/screenshots/create-group-desktop.png)  

#### 5. Add Friends  
![Add Friends](/screenshots/add-friend-desktop.png)  

#### 6. Friend Request Notifications  
![Notifications](/screenshots/notifications-desktop.png)  

---

### Mobile View  
#### 1. Chat Interface  
![Chat Mobile](/screenshots/chat-mobile.png)  

#### 2. Chat Sidebar  
![Mobile Sidebar](/screenshots/sidebar-mobile.png)  

#### 3. Create Group  
![Mobile Group](/screenshots/create-group-mobile.png)  

#### 4. Add Group Members  
![Add Members Mobile](/screenshots/add-members-mobile.png)  

---

## 💻 Getting Started  

### Prerequisites  
- Node.js (v16+)  
- MongoDB Atlas or local instance  
- Cloudinary account (for media uploads)  

### Installation  
1. **Clone the repository**  
   ```bash  
   git clone https://github.com/Mohi-th/MERN_CHAT_APP.git  
   cd chit-chat 
    
   cd backend  
   npm install  
   cp .env.example .env  # Update with your credentials  
   npm run dev  

   cd frontend  
   npm install  
   npm run dev  