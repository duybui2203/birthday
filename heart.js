function createHeart() {
   const heart = document.createElement("div");
    heart.classList.add("heart");

    // Danh sách màu ngẫu nhiên
    const colors = ["#ff4d6d", "#ff99ac", "#ff6b6b", "#ff3b8d", "#ff1744", "#ff8a80"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // gán màu cho toàn bộ trái tim thông qua biến CSS
    heart.style.setProperty("--color", randomColor);

    // vị trí bay ngẫu nhiên
    heart.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}

setInterval(createHeart, 550);