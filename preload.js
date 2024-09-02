const { contextBridge, shell } = require('electron');

// Expose a method to open external links
contextBridge.exposeInMainWorld('electron', {
  openExternal: async (url) => {
    try {
      console.log(`Opening external link: ${url}`);
      await shell.openExternal(url);
    } catch (error) {
      console.error('Error in preload when trying to open link:', error);
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
