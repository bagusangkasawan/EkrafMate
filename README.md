# 💡 EkrafMate – Sahabat Ekonomi Kreatif Indonesia

**Slogan:** "Temukan Peluang, Wujudkan Karya"

---

## 📘 Deskripsi Singkat Solusi

**EkrafMate** adalah platform **marketplace berbasis web** yang menjadi jembatan antara **talenta kreatif Indonesia** dengan **klien** (UMKM, startup, hingga korporasi) melalui teknologi kecerdasan artifisial.

EkrafMate hadir sebagai solusi **digitalisasi penciptaan lapangan kerja** sekaligus **peningkatan produktivitas** di sektor ekonomi kreatif — sektor yang menyumbang lebih dari 7% PDB nasional dan menyerap jutaan tenaga kerja, namun masih terkendala ketidakefisienan pencocokan antara talenta dan kebutuhan industri.

---

## 🎯 Konteks Masalah Nasional

Sektor ekonomi kreatif Indonesia menyimpan potensi besar yang belum optimal:

* **27+ juta** pelaku ekonomi kreatif di Indonesia (BPS, 2025), namun mayoritas belum terhubung ke pasar digital secara efektif.
* **Tingkat pengangguran terdidik** masih tinggi di kalangan generasi muda kreatif akibat ketimpangan informasi antara pencari kerja dan pemberi kerja.
* **UMKM** sebagai tulang punggung ekonomi nasional kesulitan menemukan talenta kreatif tepat dengan anggaran efisien, memperlambat adopsi digitalisasi usaha mereka.
* Proses rekrutmen manual rata-rata membutuhkan **2–4 minggu** — tidak efisien, tidak terstandarisasi, dan tidak skalabel.

EkrafMate menjawab tantangan ini melalui platform job matching berbasis AI yang mempercepat pertemuan supply dan demand tenaga kerja kreatif secara kontekstual dan akurat.

---

## 🔍 Masalah yang Dihadapi

* Pelaku kreatif kesulitan menemukan proyek yang relevan sesuai keahlian mereka — bergantung pada jaringan personal dan pencarian manual.
* Klien (UMKM, startup) kesulitan menemukan talenta tepat sesuai kebutuhan dan anggaran tanpa proses kurasi yang panjang.
* Tidak ada standar penilaian kompetensi — klien tidak punya referensi objektif untuk memilih talenta terbaik.
* Tingginya angka pengangguran di kalangan pelaku kreatif muda yang kurang terekspos pasar kerja digital.

---

## 💡 Solusi EkrafMate

* **AI-powered Job Matching** — semantic search berbasis embedding AI (`gemini-embedding-001` + MongoDB Atlas Vector Search) untuk mencocokkan proyek & talenta secara kontekstual, bukan sekadar keyword.
* **Asisten AI Generatif** — membantu pelaku kreatif menyusun profil dan deskripsi proyek yang profesional menggunakan Gemini 2.5 Flash.
* **Dashboard Multi-Peran** — personalisasi antarmuka dan alur kerja untuk Creative, Client, dan Admin.
* **Chatbot Interaktif (MateBot) dengan RAG** — asisten virtual berbasis LLM yang diperkuat Retrieval-Augmented Generation (RAG): setiap pertanyaan user memicu vector search ke MongoDB Atlas secara real-time, sehingga MateBot menjawab berdasarkan data proyek dan talenta yang benar-benar ada di platform — bukan hanya pengetahuan umum.

---

## 💡 Dampak & Relevansi Nasional

| Dimensi Dampak | Wujud Konkret |
|---|---|
| **Penciptaan Lapangan Kerja** | Menghubungkan jutaan pelaku kreatif dengan proyek nyata secara digital — memperluas akses pasar tanpa batas geografis |
| **Peningkatan Produktivitas** | Waktu rekrutmen dipangkas dari minggu menjadi menit melalui AI matching; UMKM lebih cepat mendapatkan talenta, talenta lebih cepat mendapat proyek |
| **Inklusi Ekonomi Digital** | Talenta daerah dapat bersaing setara di pasar nasional tanpa perlu pindah kota — memperkecil kesenjangan peluang |
| **Penguatan UMKM** | Klien UMKM mendapatkan akses ke talenta kreatif berkualitas dengan harga terjangkau, mendorong digitalisasi bisnis mereka |
| **Dampak PDB Kreatif** | Mendorong pertumbuhan ekonomi kreatif nasional yang ditargetkan menjadi tulang punggung PDB Indonesia |

**Estimasi Dampak Kuantitatif (Proyeksi):**
* Potensi mempercepat proses matching rekrutmen kreatif hingga **~80%** lebih cepat vs. pencarian manual
* Menjangkau **segmen freelancer kreatif** yang selama ini tidak terlayani platform kerja konvensional
* Setiap 1.000 proyek yang terselesaikan = lapangan kerja nyata bagi ribuan pelaku kreatif Indonesia

