# 🚀 הוראות פריסה ל-Vercel

## מה אתה מקבל?
אתר אמיתי באינטרנט, חינמי, עם כתובת כמו: `https://your-app.vercel.app`

המערכת מורידה תמונות אוטומטית מ-Monday.com ומייצרת מצגת PowerPoint.

---

## 📋 הכנות (פעם אחת בלבד)

### 1. צור חשבון Vercel (חינם)
- היכנס ל: https://vercel.com/signup
- הירשם **עם GitHub** (אם אין לך - הירשם ל-GitHub קודם ב: https://github.com/signup)

### 2. צור חשבון GitHub (אם אין לך)
- היכנס ל: https://github.com/signup
- בחר שם משתמש וסיסמה

---

## 🎯 פריסה - 3 דרכים (בחר אחת)

### 🟢 דרך 1: הכי קל - גרור ושחרר (מומלץ)

1. היכנס ל: https://vercel.com/new
2. **גרור את כל התיקייה** (`vercel_app/`) ל-Vercel
3. תן שם לפרויקט (למשל: `summary-generator`)
4. לחץ **Deploy**
5. חכה ~30 שניות
6. ✅ קבל קישור: `https://summary-generator-XXX.vercel.app`

### 🟡 דרך 2: דרך GitHub (לעדכונים עתידיים)

1. צור Repository חדש ב-GitHub (קישור: https://github.com/new)
2. שם: `summary-generator`
3. לחץ **Create repository**
4. בעמוד הבא, בחר **"uploading an existing file"**
5. גרור את כל הקבצים מתיקיית `vercel_app/`
6. לחץ **Commit changes**
7. עכשיו ב-Vercel: https://vercel.com/new
8. בחר את ה-Repository שיצרת
9. לחץ **Deploy**
10. ✅ סיימת!

### 🔵 דרך 3: דרך הטרמינל (למתקדמים)
```bash
npm install -g vercel
cd vercel_app
vercel
```

---

## 🎉 שימוש באתר

1. היכנס לכתובת שקיבלת מ-Vercel
2. **גרור את קובץ ה-Excel**
3. לחץ **"צור PowerPoint"**
4. חכה שהמערכת תוריד את התמונות
5. הקובץ יורד אוטומטית למחשב

---

## 📁 מבנה הקבצים

```
vercel_app/
├── api/
│   └── download-image.js    ← Serverless function שמוריד תמונות
├── public/
│   ├── index.html            ← הדף הראשי
│   └── template.pptx         ← הטמפלט המקצועי
├── package.json
└── vercel.json
```

---

## ❓ פתרון בעיות

### "תמונות עדיין לא יורדות"
- וודא שהקישורים ב-Excel פתוחים לציבור
- בדוק שהקישורים תקינים (אפשר ללחוץ עליהם בדפדפן בלי login)

### "שגיאה 504 Gateway Timeout"
- Vercel נותן עד 60 שניות לכל בקשה
- אם יש הרבה תמונות גדולות - המערכת תעבד אותן אחת-אחת
- במידת הצורך - חלק את ה-Excel לכמה קבצים

### "האתר לא נטען"
- חכה דקה אחרי הפריסה
- בדוק את הקישור ב-Vercel Dashboard
- אם ישנן בעיות, לחץ על **"Redeploy"** ב-Vercel

---

## 🎁 פיצ'רים

- ✅ **ללא הגבלות** - חינם לחלוטין ב-Vercel
- ✅ **HTTPS** מאובטח אוטומטית
- ✅ **מהיר** - שרתים גלובליים של Vercel
- ✅ **נגיש מכל מכשיר** - מובייל, טאבלט, מחשב
- ✅ **שיתוף קל** - שלח את הקישור למישהו אחר

---

## 🆘 צריך עזרה?

אם משהו לא עובד - שלח לי צילום מסך של:
1. השגיאה שמופיעה
2. Vercel Dashboard (Logs)
