function press(n) {
    document.getElementById("password").value += n;
}

function del() {
    let s = document.getElementById("password").value;
    document.getElementById("password").value = s.slice(0, -1);
}

function check() {
    let pass = document.getElementById("password").value;

    if (pass === "13122000") {
         // Lấy audio và lưu vị trí hiện tại vào localStorage
        const music = document.getElementById("real-music");
        localStorage.setItem("musicTime", music.currentTime);
                console.log("Current time before saving:", music.currentTime); // log thời gian hiện tại

        window.location.href = "message.html";
    } else {
        document.getElementById("msg").innerText = "Sai rồi 😝";
    }
}
let musicStarted = false;

function startMusicOnce() {
    // if (!musicStarted) {
    //     const music = document.getElementById("real-music");
    //     music.volume = 0.8;
    //     music.loop = true; // lặp lại
    //     music.play().catch(err => console.log(err));
    //     musicStarted = true;  // đánh dấu đã phát
    // }
}