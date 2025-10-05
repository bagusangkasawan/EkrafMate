# 💡 EkrafMate - Sahabat Ekonomi Kreatif Indonesia

## 📘 Deskripsi Singkat Solusi
**EkrafMate** adalah platform **marketplace berbasis web** yang menjadi jembatan antara **talenta kreatif Indonesia** dengan **klien** (UMKM, startup, hingga korporasi) yang membutuhkan jasa mereka.  

Dengan slogan **"Temukan Peluang, Wujudkan Karya"**, EkrafMate memanfaatkan teknologi **Artificial Intelligence (AI)** untuk melakukan **pencocokan cerdas (smart matching)**, memastikan setiap proyek bertemu dengan talenta paling relevan dan berpotensi tinggi.

---

## 🎯 Use Case yang Diangkat
Banyak pelaku ekonomi kreatif di Indonesia (freelancer) kesulitan menemukan proyek yang **relevan dan terverifikasi**, sementara klien juga kesulitan menemukan talenta yang **tepat dan sesuai anggaran**.  

Proses pencarian manual dan tidak efisien ini menjadi hambatan utama dalam kolaborasi.  
**EkrafMate hadir untuk mengatasi masalah tersebut** dengan menghadirkan ekosistem digital yang **cerdas, efisien, dan aman** bagi kedua belah pihak.

---

## 🧩 Keterkaitan Solusi dengan Bidang ASTA EKRAF
Solusi ini berfokus pada **bidang Pemampu Ekraf (Ekraf Enabler)**.

EkrafMate berperan sebagai **platform pemampu digital** yang mendukung subsektor lain seperti:
- Aplikasi & Game
- Film, Animasi, dan Video
- Musik
- Fashion
- Kriya
- Kuliner
- Periklanan

Platform ini memperkuat:
- **Networking:** Mempertemukan pelaku ekraf lintas bidang.  
- **Market Access:** Membuka akses pasar baru bagi talenta kreatif.  
- **Collaboration:** Mendorong kolaborasi multidisiplin yang produktif.

---

## 👥 Target Pengguna dan Konteks Penggunaan

### 🎨 Pelaku Kreatif (Creative)
- **Siapa:** Freelancer, desainer, developer, penulis, animator, musisi, dll.  
- **Konteks:** Membuat portofolio, mencari proyek, melamar pekerjaan, dan mengelola proyek yang sedang berjalan.

### 🏢 Klien (Client)
- **Siapa:** Pemilik UMKM, manajer startup, perwakilan korporasi.  
- **Konteks:** Membuat dan mempublikasikan proyek, mencari talenta, meninjau pelamar, serta mengelola proyek aktif.

### ⚙️ Administrator (Admin)
- **Siapa:** Tim internal EkrafMate.  
- **Konteks:** Memverifikasi akun, mengawasi aktivitas, dan memastikan platform berjalan stabil dan aman.

---

## 🚀 Fitur Utama

### 🧩 1. Manajemen Akun Tiga Peran
Sistem login & registrasi untuk **Creative**, **Client**, dan **Admin**.

- **Verifikasi Email:**  
  - Sebelum verifikasi:  
    - *Client* → hanya dapat membuat 1 proyek.  
    - *Creative* → hanya dapat melamar ke 1 proyek.  
  - Setelah verifikasi → batasan dihapus.

---

### 🖥️ 2. Dashboard Personalisasi
Tiap peran memiliki dashboard unik:
- Client: mengelola proyek & pelamar.  
- Creative: mengelola profil & portofolio.  
- Admin: mengelola pengguna & aktivitas sistem.

---

### 🔍 3. Pencarian Semantik Berbasis AI
Cari proyek atau talenta menggunakan **bahasa natural**.  
AI akan mencocokkan **berdasarkan makna (semantic)**, bukan hanya kata kunci.

---

### 🤖 4. Asisten AI Generatif
- **Creative:** Membantu menulis deskripsi profil profesional.  
- **Client:** Membantu menulis deskripsi proyek menarik.

---

### 📂 5. Manajemen Proyek End-to-End
Mulai dari pembuatan proyek, pelamaran, penerimaan talenta, hingga penyelesaian proyek — semuanya terintegrasi.

---

