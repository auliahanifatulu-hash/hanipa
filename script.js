/**
 * TJKT Smart Network - Interactive Experience Engine (Optimized & Instant Load)
 * Developed for Aulia Hanifatul Ummah (SMKN 2 Surakarta, XI TJKT-C)
 * Features: Dark/Light Mode, Realtime Clock, Interactive Quiz, Mini-Game IP, Game 2 Crimping UTP, Search & Filter, Notes, Interactive Motivation Generator (Cute Animations & Quotes), Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeToggle();
    initRealtimeClock();
    initReadingProgress();
    initScrollToTop();
    initHeaderNavScroll();
    initHeroTypingEffect();
    initHeroStatsCounter();
    initInteractiveMateriAndServices();
    initQuizModule();
    initMiniGameModule();
    initCableCrimpingGameModule();
    initNotesModule();
    initMotivationBoosterModule();
    initImageGalleryModal();
    initWelcomeToast();
});

/* ==========================================================================
   1. PRELOADER & INSTANT LOADING SCREEN (Max 400ms)
   ========================================================================== */
function initPreloader() {
    const preloaderHtml = `
        <div id="preloader" class="preloader-overlay">
            <div class="preloader-content">
                <div class="preloader-logo-ring">
                    <i class="fa-solid fa-network-wired fa-spin-pulse"></i>
                </div>
                <h2 class="preloader-title">TJKT SMART NETWORK</h2>
                <p class="preloader-subtitle">Sistem Edukasi & Layanan Jaringan Komputer</p>
                <div class="preloader-bar">
                    <div class="preloader-progress" id="preloaderProgress"></div>
                </div>
                <span class="preloader-status" id="preloaderStatus">Memuat sistem... 100%</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', preloaderHtml);

    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('preloaderProgress');
    
    if (progress) progress.style.width = '100%';

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 400);
        }
    }, 400);
}

/* ==========================================================================
   2. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    const themeLi = document.createElement('li');
    themeLi.innerHTML = `
        <button id="themeToggleBtn" class="nav-icon-btn" title="Ganti Tema (Gelap/Terang)">
            <i class="fa-solid fa-moon"></i>
        </button>
    `;
    navUl.appendChild(themeLi);

    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('tjkt_theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('light-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('tjkt_theme', isLight ? 'light' : 'dark');
        themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        showToast(isLight ? 'Mode Terang Ditingkatkan ✨' : 'Mode Futuristik Gelap Aktif 🌙');
    });
}

/* ==========================================================================
   3. REALTIME CLOCK & DATE WIDGET IN NAV
   ========================================================================== */
function initRealtimeClock() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const clockDiv = document.createElement('div');
    clockDiv.className = 'nav-clock-widget';
    clockDiv.innerHTML = `
        <span class="clock-time" id="clockTime">00:00:00</span>
        <span class="clock-date" id="clockDate">Senin, 1 Jan 2026</span>
    `;

    const h1 = nav.querySelector('h1');
    if (h1 && h1.nextSibling) {
        nav.insertBefore(clockDiv, h1.nextSibling);
    } else {
        nav.appendChild(clockDiv);
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timeEl = document.getElementById('clockTime');
        const dateEl = document.getElementById('clockDate');

        if (timeEl) timeEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
        if (dateEl) {
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('id-ID', options);
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ==========================================================================
   4. READING PROGRESS BAR & SCROLL-TO-TOP
   ========================================================================== */
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const progress = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    });
}

function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top-btn';
    scrollTopBtn.setAttribute('title', 'Kembali ke Atas');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   5. STICKY NAV SCROLL EFFECT
   ========================================================================== */
function initHeaderNavScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

/* ==========================================================================
   6. HERO TYPING EFFECT & STATS COUNTER
   ========================================================================== */
function initHeroTypingEffect() {
    const heroH2 = document.querySelector('.hero-teks h2');
    if (!heroH2) return;

    const originalText = heroH2.textContent.trim();
    heroH2.innerHTML = '<span class="typing-text"></span><span class="typing-cursor">|</span>';
    const typingSpan = heroH2.querySelector('.typing-text');

    let i = 0;
    function type() {
        if (i < originalText.length) {
            typingSpan.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    setTimeout(type, 300);
}

function initHeroStatsCounter() {
    const heroTeks = document.querySelector('.hero-teks');
    if (!heroTeks) return;

    const statsHtml = `
        <div class="hero-stats-grid">
            <div class="stat-item">
                <div class="stat-number" data-target="100">0</div>
                <div class="stat-label"><i class="fa-solid fa-server"></i> Node Aktif</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="99">0</div>
                <div class="stat-label"><i class="fa-solid fa-bolt"></i> % Uptime LAN</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="24">0</div>
                <div class="stat-label"><i class="fa-solid fa-shield-halved"></i> /7 Monitoring</div>
            </div>
        </div>
    `;
    heroTeks.insertAdjacentHTML('beforeend', statsHtml);

    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    window.addEventListener('scroll', () => {
        if (!animated && window.scrollY < 400) {
            animated = true;
            statNumbers.forEach(numEl => {
                const target = parseInt(numEl.getAttribute('data-target'));
                let current = 0;
                const increment = Math.ceil(target / 30);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    numEl.textContent = current + (target === 99 ? '%' : '+');
                }, 20);
            });
        }
    });
}

/* ==========================================================================
   7. MATERIAL & SERVICES SEARCH, FILTER & BOOKMARK SYSTEM
   ========================================================================== */
function initInteractiveMateriAndServices() {
    const layananSec = document.querySelector('.layanan');
    const daftarLayanan = document.querySelector('.daftar-layanan');
    if (!layananSec || !daftarLayanan) return;

    const sectionH2 = layananSec.querySelector('h2');
    if (sectionH2) {
        sectionH2.innerHTML = '<i class="fa-solid fa-cubes-stacked"></i> Layanan & Materi Edukasi TJKT';
    }

    const filterBarHtml = `
        <div class="materi-filter-bar">
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input type="text" id="materiSearchInput" placeholder="Cari materi (misal: Router, LAN, Wi-Fi, IP, HTML)...">
            </div>
            <div class="filter-pills">
                <button class="filter-pill active" data-filter="all">Semua</button>
                <button class="filter-pill" data-filter="jaringan">Jaringan</button>
                <button class="filter-pill" data-filter="perangkat">Perangkat</button>
                <button class="filter-pill" data-filter="web">Web Dev</button>
                <button class="filter-pill" data-filter="bookmarked"><i class="fa-solid fa-bookmark"></i> Favorit</button>
            </div>
        </div>
    `;
    daftarLayanan.insertAdjacentHTML('beforebegin', filterBarHtml);

    const kartuList = daftarLayanan.querySelectorAll('.kartu');
    const extraCardData = [
        {
            category: 'jaringan',
            icon: 'fa-network-wired',
            tag: 'Topologi & LAN',
            badge: 'Populer',
            detailTitle: 'Panduan Lengkap Instalasi LAN & Kabel UTP',
            detailText: 'Jaringan Lokal (LAN) menghubungkan komputer dalam ruangan atau gedung dengan media kabel UTP (Cat5e/Cat6) dan konektor RJ-45 menggunakan susunan Straight-Through atau Crossover. Topologi Star merupakan standar industri modern dengan penggunaan Switch terpusat.'
        },
        {
            category: 'perangkat',
            icon: 'fa-router',
            tag: 'MikroTik & Cisco',
            badge: 'Wajib TJKT',
            detailTitle: 'Konfigurasi Router, Gateway & Bandwidth Management',
            detailText: 'Router berfungsi menghubungkan segmen jaringan yang berbeda (Routing L3). Konfigurasi mencakup pemberian IP Address, NAT (Network Address Translation), DHCP Server, serta Firewall untuk keamanan trafik komunikasi intra dan inter-network.'
        },
        {
            category: 'jaringan',
            icon: 'fa-wifi',
            tag: 'Wireless & AP',
            badge: 'Teknologi Terkini',
            detailTitle: 'Instalasi Access Point & Keamanan Wi-Fi (WPA3)',
            detailText: 'Access Point mentransmisikan sinyal frekuensi 2.4 GHz dan 5 GHz. Pengaturan meliputi SSID, Channel Overlap avoidance, Roaming, WPA2/WPA3 Enterprise Encryption, serta MAC Filtering untuk mencegah akses yang tidak sah.'
        }
    ];

    kartuList.forEach((kartu, index) => {
        const meta = extraCardData[index] || extraCardData[0];
        kartu.setAttribute('data-category', meta.category);
        kartu.setAttribute('data-id', `card-${index}`);

        const h3 = kartu.querySelector('h3');
        const origTitle = h3 ? h3.textContent.trim() : 'Materi TJKT';

        kartu.innerHTML = `
            <div class="card-header-top">
                <span class="card-badge"><i class="fa-solid fa-tag"></i> ${meta.badge}</span>
                <button class="bookmark-btn" title="Simpan ke Favorit" data-id="card-${index}">
                    <i class="fa-regular fa-bookmark"></i>
                </button>
            </div>
            <div class="card-icon-wrapper">
                <i class="fa-solid ${meta.icon}"></i>
            </div>
            <h3>${origTitle}</h3>
            <p>${kartu.querySelector('p')?.textContent || ''}</p>
            <div class="card-footer">
                <span class="category-tag"><i class="fa-solid fa-folder"></i> ${meta.tag}</span>
                <button class="btn-detail-modal" data-index="${index}">
                    Detail Materi <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;
    });

    const extraCardsHtml = `
        <div class="kartu" data-category="web" data-id="card-3">
            <div class="card-header-top">
                <span class="card-badge"><i class="fa-solid fa-code"></i> Frontend</span>
                <button class="bookmark-btn" title="Simpan ke Favorit" data-id="card-3"><i class="fa-regular fa-bookmark"></i></button>
            </div>
            <div class="card-icon-wrapper"><i class="fa-brands fa-html5"></i></div>
            <h3>HTML, CSS & JavaScript</h3>
            <p>Dasar pemrograman web modern untuk membuat media edukasi dan dashboard manajemen jaringan yang interaktif.</p>
            <div class="card-footer">
                <span class="category-tag"><i class="fa-solid fa-folder"></i> Web Dev</span>
                <button class="btn-detail-modal" data-index="3">Detail Materi <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>

        <div class="kartu" data-category="jaringan" data-id="card-4">
            <div class="card-header-top">
                <span class="card-badge"><i class="fa-solid fa-shield-halved"></i> Cyber Sec</span>
                <button class="bookmark-btn" title="Simpan ke Favorit" data-id="card-4"><i class="fa-regular fa-bookmark"></i></button>
            </div>
            <div class="card-icon-wrapper"><i class="fa-solid fa-user-shield"></i></div>
            <h3>Keamanan Jaringan</h3>
            <p>Proteksi infrastruktur dari cyber attack menggunakan Firewall rules, Port Blocking, VPN, dan enkripsi data.</p>
            <div class="card-footer">
                <span class="category-tag"><i class="fa-solid fa-folder"></i> Keamanan</span>
                <button class="btn-detail-modal" data-index="4">Detail Materi <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>

        <div class="kartu" data-category="perangkat" data-id="card-5">
            <div class="card-header-top">
                <span class="card-badge"><i class="fa-solid fa-microchip"></i> Hardware</span>
                <button class="bookmark-btn" title="Simpan ke Favorit" data-id="card-5"><i class="fa-regular fa-bookmark"></i></button>
            </div>
            <div class="card-icon-wrapper"><i class="fa-solid fa-computer"></i></div>
            <h3>Hardware & Subnetting IP</h3>
            <p>Perakitan unit komputer, spesifikasi komponen server, serta perhitungan Subnet Mask IPv4 (CIDR /24 - /30).</p>
            <div class="card-footer">
                <span class="category-tag"><i class="fa-solid fa-folder"></i> Hardware & IP</span>
                <button class="btn-detail-modal" data-index="5">Detail Materi <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    `;
    daftarLayanan.insertAdjacentHTML('beforeend', extraCardsHtml);

    const searchInput = document.getElementById('materiSearchInput');
    const filterPills = document.querySelectorAll('.filter-pill');
    let currentFilter = 'all';

    function filterCards() {
        const query = searchInput.value.toLowerCase().trim();
        const bookmarkedIds = JSON.parse(localStorage.getItem('tjkt_bookmarks') || '[]');

        document.querySelectorAll('.daftar-layanan .kartu').forEach(card => {
            const cardId = card.getAttribute('data-id');
            const category = card.getAttribute('data-category');
            const textContent = card.textContent.toLowerCase();

            const matchesQuery = textContent.includes(query);
            let matchesCategory = false;

            if (currentFilter === 'all') {
                matchesCategory = true;
            } else if (currentFilter === 'bookmarked') {
                matchesCategory = bookmarkedIds.includes(cardId);
            } else {
                matchesCategory = (category === currentFilter);
            }

            if (matchesQuery && matchesCategory) {
                card.style.display = 'flex';
                card.classList.add('card-fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterCards);

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter');
            filterCards();
        });
    });

    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    function updateBookmarkIcons() {
        const bookmarkedIds = JSON.parse(localStorage.getItem('tjkt_bookmarks') || '[]');
        bookmarkBtns.forEach(btn => {
            const cardId = btn.getAttribute('data-id');
            if (bookmarkedIds.includes(cardId)) {
                btn.innerHTML = '<i class="fa-solid fa-bookmark" style="color: #00f2fe;"></i>';
                btn.classList.add('active');
            } else {
                btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
                btn.classList.remove('active');
            }
        });
    }
    updateBookmarkIcons();

    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cardId = btn.getAttribute('data-id');
            let bookmarkedIds = JSON.parse(localStorage.getItem('tjkt_bookmarks') || '[]');

            if (bookmarkedIds.includes(cardId)) {
                bookmarkedIds = bookmarkedIds.filter(id => id !== cardId);
                showToast('Dihapus dari daftar favorit');
            } else {
                bookmarkedIds.push(cardId);
                showToast('Disimpan ke Favorit Belajar ⭐');
            }
            localStorage.setItem('tjkt_bookmarks', JSON.stringify(bookmarkedIds));
            updateBookmarkIcons();
            if (currentFilter === 'bookmarked') filterCards();
        });
    });

    const allDetailData = [
        ...extraCardData,
        {
            category: 'web',
            icon: 'fa-code',
            tag: 'Web Dev',
            detailTitle: 'Materi Pembelajaran Pemrograman Web (HTML, CSS & JS)',
            detailText: 'HTML (HyperText Markup Language) memberikan struktur fondasi halaman, CSS (Cascading Style Sheets) mengontrol tata letak, warna, dan responsivitas tampilan, sedangkan JavaScript menangani fungsi interaktif serta logika aplikasi web.'
        },
        {
            category: 'jaringan',
            icon: 'fa-shield-halved',
            tag: 'Keamanan Jaringan',
            detailTitle: 'Prinsip Keamanan Jaringan Komputer & Cyber Security',
            detailText: 'Aspek utama CIA Triad: Confidentiality (Kerahasiaan), Integrity (Keutuhan Data), dan Availability (Ketersediaan). Dilengkapi penggunaan IDS/IPS, enkripsi SSL/TLS, proteksi DDoS, serta audit reguler.'
        },
        {
            category: 'perangkat',
            icon: 'fa-computer',
            tag: 'Hardware & IP',
            detailTitle: 'Hardware Server, PC Desktop & Pengalamatan IPv4/IPv6',
            detailText: 'Memahami kelas IP Address (A, B, C, D, E), subnetting VLSM (Variable Length Subnet Mask), perhitungan Network Address, Broadcast Address, serta jumlah Host yang dapat digunakan dalam satu segmen.'
        }
    ];

    document.querySelectorAll('.btn-detail-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            const data = allDetailData[idx] || allDetailData[0];
            showModal(data.detailTitle, `
                <div class="modal-materi-content">
                    <div class="modal-icon-header">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <p class="modal-text-lead">${data.detailText}</p>
                    <div class="modal-materi-box">
                        <h4><i class="fa-solid fa-list-check"></i> Poin Kunci Pembelajaran:</h4>
                        <ul>
                            <li><strong>Prinsip Utama:</strong> Efisiensi, reliabilitas tinggi, dan keamanan data.</li>
                            <li><strong>Peralatan Utama:</strong> Switch Managed, Crimping Tool, Tester LAN, Routerboard.</li>
                            <li><strong>Langkah Praktikum:</strong> Pengupasan kabel, susunan standar T568B, testing ping & traceroute.</li>
                        </ul>
                    </div>
                </div>
            `);
        });
    });
}

