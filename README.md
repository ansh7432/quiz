# Knowledge Quiz Challenge

A beautiful, feature-rich quiz application built with Next.js, TypeScript, and Tailwind CSS. Test your knowledge with 15 questions from various categories within a 30-minute time limit.

## 🌟 Features

### Core Requirements
- **Email-based Start**: Users submit their email address to begin the quiz
- **15 Questions**: Fetched from the Open Trivia Database API
- **30-minute Timer**: Countdown timer with auto-submit functionality
- **Question Navigation**: Navigate to any specific question
- **Progress Overview**: Visual panel showing visited and attempted questions
- **Detailed Results**: Side-by-side comparison of user answers and correct answers

### Bonus Features
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Animations**: Framer Motion animations for seamless transitions
- **Modern UI/UX**: Apple-level design aesthetics with attention to detail
- **Progress Tracking**: Real-time progress indicators and statistics
- **Question Categories**: Display question categories and difficulty levels
- **Time Tracking**: Individual question timing and overall quiz duration
- **Local Storage**: Automatic progress saving
- **Accessibility**: WCAG compliant with proper focus management

### Enhanced Features
- **Question Difficulty Indicators**: Visual badges for easy, medium, and hard questions
- **Category Display**: Show question categories for better context
- **Answer Status Icons**: Visual indicators for visited, attempted, and current questions
- **Score Calculation**: Percentage-based scoring with performance messages
- **Detailed Analytics**: Time spent per question and average response time
- **Retake Functionality**: Easy quiz restart option
- **Loading States**: Smooth loading animations and states
- **Error Handling**: Graceful error handling with user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-application
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (email submission)
│   ├── quiz/page.tsx      # Quiz interface
│   ├── results/page.tsx   # Results page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ProgressBar.tsx
│   ├── Timer.tsx         # Quiz timer component
│   ├── QuestionCard.tsx  # Individual question display
│   └── QuestionOverview.tsx # Question navigation panel
├── context/              # React context
│   └── QuizContext.tsx   # Global quiz state management
├── hooks/                # Custom hooks
│   ├── useQuizTimer.ts   # Timer functionality
│   └── useLocalStorage.ts # Local storage utilities
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
└── types/                # TypeScript definitions
    └── quiz.ts           # Quiz-related types
```

## 🎯 Component Architecture

### State Management
- **QuizContext**: Centralized state management using React Context and useReducer
- **Local Storage**: Automatic progress persistence
- **Type Safety**: Full TypeScript coverage for all data structures

### Key Components
- **Timer**: Real-time countdown with visual indicators and auto-submit
- **QuestionCard**: Interactive question display with smooth animations
- **QuestionOverview**: Navigation panel with status indicators
- **ProgressBar**: Animated progress tracking
- **Results**: Comprehensive results analysis with detailed feedback

### Custom Hooks
- **useQuizTimer**: Timer management with pause/resume functionality
- **useLocalStorage**: Persistent storage with error handling

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for main actions and branding
- **Success**: Green for correct answers and positive feedback
- **Warning**: Yellow/orange for time warnings and visited questions
- **Danger**: Red for incorrect answers and critical alerts
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter for optimal readability
- **Hierarchy**: Clear heading structure with consistent spacing
- **Responsive**: Fluid typography scaling across devices

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Loading States**: Skeleton screens and spinners
- **Hover Effects**: Subtle feedback for interactive elements

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailored layouts for tablet and desktop
- **Touch Friendly**: Appropriate touch targets and gestures
- **Performance**: Optimized images and lazy loading

## 🔧 Technical Decisions

### Framework Choice
- **Next.js**: Chosen for its excellent developer experience, built-in optimizations, and deployment capabilities
- **TypeScript**: Ensures type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

### State Management
- **React Context**: Sufficient for the application's complexity without external dependencies
- **useReducer**: Predictable state updates with clear action types

### API Integration
- **Open Trivia DB**: Reliable source for quiz questions with various categories and difficulties
- **Error Handling**: Graceful fallbacks and user feedback for API failures

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Next.js built-in image optimization
- **Bundle Analysis**: Optimized bundle size with tree shaking

## 🧪 Testing Strategy

### Manual Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design testing across devices
- Accessibility testing with screen readers
- Performance testing with Lighthouse

### User Experience Testing
- Timer functionality and auto-submit
- Navigation between questions
- Progress saving and restoration
- Results accuracy and display

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)

### Environment Variables
No environment variables required for basic functionality.

## 🔮 Future Enhancements

### Potential Features
- **User Accounts**: Save quiz history and progress
- **Leaderboards**: Compare scores with other users
- **Custom Quizzes**: Allow users to create their own quizzes
- **Social Sharing**: Share results on social media
- **Offline Mode**: PWA functionality for offline usage
- **Multiple Languages**: Internationalization support
- **Advanced Analytics**: Detailed performance insights
- **Question Bookmarking**: Save interesting questions for later

### Technical Improvements
- **Database Integration**: Store user data and quiz results
- **Real-time Features**: Live quiz sessions with multiple participants
- **Advanced Caching**: Optimize API calls and data loading
- **A/B Testing**: Experiment with different UI variations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Open Trivia Database** for providing the quiz questions API
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for beautiful icons
- **Next.js** team for the excellent framework

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS