const os = require('os');
const fs = require('fs');
const execSync = require('child_process').execSync;

function findBrowserPath(browser) {
  const platform = os.platform();

  switch (platform) {
    case 'darwin': // macOS
      return findBrowserMac(browser);

    case 'linux': // Linux
      return findBrowserLinux(browser);

    case 'win32': // Windows
      return findBrowserWindows(browser);

    default:
      throw new Error('Unsupported platform');
  }
}

// Function to dynamically find Chrome or Chromium on macOS
function findBrowserMac(browser) {
  try {
    let command = '';
    if (browser === 'chrome') {
      command = `mdfind "kMDItemDisplayName == 'Google Chrome.app'"`; // Search for Google Chrome
    } else if (browser === 'chromium') {
      command = `mdfind "kMDItemDisplayName == 'Chromium.app'"`; // Search for Chromium
    } else {
      throw new Error('Unsupported browser. Use "chrome" or "chromium"');
    }

    const result = execSync(command, { encoding: 'utf-8' }).trim();

    if (result) {
        if(browser === 'chrome') {
            return result + '/Contents/MacOS/Google Chrome'; 
        }else if (browser === 'chromium') {
            return result + '/Contents/MacOS/Chromium';
        }
    } else {
      throw new Error(`${browser} not found on macOS`);
    }
  } catch (err) {
    throw new Error(`${browser} not found on macOS`);
  }
}

// Function to dynamically find Chrome or Chromium on Linux
function findBrowserLinux(browser) {
  try {
    let command = '';
    if (browser === 'chrome') {
      command = 'which google-chrome'; // Search for Google Chrome executable
    } else if (browser === 'chromium') {
      command = 'which chromium'; // Search for Chromium executable
    } else {
      throw new Error('Unsupported browser. Use "chrome" or "chromium"');
    }

    const result = execSync(command, { encoding: 'utf-8' }).trim();

    if (result) {
      return result;
    } else {
      throw new Error(`${browser} not found on Linux`);
    }
  } catch (err) {
    throw new Error(`${browser} not found on Linux`);
  }
}

// Function to dynamically find Chrome or Chromium on Windows
function findBrowserWindows(browser) {
  try {
    let command = '';
    if (browser === 'chrome') {
      command = 'where chrome.exe'; // Use where command to find Chrome
    } else if (browser === 'chromium') {
      command = 'where chromium.exe'; // Use where command to find Chromium
    } else {
      throw new Error('Unsupported browser. Use "chrome" or "chromium"');
    }

    const result = execSync(command, { encoding: 'utf-8' }).trim();
    
    if (result) {
      // where command returns all matches, one per line - we'll take the first one
      return result.split('\n')[0];
    } else {
      throw new Error(`${browser} not found on Windows`);
    }
  } catch (err) {
    throw new Error(`${browser} not found on Windows`);
  }
}

// Export the function for use in an npm package
module.exports = findBrowserPath;
