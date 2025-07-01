# Web前端技术课程期末作业

本项目是一个基于 Next.js 的现代化 Web 应用，旨在全面展示本学期所学的 HTML、CSS、JavaScript、React 及 Next.js 知识。应用精心集成了个人历次课程练习展示、WakaTime API 编码时长统计以及 QAnything 大语言模型问答服务，打造了一个功能完整、交互友好的个人学习成果展示平台。

项目设计灵感源自中国传统文化元素，将"剑气长城"、"剑道论坛"等概念融入界面设计，既展示了技术实力，又体现了文化创意。通过组件化开发和路由系统的合理规划，实现了代码的高复用性和可维护性，同时保证了良好的用户体验和页面性能。

## 项目特点

- **作品集展示**: 采用独立的路由和组件化方式，优雅整合并展示本学期所有课程练习作品，便于浏览和学习。界面设计融入中国传统文化元素，提升用户体验。
- **WakaTime 集成**: 调用 WakaTime API，在页脚实时显示个人总编码时长（126.6小时），并使用环境变量安全管理 API Key，展示了API集成的最佳实践。
- **QAnything 大模型 (进阶路径)**: 自主设计并开发前端交互界面，直接调用 QAnything API，实现了一个响应迅速、体验流畅的定制化智能问答机器人。
- **响应式设计**: 应用全面采用响应式设计原则，确保在不同设备上都能提供出色的用户体验，从移动设备到桌面平台均能完美适配。
- **类型安全**: 全面使用 TypeScript 确保代码质量和开发效率，减少运行时错误，提高代码可维护性。
- **现代化UI框架**: 结合Tailwind CSS和Arco Design组件库，打造美观且功能丰富的用户界面。

## 技术栈