### 💬 6. Chatbot Interaktif
Chatbot AI membantu pengguna memahami fitur platform dan menjawab pertanyaan umum secara real-time.

---

## 🧭 Alur Penggunaan

### Untuk **Client**
1. **Membuat Proyek:**  
   Isi judul, keahlian, dan anggaran. Dapat gunakan fitur *“Buat dengan AI”*.
2. **Manajemen Pelamar:**  
   Terima notifikasi, tinjau profil pelamar, dan pilih yang paling sesuai.
3. **Kolaborasi & Penyelesaian:**  
   Setelah proyek selesai → status berubah menjadi *completed* dan otomatis masuk ke portofolio *Creative*.

---

### Untuk **Creative**
1. **Membangun Profil:**  
   Lengkapi headline, skill, dan deskripsi dengan bantuan AI.  
2. **Mencari Proyek:**  
   Gunakan pencarian semantik untuk menemukan proyek relevan.  
3. **Melamar & Menyelesaikan:**  
   Ajukan diri, kerjakan proyek, tandai selesai, dan tunggu persetujuan klien.

---

## ⚙️ Arsitektur Teknologi

EkrafMate dibangun dengan **arsitektur modern berbasis layanan AWS**.

### 🧠 Artificial Intelligence (Amazon Bedrock)
- **Model Embedding:** `amazon.titan-embed-text-v2:0`  
  → Membuat representasi vektor dari deskripsi proyek & profil.  
- **Model LLM:** `amazon.titan-text-express-v1`  
  → Menghasilkan teks untuk deskripsi & chatbot.

### ☁️ Backend
- **Framework:** Node.js (Express.js)  
- **Deployment:** AWS App Runner [(https://4hvtinacn2.ap-southeast-2.awsapprunner.com)](https://4hvtinacn2.ap-southeast-2.awsapprunner.com)
- **Custom Domain:** [https://ekrafmate-backend.mategroup.web.id](https://ekrafmate-backend.mategroup.web.id)

### 🌐 Frontend
- **Framework:** React.js  
- **Deployment:** AWS Amplify [(https://main.d2jg1c9nh1d2iv.amplifyapp.com)](https://main.d2jg1c9nh1d2iv.amplifyapp.com/)
- **Custom Domain:** [https://ekrafmate.mategroup.web.id](https://ekrafmate.mategroup.web.id)

### 🗄️ Database
- **MongoDB Atlas:** Menyimpan data pengguna, proyek, dan embedding.  
  Mendukung **vector search** untuk pencarian semantik.

---

## 🔗 Integrasi AI dalam Sistem

| Tahap | Fungsi | Layanan |
|-------|--------|----------|
| Registrasi/Profil | Generate embedding dari deskripsi pengguna | Amazon Bedrock |
| Pembuatan Proyek | Generate embedding dari deskripsi proyek | Amazon Bedrock |
| Pencarian | Vector search berdasarkan embedding | MongoDB Atlas |
| Chatbot/Asisten | Generasi teks dengan LLM | Amazon Bedrock |

---

## 🧱 Deployment Cadangan
Untuk keandalan tinggi, EkrafMate juga di-deploy di **Vercel** sebagai backup.

- **Frontend (Vercel):** [https://ekrafmate.vercel.app](https://ekrafmate.vercel.app)
- **Backend (Vercel):** [https://ekrafmate-backend.vercel.app](https://ekrafmate-backend.vercel.app)

---

## 📂 Bukti Implementasi Service AWS
Implementasi Amazon Bedrock dapat dilihat pada:

| File | Deskripsi |
|------|------------|
| `backend/services/bedrockService.js` | Logika interaksi ke API Amazon Bedrock (embedding, deskripsi, chatbot). |
| `backend/controllers/searchController.js` | Proses pencarian menggunakan `$vectorSearch`. |
| `backend/controllers/userController.js` | Pemanggilan layanan AI untuk profil pengguna. |
| `backend/controllers/projectController.js` | Pemanggilan layanan AI untuk deskripsi proyek. |
| `backend/controllers/chatbotController.js` | Menangani interaksi chatbot AI. |

---

## 👥 Tim Kami
**MateGroup**
- Bagus Angkasawan Sumantri Putra - Fullstack Developer & AI Engineer  
- Sayyidah Hikma Lutfiyana - QA/Tester & Dokumentasi  