/* ==========================================================================
   8. INTERACTIVE QUIZ MODULE
   ========================================================================== */
function initQuizModule() {
    const main = document.querySelector('main');
    const kontak = document.getElementById('kontak');
    if (!main || !kontak) return;

    const quizSectionHtml = `
        <section id="kuis" class="kuis-section">
            <div class="section-badge"><i class="fa-solid fa-graduation-cap"></i> Uji Pemahaman Anda</div>
            <h2><i class="fa-solid fa-brain"></i> Kuis Interaktif TJKT</h2>
            <p class="deskripsi-bagian">Jawab pertanyaan berikut untuk menguji pemahaman Anda seputar dunia Jaringan Komputer & Teknologi.</p>

            <div class="quiz-container">
                <div class="quiz-header">
                    <span class="quiz-progress-text" id="quizProgressText">Pertanyaan 1 dari 5</span>
                    <span class="quiz-score-badge" id="quizScoreBadge">Skor: 0</span>
                </div>
                
                <div class="quiz-card" id="quizCard">
                    <h3 class="quiz-question" id="quizQuestion">Memuat Pertanyaan...</h3>
                    <div class="quiz-options" id="quizOptions"></div>
                </div>

                <div class="quiz-navigation">
                    <button id="btnPrevQuiz" class="tombol-secondary" disabled><i class="fa-solid fa-arrow-left"></i> Sebelumnya</button>
                    <button id="btnNextQuiz" class="tombol">Berikutnya <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </section>
    `;

    kontak.insertAdjacentHTML('beforebegin', quizSectionHtml);

    const questions = [
        {
            q: "Apa urutan standar pewarnaan kabel UTP tipe T568B untuk membuat kabel Straight-Through?",
            options: [
                "Putih Orange - Orange - Putih Hijau - Biru - Putih Biru - Hijau - Putih Cokelat - Cokelat",
                "Putih Hijau - Hijau - Putih Orange - Biru - Putih Biru - Orange - Putih Cokelat - Cokelat",
                "Orange - Putih Orange - Biru - Putih Biru - Hijau - Putih Hijau - Cokelat - Putih Cokelat",
                "Putih Biru - Biru - Putih Orange - Orange - Putih Hijau - Hijau - Putih Cokelat - Cokelat"
            ],
            correct: 0,
            explain: "Standar T568B dimulai dari pin 1: Putih Orange, Orange, Putih Hijau, Biru, Putih Biru, Hijau, Putih Cokelat, Cokelat."
        },
        {
            q: "Manakah di bawah ini yang merupakan contoh IP Address Kelas C standar?",
            options: [
                "10.0.0.1",
                "172.16.0.1",
                "192.168.1.1",
                "224.0.0.1"
            ],
            correct: 2,
            explain: "IP Address Kelas C memiliki rentang oktet pertama 192 - 223, seperti 192.168.1.1."
        },
        {
            q: "Perangkat jaringan yang berfungsi menghubungkan dua atau lebih segmen IP jaringan yang berbeda adalah:",
            options: [
                "Switch Unmanaged",
                "Router",
                "Access Point",
                "Hub"
            ],
            correct: 1,
            explain: "Router bekerja pada Layer 3 (Network Layer) OSI model untuk mengarahkan rute paket antar segmen IP yang berbeda."
        },
        {
            q: "Berapakah jumlah Host ID yang dapat digunakan pada Subnet Mask /24 (255.255.255.0)?",
            options: [
                "256 Host",
                "254 Host",
                "512 Host",
                "128 Host"
            ],
            correct: 1,
            explain: "Total IP = 256. 1 IP untuk Network Address dan 1 IP untuk Broadcast Address, sehingga usable host = 254."
        },
        {
            q: "Tag HTML yang digunakan untuk menyambungkan file stylesheet CSS eksternal adalah:",
            options: [
                "<script src='style.css'>",
                "<style src='style.css'>",
                "<link rel='stylesheet' href='style.css'>",
                "<css href='style.css'>"
            ],
            correct: 2,
            explain: "Tag `<link rel='stylesheet' href='style.css'>` diletakkan dalam elemen `<head>` untuk memuat file CSS."
        }
    ];

    let currentIdx = 0;
    let userAnswers = new Array(questions.length).fill(null);

    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    const progressEl = document.getElementById('quizProgressText');
    const scoreEl = document.getElementById('quizScoreBadge');
    const btnPrev = document.getElementById('btnPrevQuiz');
    const btnNext = document.getElementById('btnNextQuiz');

    function renderQuestion() {
        const item = questions[currentIdx];
        questionEl.textContent = `${currentIdx + 1}. ${item.q}`;
        progressEl.textContent = `Pertanyaan ${currentIdx + 1} dari ${questions.length}`;

        optionsEl.innerHTML = '';
        item.options.forEach((optText, optIdx) => {
            const isSelected = userAnswers[currentIdx] === optIdx;
            const optBtn = document.createElement('div');
            optBtn.className = `quiz-option-card ${isSelected ? 'selected' : ''}`;
            optBtn.innerHTML = `
                <div class="option-indicator">${String.fromCharCode(65 + optIdx)}</div>
                <div class="option-text">${optText}</div>
            `;
            optBtn.addEventListener('click', () => {
                userAnswers[currentIdx] = optIdx;
                updateScore();
                renderQuestion();
            });
            optionsEl.appendChild(optBtn);
        });

        btnPrev.disabled = (currentIdx === 0);
        if (currentIdx === questions.length - 1) {
            btnNext.innerHTML = 'Selesaikan Kuis <i class="fa-solid fa-check-double"></i>';
        } else {
            btnNext.innerHTML = 'Berikutnya <i class="fa-solid fa-arrow-right"></i>';
        }
    }

    function updateScore() {
        let score = 0;
        userAnswers.forEach((ans, idx) => {
            if (ans === questions[idx].correct) score += 20;
        });
        scoreEl.textContent = `Skor: ${score} / 100`;
    }

    btnPrev.addEventListener('click', () => {
        if (currentIdx > 0) {
            currentIdx--;
            renderQuestion();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            renderQuestion();
        } else {
            let score = 0;
            userAnswers.forEach((ans, idx) => {
                if (ans === questions[idx].correct) score += 20;
            });

            let iconMsg = score >= 80 ? '🎉 luar biasa!' : '👍 Bagus, tingkatkan lagi!';
            showModal('Hasil Kuis Interaktif TJKT', `
                <div class="quiz-result-modal">
                    <div class="result-score-circle">
                        <span>${score}</span>
                        <small>/ 100</small>
                    </div>
                    <h3>${iconMsg}</h3>
                    <p>Anda telah menyelesaikan 5 pertanyaan kuis edukasi jaringan komputer.</p>
                    <button class="tombol" onclick="closeModal();">Tutup & Pelajari Lagi</button>
                </div>
            `);
        }
    });

    renderQuestion();
}

