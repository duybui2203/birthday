document.addEventListener('DOMContentLoaded', () => {
    // 1. XỬ LÝ NHẠC NỀN (Giữ nguyên)
    const music = document.getElementById("real-music");
    const time = localStorage.getItem("musicTime");
    if (time) music.currentTime = parseFloat(time);
    
    music.play().catch(err => console.log("Chờ tương tác để phát nhạc:", err));

    setInterval(() => {
        try { localStorage.setItem('musicTime', music.currentTime.toString()); } catch (e) {}
    }, 2000);

    // ======================================================
    // MỚI: HÀM XỬ LÝ ÂM THANH PHÁO HOA
    // Sử dụng AudioContext để quản lý nhiều âm thanh nổ cùng lúc
    // ======================================================
    let audioContext;
    let soundBuffer;
    
    // Tải file âm thanh khi trang load
    async function loadSound(url) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            soundBuffer = await audioContext.decodeAudioData(arrayBuffer);
            console.log("Đã tải âm thanh pháo hoa.");
        } catch (error) {
            console.error('Không thể tải hoặc giải mã âm thanh:', error);
        }
    }   
    
    // Tạo và phát âm thanh
    function playFireworkSound() {
        // if (!audioContext || !soundBuffer) return;

        // const source = audioContext.createBufferSource();
        // source.buffer = soundBuffer;
        
        // // Điều chỉnh âm lượng (giảm chút để không quá to)
        // const gainNode = audioContext.createGain();
        // gainNode.gain.value = 0.5; // Giảm âm lượng còn 50%
        
        // source.connect(gainNode);
        // gainNode.connect(audioContext.destination);
        
        // source.start(0);
    }

    // Tải âm thanh nổ ngay khi DOMContentLoaded chạy
    loadSound('firework_sound.mp3'); 
    // ======================================================
    
    // 2. PHÁO HOA (Đã chỉnh tốc độ và độ toả)
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const rockets = [];
    const colors = ['#ff0043', '#14fc56', '#1e90ff', '#e6e6fa', '#ffdf6b', '#ff7bd3'];

    class Rocket {
        constructor() {
            this.x = Math.random() * width;
            this.y = height;
            this.speed = Math.random() * 5 + 8; 
            this.angle = -Math.PI / 2 + (Math.random() * 0.2 - 0.1);
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.hue = colors[Math.floor(Math.random() * colors.length)];
            this.trail = [];
            this.exploded = false;
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 5) this.trail.shift();

            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; 

            if (this.vy >= -0.5 || this.y < height * 0.1) {
                this.explode();
                return false; 
            }
            return true;
        }

        draw() {
            ctx.beginPath();
            if(this.trail.length > 0) {
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                ctx.lineTo(this.x, this.y);
            }
            ctx.strokeStyle = this.hue;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        explode() {
            // MỚI: CHƠI ÂM THANH TẠI ĐÂY
            playFireworkSound(); 

            const particleCount = 80 + Math.random() * 50; 
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.hue));
            }
        }
    }

    class Particle {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 4;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.friction = 0.95; 
            this.gravity = 0.05;  
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
        }

        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.hue;
            ctx.fill();
            ctx.restore();
        }
    }

    function loop() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.globalCompositeOperation = 'source-over';

        if (Math.random() < 0.05) rockets.push(new Rocket());

        for (let i = rockets.length - 1; i >= 0; i--) {
            if (!rockets[i].update()) rockets.splice(i, 1);
            else rockets[i].draw();
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (!particles[i].update()) particles.splice(i, 1);
            else particles[i].draw();
        }

        requestAnimationFrame(loop);
    }

    loop();
});