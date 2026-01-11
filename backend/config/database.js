import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read JSON file
export const readData = (filename) => {
  const filePath = path.join(dataDir, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Helper function to write JSON file
export const writeData = (filename, data) => {
  const filePath = path.join(dataDir, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Initialize data files if they don't exist
export const initializeDataFiles = () => {
  const files = ['users.json', 'products.json', 'orders.json'];
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
      // Only create empty file if it doesn't exist
      // Never overwrite existing files
      writeData(file, []);
    } else {
      // File exists - verify it's valid JSON
      try {
        const data = readData(file);
        if (!Array.isArray(data)) {
          console.warn(`${file} is not a valid array, backing up and resetting...`);
          // Backup corrupted file
          const backupPath = filePath + '.backup.' + Date.now();
          fs.copyFileSync(filePath, backupPath);
          writeData(file, []);
        }
      } catch (error) {
        console.error(`Error validating ${file}:`, error);
      }
    }
  });
};