/* ==========================================================================
   9. INTERACTIVE MINI-GAME 1: IP ADDRESS CLASSIFIER
   ========================================================================== */
function initMiniGameModule() {
    const kuisSec = document.getElementById('kuis');
    if (!kuisSec) return;

    const gameSectionHtml = `
        <section id="game" class="game-section">
            <div class="section-badge"><i class="fa-solid fa-gamepad"></i> Mini Game Edukasi 1</div>
            <h2><i class="fa-solid fa-puzzle-piece"></i> Tantangan Klasifikasi IP Address</h2>
            <p class="deskripsi-bagian">Tentukan kelas dari IP Address berikut dengan memilih tombol Kelas A, B, atau C secara tepat!</p>

            <div class="game-box">
                <div class="game-header">
                    <span class="game-streak">Combo Streak: <strong id="gameStreak">0 🔥</strong></span>
                    <span class="game-score">Skor Game: <strong id="gameScore">0</strong></span>
                </div>

                <div class="game-target-card">
                    <small>Berapakah Kelas IP berikut?</small>
                    <h3 id="gameIpTarget">192.168.10.1</h3>
                </div>

                <div class="game-buttons-grid">
                    <button class="btn-game-choice" data-class="A">Kelas A (1 - 126)</button>
                    <button class="btn-game-choice" data-class="B">Kelas B (128 - 191)</button>
                    <button class="btn-game-choice" data-class="C">Kelas C (192 - 223)</button>
                </div>

                <div class="game-feedback" id="gameFeedback">Pilih salah satu tombol kelas di atas!</div>
            </div>
        </section>
    `;

    kuisSec.insertAdjacentHTML('afterend', gameSectionHtml);

    const ipTargets = [
        { ip: '192.168.1.100', class: 'C' },
        { ip: '10.200.5.1', class: 'A' },
        { ip: '172.16.50.4', class: 'B' },
        { ip: '200.100.10.5', class: 'C' },
        { ip: '12.0.0.254', class: 'A' },
        { ip: '172.31.255.1', class: 'B' }
    ];

    let currentIpIdx = 0;
    let score = 0;
    let streak = 0;

    const ipTargetEl = document.getElementById('gameIpTarget');
    const scoreEl = document.getElementById('gameScore');
    const streakEl = document.getElementById('gameStreak');
    const feedbackEl = document.getElementById('gameFeedback');
    const choiceBtns = document.querySelectorAll('.btn-game-choice');

    function nextGameTurn() {
        currentIpIdx = Math.floor(Math.random() * ipTargets.length);
        ipTargetEl.textContent = ipTargets[currentIpIdx].ip;
    }

    choiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const userChoice = btn.getAttribute('data-class');
            const targetClass = ipTargets[currentIpIdx].class;

            if (userChoice === targetClass) {
                score += 50 + (streak * 10);
                streak += 1;
                feedbackEl.className = 'game-feedback success';
                feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> TEPAT! IP ${ipTargets[currentIpIdx].ip} adalah Kelas ${targetClass}.`;
            } else {
                streak = 0;
                feedbackEl.className = 'game-feedback error';
                feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Kurang Tepat! IP ${ipTargets[currentIpIdx].ip} adalah Kelas ${targetClass}.`;
            }

            scoreEl.textContent = score;
            streakEl.textContent = `${streak} 🔥`;
            nextGameTurn();
        });
    });

    nextGameTurn();
}

