importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDXLlLeeA_F0_1oblcWh50aM8fCBO8OQ3o",
  authDomain: "hustle-3d516.firebaseapp.com",
  projectId: "hustle-3d516",
  storageBucket: "hustle-3d516.appspot.com",
  messagingSenderId: "741397012519",
  appId: "1:741397012519:web:4c246166341ab745adae02",
  measurementId: "G-R7DB4RJ3DR"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: "/firebase-logo.png"
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
});