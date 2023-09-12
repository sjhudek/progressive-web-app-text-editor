// Import deferredPrompt from index.js
import { deferredPrompt } from "./index";
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();

  // Store the event to use it later
  deferredPrompt = e;
  console.log('beforeinstallprompt event captured');

  // Optionally, show your own custom install button
  // and attach an event listener to it
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', installApp);
  }
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('Install button clicked');
  
    // Hide the install button
    butInstall.style.display = 'none';
  
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
  
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
  
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
  
      deferredPrompt = null;
    }
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed');
  });
