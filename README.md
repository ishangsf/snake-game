# 贪吃蛇游戏 (Snake Game)

## 项目介绍

这是一个使用 React 和 TypeScript 开发的经典贪吃蛇游戏。游戏具有简洁美观的界面，流畅的操作体验，以及排行榜功能，让您可以记录和比较游戏成绩。

## 技术栈

- **React 18**: 用于构建用户界面的 JavaScript 库
- **TypeScript**: 添加静态类型检查的 JavaScript 超集
- **Vite**: 现代前端构建工具，提供更快的开发体验
- **CSS-in-JS**: 使用内联样式进行组件样式设计
- **LocalStorage API**: 用于保存游戏排行榜数据

## 功能特点

- 🎮 经典贪吃蛇游戏玩法
- 🎯 使用方向键控制蛇的移动方向
- 📊 游戏结束后可保存分数到排行榜
- 🏆 查看历史最高分排行榜
- 🔄 游戏结束后可重新开始
- 💾 游戏数据本地保存，关闭浏览器后不会丢失

## 安装步骤

确保您的系统已安装 [Node.js](https://nodejs.org/) (推荐 v16 或更高版本) 和 [pnpm](https://pnpm.io/) 包管理器。

1. 克隆项目到本地

```bash
git clone https://github.com/ishangsf/snake-game.git
cd snake-game
```

2. 安装依赖

```bash
pnpm install
```

## 启动项目

### 开发模式

运行以下命令启动开发服务器：

```bash
pnpm dev
```

然后在浏览器中访问 [http://localhost:5173](http://localhost:5173) 即可开始游戏。

### 构建生产版本

```bash
pnpm build
```

构建完成后，生成的文件将位于 `dist` 目录中，可以部署到任何静态网站托管服务。

### 预览生产版本

```bash
pnpm preview
```

## 游戏操作

- 点击「开始游戏」按钮开始
- 使用键盘方向键控制蛇的移动方向
- 游戏结束后，可以输入名字保存分数
- 点击右上角「查看排行榜」按钮查看历史最高分

## 游戏规则

1. 蛇不能撞墙，否则游戏结束
2. 蛇不能撞到自己的身体，否则游戏结束
3. 每吃到一个食物，蛇身体长度增加一格，分数增加一分
4. 游戏难度随着蛇的长度增加而增加

## 项目结构

```
snake-game/
├── public/             # 静态资源
├── src/                # 源代码
│   ├── App.tsx         # 主游戏组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── package.json        # 项目依赖和脚本
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
```

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来改进这个项目！

## 许可证

[MIT](LICENSE)

---

# Snake Game

## Project Introduction

This is a classic Snake Game developed with React and TypeScript. The game features a clean and beautiful interface, smooth operation experience, and a leaderboard function that allows you to record and compare game scores.

## Tech Stack

- **React 18**: JavaScript library for building user interfaces
- **TypeScript**: JavaScript superset with static type checking
- **Vite**: Modern frontend build tool for faster development experience
- **CSS-in-JS**: Using inline styles for component styling
- **LocalStorage API**: For saving game leaderboard data

## Features

- 🎮 Classic snake game gameplay
- 🎯 Control snake movement with arrow keys
- 📊 Save scores to leaderboard after game over
- 🏆 View historical high score leaderboard
- 🔄 Restart game after game over
- 💾 Game data saved locally, won't be lost after closing browser

## Installation

Ensure your system has [Node.js](https://nodejs.org/) (v16 or higher recommended) and [pnpm](https://pnpm.io/) package manager installed.

1. Clone the project

```bash
git clone https://github.com/ishangsf/snake-game.git
cd snake-game
```

2. Install dependencies

```bash
pnpm install
```

## Running the Project

### Development Mode

Run the following command to start the development server:

```bash
pnpm dev
```

Then visit [http://localhost:5173](http://localhost:5173) in your browser to start playing.

### Build for Production

```bash
pnpm build
```

After building, the generated files will be in the `dist` directory, ready to be deployed to any static website hosting service.

### Preview Production Build

```bash
pnpm preview
```

## Game Controls

- Click "Start Game" button to begin
- Use keyboard arrow keys to control snake movement direction
- After game over, you can enter your name to save your score
- Click "View Leaderboard" button in the top right corner to see historical high scores

## Game Rules

1. Snake cannot hit walls, or the game ends
2. Snake cannot hit its own body, or the game ends
3. Each time the snake eats food, its body length increases by one unit and score increases by one point
4. Game difficulty increases as the snake grows longer

## Project Structure

```
snake-game/
├── public/             # Static assets
├── src/                # Source code
│   ├── App.tsx         # Main game component
│   ├── main.tsx        # Application entry
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Contributing

Contributions via Pull Requests or Issues are welcome!

## License

[MIT](LICENSE)
