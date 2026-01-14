# Android APP 在线构建指南

本指南帮助你使用在线构建服务将 Daily Bloom 打包成 Android APK。

## 前置准备

1. **推送代码到 GitHub**
   - 在 GitHub 创建新仓库
   - 将本地代码推送到仓库：
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin https://github.com/你的用户名/daily-bloom.git
     git push -u origin main
     ```

2. **确保构建脚本正常**
   - 运行 `npm run build` 确保能成功构建
   - 运行 `npm run cap:sync` 确保 Android 配置正常

---

## 推荐的在线构建服务

### 方案 1：Appflow (Ionic 官方) ⭐ 推荐

**网址**: https://ionic.io/appflow

**优点**:
- Ionic/Capacitor 官方服务，与 Capacitor 完美兼容
- 免费额度：每月 100 次构建
- 自动检测 Capacitor 配置
- 支持 CI/CD 自动化

**步骤**:
1. 访问 https://ionic.io/appflow 并注册账号
2. 点击 "New App" 创建新应用
3. 连接你的 GitHub 仓库
4. 选择 "Android" 目标平台
5. 配置构建设置：
   - **Build Command**: `npm run build`
   - **Build Directory**: `dist`
6. 点击 "Start Build" 开始构建
7. 等待构建完成（通常 5-10 分钟）
8. 下载生成的 APK 文件

---

### 方案 2：Codemagic

**网址**: https://codemagic.io

**优点**:
- 免费计划支持开源项目
- 构建速度快
- 界面友好
- 支持自定义构建脚本

**步骤**:
1. 访问 https://codemagic.io 并注册账号
2. 点击 "Add new app" → 选择 GitHub
3. 授权并选择你的仓库
4. 配置构建设置：
   - 在 `codemagic.yaml` 文件中添加：
     ```yaml
     workflows:
       android-workflow:
         name: Android Build
         instance_type: mac_mini
         max_build_duration: 30
         scripts:
           - npm install
           - npm run build
           - npx cap sync android
         artifacts:
           - android/**/*.apk
     ```
5. 提交配置文件到 GitHub
6. 在 Codemagic 点击 "Start new build"
7. 构建完成后下载 APK

---

### 方案 3：GitHub Actions (完全免费) ⭐⭐ 最推荐

**优点**:
- 完全免费（公开仓库）
- 自动化：每次推送代码自动构建
- 无需第三方账号
- 构建历史完整记录

**步骤**:

1. 在项目根目录创建 `.github/workflows/android-build.yml`：

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build web app
      run: npm run build

    - name: Install Java
      uses: actions/setup-java@v3
      with:
        distribution: 'zulu'
        java-version: '17'

    - name: Setup Android SDK
      uses: android-actions/setup-android@v2

    - name: Grant execute permission for gradlew
      run: |
        cd android
        chmod +x gradlew

    - name: Build APK
      run: |
        cd android
        ./gradlew assembleDebug

    - name: Upload APK
      uses: actions/upload-artifact@v3
      with:
        name: app-debug
        path: android/app/build/outputs/apk/debug/app-debug.apk
```

2. 提交到 GitHub：
   ```bash
   git add .
   git commit -m "Add GitHub Actions for Android build"
   git push
   ```

3. 访问你的 GitHub 仓库 → "Actions" 标签
4. 查看 "Build Android APK" 工作流
5. 点击运行中的构建查看进度
6. 构建完成后（约 10-15 分钟），在 "Artifacts" 区域下载 APK

---

## 本地更新应用

当你修改了代码后，需要更新 APK：

```bash
# 1. 构建最新版本
npm run build

# 2. 同步到 Android
npm run cap:sync

# 3. 提交并推送
git add .
git commit -m "Update app"
git push
```

如果使用 GitHub Actions，推送后会自动开始构建新版本。

---

## 下载的 APK 安装

1. 将 APK 文件传输到安卓手机（通过微信、邮件、云盘等）
2. 在手机上打开 APK 文件
3. 允许安装未知来源应用
4. 点击安装

---

## 常见问题

### Q1: 构建失败怎么办？
- 检查 GitHub Actions 的错误日志
- 确保 `npm run build` 在本地能成功
- 检查 Capacitor 配置是否正确

### Q2: 如何修改应用图标？
- 准备一个 1024x1024 的 PNG 图标
- 使用 https://icon.kitchen 生成 Android 图标集
- 替换 `android/app/src/main/res/` 下的图标文件

### Q3: 如何修改应用名称？
- 编辑 `capacitor.config.ts` 中的 `appName`
- 编辑 `android/app/src/main/AndroidManifest.xml` 中的 `android:label`

### Q4: 生成的 APK 太大？
- 当前构建的 APK 约 500KB（已经很轻量）
- 可以通过启用 Proguard 进一步减小体积

---

## 项目结构说明

```
accountBook/
├── android/              # Capacitor 生成的 Android 原生项目
│   ├── app/
│   └── gradle/           # Gradle 构建配置
├── dist/                 # 构建后的 Web 应用
├── capacitor.config.ts   # Capacitor 配置
├── src/                  # React 源代码
└── package.json          # 依赖和脚本
```

---

## 下一步

1. **测试 APK**: 安装到手机测试所有功能
2. **签名应用**: 如需发布到应用商店，需要签名
3. **发布到 Google Play**: 需要注册开发者账号（$25 一次性费用）

---

**祝你构建成功！** 📱

如有问题，请查看：
- Capacitor 官方文档: https://capacitorjs.com/
- GitHub Actions 文档: https://docs.github.com/actions
