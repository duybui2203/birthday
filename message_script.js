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
    "duy.png",
    "nhung.png"
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

  function openCard() {
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;

      typeText(texts[0], function() {
        setTimeout(function() {
              cardImgDiv.style.backgroundImage = `url(${imgs[1]})`;
              
              typeText(texts[1], function() {
                  setTimeout(function() {
                     // Lưu thời gian nhạc trước khi chuyển trang (nếu cần)
                     const music = document.getElementById("real-music");
                     try {
                        localStorage.setItem("musicTime", music.currentTime);
                     } catch(e) {}
                     
                     window.location.href = "birthday.html"; 
                  }, 3000); 
              });
        }, 1000);
      });

    }, 1000);
  }

  // --- PHẦN QUAN TRỌNG ĐÃ SỬA ---
  
  // Tạo hàm xử lý khi người dùng bấm vào thiệp
  function startExperience() {
      // 1. Xử lý nhạc
      const music = document.getElementById("real-music");
      const time = localStorage.getItem("musicTime");
      
      // Đồng bộ thời gian nếu có
      if (time) music.currentTime = parseFloat(time);
     // Nếu nhạc chưa từng play hoặc đang pause → play
    if (music.paused || music.currentTime === 0 || music.ended) {
        music.play()
            .then(() => console.log("Music playing..."))
            .catch(e => console.log("Lỗi phát nhạc:", e));
    }
      // 2. Chạy hiệu ứng mở thiệp
      openCard();
  }

  // Gán sự kiện Click cho thẻ Card
  // { once: true } nghĩa là chỉ bấm được 1 lần, bấm lần 2 sẽ không chạy lại code này (tránh lỗi)
  card.addEventListener('click', startExperience, { once: true });

}());