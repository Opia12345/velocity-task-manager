# ⚡ Velocity Task Manager

A beautiful, modern task management application built with Next.js, featuring a stunning glassmorphism design, real-time updates, and seamless user experience.

![Velocity Task Manager](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.29.2-pink?style=for-the-badge&logo=framer)

## Features

- **⚡ Real-time Updates** - Live synchronization across all connected clients
- **🔄 Drag & Drop** - Intuitive task reordering with smooth animations
- **📱 Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **🎯 Smart Filtering** - Advanced filter dropdown with visual icons and active filter indicators
- **🔍 Search Functionality** - Search tasks by title and description with live feedback
- **📊 Advanced Sorting** - Sort by date created, updated, title, completion status, priority, or due date
- **🔔 Toast Notifications** - Beautiful success/error notifications with glassmorphism
- **💾 Auto-save** - Changes are saved automatically as you type
- **🎭 Loading Skeletons** - Smooth loading states with animated placeholders
- **⚠️ Delete Confirmation** - Prevent accidental deletions with confirmation modals
- **🎪 Empty States** - Engaging empty states to guide user actions
- **📊 Progress Tracking** - Visual progress indicators and task statistics
- **🏷️ Priority Levels** - Set task priorities (Low, Medium, High)
- **📅 Due Dates** - Add due dates to tasks with overdue tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PocketBase instance (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Opia12345/velocity-task-manager.git
   cd velocity-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_POCKETBASE_URL=http://your-pocketbase-base-url
   ```

4. **Set up PocketBase**
   
   Download PocketBase from [pocketbase.io](https://pocketbase.io/docs/) and create a `tasks` collection with the following schema:
   
   ```javascript
   // Collection: tasks
   {
     "id": "string (auto-generated)",
     "title": "string (required)",
     "description": "string (required)",
     "category": "string (required) - options: work, personal, urgent, other",
     "completed": "boolean (default: false)",
     "order": "number (default: 0)",
     "priority": "string (optional)",
     "created": "datetime (auto-generated)",
     "updated": "datetime (auto-generated)"
   }
   ```

5. **Start PocketBase**
   ```bash
   ./pocketbase.exe serve
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Live Demo

**Live Application**: [https://velocity-task-manager.vercel.app/](https://velocity-task-manager.vercel.app/)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_POCKETBASE_URL` | PocketBase server URL | `http://localhost:8090` |

### PocketBase Setup

1. **Download PocketBase** from the official website
2. **Create the tasks collection** with the schema provided above
3. **Configure CORS** if needed for your domain
4. **Set up authentication** (optional) for multi-user support

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **PocketBase** - Backend-as-a-Service
- **Lucide React** - Beautiful icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Backend by [PocketBase](https://pocketbase.io/)

---