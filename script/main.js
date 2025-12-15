// Flags to coordinate audio and visuals
let __dataReady = false;
let __audioStarted = false;
let __visualsStarted = false;
// enable verbose diagnostics
const __debug = true;

// Helper: start visuals when both data and audio are ready (or when audio is intentionally skipped)
const startVisualsIfReady = () => {
  if (__visualsStarted) return;
  if (!__dataReady) return;
  // If audio hasn't started yet, wait (visuals will be started when audio starts).
  if (!__audioStarted) return;
  if (__debug) console.log('[diagnostic] startVisualsIfReady: conditions met, starting visuals');
  __visualsStarted = true;
  animationTimeline();
};

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Mark data ready and attempt to start visuals
        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          __dataReady = true;
          startVisualsIfReady();
        }
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    /* chat messages appear while the chat box is visible */
    .staggerFrom(
      ".chat-msg",
      0.6,
      {
        opacity: 0,
        y: 10
      },
      0.45
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    );

  /* Balloons animation moved to the very end so they don't overlay text */
  tl.staggerFromTo(
    ".baloons img",
    3.2,
    {
      opacity: 0.9,
      y: 1400
    },
    {
      opacity: 1,
      y: -1200,
      ease: Expo.easeOut
    },
    0.18
  );

  // When timeline completes, trigger confetti and sparkles to create a "wow" finish
  tl.eventCallback('onComplete', () => {
    launchConfetti();
    createSparkles();
  });

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

/* ---------- Visual wow helpers: confetti and sparkles ---------- */
function launchConfetti() {
  const stage = document.querySelector('.confetti');
  if (!stage) return;
  // create 40 pieces
  const colors = ['#ff6b6b','#ffd166','#6bf178','#6bd4ff','#c78bff','#ff9ad6'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'piece';
    const left = Math.random() * 100;
    el.style.left = left + 'vw';
    el.style.top = (-10 - Math.random() * 10) + 'vh';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    stage.appendChild(el);

    const duration = 2 + Math.random() * 2;
    TweenMax.to(el, duration, {
      y: 100 + Math.random() * 120 + 'vh',
      rotation: Math.random() * 720,
      x: (-50 + Math.random() * 100) + 'px',
      opacity: 0,
      ease: Power1.easeOut,
      onComplete: () => el.remove()
    });
  }
}

function createSparkles() {
  const container = document.querySelector('.container');
  const wish = document.querySelector('.wish-hbd');
  if (!container || !wish) return;
  const rect = wish.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  // create sparkles around the wish text
  const count = 12;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const cx = rect.left - containerRect.left + Math.random() * rect.width;
    const cy = rect.top - containerRect.top + Math.random() * rect.height;
    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    container.appendChild(s);

    const dx = (-40 + Math.random() * 80);
    const dy = (-60 + Math.random() * -10);
    const dur = 0.9 + Math.random() * 0.8;
    TweenMax.fromTo(s, dur, {scale: 0, opacity: 1}, {x: dx, y: dy, scale: 1.4, opacity: 0, ease: Expo.easeOut, onComplete: () => s.remove()});
  }
}

// Run fetch and animation in sequence
fetchData();

