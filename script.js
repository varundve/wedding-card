
    let currentPageIndex = 0;
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;

    function showPage(index) {
    pages.forEach((page, i) => {
        page.classList.remove('active');
        if (i === index) page.classList.add('active');
    });
    currentPageIndex = index;
    document.getElementById('currentPage').textContent = index + 1;
    document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
});
    }



    let startX = 0;
    let endX = 0;
    let isMouseDown = false;

    function startSwipe(x) {
        startX = x;
        endX = x;
    }

    function moveSwipe(x) {
        endX = x;
    }

    function endSwipe() {
        const swipeDistance = endX - startX;
        if (Math.abs(swipeDistance) < 60) return;
        if (swipeDistance < 0) changePage(1);
        else changePage(-1);
    }

    document.addEventListener("touchstart", e => {
        startSwipe(e.changedTouches[0].clientX);
    });

    document.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;
        endSwipe();
    });

    document.addEventListener("mousedown", e => {
        isMouseDown = true;
        startSwipe(e.clientX);
    });

    document.addEventListener("mousemove", e => {
        if (!isMouseDown) return;
        moveSwipe(e.clientX);
    });

    document.addEventListener("mouseup", () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        endSwipe();
    });




    function changePage(direction) {
    let newIndex = (currentPageIndex + direction)%totalPages;
    if(newIndex <0) newIndex = totalPages-1;
    showPage(newIndex);
}

    function goToPage(index) {
    showPage(index);
}

    document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changePage(-1);
    if (e.key === 'ArrowRight') changePage(1);
});

    showPage(0);

    function createParticles() {
    const page1 = document.querySelector('.page1');
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle star';
    particle.textContent = '✨';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
    page1.appendChild(particle);
}
}


    let audio = new Audio('./public/music.mpeg');
    audio.loop=true;
    let isPlaying = false;
    let currentTime = 0;
    let songDuration = 0;

    const lyrics = [
    { time: 0.5, text: "🎵 Ehsaas" },
    { time: 2, text: "Teri nazron ka" },
    { time: 4, text: "दिल पे hua है असर" },
    { time: 7, text: "✨ Tu mera mehboob hai jaana" },
    { time: 10, text: "तेरी उल्फत में jeeta हर पल" },
    { time: 14, text: "💕 Tu ik tohfa hai Khuda ka" },
    { time: 18, text: "❤️ Your eyes hold my soul" },
    { time: 22, text: "तुम्हारी हँसी मेरी खुशी" },
    { time: 26, text: "🎵 In this moment forever" },
    { time: 30, text: "Teri nazron ka..." },
    { time: 35, text: "दिल पे hua है असर" },
    { time: 40, text: "✨ Our love eternal" },
    { time: 45, text: "Tu mera mehboob hai..." },
    { time: 50, text: "💕 Khuda ka tohfa" }
    ];

    let lyricIndex = 0;

    audio.addEventListener('loadedmetadata', function() {
    songDuration = audio.duration;
    const mins = Math.floor(songDuration / 60);
    const secs = Math.floor(songDuration % 60).toString().padStart(2, '0');
    document.getElementById('durationDisplay').textContent = `${mins}:${secs}`;
});

    function togglePlay() {
    const playBtn = document.getElementById('playBtn');
    if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = '▶';
} else {
    audio.play().then(r => console.log(r.toString()));
    isPlaying = true;
    playBtn.textContent = '⏸';
    syncWithAudio();
}
}

    function syncWithAudio() {
    if (!isPlaying) return;
    currentTime = audio.currentTime;
    updateProgress();
    updateLyrics();
    requestAnimationFrame(syncWithAudio);
}

    function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (currentTime / songDuration) * 100;
    progressFill.style.width = percentage + '%';
    const mins = Math.floor(currentTime / 60);
    const secs = Math.floor(currentTime % 60).toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = `${mins}:${secs}`;
}

    function updateLyrics() {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    if (lyricIndex < lyrics.length && lyrics[lyricIndex].time <= currentTime) {
    const existingLyric = lyricsDisplay.querySelector('.lyric-line');
    if (existingLyric) {
    existingLyric.classList.add('exit');
    setTimeout(() => existingLyric.remove(), 600);
}
    const lyricDiv = document.createElement('div');
    lyricDiv.className = 'lyric-line';
    lyricDiv.textContent = lyrics[lyricIndex].text;
    lyricsDisplay.innerHTML = '';
    lyricsDisplay.appendChild(lyricDiv);
    lyricIndex++;
}
}

    function seekSong(event) {
    const progressBar = document.getElementById('progressBar');
    const rect = progressBar.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    audio.currentTime = percentage * songDuration;
    currentTime = audio.currentTime;
    updateProgress();
    updateLyrics();
}


    createParticles();
