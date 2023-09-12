let deferredPrompt;
import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

// Listen for the "beforeinstallprompt" event to capture the prompt.
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Prevent the default browser prompt.
  deferredPrompt = e; // Store the event for later use.
});

const installButton = document.getElementById("buttonInstall");

installButton.addEventListener("click", () => {
  if (deferredPrompt) {
    
      console.error("Deferred prompt is not defined");
      return;
    
    deferredPrompt.prompt(); // Show the installation prompt.
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User dismissed the PWA installation");
      }
      deferredPrompt = null; // Reset the prompt variable.
    });
  }
});

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}