# Web前端技术课程期末作业

本项目是一个基于 Next.js 的现代化 Web 应用，旨在全面展示本学期所学的 HTML、CSS、JavaScript、React 及 Next.js 知识。应用精心集成了个人历次课程练习展示、WakaTime API 编码时长统计以及 QAnything 大语言模型问答服务，打造了一个功能完整、交互友好的个人学习成果展示平台。

## 项目特点

- **作品集展示**: 采用独立的路由和组件化方式，优雅整合并展示本学期所有课程练习作品，便于浏览和学习。
- **WakaTime 集成**: 调用 WakaTime API，在页脚实时显示个人总编码时长（126.6小时），并使用环境变量安全管理 API Key，展示了API集成的最佳实践。
- **QAnything 大模型 (进阶路径)**: 自主设计并开发前端交互界面，直接调用 QAnything API，实现了一个响应迅速、体验流畅的定制化智能问答机器人。
- **响应式设计**: 应用全面采用响应式设计原则，确保在不同设备上都能提供出色的用户体验。
- **类型安全**: 全面使用 TypeScript 确保代码质量和开发效率。

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
├── app/
│   ├── components/       # 共享组件 (如 Header, Footer)
│   ├── portfolio/        # 作品集页面及子路由
│   │   └── page.tsx
│   ├── qanything/        # QAnything 问答页面
│   │   └── page.tsx
│   ├── api/              # 后端 API 路由 (用于代理对外部API的请求)
│   ├── layout.tsx        # 全局布局
│   └── page.tsx          # 应用首页
├── lib/                  # 辅助函数 (例如, API 请求逻辑)
│   ├── wakatime.ts
│   └── qanything.ts
├── public/               # 静态资源
├── .env.local            # 环境变量 (存储 API Keys)
├── README.md             # 项目说明文件
└── ...                   # 其他 Next.js 配置文件
```

## QAnything 集成路径与实现

**选择路径**: 进阶路径 (Advanced Path)

**原因**:
选择进阶路径是为了更深入地挑战自我，全面实践前端开发的各项技能。通过自行设计和开发与 QAnything API 交互的前端界面，可以更好地掌握 API 对接、前端状态管理、异步操作、错误处理以及 UI/UX 设计。这不仅能满足作业的最高要求，也是一个将所学知识融会贯通的绝佳机会。

**实现细节**:
- **前端界面**: 在 `/app/qanything` 路径下，使用 React 和 Tailwind CSS 构建一个用户友好的聊天界面，包括输入框、发送按钮、以及展示问答历史的区域。
- **API 调用**: 将在后端 API 路由 (`/app/api/qanything`) 中处理对 QAnything API 的请求。这样做可以隐藏 API Key，避免其暴露在客户端，提高安全性。
- **状态管理**: 使用 React Hooks (如 `useState`, `useEffect`) 来管理用户输入、加载状态、API 返回的答案以及可能的错误信息。
- **高级特性**: (可选) 后续可能实现流式输出，以提升用户体验。

## WakaTime API 集成方法

1.  从 [WakaTime Settings](https://wakatime.com/settings/api-key) 获取个人 API Key。
2.  将 API Key 存储在 `.env.local` 文件的 `WAKATIME_API_KEY` 变量中。
3.  创建一个服务器端函数或 API 路由，用于获取 WakaTime 数据，避免在客户端暴露 API Key。
4.  在全局 Footer 组件中调用该函数，获取并展示总编码时长。

## 本地开发指南

1.  **克隆仓库**
    ```bash
    git clone https://github.com/your-username/web-frontend-final.git
    cd web-frontend-final
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **设置环境变量**
    创建 `.env.local` 文件，并填入您的 API 密钥：
    ```
    WAKATIME_API_KEY="YOUR_WAKATIME_API_KEY"
    QANYTHING_API_KEY="YOUR_QANYTHING_API_KEY"
    QANYTHING_AGENT_UUID="YOUR_QANYTHING_AGENT_UUID"
    YOUDAO_AGENT_STREAM_API_URL="https://api.youdao.com/v2/api/qanything/stream"
    ```

4.  **运行开发服务器**
    ```bash
    npm run dev
    ```

    在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。
    
5.  **构建生产版本**
    ```bash
    npm run build
    npm start
    ```
    
    生产版本将在 [http://localhost:3000](http://localhost:3000) 运行。

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

本项目所有代码和文档均通过 Git 进行版本控制，并托管在公共 GitHub 仓库中。Commit 信息遵循清晰、有意义的原则，以保持良好的开发历史记录。

## 项目作者

- **姓名**：陈平安
- **学号**：P231014830
- **课程**：Web前端技术
- **指导教师**：XXX教授

## 版权信息

© 2023 陈平安. 保留所有权利。

本项目仅用于教育目的，未经许可不得用于商业用途。
