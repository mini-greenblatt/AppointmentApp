# AppointmentApp

אפליקציית React Native לזימון תורים רפואיים

הפרויקט מדגים ניהול State, שמירה לוקאלית, ניווט בין מסכים, ועבודה עם נתונים סטטיים.

---

## 🚀 איך מריצים?

1. התקנת תלויות:
   ```bash
      yarn
   ```
2. הרצת האפליקציה:
   - **אנדרואיד:**
     ```bash
        yarn android
     ```
   - **iOS:**
     ```bash
        yarn ios
     ```

---

## טכנולוגיות עיקריות

<ul dir="rtl" align="right">
  <li><b>React Native</b> — פיתוח אפליקציות מובייל</li>
  <li><b>Zustand</b> — ניהול state גלובלי</li>
  <li><b>AsyncStorage</b> — שמירת נתונים לוקאלית</li>
  <li><b>React Navigation</b> — ניווט בין מסכים</li>
  <li><b>react-native-calendars</b> — לוח שנה</li>
  <li><b>react-native-svg</b> — אייקונים</li>
  <li><b>TypeScript</b> — טיפוסיות ובטיחות קוד</li>
</ul>
---

##  מבנה הפרויקט

```
AppointmentApp/

├── App.tsx
├── package.json
├── src/
│ ├── assets/        // איקונים ותמונות
│ ├── components/    // קומפוננטים לשימוש חוזר (כפתור, טקסט)
│ ├── data/          // נתונים סטטיים (יומנים)
│ ├── navigation/    // הגדרות הניווט
│ ├── screens/       // מסכים עיקריים (login, יומן, סיכום תור, ניהול תור)
│ ├── store/         // ניהול נתונים - state management
│ └── theme/         // צבעים, ריווחים
├── ios/
├── android/
└── README.md
```

---

## 📝 הסבר טכני

<ul dir="rtl" align="right">
  <li><b>Zustand</b> — נבחר בזכות פשטות, ביצועים, ושילוב קל עם AsyncStorage</li>
  <li>כל נתוני היומנים סטטיים (אין חיבור לשרת).</li>
  <li>כל מסך מופרד לקובץ עצמאי, קומפננטות בסיסיות בתיקיית components.</li>
  <li>עיצוב בסיסי עם StyleSheet, צבעים ו-spacing מוגדרים ב-theme.</li>
  <li>הוספתי כפתור Logout עם אייקון (פיצ'ר בונוס).</li>

</ul>
---

## 📸 צילומי מסך


<img width="200" alt="image" src="https://github.com/user-attachments/assets/6b5d5725-7229-4b45-a548-734beef5daf8" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/872ad943-e64e-4769-9570-beccf2e5738b" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/a3aef7a8-597c-4b3b-82fc-5e14e0067567" /> 
<img width="200"  alt="image" src="https://github.com/user-attachments/assets/5626ad28-924a-4158-af0c-322f783b8f95" /> 
<img width="200" alt="image" src="https://github.com/user-attachments/assets/401ed82b-0c01-4704-ad81-4ed561bac7c1" />
<img width="200" alt="image" src="https://github.com/user-attachments/assets/2e8fdce3-e655-42dd-b40d-615bb2d333af" /> 
<img width="200" alt="image" src="https://github.com/user-attachments/assets/2f4aad6c-2098-4d66-aa4f-cb7adfd02d80" /> 
<img width="200" alt="image" src="https://github.com/user-attachments/assets/f97aa859-8020-4091-92df-202e0a9ab99d" />






---

## 👨‍💻 הערות

- הקפדתי על קוד קריא, שמות משתנים ברורים, והפרדה לוגית.
- כל הודעת שגיאה/הצלחה מוצגת בעברית.
- ניתן להרחיב את האפליקציה בקלות (הוספת מקצועות, חיבור לשרת וכו').