---

## 💰 Model Bisnis

* **Revenue dari Klien:** Biaya layanan/komisi per proyek berhasil.
* **Freemium untuk Creative:** Fitur dasar gratis, fitur premium berbayar (misal: spotlight proyek, AI assist lanjutan).
* **Partnership & Sponsorship:** Kerja sama dengan ekosistem kreatif dan institusi pendukung.

---

## 👥 Target Pengguna & Alur Penggunaan

### Pengguna:

1. **Creative (Pelaku Kreatif)**

   * Bangun profil profesional dengan bantuan AI generatif → cari proyek relevan via AI semantic search → lamar proyek → selesaikan & bangun portofolio.

2. **Client (Klien / UMKM)**

   * Buat proyek dengan deskripsi dibantu AI → terima rekomendasi talenta yang relevan dari sistem matching → pilih, kelola, dan selesaikan proyek.

3. **Admin**

   * Verifikasi akun, moderasi konten, awasi aktivitas platform, dan pastikan keamanan ekosistem.

---

## ⚙️ Arsitektur Teknologi

| Komponen     | Teknologi / Layanan  | Deskripsi                                                                          |
| ------------ | -------------------- | ---------------------------------------------------------------------------------- |
| **Frontend** | React.js + PWA       | Deployed di Vercel; installable sebagai Progressive Web App                        |
| **Backend**  | Node.js + Express.js | Deployed di Vercel; RESTful API                                                    |
| **Database** | MongoDB Atlas        | Menyimpan data pengguna, proyek, dan embedding; mendukung vector search            |
| **AI**       | Google Gemini        | Embedding (`gemini-embedding-001`) + LLM (`gemini-2.5-flash`) untuk matching & chatbot |

---

## 🚀 Fitur Utama

1. **AI Job Matching** — Pencarian semantik berbasis vector embedding untuk mencocokkan talenta & proyek secara kontekstual, bukan sekadar keyword
2. **Asisten AI Generatif** — Generate deskripsi profil & proyek profesional secara otomatis menggunakan LLM
3. **Chatbot MateBot (RAG-enhanced)** — Asisten virtual berbasis LLM + RAG untuk menjawab berdasarkan data proyek & talenta nyata di platform secara real-time, bukan sekadar FAQ statis
4. **Manajemen Proyek End-to-End** — Dari penerbitan proyek hingga penyelesaian & portofolio
5. **Dashboard Multi-Peran** — Tampilan dan kontrol yang disesuaikan per peran pengguna (Creative, Client, Admin)
6. **Manajemen Akun Tiga Peran** — Hak akses berbeda dengan verifikasi email & proteksi bot (Cloudflare Turnstile)

---

## 🔗 Integrasi AI

| Tahap              | Fungsi                                                                | Layanan                      |
| ------------------ | --------------------------------------------------------------------- | ---------------------------- |
| Registrasi/Profil  | Generate embedding deskripsi pengguna                                 | Google Gemini                |
| Pembuatan Proyek   | Generate embedding & deskripsi proyek                                 | Google Gemini                |
| Pencarian/Matching | Vector search untuk job matching semantik                             | MongoDB Atlas                |
| Chatbot (RAG)      | Vector search real-time → inject konteks DB → generate jawaban akurat | MongoDB Atlas + Google Gemini |

---

## 🌐 Deployment

* **Frontend:** [https://ekrafmate.mategroup.web.id](https://ekrafmate.mategroup.web.id)
* **Backend:** [https://ekrafmate-backend.mategroup.web.id](https://ekrafmate-backend.mategroup.web.id)

---

## 🛠️ Roadmap

* **Q1 2026:** Launch beta, AI job matching & chatbot aktif
* **Q2 2026:** Peningkatan akurasi matching, fitur portofolio & rating
* **Q3 2026:** Multi-language support, ekspansi ke talenta daerah
* **Q4 2026:** Dashboard analytics pasar kerja kreatif, ekspansi pengguna nasional

---

## 👥 Tim

**MateGroup.id**

* Bagus Angkasawan Sumantri Putra – Fullstack Developer & AI Engineer
* Sayyidah Hikma Lutfiyana – QA/Tester & Dokumentasi

---

## 📂 Prototype & POC

* **Frontend & Backend:** React.js + Node.js, deployed di Vercel — dapat diakses dan diuji secara langsung
* **PWA Support:** Installable & offline-capable sebagai Progressive Web App
* **AI Job Matching:** Google Gemini embedding (`gemini-embedding-001`) + MongoDB Atlas Vector Search — semantic matching aktif
* **AI Generatif:** Gemini 2.5 Flash untuk generate deskripsi profil, proyek, dan chatbot interaktif
* **Autentikasi:** JWT + verifikasi email — keamanan end-user terjamin
* **Bot Protection:** Cloudflare Turnstile pada form registrasi & login

---
