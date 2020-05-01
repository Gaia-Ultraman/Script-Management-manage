# 中控系统

该项目为 基于 nodeJS + electron + React + AntD pro 开发的一套跨平台(windows,mac)桌面应用

## 安装依赖

### 建议使用cnpm 淘宝的镜像，不然卡的一P
1.首先，你可以更换阿里镜像源，全局执行如下npm脚本再重新打包 
```bash
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```
2.修改系统环境变量
 变量名 : ELECTRON_MIRROR  值 : http://npm.taobao.org/mirrors/electron/

3.Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

### 启动项目

```bash
npm run start:web
//等待出现
//  App running at:
//  - Local:   http://localhost:8000 (copied to clipboard)
// - Network: http://xxx.xxx.xxx.xxx:8000
npm run start:electron
```

### 打包项目

```bash
//先将WEB代码打包至项目根目录dist文件夹
npm run build:web
//将main.js 中第八行 win.loadURL('http://localhost:8000/'); 修改为 win.loadURL(`file://${__dirname}/dist/index.html`)
npm run package
```

### 代码风格格式

```bash
npm run lint
```

修改代码中风格有问题的代码

```bash
npm run lint:fix
```

### 代码测试

```bash
npm test
```




