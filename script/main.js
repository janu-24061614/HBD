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
        // Run amimation if so
        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          animationTimeline();
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

  // synth fallback state
  let audioCtx = null;
  let synthNodes = [];
  let isSynthPlaying = false;
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
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  };

  const playNote = (freq, start, dur) => {
    const ctx = ensureAudioCtx();
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
    isSynthPlaying = true;
    setPlayingState(true);
    const ctx = ensureAudioCtx();
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
      playNote(notes[i], t, durations[i]);
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
    try {
      await audio.play();
      setPlayingState(true);
    } catch (err) {
      // Play failed (autoplay blocked) — fallback to synth
      playMelody();
    }
  };

  // Attach user gesture on toggle button
  toggle.addEventListener("click", async e => {
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
  const oneGesturePlayback = () => {
    // If an AudioContext was created and is suspended, resume it on gesture.
    if (audioCtx && audioCtx.state === 'suspended') {
      try { audioCtx.resume(); } catch (e) {}
    }
    tryPlay();
  };
  document.body.addEventListener('pointerdown', oneGesturePlayback, { once: true });

  // When animation restarts, ensure audio is playing
  const replayBtn = document.getElementById("replay");
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
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
  audio.addEventListener('error', () => {
    hasSource = false;
    toggle.title = 'No audio file found — using built-in melody instead';
  });

  // Keep UI in sync with audio element events
  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));

  // Best-effort autoplay attempt on load. Modern browsers may block audible autoplay.
  const autoStartMusic = async () => {
    // If there is a source, try to play it immediately
    if (hasSource) {
      try {
        await audio.play();
        return;
      } catch (e) {
        // First attempt failed. Try muted autoplay (some browsers allow muted autoplay), then unmute.
        try {
          audio.muted = true;
          await audio.play();
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

    // No source or autoplay blocked — do not start the synth here.
    // Creating a WebAudio AudioContext or starting oscillators must happen
    // during a user gesture; the existing `pointerdown` handler will trigger playback.
  };

  // try auto-start shortly after load (gives browser a moment to initialize)
  setTimeout(autoStartMusic, 200);

})();