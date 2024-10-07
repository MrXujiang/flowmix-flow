import { defineConfig } from "umi";

const isDeskTopEnv = process.argv[4] === 'local';
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
  base: isDeskTopEnv ? '/' : '/flow-v0/',
  publicPath: isDeskTopEnv ? '/' : '/flow-v0/',
  outputPath: 'flow-v0',
  routes: [
    { path: "/", component: "flow/editor" },
  ],
  define: {
    UPLOAD_PATH: '/upload',
    AI_ASK__TEXT_PATH: '/ai/text',
    isDeskTopEnv,
    isDev
  },
  favicons: [
    // 完整地址
    // 'https://domain.com/favicon.ico',
    // 此时将指向 `/favicon.png` ，确保你的项目含有 `public/favicon.png`
    '/flow-v0/favicon.png'
  ],
  npmClient: 'pnpm',
});
