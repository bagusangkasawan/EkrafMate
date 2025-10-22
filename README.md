# 💡 EkrafMate – Sahabat Ekonomi Kreatif Indonesia

**Slogan:** "Temukan Peluang, Wujudkan Karya"

---

## 📘 Deskripsi Singkat Solusi

**EkrafMate** adalah platform **marketplace berbasis web** yang menjadi jembatan antara **talenta kreatif Indonesia** dengan **klien** (UMKM, startup, hingga korporasi).

**Masalah yang Dihadapi:**

* Pelaku kreatif kesulitan menemukan proyek yang relevan dan terverifikasi.
* Klien kesulitan menemukan talenta tepat sesuai anggaran.
* Proses pencarian manual lambat dan tidak efisien.

**Solusi EkrafMate:**

* **Smart matching berbasis AI** untuk mencocokkan proyek & talenta.
* **Dashboard personalisasi** untuk Creative, Client, dan Admin.
* **Pencarian berbasis bahasa natural (semantic search)** dan **asisten AI generatif**.

---

## 💰 Model Bisnis

* **Revenue dari Klien:** Biaya layanan/komisi per proyek berhasil.
* **Freemium untuk Creative:** Fitur dasar gratis, fitur premium berbayar (misal: spotlight proyek, AI assist lanjutan).
* **Token & DeFi Integration:** Reward token, monetisasi karya melalui NFT & smart contract DeFi.
* **Partnership & Sponsorship:** Kerja sama dengan ekosistem kreatif dan institusi pendukung.

---

## 👥 Target Pengguna & Alur Penggunaan

### Pengguna:

1. **Creative (Pelaku Kreatif)**

   * Bangun profil, cari proyek relevan via semantic search, melamar, dan menyelesaikan proyek.

2. **Client (Klien)**

   * Buat proyek (judul, skill, anggaran), tinjau pelamar, pilih talenta, dan selesaikan proyek.

3. **Admin**

   * Verifikasi akun, awasi aktivitas, pastikan platform aman.

---

## ⚙️ Arsitektur Teknologi

| Komponen         | Teknologi / Layanan         | Deskripsi                                                                         |
| ---------------- | --------------------------- | --------------------------------------------------------------------------------- |
| **Frontend**     | React.js + PWA              | Deployed di AWS Amplify & Vercel (backup)                                         |
| **Backend**      | Node.js + Express.js        | Deployed di AWS App Runner & Vercel (backup)                                      |
| **Database**     | MongoDB Atlas               | Menyimpan data pengguna, proyek, dan embedding; mendukung vector search           |
| **AI**           | Amazon Bedrock              | Embedding (Titan Embedding), LLM (Titan Text Express) untuk deskripsi & chatbot   |
| **DeFi Testnet** | Smart contract ERC20 & DeFi | Token: 0xE6d8E3C52ac837249…; DeFi: 0x177f16e10f9c0790…                            |

---

## 🚀 Fitur Utama

1. **Manajemen Akun Tiga Peran**: Creative, Client, Admin
2. **Dashboard Personalisasi**
3. **Pencarian Semantik Berbasis AI**
4. **Asisten AI Generatif**
5. **Manajemen Proyek End-to-End**
6. **Chatbot Interaktif**

---

## 🔗 Integrasi AI

| Tahap             | Fungsi                                | Layanan        |
| ----------------- | ------------------------------------- | -------------- |
| Registrasi/Profil | Generate embedding deskripsi pengguna | Amazon Bedrock |
| Pembuatan Proyek  | Generate embedding deskripsi proyek   | Amazon Bedrock |
| Pencarian         | Vector search berdasarkan embedding   | MongoDB Atlas  |
| Chatbot/Asisten   | Generasi teks untuk profil/proyek     | Amazon Bedrock |

---

## 🌐 Deployment

### Deployment Utama
* **Frontend AWS Amplify:** [https://ekrafmate.mategroup.web.id](https://ekrafmate.mategroup.web.id)
* **Backend AWS App Runner:** [https://ekrafmate-backend.mategroup.web.id](https://ekrafmate-backend.mategroup.web.id)

### Deployment Cadangan
* **Frontend Vercel:** [https://ekrafmate.vercel.app](https://ekrafmate.vercel.app)
* **Backend Vercel:** [https://ekrafmate-backend.vercel.app](https://ekrafmate-backend.vercel.app)

---

## 🔗 Ekosistem & Strategi Adopsi

* **Networking:** Hubungkan pelaku kreatif lintas bidang.
* **Market Access:** Buka peluang pasar baru.
* **Collaboration:** Dorong kolaborasi multidisiplin.
* **DeFi for Creative Economy:** Pendanaan proyek, NFT & tokenisasi aset digital, reward token untuk partisipasi.

---

## 🛠️ Roadmap

* **Q4 2025:** Launch beta, integrasi AI dasar
* **Q1 2026:** Pencarian semantik & chatbot AI aktif
* **Q2 2026:** Multi-language support & integrasi DeFi
* **Q3 2026:** Cross-platform PWA, dashboard analytics, ekspansi pengguna

---

## 👥 Tim

**MateGroup**

* Bagus Angkasawan Sumantri Putra – Fullstack Developer & AI Engineer
* Sayyidah Hikma Lutfiyana – QA/Tester & Dokumentasi

---

## 📂 Prototype & POC

* Frontend & Backend: React.js + Node.js, AWS & Vercel deployment
* PWA Support: Installable & offline-capable
* AI Services: Amazon Bedrock (embedding & LLM), chatbot interaktif
* Database: MongoDB Atlas + vector search
* DeFi Testnet: Token & smart contract di Sepolia Testnet

---