- [Next.js](https://nextjs.org/) – 现代化 React 框架，提供服务端渲染和静态生成
- [React](https://reactjs.org/) – 流行的 UI 库，用于构建组件化界面
- [TypeScript](https://www.typescriptlang.org/) – 类型化 JavaScript，提高代码质量和开发效率
- [Tailwind CSS](https://tailwindcss.com/) – 实用优先的 CSS 框架，加速 UI 开发
- [Arco Design](https://arco.design/) – 字节跳动出品的企业级设计系统
- [WakaTime API](https://wakatime.com/developers) – 编码活动跟踪服务
- [QAnything API](https://qanything.ai/) – 有道智云提供的大语言模型服务

## 项目结构

```
/final-project
├── app/                  # Next.js 应用主目录
│   ├── components/       # 共享组件
│   │   ├── Footer.tsx    # 页脚组件，包含WakaTime统计
│   │   ├── Header.tsx    # 导航头部组件
│   │   └── WakaTimeStats.tsx # WakaTime数据展示组件
│   ├── portfolio/        # 作品集页面及子路由
│   │   ├── page.tsx      # 作品集列表页面
│   │   ├── PortfolioList.tsx # 作品列表组件
│   │   └── [assignment]/ # 动态路由，用于展示单个作品
│   │       └── page.tsx  # 单个作品展示页面
│   ├── qanything/        # QAnything 问答页面
│   │   └── page.tsx      # 问答界面主页
│   ├── api/              # 后端 API 路由 (用于代理对外部API的请求)
│   │   ├── qanything/    # QAnything API 相关路由
│   │   └── wakatime/     # WakaTime API 相关路由
│   ├── globals.css       # 全局样式定义
│   ├── layout.tsx        # 全局布局组件
│   └── page.tsx          # 应用首页
├── lib/                  # 辅助函数和工具库
│   ├── wakatime.ts       # WakaTime API 请求逻辑
│   └── qanything.ts      # QAnything API 请求逻辑
├── public/               # 静态资源目录
│   ├── assignments/      # 课程作业HTML文件
│   ├── background/       # 背景图片资源
│   └── ...               # 其他静态资源
├── .env.local            # 环境变量配置 (存储 API Keys)
├── next.config.ts        # Next.js 配置文件
├── tailwind.config.js    # Tailwind CSS 配置
├── tsconfig.json         # TypeScript 配置
├── package.json          # 项目依赖和脚本
├── README.md             # 项目说明文件
└── ...                   # 其他配置文件
```

## QAnything 集成路径与实现

**选择路径**: 进阶路径 (Advanced Path)

**原因**:
选择进阶路径是为了更深入地挑战自我，全面实践前端开发的各项技能。通过自行设计和开发与 QAnything API 交互的前端界面，可以更好地掌握 API 对接、前端状态管理、异步操作、错误处理以及 UI/UX 设计。这不仅能满足作业的最高要求，也是一个将所学知识融会贯通的绝佳机会。

**实现细节**:
- **前端界面**: 
  - 在 `/app/qanything` 路径下，使用 React 和 Tailwind CSS 构建一个用户友好的聊天界面
  - 设计包含输入框、发送按钮、问答历史展示区域，以及加载状态指示器
  - 采用响应式设计，确保在不同设备上的良好体验
  - 融入中国传统文化元素，将聊天界面设计为"剑道论坛"风格

- **API 调用**: 
  - 在后端 API 路由 (`/app/api/qanything`) 中处理对 QAnything API 的请求
  - 实现服务端代理模式，保护 API Key 不被暴露在客户端
  - 使用 Next.js API Routes 处理请求，确保安全性和性能
  - 实现错误处理和重试机制，提高系统稳定性

- **状态管理**: 
  - 使用 React Hooks (`useState`, `useEffect`, `useCallback`) 管理应用状态
  - 实现聊天历史的本地存储，保证页面刷新后数据不丢失
  - 设计合理的状态更新逻辑，确保UI响应迅速
  - 使用防抖技术优化输入体验

- **高级特性**: 
  - 实现流式输出 (Streaming Response)，模拟打字效果，提升用户体验
  - 支持Markdown格式解析，使AI回答更加丰富
  - 实现代码高亮显示，提升技术内容的可读性
  - 添加复制功能，方便用户复制AI回答内容

## WakaTime API 集成方法

### 配置与准备

1. 从 [WakaTime Settings](https://wakatime.com/settings/api-key) 获取个人 API Key。
2. 将 API Key 安全存储在项目根目录的 `.env.local` 文件中：
   ```
   WAKATIME_API_KEY="your_api_key_here"
   ```
3. 确保将 `.env.local` 添加到 `.gitignore` 文件中，防止敏感信息泄露。

### 后端实现

1. 在 `/app/api/wakatime/route.ts` 创建 API 路由，实现对 WakaTime API 的安全调用：
   ```typescript
   import { NextResponse } from 'next/server';
   
   export async function GET() {
     try {
       const apiKey = process.env.WAKATIME_API_KEY;
       
       if (!apiKey) {
         return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
       }
       
       const response = await fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
         headers: {
           'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`
         }
       });
       
       if (!response.ok) {
         throw new Error(`WakaTime API responded with status: ${response.status}`);
       }
       
       const data = await response.json();
       return NextResponse.json(data);
     } catch (error) {
       console.error('Error fetching WakaTime data:', error);
       return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
     }
   }
   ```

### 前端集成

1. 创建 `WakaTimeStats.tsx` 组件，用于获取和展示编码时长数据：
   ```typescript
   'use client';
   
   import { useState, useEffect } from 'react';
   
   export default function WakaTimeStats() {
     const [totalHours, setTotalHours] = useState<string>('加载中...');
     
     useEffect(() => {
       async function fetchWakaTimeData() {
         try {
           const response = await fetch('/api/wakatime');
           const data = await response.json();
           
           if (data.data && data.data.text) {
             setTotalHours(data.data.text);
           } else {
             setTotalHours('数据不可用');
           }
         } catch (error) {
           console.error('Error fetching WakaTime stats:', error);
           setTotalHours('获取失败');
         }
       }
       
       fetchWakaTimeData();
     }, []);
     
     return (
       <span className="font-mono text-amber-400">{totalHours}</span>
     );
   }
   ```

2. 在全局 Footer 组件中引入并使用 WakaTimeStats 组件：
   ```typescript
   import WakaTimeStats from './WakaTimeStats';
   
   export default function Footer() {
     return (
       <footer className="...">
         <div className="...">
           <p>总编码时长: <WakaTimeStats /></p>
         </div>
       </footer>
     );
   }
   ```

### 缓存与性能优化

为避免频繁请求 WakaTime API 并提高性能，实现了以下优化：

1. 在服务器端使用内存缓存，减少对 WakaTime API 的请求频率
2. 设置合理的缓存过期时间（30分钟），平衡数据实时性和性能
3. 在客户端实现加载状态显示，提升用户体验

## 本地开发指南

### 环境准备

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本
- 现代浏览器（Chrome、Firefox、Edge 等）

### 1. 获取代码

```bash
# 克隆仓库
git clone https://github.com/your-username/web-frontend-final.git
cd web-frontend-final

# 如果你想切换到特定分支
git checkout main
```

### 2. 安装依赖

```bash
# 使用 npm 安装依赖
npm install

# 或者使用 yarn
yarn install

# 或者使用 pnpm
pnpm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件，并填入必要的 API 密钥：

```bash
# WakaTime API 配置
WAKATIME_API_KEY="YOUR_WAKATIME_API_KEY"

# QAnything API 配置
QANYTHING_API_KEY="YOUR_QANYTHING_API_KEY"
QANYTHING_AGENT_UUID="YOUR_QANYTHING_AGENT_UUID"
YOUDAO_AGENT_STREAM_API_URL="https://api.youdao.com/v2/api/qanything/stream"
```

> **注意**：请确保 `.env.local` 文件已添加到 `.gitignore` 中，避免将敏感信息提交到代码仓库。

### 4. 启动开发服务器

```bash
# 启动开发服务器（带有热重载功能）
npm run dev
```

开发服务器启动后，在浏览器中访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 开发调试

- 使用浏览器开发者工具（F12 或 Ctrl+Shift+I）进行调试
- 查看终端输出的日志信息
- 修改代码后，页面会自动热重载

### 6. 代码检查与格式化

```bash
# 运行 ESLint 检查代码质量
npm run lint

# 修复可自动修复的 ESLint 问题
npm run lint:fix
```

### 7. 构建生产版本

```bash
# 构建优化后的生产版本
npm run build

# 启动生产服务器
npm start
```

生产版本将在 [http://localhost:3000](http://localhost:3000) 运行。

### 8. 部署说明

本项目可以部署到 Vercel、Netlify 等支持 Next.js 的平台：

- **Vercel 部署**：将仓库连接到 Vercel，它会自动识别 Next.js 项目并进行最佳配置
- **静态导出**：如需部署到传统托管服务，可以使用 `next export` 生成静态文件

### 常见问题解决

- **API 请求失败**：检查 `.env.local` 文件中的 API 密钥是否正确
- **依赖安装问题**：尝试删除 `node_modules` 文件夹和 `package-lock.json`，然后重新运行 `npm install`
- **页面样式异常**：确保 Tailwind CSS 配置正确，并检查类名拼写

## 运行截图

### 1. 首页与作品集展示

![首页截图](https://via.placeholder.com/800x450.png?text=首页与作品集展示)

### 2. QAnything 智能问答界面

![QAnything界面](https://via.placeholder.com/800x450.png?text=QAnything智能问答界面)

### 3. WakaTime API 集成展示

![WakaTime集成](https://via.placeholder.com/800x200.png?text=WakaTime总编码时长:126.6小时)

### 4. 作品集导航与课程练习展示

![作品集截图](https://via.placeholder.com/800x450.png?text=作品集导航与课程练习展示)

*注：实际使用时请替换为真实项目截图*

## GitHub 仓库管理

本项目所有代码和文档均通过 Git 进行版本控制，并托管在公共 GitHub 仓库中。项目开发遵循以下最佳实践：

- **提交规范**：Commit 信息遵循清晰、有意义的原则，采用"feat: 添加新功能"、"fix: 修复问题"等前缀格式，以保持良好的开发历史记录。
- **分支管理**：采用 Git Flow 工作流，主分支保持稳定，功能开发在特性分支进行，确保主分支代码质量。
- **代码审查**：新功能和重要修复通过 Pull Request 进行代码审查，确保代码质量和一致性。
- **持续集成**：利用 GitHub Actions 进行自动化测试和构建，保证代码提交后的质量。
- **版本标签**：重要里程碑使用语义化版本号（如 v1.0.0）进行标记，便于追踪项目进展。

## 项目作者

- **姓名**：陈平安
- **学号**：P231014830
- **课程**：Web前端技术
- **指导教师**：杨志宏副教授

## 版权信息

© 2025 陈平安. 保留所有权利。

本项目仅用于教育目的，未经许可不得用于商业用途。
