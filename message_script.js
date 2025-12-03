// 1. Xử lý nhạc nền (giữ nguyên)
window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById("real-music");
    const time = localStorage.getItem("musicTime");
    if (time) music.currentTime = parseFloat(time);
    
    // Cố gắng phát nhạc
    music.play().catch(err => console.log("Chờ tương tác để phát nhạc:", err));
});

// 2. Logic chính của thiệp (Đã xóa sự kiện click)
(function() {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $('card'),
      typingElement = $('typing-text'),
      cardImgDiv = document.querySelector('.card-front_inside .img'),
      timer = null,
      typingTimer = null;

  const texts = [
    `Ngày sinh nhật của bạn là một dịp để kỷ niệm những khoảnh khắc đẹp nhất của cuộc đời. Chúc bạn có một ngày tràn đầy niềm vui, yêu thương, và hạnh phúc. Sinh nhật vui vẻ nhất!`,
    `Hôm nay không như ngày hôm qua, hôm nay là một ngày đặc biệt, là ngày mà một thiên thần đáng yêu đã có mặt trên thế giới cách đây… năm. Luôn mỉm cười và may mắn nhé.🎉 Chúc bạn sinh nhật vui vẻ! 🎂🥳`
  ];

  const imgs = [
    "duy.png",   // Ảnh ban đầu
    "nhung.png"  // Ảnh thay đổi sau đó
  ];

  function typeText(text, callback) {
      let index = 0;
      typingElement.innerHTML = ''; 
      function typing() {
          if(index < text.length) {
              typingElement.innerHTML += text.charAt(index);
              index++;
              typingTimer = setTimeout(typing, 80); 
          } else {
              if(callback) callback();
          }
      }
      typing();
  }

  // --- HÀM MỞ THIỆP TỰ ĐỘNG ---
  function openCard() {
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;

      // 1. Bắt đầu đoạn text đầu tiên
      typeText(texts[0], function() {
        // Sau khi đoạn text 1 xong, delay 1s
        setTimeout(function() {
              // Đổi ảnh
              cardImgDiv.style.backgroundImage = `url(${imgs[1]})`;
              
              // 2. Bắt đầu đoạn text thứ hai
              typeText(texts[1], function() {
                  // Sau khi text 2 xong, chờ 3s rồi chuyển trang
                  setTimeout(function() {
                     const music = document.getElementById("real-music");
                     try {
                        localStorage.setItem("musicTime", music.currentTime);
                     } catch(e) {}
                     window.location.href = "birthday.html"; // Chuyển sang trang pháo hoa
                  }, 3000); 
              });
        }, 1000);
      });

    }, 1000);
  }

  // --- KÍCH HOẠT TỰ ĐỘNG ---
  // 4000ms = 4 giây (2s vẽ bánh + 2s delay chờ)
  setTimeout(openCard, 6500); 

}());