document.addEventListener('DOMContentLoaded', () => {
  const sopranoAudio = new Audio('Tracks/Soprano.mp3');
  const altoAudio = new Audio('Tracks/Alto.mp3');
  const tenorAudio = new Audio('Tracks/Tenor.mp3');
  const bassAudio = new Audio('Tracks/Bass.mp3');

  const sopranoWaveform = WaveSurfer.create({
    container: '#soprano-waveform',
    waveColor: '#225588',
    progressColor: '#1f4770',
    cursorColor: '#1f4770',
    height: 100,
    barWidth: 2
  });

  const altoWaveform = WaveSurfer.create({
    container: '#alto-waveform',
    waveColor: '#225588',
    progressColor: '#1f4770',
    cursorColor: '#1f4770',
    height: 100,
    barWidth: 2
  });

  const tenorWaveform = WaveSurfer.create({
    container: '#tenor-waveform',
    waveColor: '#225588',
    progressColor: '#1f4770',
    cursorColor: '#1f4770',
    height: 100,
    barWidth: 2
  });

  const bassWaveform = WaveSurfer.create({
    container: '#bass-waveform',
    waveColor: '#225588',
    progressColor: '#1f4770',
    cursorColor: '#1f4770',
    height: 100,
    barWidth: 2
  });

  // Load the audio tracks into the waveforms
  sopranoWaveform.load(sopranoAudio);
  altoWaveform.load(altoAudio);
  tenorWaveform.load(tenorAudio);
  bassWaveform.load(bassAudio);

  const playPauseBtn = document.getElementById('play-pause-btn');
  let isPlaying = false;

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      sopranoWaveform.pause();
      altoWaveform.pause();
      tenorWaveform.pause();
      bassWaveform.pause();
      playPauseBtn.textContent = 'Play';
    } else {
      sopranoWaveform.play();
      altoWaveform.play();
      tenorWaveform.play();
      bassWaveform.play();
      playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  });

  // Sync the volume controls
  document.getElementById('soprano-volume').addEventListener('input', (e) => {
    sopranoAudio.volume = e.target.value;
  });

  document.getElementById('alto-volume').addEventListener('input', (e) => {
    altoAudio.volume = e.target.value;
  });

  document.getElementById('tenor-volume').addEventListener('input', (e) => {
    tenorAudio.volume = e.target.value;
  });

  document.getElementById('bass-volume').addEventListener('input', (e) => {
    bassAudio.volume = e.target.value;
  });

  // Mute/Unmute buttons
  document.getElementById('soprano-mute').addEventListener('click', () => {
    sopranoAudio.muted = !sopranoAudio.muted;
    document.getElementById('soprano-volume').value = sopranoAudio.muted ? 0 : 1;
  });

  document.getElementById('alto-mute').addEventListener('click', () => {
    altoAudio.muted = !altoAudio.muted;
    document.getElementById('alto-volume').value = altoAudio.muted ? 0 : 1;
  });

  document.getElementById('tenor-mute').addEventListener('click', () => {
    tenorAudio.muted = !tenorAudio.muted;
    document.getElementById('tenor-volume').value = tenorAudio.muted ? 0 : 1;
  });

  document.getElementById('bass-mute').addEventListener('click', () => {
    bassAudio.muted = !bassAudio.muted;
    document.getElementById('bass-volume').value = bassAudio.muted ? 0 : 1;
  });

  // Sync the time-stamp display
  function updateTimeStamp() {
    const time = sopranoAudio.currentTime;
    document.getElementById('time-stamp').textContent = formatTime(time);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = Math.floor(seconds % 60);
    return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
  }

  // Update time-stamp and locator line
  setInterval(updateTimeStamp, 100);

  // Sync the waveforms with a single locator line
  [sopranoWaveform, altoWaveform, tenorWaveform, bassWaveform].forEach((waveform) => {
    waveform.on('audioprocess', () => {
      const progress = waveform.getCurrentTime() / waveform.getDuration();
      [sopranoWaveform, altoWaveform, tenorWaveform, bassWaveform].forEach((wave) => {
        wave.seekTo(progress);
      });
    });
  });
});
