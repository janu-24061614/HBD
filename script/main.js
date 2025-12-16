// Audio management
const audioManager = {
  backgroundMusic: null,
  celebrationSound: null,
  popSound: null,
  isMuted: false,
  
  init() {
    try {
      this.backgroundMusic = new Audio('audio/background-music.mp3');
      
      // Configure audio properties
      if (this.backgroundMusic) {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
      }
    } catch (error) {
      console.log('Audio files not found, continuing without audio');
    }
  },
  
  playBackground() {
    if (this.backgroundMusic && !this.isMuted) {
      // Try to play, but handle Chrome's autoplay policy
      const playPromise = this.backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Background music autoplay blocked by browser - user interaction required');
          // Show a subtle notification that user can click to enable music
          this.showMusicPrompt();
        });
      }
    }
  },

  showMusicPrompt() {
    // Create a subtle music prompt overlay
    const musicPrompt = document.createElement('div');
    musicPrompt.id = 'music-prompt';
    musicPrompt.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 2000;
        cursor: pointer;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        animation: fadeIn 0.5s ease;
      ">
        🎵 Click to enable background music
      </div>
    `;
    
    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(musicPrompt);
    
    // Enable music on click
    musicPrompt.addEventListener('click', () => {
      this.backgroundMusic.play();
      musicPrompt.remove();
      style.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (musicPrompt.parentNode) {
        musicPrompt.remove();
        style.remove();
      }
    }, 5000);
  },
  
  playCelebration() {
    // Celebration sound disabled (file not available)
  },
  
  playPop() {
    // Pop sound disabled (file not available)
  },
  
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAll();
    }
    return this.isMuted;
  },
  
  stopAll() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }
};

// Import the data to customize and insert them into page
const fetchData = () => {
  // Add loading state with cinematic entrance
  const container = document.querySelector('.container');
  container.classList.add('loading');
  
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
        // Run animation if so
        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          // Dramatic transition from loading to content after 1 second
          setTimeout(() => {
            container.classList.remove('loading');
            // Initialize audio manager
            audioManager.init();
            // Setup audio controls
            setupAudioControls();
            // Add interactive effects
            addInteractiveEffects();
            // Start cinematic animation timeline
            animationTimeline();
          }, 1000);
        } 
      });
    })
    .catch(error => {
      console.error('Error loading customization data:', error);
      // Remove loading state even on error after delay
      setTimeout(() => {
        container.classList.remove('loading');
        // Initialize with defaults
        audioManager.init();
        setupAudioControls();
        animationTimeline();
      }, 1000);
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

  // Responsive animation values based on screen size
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
  const isLandscape = window.innerWidth > window.innerHeight;
  
  // Adjust animation values for different screen sizes
  const animationScale = isMobile ? 0.7 : isTablet ? 0.85 : 1;
  const balloonDistance = isMobile ? 800 : isTablet ? 1000 : 1400;
  const balloonEndY = isMobile ? -600 : isTablet ? -800 : -1000;

  const ideaTextTrans = {
    opacity: 0,
    y: isMobile ? -15 : -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: isMobile ? 15 : 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .call(() => {
      // Start background music when animation begins
      audioManager.playBackground();
    })
    // Simple container entrance without blur
    .from(".container", 0.8, {
      opacity: 0,
      ease: Power2.easeOut
    }, 0)
    .from(".one", 0.5, {
      opacity: 0,
      y: 10,
      ease: Power2.easeOut
    }, "-=0.5")
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
      ease: Power2.easeOut
    }, "-=0.2")
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
    .from(".three", 0.4, {
      opacity: 0,
      y: 10,
      ease: Power2.easeOut
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
      scale: 0.8,
      opacity: 0,
      ease: Power2.easeOut
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
      1.2,
      {
        rotationX: 45,
        rotationZ: -20,
        skewY: "-10deg",
        scale: 0.7,
        opacity: 0,
        ease: Back.easeOut.config(1.5),
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
      1.5,
      {
        scale: 5,
        opacity: 0,
        rotation: 360,
        y: -200,
        transformOrigin: "center center",
        ease: Bounce.easeOut
      },
      0.3
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
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: balloonDistance
      },
      {
        opacity: 1,
        y: balloonEndY
      },
      0.2
    )
    .call(() => {
      // Play pop sound when balloons appear
      audioManager.playPop();
    }, null, "-=2")
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
      1.2,
      {
        opacity: 0,
        y: -100,
        scale: 0.2,
        rotation: 720,
        skewX: "45deg",
        transformOrigin: "center bottom",
        ease: Back.easeOut.config(2.5)
      },
      0.15
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
    .call(() => {
      // Play celebration sound during the party moment
      audioManager.playCelebration();
      // Trigger confetti effect
      triggerConfetti();
    }, null, "party")
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
    .call(() => {
      // Trigger floating hearts
      triggerFloatingHearts();
    }, null, "-=3")
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
    )
    // Add new content sections to animation timeline
    .from(".ten", 1, {
      opacity: 0,
      y: 50,
      scale: 0.8
    }, "+=1")
    .to(".ten", 0.8, {
      opacity: 0,
      y: -50
    }, "+=3")
    .from(".eleven", 1, {
      opacity: 0,
      x: -100
    })
    .staggerFrom(".wish-item", 0.6, {
      opacity: 0,
      x: -50,
      rotationY: 90
    }, 0.3, "-=0.5")
    .to(".eleven", 0.8, {
      opacity: 0,
      x: 100
    }, "+=4")
    .from(".twelve", 1, {
      opacity: 0,
      scale: 0.5,
      rotationX: 45
    })
    .to(".twelve", 0.8, {
      opacity: 0,
      y: -100
    }, "+=4");

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    audioManager.stopAll();
    tl.restart();
  });
};

// Audio control functionality
const setupAudioControls = () => {
  const muteBtn = document.getElementById("muteBtn");
  let isMuted = false;
  
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    
    if (isMuted) {
      audioManager.stopAll();
      muteBtn.textContent = "🔇";
      muteBtn.classList.add("muted");
      audioManager.isMuted = true;
    } else {
      muteBtn.textContent = "🔊";
      muteBtn.classList.remove("muted");
      audioManager.isMuted = false;
    }
  });
};

// Enhanced audio manager with mute functionality
audioManager.isMuted = false;
const originalPlayBackground = audioManager.playBackground;
const originalPlayCelebration = audioManager.playCelebration;
const originalPlayPop = audioManager.playPop;

audioManager.playBackground = function() {
  if (!this.isMuted) originalPlayBackground.call(this);
};

audioManager.playCelebration = function() {
  if (!this.isMuted) originalPlayCelebration.call(this);
};

audioManager.playPop = function() {
  if (!this.isMuted) originalPlayPop.call(this);
};

// Visual effects functions
const triggerConfetti = () => {
  const confetti = document.querySelector('.confetti');
  confetti.style.opacity = '1';
  
  setTimeout(() => {
    confetti.style.opacity = '0';
  }, 4000);
};

const triggerFloatingHearts = () => {
  const hearts = document.querySelector('.floating-hearts');
  hearts.style.opacity = '1';
  
  setTimeout(() => {
    hearts.style.opacity = '0';
  }, 8000);
};

// Enhanced text animations
const createTextSparkle = (element) => {
  const sparkles = ['✨', '⭐', '💫', '🌟'];
  const sparkle = document.createElement('span');
  sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  sparkle.style.position = 'absolute';
  sparkle.style.fontSize = '1rem';
  sparkle.style.animation = 'sparkle 1s ease-out forwards';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.pointerEvents = 'none';
  
  element.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
};

// Interactive hover effects
const addInteractiveEffects = () => {
  const replayBtn = document.getElementById('replay');
  const audioBtn = document.getElementById('muteBtn');
  
  // Add sparkle effect on hover
  [replayBtn, audioBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('mouseenter', () => {
        createTextSparkle(btn.parentElement);
      });
      
      btn.addEventListener('click', () => {
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      });
    }
  });
  
  // Add typing effect to text elements
  const addTypingEffect = (selector, delay = 0) => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element && element.textContent) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #fff';
        
        let i = 0;
        const typeInterval = setInterval(() => {
          element.textContent += text[i];
          i++;
          if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
              element.style.borderRight = 'none';
            }, 500);
          }
        }, 50);
      }
    }, delay);
  };
};

// Run fetch and animation in sequence
fetchData();