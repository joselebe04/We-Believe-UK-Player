const tracks = {
    soprano: { audio: new Audio('Tracks/Soprano.mp3'), isPlaying: false, isMuted: false, isSolo: false, volume: 1 },
    alto: { audio: new Audio('Tracks/Alto.mp3'), isPlaying: false, isMuted: false, isSolo: false, volume: 1 },
    tenor: { audio: new Audio('Tracks/Tenor.mp3'), isPlaying: false, isMuted: false, isSolo: false, volume: 1 },
    bass: { audio: new Audio('Tracks/Bass.mp3'), isPlaying: false, isMuted: false, isSolo: false, volume: 1 }
};

// Initialize waveforms
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

const waves = {
    soprano: createWaveform('soprano'),
    alto: createWaveform('alto'),
    tenor: createWaveform('tenor'),
    bass: createWaveform('bass')
};

// Single Play/Pause button for all tracks
document.getElementById('play-pause-all').addEventListener('click', () => {
    const allPlaying = Object.values(tracks).every(track => track.isPlaying);

    // Toggle play/pause for all tracks
    if (allPlaying) {
        Object.values(tracks).forEach(track => track.audio.pause());
        document.getElementById('play-pause-all').textContent = 'Play All';
    } else {
        Object.values(tracks).forEach(track => track.audio.play());
        document.getElementById('play-pause-all').textContent = 'Pause All';
    }

    // Update play state
    Object.values(tracks).forEach(track => track.isPlaying = !allPlaying);
});

// Mute/solo buttons
document.querySelectorAll('.mute').forEach(button => {
    button.addEventListener('click', () => {
        const trackName = button.dataset.track;
        const track = tracks[trackName];

        // Toggle mute
        if (track.isMuted) {
            track.audio.muted = false;
            button.textContent = 'Mute';
        } else {
            track.audio.muted = true;
            button.textContent = 'Unmute';
        }
        track.isMuted = !track.isMuted;
    });
});

document.querySelectorAll('.solo').forEach(button => {
    button.addEventListener('click', () => {
        const trackName = button.dataset.track;
        const track = tracks[trackName];

        // Toggle solo
        if (track.isSolo) {
            track.audio.muted = false;
            button.textContent = 'Solo';
        } else {
            track.audio.muted = true;
            button.textContent = 'Unsolo';
        }
        track.isSolo = !track.isSolo;

        // Muting other tracks when solo is active
        if (track.isSolo) {
            Object.values(tracks).forEach(otherTrack => {
                if (otherTrack !== track) otherTrack.audio.muted = true;
            });
        } else {
            Object.values(tracks).forEach(otherTrack => otherTrack.audio.muted = otherTrack.isMuted);
        }
    });
});
