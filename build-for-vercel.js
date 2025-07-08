// Simple build script for Vercel deployment
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildForVercel() {
  try {
    console.log('Building for Vercel deployment...');
    
    await build({
      root: resolve(__dirname),
      build: {
        outDir: 'dist/public',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'client/index.html')
          }
        }
      }
    });
    
    console.log('Build completed successfully!');
    console.log('Files are ready in dist/public/ directory');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildForVercel();