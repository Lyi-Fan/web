import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 将 base 设置为 './'，这样资源引用会变成相对路径，
  // 从而适配 GitHub Pages 的子目录结构 (https://user.github.io/repo/)
  base: './',
  build: {
    outDir: 'dist',
  },
});