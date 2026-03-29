# 📝 Markdown Viewer Web App

A clean, developer-focused markdown viewer built to make reading, editing, and sharing markdown content fast and intuitive.

---

## 🚀 Overview

This project is a lightweight yet powerful markdown viewer designed for **real-world developer usage**.

It allows you to:

* Write or paste markdown
* Upload `.md` files
* View beautifully formatted output instantly
* Interact with code blocks like a developer tool

The goal is not just to render markdown, but to create a **usable, minimal, and developer-centric reading experience**.

---

## ✨ Features

### Core Features

* Live markdown preview
* File upload support (`.md`)
* Syntax highlighting for code blocks
* Clean typography for long-form reading

### Developer Experience

* Copy button for code blocks
* Dev-aware markdown (Docker, Kubernetes, Node, React, Linux detection)
* Smart code block labeling

### UX Enhancements

* Drag & drop file upload
* Resizable editor and viewer panels
* Light / Dark mode toggle (light by default)
* Local storage persistence (auto-save)

### Sharing & Export

* Shareable links (URL-based encoding)
* Export as HTML
* Export as PDF (via browser print)

---

## 🛠 Tech Stack

* **Frontend:** React (Vite) + TypeScript
* **Styling:** Tailwind CSS
* **Markdown Rendering:** react-markdown + remark-gfm
* **Code Highlighting:** rehype-highlight
* **State Management:** React Hooks (no Redux)

---

## 🧠 Design Philosophy

* Keep it simple and fast
* Avoid unnecessary complexity
* Focus on usability over features
* Build for real developer workflows

---

## ⚙️ How It Works

### Markdown Flow

```text
Input (textarea / file / GitHub)
→ Markdown string
→ Parsed with react-markdown
→ Rendered as styled HTML
```

---

### Dev-Aware Enhancement

Code blocks are analyzed using simple rules:

* `docker` → Docker
* `kubectl` → Kubernetes
* `npm/node` → Node
* `react/vite` → Frontend
* `apt/sudo` → Linux

Each block gets:

* Label
* Copy button
* Improved visibility

---

## 📦 Getting Started

```bash
git clone <your-repo-url>
cd markdown-viewer
npm install
npm run dev
```

---

## 📌 Use Cases

* Read GitHub READMEs cleanly
* Maintain personal DevOps notes
* Learn and document commands
* Share markdown via links
* Export documentation

---

## ⚠️ Limitations

* Shareable links have URL length limits
* No backend (data stored locally)
* Large markdown files may affect performance

---

## 🔮 Future Improvements

* GitHub private repo support
* Command explanations / tooltips
* Multi-file markdown navigation
* Better PDF export formatting

---

## 📷 Screenshots

![Markdown Viewer Web App Screenshot](/screenshot.png)

---

## 🎯 Why This Project

This project demonstrates:

* Strong frontend fundamentals
* Clean architecture and decision-making
* Focus on developer experience
* Practical feature design

---

## 🧩 Key Takeaway

This is not just a markdown viewer.

It’s a **developer-oriented reading tool** designed with real workflows in mind.

---

## 📄 License

MIT
