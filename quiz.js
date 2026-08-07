/* ==========================================================================
   TJKT SMART NETWORK - Aulia Hanifa
   Interactive Quiz Engine & Exam System (quiz.js)
   Randomized Question Pool, Explanations, Grading, & Certificate Unlock Check
   ========================================================================== */

(function () {
  'use strict';

  // --- TJKT Question Pool (SMK Standard) ---
  const QuestionPool = [
    {
      id: 1,
      question: 'Manakah lapisan dalam Model OSI yang bertanggung jawab untuk menentukan rute (routing) pengiriman paket data menggunakan IP Address?',
      options: ['Application Layer', 'Transport Layer', 'Network Layer', 'Data Link Layer'],
      answer: 2,
      explanation: 'Network Layer (Layer 3) bertanggung jawab untuk pengalamatan logis (IP Address) dan menentukan rute terbaik (routing) untuk pengiriman data antar jaringan.'
    },
    {
      id: 2,
      question: 'Berapakah subnet mask default untuk alokasi IP Address Kelas C dengan notasi CIDR /24?',
      options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.240'],
      answer: 2,
      explanation: 'Notasi CIDR /24 berarti 24 bit bernilai 1 (11111111.11111111.11111111.00000000) yang jika diubah ke desimal bernilai 255.255.255.0.'
    },
    {
      id: 3,
      question: 'Perangkat jaringan manakah yang berfungsi menghubungkan dua atau lebih sub-jaringan yang berbeda segmen IP-nya?',
      options: ['Hub', 'Switch Layer 2', 'Router', 'Repeater'],
      answer: 2,
      explanation: 'Router bekerja pada Layer 3 OSI untuk menghubungkan jaringan-jaringan dengan Network ID yang berbeda.'
    },
    {
      id: 4,
      question: 'Protokol apakah yang berfungsi memberikan pengalamatan IP secara otomatis kepada perangkat client?',
      options: ['DNS', 'DHCP', 'FTP', 'SMTP'],
      answer: 1,
      explanation: 'DHCP (Dynamic Host Configuration Protocol) mengalokasikan alamat IP, gateway, dan DNS secara otomatis kepada client yang terhubung.'
    },
    {
      id: 5,
      question: 'Manakah komponen kabel Fiber Optik yang berfungsi sebagai inti pembawa gelombang sinyal cahaya?',
      options: ['Cladding', 'Core', 'Coating', 'Jacket'],
      answer: 1,
      explanation: 'Core (inti) terbuat dari serat kaca murni presisi tempat ditempuhnya berkas cahaya data.'
    },
    {
      id: 6,
      question: 'Nomor port standar yang digunakan oleh protokol keamanan transmisi web (HTTPS) adalah...',
      options: ['Port 80', 'Port 21', 'Port 443', 'Port 22'],
      answer: 2,
      explanation: 'HTTPS menggunakan Port 443 yang terenkripsi SSL/TLS, sedangkan Port 80 digunakan oleh HTTP standar.'
    },
    {
      id: 7,
      question: 'Fungsi utama dari fitur VLAN (Virtual Local Area Network) pada Switch Manageable adalah...',
      options: ['Meningkatkan kapasitas daya listrik', 'Mengisolasi broadcast domain secara logis', 'Mengubah IP IPv4 menjadi IPv6', 'Mempercepat sinyal Wi-Fi'],
      answer: 1,
      explanation: 'VLAN mengelompokkan port switch secara logis untuk membagi broadcast domain demi efisiensi dan keamanan jaringan.'
    },
    {
      id: 8,
      question: 'Perintah CLI pada Sistem Operasi yang digunakan untuk menguji latensi dan konektivitas ICMP paket ke server adalah...',
      options: ['traceroute', 'ipconfig', 'ping', 'netstat'],
      answer: 2,
      explanation: 'Perintah "ping" (Packet Internet Groper) mengirimkan paket ICMP Echo Request untuk mengecek apakah host tujuan merespon.'
    },
    {
      id: 9,
      question: 'Apakah urutan 4 tahap alokasi IP pada protokol DHCP (Proses DORA)?',
      options: ['Discover, Offer, Request, Acknowledge', 'Domain, Offer, Route, Access', 'Data, Option, Receive, Accept', 'Disconnect, Offline, Reconnect, Active'],
      answer: 0,
      explanation: 'Proses penyewaan IP DHCP mengikuti tahapan DORA: Discover ➔ Offer ➔ Request ➔ Acknowledge.'
    },
    {
      id: 10,
      question: 'Kanal (Channel) frekuensi Wi-Fi 2.4 GHz manakah yang terbebas dari masalah saling bertumpukan (non-overlapping)?',
      options: ['1, 2, 3', '1, 6, 11', '5, 6, 7', '10, 11, 12'],
      answer: 1,
      explanation: 'Pada pita frekuensi 2.4 GHz, hanya channel 1, 6, dan 11 yang memiliki jarak spektrum cukup tanpa interferensi kualitatif.'
    }
  ];

  // --- Quiz Session Controls ---
  let activeQuestions = [];
  let currentStep = 0;
  let userAnswers = [];
  let quizTimer = null;
  let timeLeft = 30;

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startQuizSession() {
    activeQuestions = shuffleArray(QuestionPool).slice(0, 10);
    currentStep = 0;
    userAnswers = [];

    document.getElementById('quiz-start-card').style.display = 'none';
    document.getElementById('quiz-results-card').style.display = 'none';
    document.getElementById('active-quiz-container').style.display = 'block';

    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    if (quizTimer) clearInterval(quizTimer);
    timeLeft = 30;

    const q = activeQuestions[currentStep];
    const letters = ['A', 'B', 'C', 'D'];

    document.getElementById('quiz-step-indicator').innerText = `Soal ${currentStep + 1} dari ${activeQuestions.length}`;
    document.getElementById('quiz-progress-bar').style.width = `${((currentStep + 1) / activeQuestions.length) * 100}%`;
    document.getElementById('quiz-question-text').innerText = q.question;
    document.getElementById('quiz-explanation').style.display = 'none';
    document.getElementById('next-question-btn').style.display = 'none';

    const optionsGroup = document.getElementById('quiz-options-group');
    optionsGroup.innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn ripple" data-idx="${idx}">
        <span class="option-letter">${letters[idx]}</span>
        <span>${opt}</span>
      </button>
    `).join('');

    // Timer listener
    const timerDisplay = document.getElementById('quiz-timer-display');
    timerDisplay.innerText = `⏱️ 00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;

    quizTimer = setInterval(() => {
      timeLeft--;
      timerDisplay.innerText = `⏱️ 00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
      if (timeLeft <= 0) {
        clearInterval(quizTimer);
        handleAnswerSelection(-1); // Time out wrong
      }
    }, 1000);

    // Option click listener
    optionsGroup.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        clearInterval(quizTimer);
        const idx = parseInt(btn.getAttribute('data-idx'));
        handleAnswerSelection(idx);
      });
    });
  }

  function handleAnswerSelection(selectedIdx) {
    const q = activeQuestions[currentStep];
    const isCorrect = selectedIdx === q.answer;
    userAnswers.push({ selected: selectedIdx, correct: q.answer, isCorrect });

    const buttons = document.querySelectorAll('#quiz-options-group .option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      window.playSound('correct');
    } else {
      window.playSound('wrong');
    }

    // Show Explanation
    const expBox = document.getElementById('quiz-explanation');
    expBox.innerHTML = `<strong>💡 Pembahasan:</strong> ${q.explanation}`;
    expBox.style.display = 'block';

    const nextBtn = document.getElementById('next-question-btn');
    if (currentStep < activeQuestions.length - 1) {
      nextBtn.innerText = 'Lanjut Soal Berikutnya ➔';
    } else {
      nextBtn.innerText = 'Lihat Hasil Akhir Kuis 🏆';
    }
    nextBtn.style.display = 'inline-flex';
  }

  function finishQuizSession() {
    if (quizTimer) clearInterval(quizTimer);

    document.getElementById('active-quiz-container').style.display = 'none';

    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const finalScore = Math.round((correctCount / activeQuestions.length) * 100);

    // Record score
    AppState.user.quizScores.push(finalScore);
    window.addXP(finalScore * 2);
    saveState();

    const resultsCard = document.getElementById('quiz-results-card');
    const scoreText = document.getElementById('quiz-result-score');
    const msgText = document.getElementById('quiz-result-msg');
    const iconText = document.getElementById('quiz-result-icon');
    const certBtn = document.getElementById('claim-cert-nav-btn');

    scoreText.innerText = `Nilai: ${finalScore} / 100`;

    if (finalScore >= 80) {
      window.playSound('win');
      window.triggerConfetti();
      iconText.innerText = '🎓';
      msgText.innerText = `Selamat! Kamu LULUS dengan nilai ${finalScore}! Sertifikat kompetensimu kini sudah aktif dan siap diunduh.`;
      if (certBtn) certBtn.style.display = 'inline-flex';
    } else {
      window.playSound('wrong');
      iconText.innerText = '📚';
      msgText.innerText = `Kamu mendapatkan nilai ${finalScore}. Untuk membuka Sertifikat, raih nilai minimal 80. Pelajari kembali materi dan coba lagi!`;
      if (certBtn) certBtn.style.display = 'none';
    }

    resultsCard.style.display = 'block';
  }


  // --- Event Listeners ---
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-quiz-btn')?.addEventListener('click', startQuizSession);
    document.getElementById('restart-quiz-btn')?.addEventListener('click', startQuizSession);

    document.getElementById('next-question-btn')?.addEventListener('click', () => {
      currentStep++;
      if (currentStep < activeQuestions.length) {
        renderCurrentQuestion();
      } else {
        finishQuizSession();
      }
    });
  });

})();
