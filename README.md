# AppointmentApp

A React Native application for booking medical appointments

This project demonstrates state management, local data persistence, navigation between screens, and working with static data.

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   yarn
   ```
2. **Run the application:**
   - **Android:**
     ```bash
     yarn android
     ```
   - **iOS:**
     ```bash
     yarn ios
     ```

---

## 🛠️ Main Technologies

- **React Native** — Mobile app development
- **Zustand** — Global state management
- **AsyncStorage** — Local data storage
- **React Navigation** — Screen navigation
- **react-native-calendars** — Calendar component
- **react-native-svg** — SVG icons
- **TypeScript** — Type safety and robust code

---

## 📁 Project Structure

```
AppointmentApp/
├── App.tsx
├── package.json
├── src/
│   ├── assets/        // Icons and images
│   ├── components/    // Reusable components (Button, Text)
│   ├── data/          // Static data (appointments)
│   ├── navigation/    // Navigation configuration
│   ├── screens/       // Main screens (login, calendar, summary, appointment management)
│   ├── store/         // State management
│   └── theme/         // Colors, spacing, typography
├── ios/
├── android/
└── README.md
```

---

## 📝 Technical Overview

- **Zustand** was chosen for its simplicity, performance, and easy integration with AsyncStorage.
- All appointment data is static (no server connection).
- Each screen is separated into its own file; basic components are in the `components` directory.
- Basic styling is handled with StyleSheet, with colors and spacing defined in the `theme` directory.
- A Logout button with an icon is included as a bonus feature.

---

## 📸 Screenshots

<img width="200" alt="image" src="https://github.com/user-attachments/assets/6b5d5725-7229-4b45-a548-734beef5daf8" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/1cbddade-1396-4408-99c8-92cc648d4bb9" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/d47aae14-9aaf-4690-94c9-f3139979e336" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/2537cdde-9fed-4e86-ae38-fc331ed33251" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/4f5055b1-fb7f-4370-97fd-2489d963d3f6" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/b12b5eb9-279b-47ed-8936-f8f6ffe1cfd5" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/3de43331-9ed0-45f3-9a9a-b03a115e7bff" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/3ab44210-2437-4f2b-b2c4-4eee129f6845" />

---

## 👨‍💻 Notes

- The code is clean, with clear variable names and logical separation.
- All error/success messages are displayed in Hebrew (can be easily localized).
- The app is easily extensible (e.g., adding professions, connecting to a server, etc.).
