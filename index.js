import fs from 'fs/promises';
import path from 'path';

const totalFiles = 150;
const extensions = ['.jpg', '.mp3', '.pdf', '.txt', '.png', '.docx'];

function getRandomExtension() {
  const index = Math.floor(Math.random() * extensions.length);
  
  return extensions[index];
}

async function createFiles() {
  const dir = 'test';

  try {
    await fs.mkdir(dir, { recursive: true });

    for (let i = 1; i <= totalFiles; i++) {
      const ext = getRandomExtension();
      const filePath = path.join(dir, `${i}${ext}`);
      await fs.writeFile(filePath, `This is file number ${i}${ext}`);
    }

    console.log(`All ${totalFiles} files were successfully created in the "${dir}" folder.`);
  } catch (err) {
    console.error('Error while creating files:', err);
  }
}

async function organizeFiles() {
  const sourceDir = 'test';
  const targetDir = 'result';

  try {
    await fs.mkdir(targetDir, { recursive: true });
    const files = await fs.readdir(sourceDir, {withFileTypes: true});

    for (const file of files) {
      if (file.isFile()) {
        const ext = path.extname(file.name).slice(1);
        const extDir = path.join(targetDir, ext);

        await fs.mkdir(extDir, {recursive: true});

        const srcPath = path.join(sourceDir, file.name);
        const destPath = path.join(extDir, file.name);

        await fs.rename(srcPath, destPath);
      }
    }

    console.log('Files have been successfully organized into the "result" folder.');
  } catch (err) {
    console.error('Error while organizing files:', err);
  }
}

const command = process.argv[2];

if (command === 'create') {
  createFiles();
} else if (command === 'organize') {
  organizeFiles();
} else {
  console.log('Usage: node index.js create  OR  node index.js organize');
}
