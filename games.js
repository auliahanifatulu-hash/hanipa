/* ==========================================================================
   TJKT SMART NETWORK - Aulia Hanifa
   9 Educational Games Suite Engine (games.js)
   Tebak Gambar, Memory Card, Drag&Drop, Puzzle, Susun Kata, Benar/Salah,
   Timed Quiz, Roda Keberuntungan & Escape Room Terminal Simulator
   ========================================================================== */

(function () {
  'use strict';

  // --- Active Game Session State ---
  let currentSession = {
    gameId: null,
    score: 0,
    lives: 3,
    stars: 3,
    timer: 60,
    timerInterval: null
  };

  function updateGameStatsUI() {
    const scoreEl = document.getElementById('game-score-display');
    const timerEl = document.getElementById('game-timer-display');
    const livesEl = document.getElementById('game-lives-display');
    const starsEl = document.getElementById('game-stars-display');

    if (scoreEl) scoreEl.innerText = currentSession.score;
    if (timerEl) timerEl.innerText = `${currentSession.timer}s`;
    if (livesEl) livesEl.innerText = '❤️'.repeat(Math.max(0, currentSession.lives));
    if (starsEl) starsEl.innerText = currentSession.stars;
  }

  function startTimer(duration, onTick, onComplete) {
    if (currentSession.timerInterval) clearInterval(currentSession.timerInterval);
    currentSession.timer = duration;
    updateGameStatsUI();

    currentSession.timerInterval = setInterval(() => {
      currentSession.timer--;
      updateGameStatsUI();
      if (onTick) onTick(currentSession.timer);

      if (currentSession.timer <= 0) {
        clearInterval(currentSession.timerInterval);
        if (onComplete) onComplete();
      }
    }, 1000);
  }

  function openGameOverlay(title) {
    const area = document.getElementById('game-play-area');
    document.getElementById('active-game-title').innerText = title;
    area.classList.add('active');
  }

  function endGameSession(isWin, bonusXP = 100) {
    if (currentSession.timerInterval) clearInterval(currentSession.timerInterval);

    // Track total games played
    AppState.user.gamesPlayed++;
    saveState();

    const stage = document.getElementById('game-stage-content');
    if (isWin) {
      window.playSound('win');
      window.triggerConfetti();
      window.addXP(bonusXP);

      stage.innerHTML = `
        <div style="text-align:center; padding:32px;" class="card anim-zoom">
          <div style="font-size:4rem; margin-bottom:16px;">🏆</div>
          <h2 style="font-size:2rem; color:var(--success); margin-bottom:8px;">KEMENANGAN LUAR BIASA!</h2>
          <p style="color:var(--text-muted); margin-bottom:20px;">Kamu berhasil menyelesaikan game dengan Skor: <strong>${currentSession.score}</strong>!</p>
          <div style="display:flex; justify-content:center; gap:16px;">
            <button class="btn btn-primary ripple" onclick="window.relaunchGame()">Main Lagi</button>
            <button class="btn btn-secondary ripple" onclick="window.closeGameArea()">Keluar Ke Hub</button>
          </div>
        </div>
      `;
    } else {
      window.playSound('wrong');
      stage.innerHTML = `
        <div style="text-align:center; padding:32px;" class="card anim-zoom">
          <div style="font-size:4rem; margin-bottom:16px;">💀</div>
          <h2 style="font-size:2rem; color:var(--danger); margin-bottom:8px;">GAME OVER</h2>
          <p style="color:var(--text-muted); margin-bottom:20px;">Jangan menyerah! Pelajari materi dan coba lagi.</p>
          <div style="display:flex; justify-content:center; gap:16px;">
            <button class="btn btn-primary ripple" onclick="window.relaunchGame()">Coba Lagi</button>
            <button class="btn btn-secondary ripple" onclick="window.closeGameArea()">Keluar Ke Hub</button>
          </div>
        </div>
      `;
    }
  }

  window.closeGameArea = function () {
    if (currentSession.timerInterval) clearInterval(currentSession.timerInterval);
    document.getElementById('game-play-area').classList.remove('active');
  };

  window.relaunchGame = function () {
    if (currentSession.gameId) {
      window.launchGame(currentSession.gameId);
    }
  };


  // ================= 1. TEBAK GAMBAR HARDWARE =================
  function initTebakGambar() {
    openGameOverlay('🖼️ Game Tebak Gambar Hardware TJKT');
    currentSession = { gameId: 'tebak-gambar', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const items = [
      { name: 'ROUTER', hint: 'Perangkat penentu rute antar jaringan (Layer 3 OSI)', icon: '🌐' },
      { name: 'SWITCH', hint: 'Menghubungkan banyak komputer dalam satu LAN (Layer 2 OSI)', icon: '🔀' },
      { name: 'FIBER', hint: 'Kabel serat kaca pemandu sinyal cahaya ultra cepat', icon: '⚡' },
      { name: 'MIKROTIK', hint: 'Sistem operasi & hardware router terpopuler di SMK TJKT', icon: '📡' }
    ];

    let currentIdx = 0;
    const stage = document.getElementById('game-stage-content');

    function renderQuestion() {
      const q = items[currentIdx];
      stage.innerHTML = `
        <div class="card anim-fade" style="text-align:center; max-width:500px; width:100%;">
          <div style="font-size:5rem; margin-bottom:12px;">${q.icon}</div>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:20px;">Petunjuk: <em>"${q.hint}"</em></p>
          <div style="display:flex; justify-content:center; gap:8px; margin-bottom:20px;">
            ${q.name.split('').map(() => `<input type="text" maxlength="1" class="search-box guess-letter-input" style="width:45px; height:45px; text-align:center; font-size:1.3rem; font-weight:800; text-transform:uppercase;">`).join('')}
          </div>
          <button class="btn btn-primary ripple" id="submit-guess-btn">Kirim Jawaban</button>
        </div>
      `;

      const inputs = stage.querySelectorAll('.guess-letter-input');
      inputs.forEach((inp, idx) => {
        inp.addEventListener('input', () => {
          if (inp.value && idx < inputs.length - 1) inputs[idx + 1].focus();
        });
      });

      stage.querySelector('#submit-guess-btn').addEventListener('click', () => {
        let answer = '';
        inputs.forEach(i => answer += i.value.toUpperCase());

        if (answer === q.name) {
          window.playSound('correct');
          currentSession.score += 100;
          currentIdx++;

          if (currentIdx < items.length) {
            window.showToast('Jawaban Benar! +100 Skor 🎯');
            renderQuestion();
          } else {
            endGameSession(true, 120);
          }
        } else {
          window.playSound('wrong');
          currentSession.lives--;
          updateGameStatsUI();
          window.showToast('Jawaban Salah, coba lagi! ❌', 'danger');

          if (currentSession.lives <= 0) {
            endGameSession(false);
          }
        }
      });
    }

    startTimer(60, null, () => endGameSession(false));
    renderQuestion();
  }


  // ================= 2. MEMORY CARD GAME =================
  function initMemoryCard() {
    openGameOverlay('🃏 Game Memory Card TJKT');
    currentSession = { gameId: 'memory-card', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const pairs = [
      { text: 'HTTP', match: 'Port 80' },
      { text: 'HTTPS', match: 'Port 443' },
      { text: 'SSH', match: 'Port 22' },
      { text: 'DNS', match: 'Port 53' }
    ];

    let cards = [];
    pairs.forEach((p, idx) => {
      cards.push({ id: idx, val: p.text });
      cards.push({ id: idx, val: p.match });
    });
    cards.sort(() => Math.random() - 0.5);

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="memory-grid">
        ${cards.map((c, i) => `
          <div class="memory-card-item" data-index="${i}" data-id="${c.id}">
            ❓
          </div>
        `).join('')}
      </div>
    `;

    let flippedCards = [];
    let matchedCount = 0;

    stage.querySelectorAll('.memory-card-item').forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const idx = cardEl.getAttribute('data-index');
        if (flippedCards.length >= 2 || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        cardEl.classList.add('flipped');
        cardEl.innerText = cards[idx].val;
        flippedCards.push({ el: cardEl, card: cards[idx] });

        if (flippedCards.length === 2) {
          if (flippedCards[0].card.id === flippedCards[1].card.id) {
            window.playSound('correct');
            flippedCards[0].el.classList.add('matched');
            flippedCards[1].el.classList.add('matched');
            flippedCards = [];
            matchedCount++;
            currentSession.score += 150;
            updateGameStatsUI();

            if (matchedCount === pairs.length) {
              endGameSession(true, 150);
            }
          } else {
            window.playSound('wrong');
            setTimeout(() => {
              flippedCards[0].el.classList.remove('flipped');
              flippedCards[1].el.classList.remove('flipped');
              flippedCards[0].el.innerText = '❓';
              flippedCards[1].el.innerText = '❓';
              flippedCards = [];
            }, 800);
          }
        }
      });
    });

    startTimer(45, null, () => endGameSession(false));
  }


  // ================= 3. DRAG AND DROP OSI LAYERS =================
  function initDragDrop() {
    openGameOverlay('🎯 Drag and Drop 7 OSI Layer');
    currentSession = { gameId: 'drag-drop', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const layers = [
      { num: 7, name: '7. Application Layer' },
      { num: 6, name: '6. Presentation Layer' },
      { num: 5, name: '5. Session Layer' },
      { num: 4, name: '4. Transport Layer' },
      { num: 3, name: '3. Network Layer' },
      { num: 2, name: '2. Data Link Layer' },
      { num: 1, name: '1. Physical Layer' }
    ];

    const shuffled = [...layers].sort(() => Math.random() - 0.5);

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="dnd-container">
        <div class="dnd-column">
          <h4 style="margin-bottom:12px;">Pilihan Lapisan OSI:</h4>
          <div id="dnd-source-pool">
            ${shuffled.map(l => `<div class="dnd-item" draggable="true" data-num="${l.num}">${l.name}</div>`).join('')}
          </div>
        </div>
        <div class="dnd-column">
          <h4 style="margin-bottom:12px;">Urutan Lapisan (7 -> 1):</h4>
          ${layers.map(l => `<div class="dnd-slot" data-target="${l.num}">Slot Layer ${l.num}</div>`).join('')}
          <button class="btn btn-success ripple" id="check-dnd-btn" style="width:100%; margin-top:16px;">Verifikasi Urutan</button>
        </div>
      </div>
    `;

    let draggedEl = null;

    stage.querySelectorAll('.dnd-item').forEach(item => {
      item.addEventListener('dragstart', () => { draggedEl = item; });
    });

    stage.querySelectorAll('.dnd-slot').forEach(slot => {
      slot.addEventListener('dragover', (e) => { e.preventDefault(); slot.classList.add('hovered'); });
      slot.addEventListener('dragleave', () => { slot.classList.remove('hovered'); });
      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('hovered');
        if (draggedEl) {
          slot.innerHTML = '';
          slot.appendChild(draggedEl);
        }
      });
    });

    stage.querySelector('#check-dnd-btn').addEventListener('click', () => {
      let correct = 0;
      stage.querySelectorAll('.dnd-slot').forEach(slot => {
        const item = slot.querySelector('.dnd-item');
        if (item && item.getAttribute('data-num') === slot.getAttribute('data-target')) {
          correct++;
        }
      });

      if (correct === layers.length) {
        currentSession.score = 300;
        endGameSession(true, 150);
      } else {
        window.playSound('wrong');
        window.showToast(`Hanya ${correct} dari 7 layer yang benar! Coba lagi.`, 'danger');
      }
    });

    startTimer(60, null, () => endGameSession(false));
  }


  // ================= 4. TOPOLOGY PUZZLE =================
  function initTopologyPuzzle() {
    openGameOverlay('🧩 Topology Puzzle Simulator');
    currentSession = { gameId: 'puzzle-topologi', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="card anim-fade" style="text-align:center; max-width:600px;">
        <h3>Cocokkan Karakteristik Topologi Jaringan</h3>
        <p style="color:var(--text-muted); margin-bottom:20px;">Pilih jenis topologi yang tepat berdasarkan arsitekturnya:</p>
        
        <div style="text-align:left; margin-bottom:20px;">
          <div style="margin-bottom:16px;">
            <p><strong>1. Topologi yang menggunakan Central Switch / Hub sebagai pusat koneksi:</strong></p>
            <select class="search-box topo-select" data-ans="star" style="width:100%; padding:10px; margin-top:6px;">
              <option value="">-- Pilih Topologi --</option>
              <option value="star">Topologi Star</option>
              <option value="bus">Topologi Bus</option>
              <option value="ring">Topologi Ring</option>
              <option value="mesh">Topologi Mesh</option>
            </select>
          </div>
          <div style="margin-bottom:16px;">
            <p><strong>2. Topologi yang setiap node terhubung langsung ke semua node lain (Full Redundancy):</strong></p>
            <select class="search-box topo-select" data-ans="mesh" style="width:100%; padding:10px; margin-top:6px;">
              <option value="">-- Pilih Topologi --</option>
              <option value="star">Topologi Star</option>
              <option value="bus">Topologi Bus</option>
              <option value="ring">Topologi Ring</option>
              <option value="mesh">Topologi Mesh</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary ripple" id="submit-topo-btn">Kirim Solusi Puzzle</button>
      </div>
    `;

    stage.querySelector('#submit-topo-btn').addEventListener('click', () => {
      const selects = stage.querySelectorAll('.topo-select');
      let isAllCorrect = true;
      selects.forEach(s => {
        if (s.value !== s.getAttribute('data-ans')) isAllCorrect = false;
      });

      if (isAllCorrect) {
        currentSession.score = 200;
        endGameSession(true, 100);
      } else {
        window.playSound('wrong');
        window.showToast('Solusi Puzzle belum tepat! Periksa kembali.', 'danger');
      }
    });

    startTimer(45, null, () => endGameSession(false));
  }


  // ================= 5. SUSUN KATA =================
  function initSusunKata() {
    openGameOverlay('🔤 Game Susun Kata Jargon TJKT');
    currentSession = { gameId: 'susun-kata', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const words = [
      { scrambled: 'M I K R O T I K', target: 'MIKROTIK' },
      { scrambled: 'S U B N E T M A S K', target: 'SUBNETMASK' },
      { scrambled: 'F I R E W A L L', target: 'FIREWALL' }
    ];

    let wordIdx = 0;
    const stage = document.getElementById('game-stage-content');

    function renderWord() {
      const w = words[wordIdx];
      stage.innerHTML = `
        <div class="card anim-zoom" style="text-align:center; max-width:500px; width:100%;">
          <div style="font-size:2rem; font-weight:800; color:var(--primary); letter-spacing:4px; margin-bottom:20px;">
            ${w.scrambled}
          </div>
          <input type="text" id="unscramble-input" class="search-box" style="text-align:center; font-weight:800; text-transform:uppercase; font-size:1.2rem; margin-bottom:20px;" placeholder="Tuliskan kata yang benar...">
          <button class="btn btn-primary ripple" id="unscramble-btn">Verifikasi Kata</button>
        </div>
      `;

      stage.querySelector('#unscramble-btn').addEventListener('click', () => {
        const val = stage.querySelector('#unscramble-input').value.trim().toUpperCase();
        if (val === w.target) {
          window.playSound('correct');
          currentSession.score += 100;
          wordIdx++;

          if (wordIdx < words.length) {
            window.showToast('Kata Tepat! 🌟');
            renderWord();
          } else {
            endGameSession(true, 100);
          }
        } else {
          window.playSound('wrong');
          window.showToast('Susunan kata salah!', 'danger');
        }
      });
    }

    startTimer(45, null, () => endGameSession(false));
    renderWord();
  }


  // ================= 6. BENAR ATAU SALAH =================
  function initBenarSalah() {
    openGameOverlay('⚡ Fast Blitz Benar atau Salah');
    currentSession = { gameId: 'benar-salah', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const quizList = [
      { text: 'Kabel Fiber Optik mentransmisikan data menggunakan gelombang cahaya.', ans: true },
      { text: 'Alamat IP 192.168.1.1 termasuk dalam klasifikasi Kelas A.', ans: false },
      { text: 'Port standar untuk protokol HTTP adalah Port 80.', ans: true },
      { text: 'Switch Layer 2 bekerja berdasarkan IP Address perangkat.', ans: false }
    ];

    let qIdx = 0;
    const stage = document.getElementById('game-stage-content');

    function renderFact() {
      const q = quizList[qIdx];
      stage.innerHTML = `
        <div class="card anim-fade" style="text-align:center; max-width:550px; width:100%;">
          <div style="font-size:3rem; margin-bottom:12px;">⚡</div>
          <h3 style="font-size:1.3rem; margin-bottom:24px;">"${q.text}"</h3>
          <div style="display:flex; justify-content:center; gap:20px;">
            <button class="btn btn-success btn-lg ripple" id="ans-true-btn">BENAR (TRUE)</button>
            <button class="btn btn-secondary btn-lg ripple" id="ans-false-btn" style="background:var(--danger); color:#fff;">SALAH (FALSE)</button>
          </div>
        </div>
      `;

      const handleChoice = (chosenBool) => {
        if (chosenBool === q.ans) {
          window.playSound('correct');
          currentSession.score += 100;
          qIdx++;
          if (qIdx < quizList.length) {
            renderFact();
          } else {
            endGameSession(true, 100);
          }
        } else {
          window.playSound('wrong');
          currentSession.lives--;
          updateGameStatsUI();
          if (currentSession.lives <= 0) {
            endGameSession(false);
          } else {
            qIdx++;
            if (qIdx < quizList.length) renderFact(); else endGameSession(true, 100);
          }
        }
      };

      stage.querySelector('#ans-true-btn').onclick = () => handleChoice(true);
      stage.querySelector('#ans-false-btn').onclick = () => handleChoice(false);
    }

    startTimer(40, null, () => endGameSession(false));
    renderFact();
  }


  // ================= 7. TIMED SPEED CHALLENGE =================
  function initTimedQuiz() {
    openGameOverlay('⏱️ Speed Challenge Quiz');
    currentSession = { gameId: 'timed-quiz', score: 0, lives: 3, stars: 3, timer: 30 };
    updateGameStatsUI();

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="card anim-zoom" style="text-align:center; max-width:500px;">
        <h3>Berapa jumlah bit total pada IPv4?</h3>
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:20px;">
          <button class="btn btn-secondary ripple speed-opt" data-correct="false">16 Bit</button>
          <button class="btn btn-secondary ripple speed-opt" data-correct="true">32 Bit</button>
          <button class="btn btn-secondary ripple speed-opt" data-correct="false">64 Bit</button>
          <button class="btn btn-secondary ripple speed-opt" data-correct="false">128 Bit</button>
        </div>
      </div>
    `;

    stage.querySelectorAll('.speed-opt').forEach(b => {
      b.onclick = () => {
        if (b.getAttribute('data-correct') === 'true') {
          currentSession.score = 250;
          endGameSession(true, 100);
        } else {
          endGameSession(false);
        }
      };
    });

    startTimer(30, null, () => endGameSession(false));
  }


  // ================= 8. RODA KEBERUNTUNGAN =================
  function initRodaKeberuntungan() {
    openGameOverlay('🎡 Roda Keberuntungan Soal TJKT');
    currentSession = { gameId: 'roda-keberuntungan', score: 0, lives: 3, stars: 3, timer: 60 };
    updateGameStatsUI();

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="wheel-wrapper card anim-fade">
        <div class="wheel-pointer"></div>
        <canvas id="wheel-canvas" width="300" height="300"></canvas>
        <button class="btn btn-primary btn-lg ripple" id="spin-wheel-btn" style="margin-top:24px;">Putar Roda Sekarang! 🎡</button>
      </div>
    `;

    const canvas = stage.querySelector('#wheel-canvas');
    const ctx = canvas.getContext('2d');
    const segments = ['+100 XP', 'Soal Bonus', '+50 XP', 'Jackpot 200 XP', 'Try Again', '+150 XP'];
    const colors = ['#2563eb', '#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    function drawWheel(angle = 0) {
      const arc = (Math.PI * 2) / segments.length;
      ctx.clearRect(0, 0, 300, 300);

      segments.forEach((seg, i) => {
        const segAngle = angle + i * arc;
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.arc(150, 150, 140, segAngle, segAngle + arc);
        ctx.lineTo(150, 150);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "Outfit", sans-serif';
        ctx.translate(150 + Math.cos(segAngle + arc / 2) * 90, 150 + Math.sin(segAngle + arc / 2) * 90);
        ctx.rotate(segAngle + arc / 2 + Math.PI / 2);
        ctx.fillText(seg, -ctx.measureText(seg).width / 2, 0);
        ctx.restore();
      });
    }

    drawWheel();

    let spinning = false;
    stage.querySelector('#spin-wheel-btn').onclick = () => {
      if (spinning) return;
      spinning = true;

      let currentAngle = 0;
      let speed = Math.random() * 0.3 + 0.4;

      const spinAnim = setInterval(() => {
        currentAngle += speed;
        speed *= 0.98;
        window.playSound('wheel');
        drawWheel(currentAngle);

        if (speed < 0.005) {
          clearInterval(spinAnim);
          spinning = false;
          currentSession.score = 200;
          endGameSession(true, 150);
        }
      }, 30);
    };

    startTimer(60, null, null);
  }


  // ================= 9. ESCAPE ROOM TERMINAL SIMULATOR =================
  function initEscapeRoom() {
    openGameOverlay('🗝️ Escape Room Mini: Terminal Hack');
    currentSession = { gameId: 'escape-room', score: 0, lives: 3, stars: 3, timer: 90 };
    updateGameStatsUI();

    const stage = document.getElementById('game-stage-content');
    stage.innerHTML = `
      <div class="terminal-window anim-fade">
        <div class="terminal-header">TJKT SECURE TERMINAL v2.0 -- ESCAPE SYSTEM</div>
        <div id="term-output" style="min-height:160px; line-height:1.6;">
          <p>[SYSTEM LOCKED] Ruang server terkunci secara otomatis!</p>
          <p>Misi 1: Masukkan password dekripsi Subnet Mask default untuk IP /24 (Format: 255.x.x.x)</p>
        </div>
        <div class="terminal-input-line">
          <span>root@tjkt-escape:~#</span>
          <input type="text" id="term-input" placeholder="Ketik perintah/jawaban..." autofocus>
        </div>
      </div>
    `;

    let stageLevel = 1;
    const outputEl = stage.querySelector('#term-output');
    const inputEl = stage.querySelector('#term-input');

    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = inputEl.value.trim();
        inputEl.value = '';

        if (stageLevel === 1) {
          if (val === '255.255.255.0') {
            window.playSound('correct');
            stageLevel = 2;
            outputEl.innerHTML += `<p style="color:#34d399;">✓ LEVEL 1 CLEAR! Pintu 1 Terbuka.</p>`;
            outputEl.innerHTML += `<p>Misi 2: Ketikkan perintah CLI untuk menguji jaringan ke IP 8.8.8.8 (Contoh: ping 8.8.8.8)</p>`;
          } else {
            window.playSound('wrong');
            outputEl.innerHTML += `<p style="color:#f87171;">[ERROR] Password salah!</p>`;
          }
        } else if (stageLevel === 2) {
          if (val === 'ping 8.8.8.8') {
            window.playSound('correct');
            stageLevel = 3;
            outputEl.innerHTML += `<p style="color:#34d399;">✓ LEVEL 2 CLEAR! Sinyal Terhubung.</p>`;
            outputEl.innerHTML += `<p>Misi 3: Berapa jumlah total 7 Lapisan OSI Model? (Ketikkan angkanya)</p>`;
          } else {
            window.playSound('wrong');
            outputEl.innerHTML += `<p style="color:#f87171;">[ERROR] Perintah CLI tidak valid!</p>`;
          }
        } else if (stageLevel === 3) {
          if (val === '7') {
            currentSession.score = 500;
            endGameSession(true, 200);
          } else {
            window.playSound('wrong');
            outputEl.innerHTML += `<p style="color:#f87171;">[ERROR] Angka salah!</p>`;
          }
        }
      }
    });

    startTimer(90, null, () => endGameSession(false));
  }


  // --- Game Hub Launcher Handler ---
  window.launchGame = function (gameId) {
    if (gameId === 'tebak-gambar') initTebakGambar();
    else if (gameId === 'memory-card') initMemoryCard();
    else if (gameId === 'drag-drop') initDragDrop();
    else if (gameId === 'puzzle-topologi') initTopologyPuzzle();
    else if (gameId === 'susun-kata') initSusunKata();
    else if (gameId === 'benar-salah') initBenarSalah();
    else if (gameId === 'timed-quiz') initTimedQuiz();
    else if (gameId === 'roda-keberuntungan') initRodaKeberuntungan();
    else if (gameId === 'escape-room') initEscapeRoom();
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.game-card[data-game]').forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.getAttribute('data-game');
        window.launchGame(gameId);
      });
    });

    document.getElementById('close-game-btn')?.addEventListener('click', window.closeGameArea);
  });

})();
