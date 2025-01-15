const tracks = {
    soprano: { audio: new Audio('soprano.mp3'), isPlaying: false, isMuted: false, volume: 1 },
    alto: { audio: new Audio('alto.mp3'), isPlaying: false, isMuted: false, volume: 1 },
    tenor: { audio: new Audio('tenor.mp3'), isPlaying: false, isMuted: false, volume: 1 },
    bass: { audio: new Audio('bass.mp3'), isPlaying: false, isMuted: false, volume: 1 }
};

const createWaveform = (trackName) => {
    const waveformElement = document.getElementById(`wave-${trackName}`);
    const wave = WaveSurfer.create({
        container: waveformElement,
        waveColor: '#225588',
        progressColor: '#1b4466',
        height: 100
    });

    wave.load(`${trackName}.mp3`);
    return wave;
};

// Initialize waveforms
const waves = {
    soprano: createWaveform('soprano'),
    alto: createWaveform('alto'),
    tenor: createWaveform('tenor'),
    bass: createWaveform('bass')
};

document.querySelectorAll('.play-pause').forEach(button => {
    button.addEventListener('click', () => {
        const trackName = button.dataset.track;
        const track = tracks[trackName];

        // Toggle play/pause for this track
        if (track.isPlaying) {
            track.audio.pause();
            button.textContent = 'Play';
        } else {
            track.audio.play();
            button.textContent = 'Pause';
        }
        track.isPlaying = !track.isPlaying;

        // Sync all tracks
        syncTracks();
    });
});

document.querySelectorAll('.mute-solo').forEach(button => {
    button.addEventListener('click', () => {
        const trackName = button.dataset.track;
        const track = tracks[trackName];

        // Toggle mute/solo
        if (track.isMuted) {
            track.audio.muted = false;
            button.textContent = 'Mute';
        } else {
            track.audio.muted = true;
            button.textContent = 'Solo';
        }
        track.isMuted = !track.isMuted;

        // Sync all tracks
        syncTracks();
    });
});

document.querySelectorAll('.volume').forEach(slider => {
    slider.addEventListener('input', (event) => {
        const trackName = event.target.dataset.track;
        const track = tracks[trackName];
        track.audio.volume = event.target.value / 100;
        track.volume = track.audio.volume;
    });
});

// Function to sync all tracks
function syncTracks() {
    const isAnyTrackPlaying = Object.values(tracks).some(track => track.isPlaying);
    const isAnyTrackMuted = Object.values(tracks).some(track => track.isMuted);

    // Play/pause all tracks
    if (isAnyTrackPlaying) {
        Object.values(tracks).forEach(track => {
            if (track.isPlaying && track.audio.paused) track.audio.play();
        });
    } else {
        Object.values(tracks).forEach(track => track.audio.pause());
    }

    // Mute/solo all tracks
    if (isAnyTrackMuted) {
        Object.values(tracks).forEach(track => {
            if (!track.isMuted) track.audio.muted = true;
        });
    } else {
        Object.values(tracks).forEach(track => track.audio.muted = false);
    }
}
