const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    // sounds
    const sounds = document.querySelectorAll(".sound-picker button");

    // time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    // get length of the outline
    const outlineLength = outline.getTotalLength();

    // fake duration
    let fakeDuration = 600;

    // tracker progress
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    // play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    // function to control playing song
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    // animate the tracker
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        // animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        // when tmie is nigh
        if (currentTime >= fakeDuration) {
            song.pause();
            video.pause();
            song.currentTime = 0; // resets the song
            play.src = "./svg/play.svg";
        }
    };
};

app();
