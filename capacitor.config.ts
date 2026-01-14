import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailybloom.app',
  appName: 'Daily Bloom',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: true,
    // 允许在开发时连接到本地服务器
    // 在生产环境中会自动使用本地文件
    url: process.env.CAPACITOR_SERVER_URL || undefined,
    // 允许在 WebView 中导航到任何 URL
    allowNavigation: [
      '*'
    ]
  },
  android: {
    // Android 特定配置
    buildOptions: {
      signingType: 'apksigner'
    }
  }
};

export default config;
