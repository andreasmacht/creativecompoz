/////////////////
///p5js tryaudio recording
///sketch_tryAudioP5.js
/////////////////
sketch1 = function(s){
  var mic, recorder, soundFile;

  var state = 0; // mousePress will increment from Record, to Stop, to Play

  s.setup = function() {
    s.createCanvas(300, 200);
    s.background(200);
    s.fill(0);
    s.text('Enable mic and click the mouse to begin recording', 20, 20);

    // create an audio in
    mic = new p5.AudioIn();

    // users must manually enable their browser microphone for recording to work properly!
    mic.start();

    // create a sound recorder
    recorder = new p5.SoundRecorder();

    // connect the mic to the recorder
    recorder.setInput(mic);

    // create an empty sound file that we will use to playback the recording
    soundFile = new p5.SoundFile();
  }

  s.mousePressed = function() {
    // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
    if (state === 0 && mic.enabled) {

      // Tell recorder to record to a p5.SoundFile which we will use for playback
      recorder.record(soundFile);

      s.background(255,0,0);
      s.text('Recording now! Click to stop.', 20, 20);
      state++;
    }

    else if (state === 1) {
      recorder.stop(); // stop recorder, and send the result to soundFile

      s.background(0,255,0);
      s.text('Recording stopped. Click to play & save', 20, 20);
      state++;
    }

    else if (state === 2) {
      soundFile.play(); // play the result!
      s.saveSound(soundFile, 'mySound.wav'); // save file
      state++;
      
    }
  }
}