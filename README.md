# 🎫 Passcode Ticket — Web Client

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SignalR](https://img.shields.io/badge/SignalR-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

Web client for the Passcode Ticket attendance management system. Built with Angular standalone components, real-time updates via SignalR, and audio announcements for called tickets.

---

## 📋 About

This frontend serves three different interfaces for the attendance system:

- **Totem** — self-service kiosk where patients create tickets by type and sector
- **Attendance** — attendant dashboard to call and finish tickets
- **Panel** — real-time display showing the current and last called tickets with audio announcements

---

## 🖥️ Screenshots

### Totem
> <!-- Add totem screenshot here -->

### Attendance
> <!-- Add attendance screenshot here -->

### Panel
> <!-- Add panel screenshot here -->

---

## 🚀 Features

- JWT authentication with token stored in `localStorage`
- HTTP Interceptor — automatically attaches Bearer token to all requests
- Route Guards — protects authenticated pages
- Real-time ticket queue updates via **SignalR WebSocket**
- Audio announcements when a ticket is called (sequential `.mp3` playback)
- Smart number-to-audio conversion (handles teens 11–19, hundreds, "cento" vs "cem")
- Ticket state persisted in `localStorage` — survives page refresh
- Reactive state management with Angular **Signals**

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| Angular 19 (Standalone) | UI framework |
| TypeScript | Language |
| Angular Signals | Reactive state management |
| Reactive Forms | Form handling and validation |
| HttpClient | REST API communication |
| @microsoft/signalr | WebSocket client |
| TailwindCSS | Styling |
| JWT | Authentication |

---

## ⚙️ Prerequisites

- [Node.js 20+](https://nodejs.org)
- [Angular CLI](https://angular.io/cli)

```bash
npm install -g @angular/cli
```

---

## 📦 Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/passcode-ticket-web.git
cd passcode-ticket-web
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure the API URL**

Update the API base URL in the services to match your backend:

```typescript
// src/app/services/api.ts
private url = 'http://localhost:5210/api';

// src/app/services/panel.ts
private hubUrl = 'http://localhost:5210/hubs/panel';
```

**4. Start the development server**

```bash
ng serve
```

App will be available at `http://localhost:4200`.

---

## 🗂️ Project Structure

```
src/app/
├── components/
│   └── layout/               ← shared layout component
├── guards/
│   └── auth.guard.ts         ← protects authenticated routes
├── interceptors/
│   └── auth.interceptor.ts   ← attaches JWT token to requests
├── interfaces/
│   └── ticket.ts             ← Ticket interface
├── pages/
│   ├── login/                ← authentication page
│   ├── totem/                ← ticket creation (self-service)
│   ├── attendance/           ← attendant dashboard
│   └── panel/                ← real-time display panel
├── services/
│   ├── api.ts                ← HTTP requests (tickets)
│   ├── auth.ts               ← authentication + token management
│   ├── attendance.ts         ← current ticket state
│   └── panel.ts              ← SignalR connection + last calls
├── app.routes.ts
└── app.config.ts
```

---

## 🔐 Authentication Flow

```
1. User submits login form
2. POST /api/user/auth → receives JWT token
3. Token stored in localStorage
4. Auth Interceptor attaches token to every request
5. Auth Guard checks token before accessing protected routes
```

---

## 🔊 Audio Announcement System

When a ticket is called on the Panel, the system plays a sequential audio announcement:

```
notify.mp3 → type.mp3 → ticket.mp3 → [letter].mp3 → [number sequence].mp3
```

**Example for `P034`:**
```
notify.mp3 → preferential.mp3 → ticket.mp3 → p.mp3 → 30.mp3 → e.mp3 → 4.mp3
```

**Number rules:**
- `1–19` → individual files (`1.mp3` ... `19.mp3`)
- `20–99` → tens + "e" + units (`30.mp3 → e.mp3 → 4.mp3`)
- `100` → `100.mp3` ("cem")
- `101–199` → `cent.mp3` + "e" + remainder ("cento e...")
- `200–900` → hundreds file + "e" + remainder (`200.mp3 → e.mp3 → ...`)

> **Note:** The browser blocks autoplay without user interaction. The Panel has a **"Start Panel"** button that must be clicked once per session to enable audio.

---

## 📡 Real-time Updates (SignalR)

| Event | Description |
|---|---|
| `lastCalls` | Received when a ticket is called — updates the Panel display |
| `nextCalls` | Received when the queue changes — updates the Attendance queue list |

The Attendance page joins a **sector group** on connection — only receives updates for its own sector.

---

## 🛣️ Routes

| Path | Component | Auth |
|---|---|---|
| `/login` | LoginComponent | ❌ |
| `/totem` | TotemComponent | ❌ |
| `/attendance` | AttendanceComponent | ✅ |
| `/panel` | PanelComponent | ❌ |

---

## 📄 License

This project is licensed under the MIT License.