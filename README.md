***

# VoiceWave Reactor

An open-source, real-time voice cloning and manipulation studio, built with React, Vite, and React Three Fiber.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/example/voicewave-reactor)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/example/voicewave-reactor)

VoiceWave Reactor provides an intuitive interface for generating and customizing synthetic voices. Clone voices from audio clips, mix different voices to create unique ones, and fine-tune the output with precise speed and emotion controls. All visualized through a stunning, audio-reactive 3D sphere.

<br>

*– Add a screenshot or GIF of the application here –*

![VoiceWave Reactor Screenshot Placeholder](https://raw.githubusercontent.com/gpt-engineer-org/voicewave-reactor/main/public/placeholder.svg)

## ✨ Features

- **Real-Time Voice Generation**: Instantly convert text to speech with selected voices.
- **Advanced Voice Cloning**: Create new voices by recording audio directly in the app or uploading a file.
- **Voice Mixing**: Blend up to five different source voices with percentage-based controls to create entirely new, unique voices.
- **Speed & Emotion Control**: Fine-tune the generated audio with sliders for speed and various emotions (Anger, Curiosity, Positivity, etc.).
- **Interactive 3D Visualizer**: A beautiful audio-reactive sphere, built with React Three Fiber, that animates in real-time to the generated sound.
- **Audio History**: Keep track of your generated audio clips, with options to replay or download.
- **Modern, Responsive UI**: A sleek and intuitive interface built with shadcn/ui and Tailwind CSS, including dark mode support.
- **Resizable Layout**: Customize your workspace with draggable resizable panels.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (using Radix UI & Vaul)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)
- **Routing**: [React Router](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) version `18.x` or higher.
- A package manager: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [bun](https://bun.sh/).

### ⚡ Quick Start

For experienced developers, here's the fast track:

```bash
git clone https://github.com/YOUR_USERNAME/voicewave-reactor.git
cd voicewave-reactor
npm install
npm run dev
```

The application will be available at `http://localhost:8080`.

### 📦 Installation

Here are the detailed, step-by-step instructions to get the development environment running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/voicewave-reactor.git
    cd voicewave-reactor
    ```

2.  **Install dependencies:**
    Choose your preferred package manager:

    - Using `npm`:
      ```bash
      npm install
      ```
    - Using `yarn`:
      ```bash
      yarn install
      ```
    - Using `bun`:
      ```bash
      bun install
      ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will start, and you can access it in your browser at `http://localhost:8080`.

## 🖥️ Usage

Once the development server is running, you can start using the application:

1.  **Enter Text**: Type the text you want to synthesize in the main input field.
2.  **Select a Voice**: Choose a voice from the dropdown menu.
3.  **Generate Audio**: Click the "Speak" button to generate the audio. The 3D sphere will react to the sound.
4.  **Advanced Controls**:
    - Click **"Mix Voices"** to open a popup where you can blend multiple voices.
    - Click **"Speed/Emotion"** to adjust the delivery style of the generated speech.
5.  **Clone a New Voice**:
    - Click the **"+ Clone Voice"** button.
    - Follow the two-step process to either record your voice or upload an audio file, then provide details for the new voice.
6.  **Review History**: Your generated clips will appear in the "Audio History" panel on the left. Hover over an item to see playback and download options.

## ⚙️ Configuration

The project requires minimal configuration for local development.

- **Development Server Port**: The default port is `8080`. You can change this in the `vite.config.js` file:
  ```js
  // vite.config.js
  export default defineConfig({
    server: {
      host: "::",
      port: "8080", // Change this value
    },
    // ...
  });
  ```
- **UI Theming**: Colors and styles can be customized via Tailwind CSS. The primary configuration files are:
    - `tailwind.config.js`: For modifying the design system (colors, spacing, etc.).
    - `src/index.css`: For base styles and CSS variable definitions used by `shadcn/ui`.

## ✅ Testing

Currently, there is no automated testing suite set up for this project. This is a great area for contribution!

Once a testing framework like [Vitest](https://vitest.dev/) or [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is integrated, you will be able to run tests with:

```bash
npm test
```

## 🚢 Deployment

This is a standard Vite-based React application that builds to a static site.

1.  **Build the project:**
    ```bash
    npm run build
    ```
    This command bundles the application and outputs the static files to the `dist/` directory.

2.  **Deploy the `dist` directory:**
    You can deploy the contents of the `dist` directory to any static hosting service, such as:
    - [Vercel](https://vercel.com/)
    - [Netlify](https://www.netlify.com/)
    - [GitHub Pages](https://pages.github.com/)

Most of these platforms will automatically detect that you're deploying a Vite project and configure the build and deployment settings for you.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute, please follow these steps:

1.  **Fork the Project**: Click the "Fork" button at the top right of the repository page.
2.  **Create your Feature Branch**:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes**: Make your changes and commit them with a clear message.
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Lint your code**: Before pushing, make sure the linter passes.
    ```bash
    npm run lint
    ```
5.  **Push to the Branch**:
    ```bash
    git push origin feature/AmazingFeature
    ```
6.  **Open a Pull Request**: Go to your forked repository on GitHub and open a new Pull Request.

Please make sure your code adheres to the project's coding standards and that you provide a clear description of your changes.

## 🔍 Troubleshooting

-   **Port in use**: If you get an error that port `8080` is already in use, you can either stop the other process using that port or change the port in `vite.config.js` as described in the [Configuration](#️-configuration) section.

## 🗺️ Roadmap

Here are some ideas for future features and improvements:

-   [ ] **Backend Integration**: Connect to a real voice generation API.
-   [ ] **Add a Testing Suite**: Implement unit and integration tests with Vitest and React Testing Library.
-   [ ] **User Accounts**: Allow users to save their cloned voices and history.
-   [ ] **Enhanced 3D Visuals**: Add more effects and customization options to the `AudioReactiveSphere`.
-   [ ] **Websocket Support**: For even lower-latency, real-time audio streaming.
-   [ ] **Add i18n support**: Internationalize the user interface.

See the [open issues](https://github.com/example/voicewave-reactor/issues) for a full list of proposed features (and known issues).

## 📄 License

This project is not currently licensed. We recommend adding an open-source license like the [MIT License](https://opensource.org/licenses/MIT) to encourage contribution and adoption.

## 🙏 Acknowledgments

This project wouldn't be possible without the incredible work of the open-source community. Special thanks to:

-   [shadcn/ui](https://ui.shadcn.com/) for the fantastic component library.
-   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) for making 3D in React accessible and fun.
-   [Vite](https://vitejs.dev/) for the next-generation frontend tooling.
-   Initial project scaffolding by [GPT Engineer](https://gptengineer.app/).