/* ---------------- Music player integration ---------------- */
(() => {
  const audio = document.getElementById("bg-audio");
  const toggle = document.getElementById("music-toggle");
  const volume = document.getElementById("music-volume");

  // Helpful diagnostics: expose audio src and enable anonymous CORS to detect header issues
  if (audio && audio.querySelector('source')) {
    const srcEl = audio.querySelector('source');
    if (__debug) console.log('[diagnostic] audio source element src=', srcEl.getAttribute('src'));
    try { audio.crossOrigin = 'anonymous'; } catch (e) { if (__debug) console.warn('[diagnostic] set crossOrigin failed', e); }
  }

  // synth fallback state
  let audioCtx = null;
  let synthNodes = [];
  let isSynthPlaying = false;
  // track whether a user gesture has occurred (required to create/resume AudioContext)
  let userGestureOccurred = false;
  // if a melody was requested before a gesture, remember to play it after
  let pendingPlayMelody = false;
  const sourceEl = audio ? audio.querySelector('source') : null;
  let hasSource = !!(sourceEl && sourceEl.getAttribute('src'));

  // If audio element missing, nothing to do
  if (!audio || !toggle || !volume) return;

  // Initialize volume from control
  audio.volume = parseFloat(volume.value) || 0.7;

  // Update volume when slider changes
  volume.addEventListener("input", e => {
    audio.volume = parseFloat(e.target.value);
  });

  // Toggle play/pause with button; due to autoplay policies, only user gesture can start audio
  const setPlayingState = playing => {
    toggle.classList.toggle("playing", playing);
    toggle.innerText = playing ? "⏸" : "▶";
    toggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  };

  // Simple webaudio synth to play a short 'Happy Birthday' melody when no file is provided
  const ensureAudioCtx = () => {
    if (!audioCtx) {
      // only create AudioContext after a user gesture
      if (!userGestureOccurred) {
        if (__debug) console.log('[diagnostic] ensureAudioCtx: creation blocked (no user gesture yet)');
        return null;
      }
      if (__debug) console.log('[diagnostic] ensureAudioCtx: creating AudioContext');
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  };

  const playNote = (freq, start, dur, ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur - 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + dur);
    synthNodes.push(osc);
  };

  const playMelody = () => {
    if (isSynthPlaying) return;
    // ensure we have an AudioContext before creating oscillators
    const ctx = ensureAudioCtx();
    if (!ctx) {
      pendingPlayMelody = true;
      if (__debug) console.log('[diagnostic] playMelody: pending until user gesture');
      return;
    }
    isSynthPlaying = true;
    setPlayingState(true);
    if (__debug) console.log('[diagnostic] playMelody: starting synth melody');
    // synth is now playing — mark audio started so visuals can proceed
    __audioStarted = true;
    startVisualsIfReady();
    const now = ctx.currentTime + 0.05;
    // Simple Happy Birthday (note frequencies in Hz)
    const notes = [392,392,440,392,523,494, // Happy birthday to you
                   392,392,440,392,587,523, // Happy birthday to you
                   392,392,784,659,523,494,440, // Happy birthday dear ...
                   698,698,659,523,587,523]; // Happy birthday to you
    const durations = [0.36,0.18,0.54,0.54,0.54,0.84,
                       0.36,0.18,0.54,0.54,0.54,0.84,
                       0.36,0.18,0.54,0.54,0.54,0.54,1.0,
                       0.36,0.18,0.54,0.54,0.54,1.0];
    let t = now;
    for (let i = 0; i < notes.length; i++) {
      playNote(notes[i], t, durations[i], ctx);
      t += durations[i];
    }
    // mark finished
    setTimeout(() => {
      isSynthPlaying = false;
      setPlayingState(false);
    }, (t - now) * 1000 + 200);
  };

  const stopSynth = () => {
    if (!audioCtx) return;
    try {
      synthNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    } catch (e) {}
    synthNodes = [];
    isSynthPlaying = false;
    setPlayingState(false);
  };

  // Try to play audio and handle promise for autoplay policies; fall back to synth if no source or if play fails
  const tryPlay = async () => {
    if (!hasSource) {
      playMelody();
      return;
    }
    if (__debug) console.log('[diagnostic] tryPlay: attempting audio.play()', {src: sourceEl ? sourceEl.getAttribute('src') : null});
    try {
      await audio.play();
      if (__debug) console.log('[diagnostic] tryPlay: audio.play() succeeded');
      setPlayingState(true);
      // audio element began playback — mark audio started and start visuals
      __audioStarted = true;
      startVisualsIfReady();
    } catch (err) {
      if (__debug) console.warn('[diagnostic] tryPlay: audio.play() failed', err);
      // Play failed (autoplay blocked) — fallback to synth
      playMelody();
    }
  };

  // Attach user gesture on toggle button
  toggle.addEventListener("click", async e => {
    if (__debug) console.log('[diagnostic] toggle click');
    // mark that a user gesture occurred so creating/resuming AudioContext is allowed
    userGestureOccurred = true;
    if (audioCtx && audioCtx.state === 'suspended') {
      try { await audioCtx.resume(); } catch (e) {}
    } else {
      try { ensureAudioCtx(); } catch (e) {}
    }

    if (!hasSource) {
      // use synth fallback toggle
      if (!isSynthPlaying) {
        playMelody();
      } else {
        stopSynth();
      }
      return;
    }
    if (audio.paused) {
      await tryPlay();
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  // If user interacts anywhere on the container, attempt to start audio once
  const oneGesturePlayback = async () => {
    if (__debug) console.log('[diagnostic] pointerdown gesture detected');
    userGestureOccurred = true;
    // If an AudioContext was created and is suspended, resume it on gesture.
    if (audioCtx && audioCtx.state === 'suspended') {
      try { await audioCtx.resume(); } catch (e) { if (__debug) console.warn('[diagnostic] resume failed', e); }
    } else {
      try { ensureAudioCtx(); } catch (e) { if (__debug) console.warn('[diagnostic] ensureAudioCtx threw', e); }
    }
    // If a melody was requested earlier, play it now
    if (pendingPlayMelody) {
      pendingPlayMelody = false;
      playMelody();
    }
    tryPlay();
  };
  document.body.addEventListener('pointerdown', oneGesturePlayback, { once: true });

  // When animation restarts, ensure audio is playing
  const replayBtn = document.getElementById("replay");
  if (replayBtn) {
    replayBtn.addEventListener('click', async () => {
      userGestureOccurred = true;
      if (audioCtx && audioCtx.state === 'suspended') {
        try { await audioCtx.resume(); } catch (e) {}
      } else {
        try { ensureAudioCtx(); } catch (e) {}
      }
      if (!hasSource) {
        // start synth on click
        playMelody();
        return;
      }
      if (audio.paused) {
        // try to play on user click
        tryPlay();
      }
    });
  }

  // Handle audio load error gracefully — switch to synth fallback
  audio.addEventListener('error', (ev) => {
    if (__debug) console.error('[diagnostic] audio error event', ev, audio.error);
    hasSource = false;
    toggle.title = 'No audio file found — using built-in melody instead';
  });

  // Additional diagnostic listeners to help determine why audio plays silently
  audio.addEventListener('loadedmetadata', () => {
    if (__debug) console.log('[diagnostic] loadedmetadata: duration=', audio.duration, 'readyState=', audio.readyState, 'networkState=', audio.networkState);
  });
  audio.addEventListener('canplay', () => {
    if (__debug) console.log('[diagnostic] canplay event: muted=', audio.muted, 'volume=', audio.volume, 'readyState=', audio.readyState);
  });
  audio.addEventListener('canplaythrough', () => {
    if (__debug) console.log('[diagnostic] canplaythrough: audio should be playable to the end');
  });
  audio.addEventListener('stalled', () => { if (__debug) console.warn('[diagnostic] audio stalled (network)'); });
  audio.addEventListener('suspend', () => { if (__debug) console.log('[diagnostic] audio suspend'); });
  audio.addEventListener('waiting', () => { if (__debug) console.log('[diagnostic] audio waiting for data'); });

  // Keep UI in sync with audio element events
  audio.addEventListener('playing', () => {
    __audioStarted = true;
    startVisualsIfReady();
  });
  audio.addEventListener('play', () => { if (__debug) console.log('[diagnostic] audio event: play'); });
  audio.addEventListener('pause', () => { if (__debug) console.log('[diagnostic] audio event: pause'); });
  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));

  // Best-effort autoplay attempt on load. Modern browsers may block audible autoplay.
  const autoStartMusic = async () => {
    // If there is a source, try to play it immediately
    if (hasSource) {
      try {
        await audio.play();
        __audioStarted = true;
        startVisualsIfReady();
        return;
      } catch (e) {
        // First attempt failed. Try muted autoplay (some browsers allow muted autoplay), then unmute.
        try {
          audio.muted = true;
          await audio.play();
          __audioStarted = true;
          startVisualsIfReady();
          // try to unmute after a short delay; this may still be blocked in many browsers.
          setTimeout(() => {
            audio.muted = false;
            audio.volume = parseFloat(volume.value) || 0.7;
          }, 600);
          return;
        } catch (e2) {
          // muted autoplay also failed; fall back to synth attempt
        }
      }
    }
    // No source or autoplay blocked — show a click overlay so user can enable sound.
    const showEnableSoundOverlay = () => {
      if (__debug) console.log('[diagnostic] showEnableSoundOverlay: showing overlay to request user gesture');
      const overlay = document.createElement('div');
      overlay.className = 'enable-sound-overlay';
      overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);color:#fff;z-index:9999;font-family:Work Sans, sans-serif;';
      const box = document.createElement('div');
      box.style.cssText = 'text-align:center;padding:18px 24px;background:rgba(0,0,0,0.6);border-radius:8px;cursor:pointer;';
      box.innerText = 'Click to enable sound and start the experience';
      overlay.appendChild(box);
      overlay.addEventListener('pointerdown', () => {
        if (__debug) console.log('[diagnostic] showEnableSoundOverlay: overlay clicked, invoking gesture handler');
        try { document.body.removeChild(overlay); } catch (e) {}
        // trigger the same gesture handler to resume/create audio and start visuals
        oneGesturePlayback();
      }, { once: true });
      document.body.appendChild(overlay);
    };

    // show overlay to get user gesture
    showEnableSoundOverlay();
  };

  // try auto-start shortly after load (gives browser a moment to initialize)
  setTimeout(autoStartMusic, 200);

})();