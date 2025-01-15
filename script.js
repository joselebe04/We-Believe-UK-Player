const playPauseButton = document.querySelector('.play-pause-button');
const audioElements = document.querySelectorAll('.audio');

playPauseButton.addEventListener('click', () => {
    const isPlaying = playPauseButton.textContent === 'Pause';

    if (isPlaying) {
        audioElements.forEach(audio => audio.pause());
        playPauseButton.textContent = 'Play';
    } else {
        audioElements.forEach(audio => audio.play());
        playPauseButton.textContent = 'Pause';
    }
});

const muteButtons = document.querySelectorAll('.mute');
muteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const audio = audioElements[index];
        audio.muted = !audio.muted;
        button.classList.toggle('active');
    });
});
