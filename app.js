/* ==========================================================================
   TJKT SMART NETWORK - Aulia Hanifa
   Core Application Engine (app.js) - Updated with Fun Facts & Enhanced BGM Player
   ========================================================================== */

(function () {
  'use strict';

  // --- Initial App State ---
  window.AppState = {
    theme: localStorage.getItem('tjkt_theme') || 'light',
    currentPage: 'home',
    musicState: {
      playing: localStorage.getItem('tjkt_music_playing') === 'true',
      trackIdx: parseInt(localStorage.getItem('tjkt_music_track') || '0'),
      volume: parseFloat(localStorage.getItem('tjkt_music_vol') || '0.7'),
      currentTime: parseFloat(localStorage.getItem('tjkt_music_time') || '0')
    },
    user: JSON.parse(localStorage.getItem('tjkt_user')) || {
      name: 'Aulia Hanifa',
      xp: 150,
      level: 1,
      completedMateri: [],
      bookmarkedMateri: [],
      gamesPlayed: 0,
      quizScores: [],
      dailyClaimed: false
    }
  };

  // --- Fun Facts Database (12+ Unique TJKT Facts) ---
  window.FunFactsDatabase = [
    {
      id: 'ff1',
      title: '99% Internet Ditransmisikan Lewat Kabel Bawah Laut',
      category: 'fiber',
      icon: '🌊',
      text: 'Meskipun ada teknologi satelit canggih, 99% lalu lintas komunikasi data internet antar benua di seluruh bumi ditransmisikan melalui benang serat optik bawah laut sepanjang 1,3 juta kilometer!'
    },
    {
      id: 'ff2',
      title: 'Asal Usul Nama Wi-Fi Sebenarnya',
      category: 'sejarah',
      icon: '📡',
      text: 'Banyak orang mengira Wi-Fi adalah singkatan dari "Wireless Fidelity". Padahal, Wi-Fi hanyalah nama branding buatan firma Interbrand pada tahun 1999 untuk menggantikan nama teknis 802.11b Direct Sequence!'
    },
    {
      id: 'ff3',
      title: 'Jumlah Alamat IPv6 Mencapai 340 Undecillion',
      category: 'hardware',
      icon: '🔢',
      text: 'Alamat IPv6 memiliki panjang 128 bit yang menyediakan 3.4 x 10^38 (340 Undecillion) alamat IP unik. Jumlah ini cukup untuk memberikan alamat IP khusus pada setiap butir pasir yang ada di bumi!'
    },
    {
      id: 'ff4',
      title: 'Mengapa HTTP Menggunakan Port 80?',
      category: 'hardware',
      icon: '🌐',
      text: 'Penemu World Wide Web, Tim Berners-Lee, memilih Port 80 untuk protokol HTTP pada tahun 1991 karena saat itu nomor port 80 masih kosong dan belum terdaftar di registry IANA!'
    },
    {
      id: 'ff5',
      title: 'Batas Maksimal Panjang Kabel UTP 100 Meter',
      category: 'hardware',
      icon: '🔌',
      text: 'Kabel UTP Cat5e/Cat6 standar hanya mampu mentransmisikan sinyal data tanpa degradasi hingga jarak maksimal 100 meter. Lebih dari itu, dibutuhkan Repeater atau Switch untuk menguatkan sinyal.'
    },
    {
      id: 'ff6',
      title: 'Kecepatan Cahaya di Dalam Serat Optik',
      category: 'fiber',
      icon: '⚡',
      text: 'Gelombang cahaya di dalam kabel Fiber Optik merambat pada kecepatan ~200.000 km/detik. Kecepatan ini sekitar 31% lebih lambat dibanding ruang hampa karena pembiasan indeks kaca murni.'
    },
    {
      id: 'ff7',
      title: 'Router Pertama di Dunia Berukuran Lemari Es',
      category: 'sejarah',
      icon: '📟',
      text: 'Router pertama di dunia bernama IMP (Interface Message Processor) dikembangkan oleh BBN Technologies pada tahun 1969 untuk jaringan ARPANET dengan ukuran sebesar lemari es!'
    },
    {
      id: 'ff8',
      title: 'Peretasan Radio Pertama Dalam Sejarah (1903)',
      category: 'security',
      icon: '🔐',
      text: 'Peretasan nirkabel pertama terjadi pada tahun 1903 ketika fisikawan Nevil Maskelyne menyela demonstrasi telegraf nirkabel rahasia Guglielmo Marconi dengan memancarkan pesan kode Morse ejekan.'
    },
    {
      id: 'ff9',
      title: 'Perintah CLI "Ping" Terinspirasi dari Sonar',
      category: 'hardware',
      icon: '📶',
      text: 'Mike Muuss menciptakan perintah "ping" pada tahun 1983. Nama ini diambil dari imajinasi suara pulsa sonar kapal selam yang memantul dari target objek di kedalaman laut.'
    },
    {
      id: 'ff10',
      title: 'Kombinasi Warna Kabel UTP T568B',
      category: 'hardware',
      icon: '🎨',
      text: 'Urutan warna standar kabel UTP T568B dirancang secara presisi melilitkan pasangan kawat (twisted pair) untuk meminimalkan efek interferensi dan crosstalk elektromagnetik.'
    },
    {
      id: 'ff11',
      title: 'Arti Kata MikroTik Sebenarnya',
      category: 'sejarah',
      icon: '⚙️',
      text: 'Nama "MikroTik" berasal dari bahasa Latvia "Mikrotīkls" yang memiliki arti "Jaringan Kecil" (Small Network), didirikan di Riga, Latvia pada tahun 1996.'
    },
    {
      id: 'ff12',
      title: 'Server Web Pertama di Dunia Milik CERN',
      category: 'sejarah',
      icon: '🖥️',
      text: 'Komputer NeXT milik Tim Berners-Lee di CERN adalah server web pertama di dunia. Komputer tersebut ditemeni stiker merah bertuliskan: "Komputer ini adalah server. JANGAN DIMATIKAN!"'
    }
  ];

  // --- TJKT Learning Modules Database ---
  window.MateriDatabase = [
    {
      id: 'osi-layer',
      title: '1. Model OSI 7 Layer & TCP/IP',
      category: 'dasar',
      level: 'Pemula',
      readTime: '8 menit',
      summary: 'Konsep dasar komunikasi data melalui 7 lapisan OSI (Physical hingga Application) dan arsitektur protokol TCP/IP.',
      content: `
        <h4>Pengertian Model OSI 7 Layer</h4>
        <p>Open Systems Interconnection (OSI) adalah kerangka konseptual yang menstandarisasi fungsi sistem telekomunikasi atau komputasi tanpa memperhatikan struktur internal dan teknologinya.</p>
        
        <div class="materi-diagram">
          [Application] ➔ [Presentation] ➔ [Session] ➔ [Transport] ➔ [Network] ➔ [Data Link] ➔ [Physical]
        </div>

        <h4>Fungsi Masing-Masing Lapisan:</h4>
        <ul>
          <li><strong>Layer 7 - Application:</strong> Antarmuka antara pengguna dengan aplikasi (HTTP, FTP, SMTP, DNS).</li>
          <li><strong>Layer 6 - Presentation:</strong> Format data, enkripsi, dan kompresi (SSL/TLS, JPEG, ASCII).</li>
          <li><strong>Layer 5 - Session:</strong> Mengatur koneksi dan dialog antar komputer (RPC, NetBIOS).</li>
          <li><strong>Layer 4 - Transport:</strong> Pengiriman data end-to-end dengan kontrol alur (TCP, UDP).</li>
          <li><strong>Layer 3 - Network:</strong> Penentuan rute (routing) dan pengalamatan logika (IP Address, Router, ICMP).</li>
          <li><strong>Layer 2 - Data Link:</strong> Pengalamatan fisik (MAC Address, Switch Layer 2, Ethernet).</li>
          <li><strong>Layer 1 - Physical:</strong> Transmisi biner melalui media fisik (Kabel UTP, Fiber Optic, Hub).</li>
        </ul>
      `
    },
    {
      id: 'ip-subnetting',
      title: '2. Pengalamatan IP IPv4 & Subnetting',
      category: 'dasar',
      level: 'Menengah',
      readTime: '12 menit',
      summary: 'Teknik perhitungan subnet mask, VLSM, CIDR, pembagian IP Class A, B, C, serta penentuan Network & Broadcast Address.',
      content: `
        <h4>Struktur IPv4</h4>
        <p>IPv4 terdiri dari 32 bit biner yang dibagi menjadi 4 oktet (masing-masing 8 bit) dipisahkan oleh titik. Format penulisan: 192.168.1.1</p>

        <h4>Klasifikasi IP Address:</h4>
        <ul>
          <li><strong>Kelas A:</strong> 1.0.0.0 - 126.255.255.255 (Default Subnet /8)</li>
          <li><strong>Kelas B:</strong> 128.0.0.0 - 191.255.255.255 (Default Subnet /16)</li>
          <li><strong>Kelas C:</strong> 192.168.0.0 - 223.255.255.255 (Default Subnet /24)</li>
        </ul>

        <h4>Teknik Subnetting CIDR /24 hingga /30</h4>
        <p>Subnetting membagi satu jaringan besar menjadi beberapa sub-jaringan yang lebih kecil untuk efisiensi alokasi IP dan keamanan jaringan.</p>
        <div class="materi-diagram">
          IP: 192.168.1.0/26 <br>
          Subnet Mask: 255.255.255.192 <br>
          Jumlah IP Per Subnet: 64 IP (62 Host Usable + 1 Network + 1 Broadcast)
        </div>
      `
    },
    {
      id: 'routing-switching',
      title: '3. Routing Static & Dynamic (MikroTik/Cisco)',
      category: 'advanced',
      level: 'Mahir',
      readTime: '15 menit',
      summary: 'Prinsip kerja Router dan Switch, konfigurasi VLAN, Trunking 802.1Q, Static Route, OSPF, dan BGP.',
      content: `
        <h4>Switching & VLAN (Virtual Local Area Network)</h4>
        <p>VLAN memungkinkan pengelompokan port switch secara logis untuk mengisolasi traffic broadcast antar divisi tanpa memerlukan kabel fisik terpisah.</p>

        <h4>Routing Static vs Dynamic</h4>
        <ul>
          <li><strong>Static Routing:</strong> Pengisian tabel routing dilakukan secara manual oleh administrator. Lebih aman dan hemat CPU router.</li>
          <li><strong>Dynamic Routing (OSPF/RIP):</strong> Router saling bertukar tabel rute secara otomatis menggunakan protokol tertentu. Cocok untuk jaringan skala besar.</li>
        </ul>
      `
    },
    {
      id: 'fiber-optic',
      title: '4. Teknologi Kabel Fiber Optik & FTTH',
      category: 'hardware',
      level: 'Menengah',
      readTime: '10 menit',
      summary: 'Karakteristik Core, Cladding, Coating, jenis kabel Single Mode & Multi Mode, splicing jaringan FTTH.',
      content: `
        <h4>Struktur Fisik Fiber Optik</h4>
        <p>Fiber Optik mentransmisikan sinyal data dalam bentuk gelombang cahaya melalui serat kaca murni.</p>

        <h4>Komponen Utama Fiber Optik:</h4>
        <ul>
          <li><strong>Core (Inti):</strong> Bagian tengah terbuat dari kaca tempat ditempuhnya cahaya (diameter 9 µm / 50 µm).</li>
          <li><strong>Cladding (Selimut):</strong> Lapisan pembungkus core yang memantulkan cahaya kembali ke dalam core.</li>
          <li><strong>Coating (Pelindung):</strong> Lapisan plastik pelindung fleksibel luar.</li>
        </ul>

        <h4>Metode Splicing:</h4>
        <p>Menggunakan Fusion Splicer untuk menyambungkan dua ujung serat optik dengan pemanasan busur listrik presisi tinggi.</p>
      `
    },
    {
      id: 'network-security',
      title: '5. Keamanan Jaringan & Firewall',
      category: 'advanced',
      level: 'Mahir',
      readTime: '10 menit',
      summary: 'Pengamanan port, NAT, Port Forwarding, IPS/IDS, serta pencegahan serangan DDoS & ARP Spoofing.',
      content: `
        <h4>Prinsip Keamanan Jaringan (CIA Triad)</h4>
        <ul>
          <li><strong>Confidentiality (Kerahasiaan):</strong> Data hanya dapat diakses oleh pihak yang berwenang (Enkripsi).</li>
          <li><strong>Integrity (Keutuhan):</strong> Data terjamin tidak diubah oleh pihak tak dikenal (Hashing MD5/SHA256).</li>
          <li><strong>Availability (Ketersediaan):</strong> Layanan selalu siap diakses saat dibutuhkan.</li>
        </ul>
      `
    },
    {
      id: 'server-services',
      title: '6. Layanan Server Linux & MikroTik',
      category: 'advanced',
      level: 'Mahir',
      readTime: '12 menit',
      summary: 'Konfigurasi DHCP Server, DNS Resolver, Web Server Nginx/Apache, FTP, dan Hotspot Gateway.',
      content: `
        <h4>DHCP Server (Dynamic Host Configuration Protocol)</h4>
        <p>Layanan yang memberikan pengalamatan IP, Gateway, dan DNS secara otomatis kepada perangkat client yang terhubung.</p>

        <h4>Langkah Proses DORA DHCP:</h4>
        <ul>
          <li><strong>Discover:</strong> Client mengirim broadcast mencari DHCP Server.</li>
          <li><strong>Offer:</strong> Server menawarkan alokasi IP ke Client.</li>
          <li><strong>Request:</strong> Client meminta penyewaan IP tersebut.</li>
          <li><strong>Acknowledge:</strong> Server mengonfirmasi dan menyewakan IP.</li>
        </ul>
      `
    },
    {
      id: 'wireless-net',
      title: '7. Jaringan Nirkabel (Wireless 802.11)',
      category: 'hardware',
      level: 'Pemula',
      readTime: '8 menit',
      summary: 'Standar Wi-Fi 802.11a/b/g/n/ac/ax, kanal frekuensi 2.4 GHz vs 5 GHz, dan teknik enkripsi WPA3.',
      content: `
        <h4>Frekuensi Wireless: 2.4 GHz vs 5 GHz</h4>
        <ul>
          <li><strong>2.4 GHz:</strong> Jangkauan sinyal lebih jauh & mampu menembus dinding tebal, namun rawan interferensi.</li>
          <li><strong>5 GHz:</strong> Kecepatan data jauh lebih tinggi & sedikit interferensi, namun jangkauan lebih pendek.</li>
        </ul>
      `
    },
    {
      id: 'troubleshooting',
      title: '8. Troubleshooting & Diagnostics Jaringan',
      category: 'dasar',
      level: 'Menengah',
      readTime: '10 menit',
      summary: 'Teknik analisa masalah jaringan menggunakan perintah ping, traceroute, nslookup, netstat, dan Wireshark.',
      content: `
        <h4>Perintah CLI Diagnostik Utama:</h4>
        <ul>
          <li><code>ping [ip_address]</code> : Menguji konektivitas icmp paket & latency.</li>
          <li><code>traceroute / tracert</code> : Melacak hop router yang dilalui paket menuju server tujuan.</li>
          <li><code>nslookup [domain]</code> : Memeriksa ketersediaan catatan DNS server.</li>
        </ul>
      `
    }
  ];


  // --- BGM Music Playlist Engine ---
  window.MusicPlaylist = [
    { name: 'Lo-Fi Study Beat (Ambient Chill)', src: 'assets/audio/track1.wav', icon: '🎵' },
    { name: 'Cyber Network Synth (Futuristic)', src: 'assets/audio/track2.wav', icon: '⚡' },
    { name: 'Acoustic Focus Harmony (Melodic)', src: 'assets/audio/track3.wav', icon: '🎸' }
  ];

  let audioEl = null;

  function initMusicPlayer() {
    audioEl = document.getElementById('bgm-player');
    if (!audioEl) return;

    // Load initial settings
    const track = window.MusicPlaylist[AppState.musicState.trackIdx] || window.MusicPlaylist[0];
    audioEl.src = track.src;
    audioEl.volume = AppState.musicState.volume;

    if (AppState.musicState.currentTime > 0) {
      try { audioEl.currentTime = AppState.musicState.currentTime; } catch (e) {}
    }

    // UI Updates
    updateMusicUI();

    // Event listeners
    audioEl.addEventListener('timeupdate', () => {
      AppState.musicState.currentTime = audioEl.currentTime;
      localStorage.setItem('tjkt_music_time', audioEl.currentTime.toString());
    });

    audioEl.addEventListener('error', (e) => {
      console.warn('Audio element error loading file:', e);
      window.showToast('⚠️ Gagal memuat file audio fisik, beralih ke Mode Synthesizer Web Audio!', 'danger');
    });

    // Auto Unlock on User Interaction
    const unlockAudio = () => {
      if (AppState.musicState.playing && audioEl.paused) {
        audioEl.play().catch(err => console.log('Autoplay unlock error:', err));
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
  }

  window.toggleMusicPlay = function () {
    if (!audioEl) return;

    if (audioEl.paused) {
      audioEl.play().then(() => {
        AppState.musicState.playing = true;
        localStorage.setItem('tjkt_music_playing', 'true');
        updateMusicUI();
        window.showToast(`▶️ Memutar: ${window.MusicPlaylist[AppState.musicState.trackIdx].name}`, 'success');
      }).catch(err => {
        console.log('Play error:', err);
        window.showToast('Gagal memutar audio. Klik halaman untuk mengaktifkan izin audio.', 'danger');
      });
    } else {
      audioEl.pause();
      AppState.musicState.playing = false;
      localStorage.setItem('tjkt_music_playing', 'false');
      updateMusicUI();
      window.showToast('⏸️ Musik Di-pause', 'info');
    }
  };

  window.changeMusicTrack = function (index) {
    if (!audioEl) return;
    const idx = parseInt(index);
    if (idx < 0 || idx >= window.MusicPlaylist.length) return;

    AppState.musicState.trackIdx = idx;
    AppState.musicState.currentTime = 0;
    localStorage.setItem('tjkt_music_track', idx.toString());
    localStorage.setItem('tjkt_music_time', '0');

    const track = window.MusicPlaylist[idx];
    audioEl.src = track.src;
    audioEl.currentTime = 0;

    if (AppState.musicState.playing) {
      audioEl.play().catch(e => console.log(e));
    }

    updateMusicUI();
    window.showToast(`🎶 Lagu diganti ke: ${track.name}`, 'info');
  };

  window.setMusicVolume = function (vol) {
    const val = parseFloat(vol);
    AppState.musicState.volume = val;
    localStorage.setItem('tjkt_music_vol', val.toString());
    if (audioEl) audioEl.volume = val;
    updateMusicUI();
  };

  function updateMusicUI() {
    const playBtn = document.getElementById('music-play-btn');
    const playIcon = document.getElementById('music-play-icon');
    const volSlider = document.getElementById('music-volume-slider');
    const volPct = document.getElementById('music-vol-pct');
    const volIcon = document.getElementById('music-vol-icon');
    const playlistSelect = document.getElementById('music-playlist-select');

    const isPlaying = audioEl && !audioEl.paused;

    if (playBtn && playIcon) {
      if (isPlaying) {
        playBtn.classList.add('playing');
        playIcon.innerText = '⏸️';
      } else {
        playBtn.classList.remove('playing');
        playIcon.innerText = '▶️';
      }
    }

    if (volSlider) volSlider.value = AppState.musicState.volume;
    if (volPct) volPct.innerText = `${Math.round(AppState.musicState.volume * 100)}%`;

    if (volIcon) {
      const v = AppState.musicState.volume;
      if (v === 0) volIcon.innerText = '🔇';
      else if (v < 0.4) volIcon.innerText = '🔈';
      else if (v < 0.7) volIcon.innerText = '🔉';
      else volIcon.innerText = '🔊';
    }

    if (playlistSelect) playlistSelect.value = AppState.musicState.trackIdx;
  }


  // --- Web Audio API Synthesizer (SFX Effects) ---
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;

  function initAudioSFX() {
    if (!audioContext) audioContext = new AudioCtx();
  }

  window.playSound = function (type) {
    try {
      initAudioSFX();
      if (!audioContext) return;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);

      const now = audioContext.currentTime;

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const subOsc = audioContext.createOscillator();
          const subGain = audioContext.createGain();
          subOsc.type = 'triangle';
          subOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
          subGain.gain.setValueAtTime(0.2, now + idx * 0.08);
          subGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
          subOsc.connect(subGain);
          subGain.connect(audioContext.destination);
          subOsc.start(now + idx * 0.08);
          subOsc.stop(now + idx * 0.08 + 0.2);
        });
      } else if (type === 'wheel') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      console.log('SFX error:', e);
    }
  };


  // --- Toast Notifications Engine ---
  window.showToast = function (msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-30px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };


  // --- Theme Switcher Engine ---
  function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    AppState.theme = themeName;
    localStorage.setItem('tjkt_theme', themeName);

    document.querySelectorAll('.theme-opt').forEach(opt => {
      if (opt.getAttribute('data-theme') === themeName) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    window.showToast(`Tema diganti ke ${themeName.toUpperCase()} Mode! ✨`);
  }


  // --- Router & Page Switching Engine ---
  function navigateTo(pageId) {
    const pages = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.nav-item');

    pages.forEach(p => p.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.classList.add('active');
      AppState.currentPage = pageId;

      const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
      if (activeNav) activeNav.classList.add('active');

      const titles = {
        home: 'Beranda Utama',
        materi: 'Modul Pembelajaran TJKT',
        funfacts: '💡 Fun Facts TJKT',
        games: 'Game Edukasi (9 Games)',
        kuis: 'Kuis & Sertifikasi TJKT',
        leaderboard: 'Papan Peringkat (Leaderboard)',
        sertifikat: 'Sertifikat Kelulusan',
        tentang: 'Tentang Aplikasi',
        kontak: 'Pusat Bantuan & Kontak'
      };
      document.getElementById('current-page-title').innerText = titles[pageId] || 'TJKT Smart';

      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (pageId === 'sertifikat') {
        renderCertificateCanvas();
      } else if (pageId === 'leaderboard') {
        renderLeaderboardTable();
      } else if (pageId === 'funfacts') {
        renderFunFactsSection();
      }
    }
  }


  // --- Save & Update User State ---
  window.saveState = function () {
    localStorage.setItem('tjkt_user', JSON.stringify(AppState.user));
    updateUserUI();
  };

  window.addXP = function (amount) {
    AppState.user.xp += amount;
    const newLevel = Math.floor(AppState.user.xp / 300) + 1;
    if (newLevel > AppState.user.level) {
      AppState.user.level = newLevel;
      window.playSound('win');
      window.triggerConfetti();
      window.showToast(`🎉 LEVEL UP! Kamu naik ke Level ${newLevel}!`, 'success');
    } else {
      window.showToast(`+${amount} XP Berhasil didapatkan! ⭐`);
    }
    saveState();
  };

  function updateUserUI() {
    document.getElementById('user-xp-counter').innerText = `${AppState.user.xp} XP`;
    document.getElementById('user-display-name').innerText = AppState.user.name || 'Siswa SMK';
    document.getElementById('user-level-badge').innerText = `Level ${AppState.user.level} - ${getLevelTitle(AppState.user.level)}`;

    const totalMateri = MateriDatabase.length;
    const completedCount = AppState.user.completedMateri.length;
    const pct = Math.round((completedCount / totalMateri) * 100);

    const statPct = document.getElementById('stat-progress-pct');
    if (statPct) statPct.innerText = `${pct}%`;

    const statDone = document.getElementById('stat-completed-materi');
    if (statDone) statDone.innerText = `${completedCount} / ${totalMateri}`;

    const statGames = document.getElementById('stat-games-played');
    if (statGames) statGames.innerText = AppState.user.gamesPlayed;

    const statQuiz = document.getElementById('stat-quiz-avg');
    if (statQuiz) {
      if (AppState.user.quizScores.length > 0) {
        const sum = AppState.user.quizScores.reduce((a, b) => a + b, 0);
        const avg = Math.round(sum / AppState.user.quizScores.length);
        statQuiz.innerText = `${avg}`;
      } else {
        statQuiz.innerText = '0';
      }
    }
  }

  function getLevelTitle(level) {
    if (level === 1) return 'Pemula Jaringan';
    if (level === 2) return 'Technician Jr.';
    if (level === 3) return 'Network Specialist';
    if (level === 4) return 'MikroTik Expert';
    return 'Master TJKT';
  }


  // --- Render Fun Facts Section ---
  let currentSpotlightIdx = 0;

  function renderFunFactsSection(filter = 'all') {
    const container = document.getElementById('funfacts-grid-container');
    if (!container) return;

    let filtered = window.FunFactsDatabase;
    if (filter !== 'all') {
      filtered = filtered.filter(f => f.category === filter);
    }

    container.innerHTML = filtered.map(f => `
      <div class="card funfact-card ripple">
        <div>
          <div class="funfact-icon-badge">${f.icon}</div>
          <h3>${f.title}</h3>
          <p>${f.text}</p>
        </div>
        <div>
          <span class="badge badge-primary">${f.category.toUpperCase()}</span>
        </div>
      </div>
    `).join('');
  }

  function renderRandomSpotlightFact() {
    const card = document.getElementById('funfact-spotlight-card');
    if (!card) return;

    // Pick random fact
    currentSpotlightIdx = Math.floor(Math.random() * window.FunFactsDatabase.length);
    const fact = window.FunFactsDatabase[currentSpotlightIdx];

    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';

    setTimeout(() => {
      document.getElementById('spotlight-icon').innerText = fact.icon;
      document.getElementById('spotlight-title').innerText = fact.title;
      document.getElementById('spotlight-text').innerText = fact.text;
      document.getElementById('spotlight-category-badge').innerText = `💡 ${fact.category.toUpperCase()} FACT`;

      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      window.playSound('correct');
    }, 200);
  }


  // --- Render Materi Cards ---
  window.renderMateriCards = function (filter = 'all', searchTerm = '') {
    const container = document.getElementById('materi-grid-container');
    const homeContainer = document.getElementById('home-featured-materi');
    if (!container) return;

    let filtered = MateriDatabase;

    if (filter === 'bookmarked') {
      filtered = filtered.filter(m => AppState.user.bookmarkedMateri.includes(m.id));
    } else if (filter !== 'all') {
      filtered = filtered.filter(m => m.category === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    container.innerHTML = filtered.map(m => {
      const isDone = AppState.user.completedMateri.includes(m.id);
      const isBookmarked = AppState.user.bookmarkedMateri.includes(m.id);

      return `
        <div class="card materi-card">
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="window.toggleBookmark('${m.id}')">
            ${isBookmarked ? '⭐' : '☆'}
          </button>
          <div>
            <div class="materi-icon">📖</div>
            <h3>${m.title}</h3>
            <p>${m.summary}</p>
          </div>
          <div>
            <div class="materi-meta">
              <span>⏱️ ${m.readTime}</span>
              <span class="badge ${isDone ? 'badge-success' : 'badge-primary'}">${isDone ? '✓ Selesai' : m.level}</span>
            </div>
            <button class="btn btn-secondary ripple" style="width:100%; margin-top:14px;" onclick="window.openMateriModal('${m.id}')">
              Baca Selengkapnya
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (homeContainer) {
      homeContainer.innerHTML = MateriDatabase.slice(0, 3).map(m => `
        <div class="card card-interactive ripple" onclick="window.openMateriModal('${m.id}')">
          <div class="materi-icon">🌐</div>
          <h3>${m.title}</h3>
          <p>${m.summary}</p>
          <span class="badge badge-primary">Baca Modul ➔</span>
        </div>
      `).join('');
    }
  };

  window.toggleBookmark = function (id) {
    const idx = AppState.user.bookmarkedMateri.indexOf(id);
    if (idx > -1) {
      AppState.user.bookmarkedMateri.splice(idx, 1);
      window.showToast('Materi dihapus dari favorit');
    } else {
      AppState.user.bookmarkedMateri.push(id);
      window.showToast('⭐ Materi ditambahkan ke favorit!');
    }
    saveState();
    renderMateriCards();
  };

  let activeMateriId = null;
  window.openMateriModal = function (id) {
    const m = MateriDatabase.find(item => item.id === id);
    if (!m) return;
    activeMateriId = id;

    document.getElementById('modal-materi-title').innerText = m.title;
    document.getElementById('modal-materi-body').innerHTML = m.content;
    document.getElementById('materi-modal').classList.add('open');

    const finishBtn = document.getElementById('finish-materi-btn');
    if (AppState.user.completedMateri.includes(id)) {
      finishBtn.innerText = '✓ Sudah Selesai';
      finishBtn.disabled = true;
    } else {
      finishBtn.innerText = 'Tandai Selesai & Klaim XP (+50 XP)';
      finishBtn.disabled = false;
    }
  };

  document.getElementById('close-materi-modal')?.addEventListener('click', () => {
    document.getElementById('materi-modal').classList.remove('open');
  });

  document.getElementById('finish-materi-btn')?.addEventListener('click', () => {
    if (activeMateriId && !AppState.user.completedMateri.includes(activeMateriId)) {
      AppState.user.completedMateri.push(activeMateriId);
      window.addXP(50);
      document.getElementById('materi-modal').classList.remove('open');
      renderMateriCards();
    }
  });


  // --- Leaderboard Table Renderer ---
  function renderLeaderboardTable() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    const mockData = [
      { name: AppState.user.name + ' (Anda)', level: AppState.user.level, games: AppState.user.gamesPlayed, xp: AppState.user.xp },
      { name: 'Rizky Pratama', level: 5, games: 24, xp: 1450 },
      { name: 'Siti Aminah', level: 4, games: 19, xp: 1200 },
      { name: 'Budi Santoso', level: 4, games: 16, xp: 980 },
      { name: 'Dewi Lestari', level: 3, games: 12, xp: 750 }
    ].sort((a, b) => b.xp - a.xp);

    tbody.innerHTML = mockData.map((item, idx) => `
      <tr class="leaderboard-row">
        <td>
          <div class="rank-badge rank-${idx + 1}">${idx + 1}</div>
        </td>
        <td style="font-weight:700;">${item.name}</td>
        <td><span class="badge badge-primary">Lvl ${item.level}</span></td>
        <td>${item.games} Game</td>
        <td style="font-weight:800; color:var(--primary);">${item.xp} XP</td>
      </tr>
    `).join('');
  }


  // --- Canvas Certificate Generator ---
  function renderCertificateCanvas() {
    const canvas = document.getElementById('cert-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const nameInput = document.getElementById('cert-name-input');
    const studentName = (nameInput ? nameInput.value : AppState.user.name) || 'Aulia Hanifa';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 36px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SERTIFIKAT KELULUSAN KOMPETENSI', canvas.width / 2, 110);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('TJKT SMART NETWORK - SMK TEKNIK JARINGAN KOMPUTER & TELEKOMUNIKASI', canvas.width / 2, 145);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 175);
    ctx.lineTo(850, 175);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Diberikan kepada:', canvas.width / 2, 230);

    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 44px "Outfit", sans-serif';
    ctx.fillText(studentName.toUpperCase(), canvas.width / 2, 300);

    ctx.fillStyle = '#0f172a';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Atas keberhasilan menyelesaikan seluruh modul pembelajaran, kuis evaluasi,', canvas.width / 2, 360);
    ctx.fillText('dan tantangan simulator 9 Game Edukasi dengan hasil Sangat Memuaskan.', canvas.width / 2, 395);

    const today = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Tanggal Terbit: ${today} | ID Sertifikat: TJKT-SMART-${Math.floor(100000 + Math.random() * 900000)}`, canvas.width / 2, 450);

    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(200, 560, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Outfit", sans-serif';
    ctx.fillText('TJKT', 200, 565);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.fillText('Aulia Hanifa', 750, 560);
    ctx.fillStyle = '#64748b';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Pengembang & Instructor TJKT', 750, 585);
  }


  // --- Confetti Engine ---
  window.triggerConfetti = function () {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#38bdf8', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 4,
        d: Math.random() * 120,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        if (p.y > canvas.height) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngleIncremental: p.tiltAngleIncremental,
            tiltAngle: p.tiltAngle
          };
        }
      });
    }

    let count = 0;
    function loop() {
      draw();
      count++;
      if (count < 180) {
        requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    loop();
  };


  // --- Event Listeners Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen
    const splash = document.getElementById('splash-screen');
    const splashBar = document.getElementById('splash-progress');
    let progress = 0;

    const splashInterval = setInterval(() => {
      progress += 25;
      if (splashBar) splashBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(splashInterval);
        setTimeout(() => {
          if (splash) splash.classList.add('fade-out');
        }, 300);
      }
    }, 150);

    // 2. Initialize Theme
    setTheme(AppState.theme);

    // 3. Initialize Music Player Engine
    initMusicPlayer();

    // 4. Music Widget Controls
    const playBtn = document.getElementById('music-play-btn');
    const settingsBtn = document.getElementById('music-settings-btn');
    const musicWidget = document.getElementById('music-widget');
    const volSlider = document.getElementById('music-volume-slider');
    const playlistSelect = document.getElementById('music-playlist-select');

    playBtn?.addEventListener('click', window.toggleMusicPlay);

    settingsBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      musicWidget?.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      musicWidget?.classList.remove('open');
    });

    volSlider?.addEventListener('input', (e) => {
      window.setMusicVolume(e.target.value);
    });

    playlistSelect?.addEventListener('change', (e) => {
      window.changeMusicTrack(e.target.value);
    });

    // 5. Theme Dropdown
    const themeBtn = document.getElementById('theme-btn');
    const themeDropdown = document.getElementById('theme-dropdown');

    themeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      themeDropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      themeDropdown?.classList.remove('open');
    });

    document.querySelectorAll('.theme-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        setTheme(opt.getAttribute('data-theme'));
        themeDropdown.classList.remove('open');
      });
    });

    // 6. Navigation Triggers
    document.querySelectorAll('[data-page], .nav-trigger').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        if (page) navigateTo(page);
        document.getElementById('sidebar')?.classList.remove('mobile-open');
      });
    });

    document.getElementById('mobile-toggle')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('mobile-open');
    });

    // 7. Fullscreen Toggle
    document.getElementById('fullscreen-toggle')?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
        window.showToast('🖥️ Mode Layar Penuh Aktif');
      } else {
        document.exitFullscreen();
        window.showToast('Mode Normal');
      }
    });

    // 8. Fun Facts Listeners
    document.getElementById('next-random-fact-btn')?.addEventListener('click', renderRandomSpotlightFact);

    document.querySelectorAll('#funfact-filter-group .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#funfact-filter-group .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFunFactsSection(btn.getAttribute('data-fact-filter'));
      });
    });

    // 9. Search & Filter Materi Listener
    const searchInput = document.getElementById('materi-search-input');
    searchInput?.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('#materi-filter-group .filter-btn.active');
      const filter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      renderMateriCards(filter, e.target.value);
    });

    document.querySelectorAll('#materi-filter-group .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#materi-filter-group .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const query = searchInput ? searchInput.value : '';
        renderMateriCards(btn.getAttribute('data-filter'), query);
      });
    });

    // 10. Daily Challenge Claim
    document.getElementById('claim-daily-btn')?.addEventListener('click', () => {
      if (!AppState.user.dailyClaimed) {
        AppState.user.dailyClaimed = true;
        window.addXP(100);
        document.getElementById('claim-daily-btn').innerText = '✓ Telah Diklaim';
        document.getElementById('claim-daily-btn').disabled = true;
      }
    });

    // 11. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn?.classList.add('visible');
      } else {
        backToTopBtn?.classList.remove('visible');
      }
    });
    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 12. FAQ Accordion Listener
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        q.parentElement.classList.toggle('open');
      });
    });

    // 13. Certificate Canvas Input & Downloads
    const certInput = document.getElementById('cert-name-input');
    certInput?.addEventListener('input', renderCertificateCanvas);

    document.getElementById('download-cert-btn')?.addEventListener('click', () => {
      const canvas = document.getElementById('cert-canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `Sertifikat-TJKT-${AppState.user.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      window.showToast('📥 Sertifikat berhasil diunduh!', 'success');
    });

    document.getElementById('print-cert-btn')?.addEventListener('click', () => {
      window.print();
    });

    // 14. Contact Form
    window.handleContactSubmit = function () {
      window.showToast('✉️ Terima kasih! Pesan Anda telah terkirim ke Aulia Hanifa.', 'success');
      document.getElementById('contact-form')?.reset();
    };

    // Initial Renders
    renderMateriCards();
    renderFunFactsSection();
    updateUserUI();
  });

})();
