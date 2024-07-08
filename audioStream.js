var mediaStreamSource = null;

function audioStream(stream) {
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  meter = createAudioMeter(audioContext);
  mediaStreamSource.connect(meter);

  audioDetection(DEFAULT_PARAMETERS_CONFIGURATION);

  audioRecorder(stream);
}