/* ==========================================================================
   9B. INTERACTIVE MINI-GAME 2: SIMULASI CRIMPING KABEL UTP (T568B)
   ========================================================================== */
function initCableCrimpingGameModule() {
    const game1Sec = document.getElementById('game');
    if (!game1Sec) return;

    const cableGameHtml = `
        <section id="game-crimping" class="game-section">
            <div class="section-badge"><i class="fa-solid fa-screwdriver-wrench"></i> Mini Game Edukasi 2</div>
            <h2><i class="fa-solid fa-plug"></i> Simulasi Crimping Kabel UTP (Standar T568B)</h2>
            <p class="deskripsi-bagian">Klik warna kabel berikut sesuai urutan standar T568B dari pin 1 sampai pin 8 untuk menyusun kabel LAN yang tepat!</p>

            <div class="cable-game-box">
                <div class="cable-target-guide">
                    <strong>Standar T568B:</strong> 1. Putih Orange | 2. Orange | 3. Putih Hijau | 4. Biru | 5. Putih Biru | 6. Hijau | 7. Putih Cokelat | 8. Cokelat
                </div>

                <div class="rj45-connector-view">
                    <div class="rj45-pins-header">Konektor RJ-45 (Pin 1 - 8)</div>
                    <div class="rj45-slots" id="rj45Slots">
                        <div class="pin-slot" data-pin="1">Pin 1</div>
                        <div class="pin-slot" data-pin="2">Pin 2</div>
                        <div class="pin-slot" data-pin="3">Pin 3</div>
                        <div class="pin-slot" data-pin="4">Pin 4</div>
                        <div class="pin-slot" data-pin="5">Pin 5</div>
                        <div class="pin-slot" data-pin="6">Pin 6</div>
                        <div class="pin-slot" data-pin="7">Pin 7</div>
                        <div class="pin-slot" data-pin="8">Pin 8</div>
                    </div>
                </div>

                <div class="wire-palette">
                    <small>Pilih Urutan Warna Kabel UTP:</small>
                    <div class="wire-buttons-grid">
                        <button class="wire-btn wire-po" data-wire="Putih Orange">Putih Orange</button>
                        <button class="wire-btn wire-o" data-wire="Orange">Orange</button>
                        <button class="wire-btn wire-ph" data-wire="Putih Hijau">Putih Hijau</button>
                        <button class="wire-btn wire-b" data-wire="Biru">Biru</button>
                        <button class="wire-btn wire-pb" data-wire="Putih Biru">Putih Biru</button>
                        <button class="wire-btn wire-h" data-wire="Hijau">Hijau</button>
                        <button class="wire-btn wire-pc" data-wire="Putih Cokelat">Putih Cokelat</button>
                        <button class="wire-btn wire-c" data-wire="Cokelat">Cokelat</button>
                    </div>
                </div>

                <div class="cable-game-actions">
                    <button id="btnResetCrimping" class="tombol-secondary"><i class="fa-solid fa-rotate-left"></i> Reset Kabel</button>
                    <button id="btnTestCrimping" class="tombol"><i class="fa-solid fa-bolt"></i> Uji LAN Tester</button>
                </div>
                <div id="crimpingStatus" class="game-feedback">Klik warna kabel untuk mengisi Pin 1...</div>
            </div>
        </section>
    `;

    game1Sec.insertAdjacentHTML('afterend', cableGameHtml);

    const correctOrder = [
        "Putih Orange", "Orange", "Putih Hijau", "Biru",
        "Putih Biru", "Hijau", "Putih Cokelat", "Cokelat"
    ];

    let currentWireSelection = [];
    const wireBtns = document.querySelectorAll('.wire-btn');
    const slots = document.querySelectorAll('.pin-slot');
    const statusEl = document.getElementById('crimpingStatus');
    const btnReset = document.getElementById('btnResetCrimping');
    const btnTest = document.getElementById('btnTestCrimping');

    function updateSlotsDisplay() {
        slots.forEach((slot, idx) => {
            if (currentWireSelection[idx]) {
                slot.textContent = `${idx + 1}. ${currentWireSelection[idx]}`;
                slot.classList.add('filled');
            } else {
                slot.textContent = `Pin ${idx + 1}`;
                slot.classList.remove('filled');
            }
        });

        if (currentWireSelection.length < 8) {
            statusEl.className = 'game-feedback';
            statusEl.textContent = `Pilih warna untuk Pin ${currentWireSelection.length + 1}`;
        } else {
            statusEl.className = 'game-feedback success';
            statusEl.textContent = 'Semua pin terisi! Klik "Uji LAN Tester" untuk menguji koneksi.';
        }
    }

    wireBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentWireSelection.length < 8) {
                const wireName = btn.getAttribute('data-wire');
                currentWireSelection.push(wireName);
                updateSlotsDisplay();
            }
        });
    });

    btnReset.addEventListener('click', () => {
        currentWireSelection = [];
        updateSlotsDisplay();
        statusEl.className = 'game-feedback';
        statusEl.textContent = 'Kabel telah di-reset. Pilih warna untuk Pin 1...';
    });

    btnTest.addEventListener('click', () => {
        if (currentWireSelection.length < 8) {
            statusEl.className = 'game-feedback error';
            statusEl.textContent = 'Isi 8 pin secara lengkap terlebih dahulu!';
            return;
        }

        let isCorrect = true;
        for (let i = 0; i < 8; i++) {
            if (currentWireSelection[i] !== correctOrder[i]) {
                isCorrect = false;
                break;
            }
        }

        if (isCorrect) {
            statusEl.className = 'game-feedback success';
            statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> 🏆 HURA! LAN Tester Menyalakan 8 Lampu Hijau! Susunan T568B Sempurna!';
            showToast('Selamat! Praktikum Crimping Kabel T568B Berhasil 💯');
            triggerCuteConfetti();
        } else {
            statusEl.className = 'game-feedback error';
            statusEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> LAN Tester Gagal: Urutan kabel belum sesuai standar T568B. Tekan Reset & Coba Lagi!';
        }
    });

    updateSlotsDisplay();
}

/* ==========================================================================
   10. STUDENT QUICK NOTES PAD
   ========================================================================== */
function initNotesModule() {
    const game2Sec = document.getElementById('game-crimping');
    if (!game2Sec) return;

    const notesHtml = `
        <section class="notes-section">
            <div class="section-badge"><i class="fa-solid fa-pen-to-square"></i> Catatan Siswa</div>
            <h2><i class="fa-solid fa-note-sticky"></i> Catatan Belajar TJKT</h2>
            <p class="deskripsi-bagian">Simpan ringkasan rumus IP, perintah CLI router, atau catatan penting praktikum Anda di sini.</p>

            <div class="notes-container">
                <textarea id="studentNotesArea" placeholder="Tuliskan catatan Anda di sini... Catatan ini tersimpan otomatis di perangkat Anda!"></textarea>
                <div class="notes-actions">
                    <span id="notesSaveStatus"><i class="fa-solid fa-floppy-disk"></i> Tersimpan otomatis</span>
                    <button id="btnClearNotes" class="tombol-secondary"><i class="fa-solid fa-trash-can"></i> Hapus Catatan</button>
                </div>
            </div>
        </section>
    `;

    game2Sec.insertAdjacentHTML('afterend', notesHtml);

    const textarea = document.getElementById('studentNotesArea');
    const status = document.getElementById('notesSaveStatus');
    const btnClear = document.getElementById('btnClearNotes');

    const savedNotes = localStorage.getItem('tjkt_student_notes') || '';
    if (textarea) textarea.value = savedNotes;

    if (textarea) {
        textarea.addEventListener('input', () => {
            localStorage.setItem('tjkt_student_notes', textarea.value);
            status.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';
            setTimeout(() => {
                status.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Tersimpan di memori browser';
            }, 500);
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menghapus seluruh catatan?')) {
                textarea.value = '';
                localStorage.removeItem('tjkt_student_notes');
                status.innerHTML = '<i class="fa-solid fa-trash"></i> Catatan telah dibersihkan';
            }
        });
    }
}

/* ==========================================================================
   11. INTERACTIVE MOTIVATION BOOSTER (CUTE ANIMATIONS & MOTIVATIONAL QUOTES)
   ========================================================================== */
function initMotivationBoosterModule() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    // Add Magic Sparkles Button to Header Nav
    const motivLi = document.createElement('li');
    motivLi.innerHTML = `
        <button id="navMotivationBtn" class="nav-icon-btn glow-btn" title="Klik untuk Ambil Dosis Semangat! ✨">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
        </button>
    `;
    navUl.appendChild(motivLi);

    // Add Motivation Booster Banner to Hero Section
    const heroTeks = document.querySelector('.hero-teks');
    if (heroTeks) {
        const boosterBtnHtml = `
            <div class="motivation-hero-box">
                <button id="heroMotivationBtn" class="btn-motivation-hero">
                    <i class="fa-solid fa-fire-flame-curved"></i> Klik di Sini untuk Ambil Semangat Belajar! ✨
                </button>
            </div>
        `;
        heroTeks.insertAdjacentHTML('beforeend', boosterBtnHtml);
    }

    // Motivational Quotes & Cute Character Badges Database
    const motivationalQuotes = [
        {
            icon: "🚀",
            title: "Semangat Aulia & Pejuang TJKT!",
            quote: "Kabel UTP aja disusun rapi dengan penuh ketelitian, apalagi masa depanmu yang cerah di dunia teknologi!",
            author: "TJKT SMKN 2 Surakarta"
        },
        {
            icon: "💡",
            title: "Gagal PING Itu Biasa!",
            quote: "Gagal PING itu biasa, RTO (Request Timed Out) cuma sementara. Yang penting jangan pernah putus asa untuk terus berjuang!",
            author: "Generasi Emas TJKT"
        },
        {
            icon: "⚡",
            title: "Langkah Kecil Berdampak Besar!",
            quote: "Setiap baris kode HTML, CSS, dan konfigurasi Router yang kamu pelajari hari ini adalah tangga menuju impianmu!",
            author: "SMK Bisa TJKT Hebat"
        },
        {
            icon: "🎓",
            title: "Keahlian Masa Depan!",
            quote: "Kesalahan hari ini adalah tempat lahirnya keahlian hebatmu besok. Terus belajar, berkarya, dan jadilah yang terbaik!",
            author: "Inspirasi Belajar"
        },
        {
            icon: "🌟",
            title: "Semangat Tanpa Batas!",
            quote: "Jaringan internet bisa lambat, tapi semangat belajarmu harus selalu berkobar kencang melebihi kecepatan Fiber Optic!",
            author: "Aulia Hanifatul Ummah"
        },
        {
            icon: "🤖",
            title: "Fokus pada Proses!",
            quote: "Orang hebat tidak langsung jadi profesional. Mereka memulai dari langkah kecil, terus konsisten, dan pantang menyerah!",
            author: "Developer TJKT Smart Network"
        }
    ];

    function triggerMotivationPopup() {
        triggerCuteConfetti();
        const item = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        
        showModal(`✨ Pendorong Semangat TJKT! ${item.icon}`, `
            <div class="cute-motivation-modal">
                <div class="cute-mascot-anim">
                    <span class="mascot-emoji-pulse">${item.icon}</span>
                </div>
                <h3 class="cute-quote-title">${item.title}</h3>
                <blockquote class="cute-quote-body">"${item.quote}"</blockquote>
                <span class="cute-quote-author">~ ${item.author} ~</span>
                <div class="cute-modal-actions">
                    <button class="tombol" onclick="triggerAnotherQuote()"><i class="fa-solid fa-shuffle"></i> Acak Semangat Baru ✨</button>
                    <button class="tombol-secondary" onclick="closeModal()">Terima Kasih, Saya Siap Belajar! 🎓</button>
                </div>
            </div>
        `);
    }

    const navBtn = document.getElementById('navMotivationBtn');
    if (navBtn) navBtn.addEventListener('click', triggerMotivationPopup);

    const heroBtn = document.getElementById('heroMotivationBtn');
    if (heroBtn) heroBtn.addEventListener('click', triggerMotivationPopup);
}

// Global function to reshuffle quotes
window.triggerAnotherQuote = function() {
    triggerCuteConfetti();
    const motivationalQuotes = [
        { icon: "🚀", title: "Semangat Aulia & Pejuang TJKT!", quote: "Kabel UTP aja disusun rapi dengan penuh ketelitian, apalagi masa depanmu yang cerah di dunia teknologi!", author: "TJKT SMKN 2 Surakarta" },
        { icon: "💡", title: "Gagal PING Itu Biasa!", quote: "Gagal PING itu biasa, RTO (Request Timed Out) cuma sementara. Yang penting jangan pernah putus asa untuk terus berjuang!", author: "Generasi Emas TJKT" },
        { icon: "⚡", title: "Langkah Kecil Berdampak Besar!", quote: "Setiap baris kode HTML, CSS, dan konfigurasi Router yang kamu pelajari hari ini adalah tangga menuju impianmu!", author: "SMK Bisa TJKT Hebat" },
        { icon: "🎓", title: "Keahlian Masa Depan!", quote: "Kesalahan hari ini adalah tempat lahirnya keahlian hebatmu besok. Terus belajar, berkarya, dan jadilah yang terbaik!", author: "Inspirasi Belajar" },
        { icon: "🌟", title: "Semangat Tanpa Batas!", quote: "Jaringan internet bisa lambat, tapi semangat belajarmu harus selalu berkobar kencang melebihi kecepatan Fiber Optic!", author: "Aulia Hanifatul Ummah" }
    ];
    const item = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    const titleEl = document.querySelector('.custom-modal-header h3');
    const mascotEl = document.querySelector('.mascot-emoji-pulse');
    const quoteTitleEl = document.querySelector('.cute-quote-title');
    const quoteBodyEl = document.querySelector('.cute-quote-body');
    const authorEl = document.querySelector('.cute-quote-author');

    if (titleEl) titleEl.textContent = `✨ Pendorong Semangat TJKT! ${item.icon}`;
    if (mascotEl) mascotEl.textContent = item.icon;
    if (quoteTitleEl) quoteTitleEl.textContent = item.title;
    if (quoteBodyEl) quoteBodyEl.textContent = `"${item.quote}"`;
    if (authorEl) authorEl.textContent = `~ ${item.author} ~`;
};

