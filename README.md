# 📝 Artikel Management System

## 🌟 Overview

Aplikasi **Artikel Management System** adalah platform modern untuk mengelola konten artikel dengan sistem role-based access control yang terdiri dari:

- **User**: Dapat melihat dan menjelajahi artikel
- **Admin**: Memiliki akses penuh untuk mengelola artikel dan kategori

Dibangun dengan teknologi terdepan:

- Next.js (App Router)
- Tailwind CSS
- Terintegrasi dengan API eksternal

## ✨ Key Features

### 🔐 Umum

- ✅ Sistem autentikasi (Login/Register) yang aman
- 📱 Responsive design (Mobile/Tablet/Desktop)
- 📋 Form validation dengan Zod + React Hook Form
- ⚠️ Error handling dan loading states yang elegan

### 👤 Role User

- 📜 Daftar artikel dengan:
  - 🔍 Pencarian real-time dengan debounce
  - 🗂️ Filter berdasarkan kategori
  - 📟 Pagination yang optimal
- 📖 Halaman detail artikel
- 🔗 Artikel terkait berdasarkan kategori

### 👑 Role Admin

- **Manajemen Kategori**:

  - ➕ Buat kategori baru
  - ✏️ Edit kategori existing
  - ❌ Hapus kategori
  - 🔎 Pencarian kategori

- **Manajemen Artikel**:
  - ✍️ Buat/edit artikel dengan WYSIWYG preview
  - 🗑️ Hapus artikel
  - 🔧 Filter dan pencarian canggih

## 🛠️ Tech Stack

| Category         | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js (App Router)     |
| Styling          | Tailwind CSS + ShadCN UI |
| State Management | React Context            |
| Form Handling    | React Hook Form + Zod    |
| HTTP Client      | Axios                    |
| Icons            | Lucide                   |
| Version Control  | Git + GitHub             |

## 🚀 Local Development

### Prerequisites

- Node.js v18+
- npm v9+ or yarn
- Git account

### Installation Guide

1. **Clone the repository**:

   ```bash
   git clone https://github.com/andryariadi/test-digital-asia.git
   ```

2. **Install dependencies**:
   npm install

# or using yarn

yarn install

3. **Start development server**:
   npm run dev

# or

yarn dev

4. **Open http://localhost:3000 in your browser**:
