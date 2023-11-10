import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // css 模块化
    modules: {
      // generateScopedName: '[name]__[local]___[hash:base64:5]', // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[hash:base64:5]', // css模块化 文件以.module.[css|less|scss]结尾
      hashPrefix: 'prefix'
    },
    // 预编译支持less
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 支持内联js
      }
    }
  }
})
