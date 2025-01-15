// Initialize WaveSurfer instances for each track
const waveforms = {
  soprano: WaveSurfer.create({
    container: '#waveform-soprano',
    waveColor: '#ddd',
    progressColor: '#4CAF50',
    responsive: true
  }),
  alto: WaveSurfer.create({
    container: '#waveform-alto',
    waveColor: '#ddd',
    progressColor: '#4CAF50',
    responsive: true
  }),
  tenor: WaveSurfer.create({
    container: '#waveform-tenor',
    waveColor: '#ddd',
    progressColor: '#4CAF50',
    responsive: true
  }),
  bass: WaveSurfer.create({
    container: '#waveform-bass',
    waveColor: '#ddd',
    progressColor: '#4CAF50',
    responsive: true
  })
};

// Load audio files
waveforms.soprano.load('Tracks/Soprano.mp3');
waveforms.alto.load('Tracks/Alto.mp3');
waveforms.tenor.load('Tracks/Tenor.mp3');
waveforms.bass.load('Tracks/Bass.mp3');

// Control functions
function playAll() {
  Object.keys(tracks).forEach((key) => {
    if (!tracks[key].isPlaying()) {
      tracks[key].play();
    }
  });
}

function pauseAll() {
  Object.keys(tracks).forEach((key) => {
    if (tracks[key].isPlaying()) {
      tracks[key].pause();
    }
  });
}

const tracks = waveforms;
function playPause(track) {
  const waveform = tracks[track];
  waveform.isPlaying() ? waveform.pause() : waveform.play();
}

function muteToggle(track) {
  const waveform = tracks[track];
  waveform.setMute(!waveform.getMute());
}

function solo(track) {
  Object.keys(tracks).forEach(key => {
    const waveform = tracks[key];
    waveform.setMute(key !== track);
  });
}

function adjustVolume(track, value) {
  const waveform = tracks[track];
  waveform.setVolume(value);
}

function loopToggle(track) {
  const waveform = tracks[track];
  const isLooping = waveform.loop || false; // Check if already looping
  waveform.loop = !isLooping; // Toggle looping
  alert(`${track} loop is now ${waveform.loop ? "enabled" : "disabled"}`);
}

// Event listeners for volume and UI updates
document.querySelectorAll('input[type="range"]').forEach(input => {
  input.addEventListener('input', (event) => {
    const track = event.target.closest('.track').id;
    adjustVolume(track, event.target.value);
  });
});
