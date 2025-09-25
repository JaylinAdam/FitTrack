# FitTrack 🏋️‍♂️

A modern React Native mobile application for tracking workouts, exercises, and fitness progress. Built with Expo and TypeScript for cross-platform compatibility.

## 📱 Features

- **📅 Calendar View**: Visual calendar showing workout days with easy navigation
- **💪 Exercise Tracking**: Log sets, reps, and weights for each exercise
- **📊 Workout History**: View detailed workout information by date
- **🎨 Modern UI**: Clean, intuitive interface with dark/light theme support
- **📱 Cross-Platform**: Works on iOS, Android, and Web
- **💾 Local Storage**: All data stored locally using AsyncStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JaylinAdam/FitTrack.git
   cd FitTrack
   ```

2. **Install dependencies**
   ```bash
   cd WorkoutJournal2.0
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 🏗️ Project Structure

```
FitTrack/
├── WorkoutJournal2.0/          # Main React Native app
│   ├── src/
│   │   ├── App.tsx             # Main app component
│   │   ├── Context/            # React Context providers
│   │   ├── navigation/         # Navigation setup and screens
│   │   └── assets/             # Images and icons
│   ├── models/                 # TypeScript interfaces and types
│   ├── assets/                 # App icons and splash screens
│   └── package.json            # Dependencies and scripts
├── Feature.md                  # Feature documentation
└── README.md                   # This file
```

## 🎯 Core Functionality

### Workout Logging
- Add exercises with custom names
- Track sets, reps, and weights
- Add notes and comments
- Date and time tracking

### Calendar Integration
- Monthly calendar view
- Visual indicators for workout days
- Tap to view workout details
- Easy navigation between dates

### Data Management
- Local data persistence
- Export/import capabilities
- Data backup and restore

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Storage**: AsyncStorage
- **UI Components**: Custom components with React Native
- **Calendar**: react-native-calendars
- **Icons**: react-native-vector-icons

## 📱 Screenshots

*Screenshots will be added as the app is developed*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

### Current Features in Development
- Exercise form improvements
- Card component enhancements
- Settings page with hamburger menu
- Modal improvements
- Code cleanup and organization

### Planned Features
- Data synchronization
- Workout templates
- Progress charts and analytics
- Social features
- Workout sharing

## 🐛 Known Issues

- Some styling needs refinement
- Input form styling could be improved
- Modal implementation needs review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jaylin Adam**
- GitHub: [@JaylinAdam](https://github.com/JaylinAdam)

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Calendar component from [react-native-calendars](https://github.com/wix/react-native-calendars)

---

**FitTrack** - Your personal fitness companion 📱💪