/* Cute Floating Emoji / Confetti Particle Burst Animation */
function triggerCuteConfetti() {
    const emojis = ['✨', '🚀', '🌟', '💡', '🎓', '🎉', '⚡', '💻', '🔥'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'cute-confetti-particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 95 + 'vw';
        particle.style.top = (window.scrollY + Math.random() * 400 + 100) + 'px';
        particle.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.classList.add('fly-up');
            setTimeout(() => particle.remove(), 1200);
        }, 20);
    }
}

/* ==========================================================================
   12. INTERACTIVE IMAGE GALLERY MODAL
   ========================================================================== */
function initImageGalleryModal() {
    const heroGambar = document.querySelector('.hero-gambar img');
    if (heroGambar) {
        heroGambar.style.cursor = 'pointer';
        heroGambar.setAttribute('title', 'Klik untuk Perbesar Gambar');
        heroGambar.addEventListener('click', () => {
            showModal('Instalasi & Infrastruktur Jaringan TJKT', `
                <div class="gallery-modal-content">
                    <img src="${heroGambar.src}" alt="${heroGambar.alt}" class="modal-large-img">
                    <p class="modal-img-caption"><i class="fa-solid fa-camera"></i> Dokumentasi Praktikum & Instalasi Kabel Jaringan Komputer</p>
                    <div class="secondary-gallery-grid">
                        <img src="images/Telekomunikasi.jpg" alt="Telekomunikasi" class="gallery-thumb" onclick="swapModalImg(this.src)">
                        <img src="images/jaringan.jpg" alt="Jaringan" class="gallery-thumb" onclick="swapModalImg(this.src)">
                    </div>
                </div>
            `);
        });
    }
}

window.swapModalImg = function(src) {
    const largeImg = document.querySelector('.modal-large-img');
    if (largeImg) largeImg.src = src;
};

/* ==========================================================================
   13. UI UTILITIES: MODAL & TOAST NOTIFICATION
   ========================================================================== */
function showModal(title, bodyHtml) {
    closeModal();
    const modalHtml = `
        <div id="customModalOverlay" class="custom-modal-overlay">
            <div class="custom-modal-box">
                <div class="custom-modal-header">
                    <h3>${title}</h3>
                    <button class="custom-modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="custom-modal-body">
                    ${bodyHtml}
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    setTimeout(() => {
        const overlay = document.getElementById('customModalOverlay');
        if (overlay) overlay.classList.add('show');
    }, 10);
}

window.closeModal = function() {
    const overlay = document.getElementById('customModalOverlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }
};

function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function initWelcomeToast() {
    setTimeout(() => {
        showToast('Selamat Datang di TJKT Smart Network oleh Aulia Hanifatul Ummah! ✨');
    }, 500);
}
