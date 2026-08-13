// firebase-messaging-sw.js
// Ce fichier doit être placé À LA RACINE du site (même dossier que index.html)
// Il permet de recevoir les notifications même quand l'appli est fermée ou le téléphone verrouillé.

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC9UvDKVYcq-KU-AjN4dDANK-c11Z72JSs",
  authDomain: "fournildejean-7803b.firebaseapp.com",
  projectId: "fournildejean-7803b",
  storageBucket: "fournildejean-7803b.firebasestorage.app",
  messagingSenderId: "448534729811",
  appId: "1:448534729811:web:4d19f58011190b10cfe2a6"
});

const messaging = firebase.messaging();

// Gère les notifications reçues quand l'appli n'est PAS au premier plan
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) || 'Fournil de Jean';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

// Ouvre (ou remet au premier plan) l'appli quand on clique sur la notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
