const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
  
    // Store the event for later use
    deferredPrompt = event;
    
    // Show install button or some UI element that will let the user install the app
    butInstall.style.display = 'block';
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
