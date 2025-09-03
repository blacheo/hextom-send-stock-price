// setup.js
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

global.API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

// Helper to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let djangoProcess;

/**
 * Playwright globalSetup function
 * Runs before all tests
 */
export default async function globalSetup() {
  return new Promise((resolve, reject) => {
    console.log('Starting Django backend for tests...');

    // Start Django dev server with test settings
    djangoProcess = exec(
      'python ../../backend/manage.py runserver 8000',
      { cwd: __dirname },
      (err, stdout, stderr) => {
        if (err) {
          console.error('Django server error:', err);
          reject(err);
        }
      }
    );

    // Wait a few seconds for server to start
    setTimeout(() => {
      console.log('Django backend should be running now.');
      resolve();
    }, 4000); // adjust if needed
  });
}

/**
 * Optional: Playwright globalTeardown function
 * Stops the Django server after all tests
 */
export async function globalTeardown() {
  if (djangoProcess) {
    console.log('Stopping Django backend...');
    djangoProcess.kill();
  }
}
