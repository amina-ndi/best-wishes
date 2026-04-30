// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Global variables
let musicPlaying = false;
let currentSection = 'homepage';
let confettiInterval;
let gameScore = 0;
let gameTimeLeft = 30;
let gameInterval;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createFloatingHearts();
    setupEventListeners();
    checkForBirthdayWish(); // Check for birthday wish at midnight
    setInterval(checkForBirthdayWish, 60000); // Check every minute
    
    // Try to start music immediately on page load
    setTimeout(() => {
        startMusicAutomatically();
    }, 1000);
    
    // Setup hover music effects after elements are loaded
    setTimeout(() => {
        addHoverMusicEffects();
    }, 2000);
    
    // Setup click sounds after elements are loaded
    setTimeout(() => {
        addClickSounds();
    }, 2500);
});

// Start music automatically on page load
function startMusicAutomatically() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Set audio volume to a reasonable level
    bgMusic.volume = 0.3;
    
    // Try to play music immediately
    const attemptPlay = () => {
        bgMusic.play().then(() => {
            musicPlaying = true;
            showNotification('🎵 Romantic music started automatically');
            console.log('Music autoplay successful');
        }).catch(error => {
            console.log('Autoplay blocked, setting up user interaction fallback');
            setupUserInteractionFallback();
        });
    };
    
    // Try immediate autoplay
    attemptPlay();
    
    // Also try after a short delay (some browsers need this)
    setTimeout(attemptPlay, 100);
    
    // And try again after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(attemptPlay, 500);
    });
}

// Setup fallback for user interaction
function setupUserInteractionFallback() {
    const bgMusic = document.getElementById('bgMusic');
    
    const startMusicOnInteraction = (e) => {
        // Only proceed if music is not already playing
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                showNotification('🎵 Music started - Enjoy the romantic atmosphere!');
                console.log('Music started via user interaction');
            }).catch(error => {
                console.log('Music play failed:', error);
                showNotification('🎵 Add your birthday-song.mp3 file for background music');
            });
            
            // Remove all event listeners after successful start
            document.removeEventListener('click', startMusicOnInteraction);
            document.removeEventListener('keydown', startMusicOnInteraction);
            document.removeEventListener('touchstart', startMusicOnInteraction);
            document.removeEventListener('mousedown', startMusicOnInteraction);
        }
    };
    
    // Add multiple event listeners for better compatibility
    document.addEventListener('click', startMusicOnInteraction, { once: false });
    document.addEventListener('keydown', startMusicOnInteraction, { once: false });
    document.addEventListener('touchstart', startMusicOnInteraction, { once: false });
    document.addEventListener('mousedown', startMusicOnInteraction, { once: false });
    
    console.log('User interaction fallback setup complete');
}

// Create animated stars
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💕';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }
    }, 2000);
}

// Show different sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 50);
        currentSection = sectionId;
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Play section-specific music or effects
        if (sectionId === 'birthday') {
            createConfetti();
            playBirthdayMusic();
            playBirthdayBackgroundSound();
        }
    }
}

// Play birthday background sound
function playBirthdayBackgroundSound() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Start music if not playing
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            console.log('Birthday background music started');
            
            // Set music to play continuously
            bgMusic.loop = true;
            bgMusic.volume = 0.4;
        }).catch(e => {
            console.log('Birthday music play failed:', e);
        });
    }
    
    // Create birthday effects
    createBirthdayHearts();
    createBirthdayStars();
    AOS.refresh();
}

// Create floating hearts for birthday page
function createBirthdayHearts() {
    const heartsContainer = document.querySelector('.floating-hearts-birthday');
    if (!heartsContainer) return;
    
    // Clear existing hearts
    heartsContainer.innerHTML = '';
    
    // Create many more hearts for magical effect
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'birthday-heart';
        
        // Different heart emojis for variety
        const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 6) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        heartsContainer.appendChild(heart);
    }
}

// Create stars for birthday page
function createBirthdayStars() {
    const starsContainer = document.querySelector('.birthday-stars');
    if (!starsContainer) return;
    
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    // Create many more stars for magical effect
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'birthday-star';
        
        // Different star emojis for variety
        const starEmojis = ['✨', '⭐', '🌟', '💫', '✦', '✧'];
        star.innerHTML = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.fontSize = (8 + Math.random() * 20) + 'px';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Play music on any interaction
function playMusicOnInteraction() {
    const bgMusic = document.getElementById('bgMusic');
    
    // If music is not playing, try to start it
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            console.log('Music started on interaction');
            
            // Set music to play for 5 seconds then stop
            setTimeout(() => {
                if (musicPlaying && !bgMusic.paused) {
                    bgMusic.pause();
                    musicPlaying = false;
                    console.log('Music stopped after 5 seconds');
                }
            }, 5000);
        }).catch(e => {
            console.log('Music play failed on interaction:', e);
        });
    }
}

// Play music for 5 seconds on hover
function playMusicOnHover() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Start music if not playing
    if (!musicPlaying) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            console.log('Music started on hover');
            
            // Store timeout reference
            window.hoverMusicTimeout = setTimeout(() => {
                if (musicPlaying && !bgMusic.paused) {
                    bgMusic.pause();
                    musicPlaying = false;
                    console.log('Music stopped after 5 seconds hover');
                }
            }, 5000);
        }).catch(e => {
            console.log('Music play failed on hover:', e);
        });
    }
}

// Stop music when hover ends
function stopMusicOnHoverEnd() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Clear the timeout if it exists
    if (window.hoverMusicTimeout) {
        clearTimeout(window.hoverMusicTimeout);
        window.hoverMusicTimeout = null;
    }
    
    // Stop music if it's playing
    if (musicPlaying && !bgMusic.paused) {
        bgMusic.pause();
        musicPlaying = false;
        console.log('Music stopped on hover end');
    }
}

// Play click sound effect
function playClickSound() {
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Click sound frequency
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
    
    // Also try to start background music
    playMusicOnInteraction();
}

// Add click sound to all buttons and interactive elements
function addClickSounds() {
    // Add click sound to all buttons
    const buttons = document.querySelectorAll('button, .btn, .romantic-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Add click sound to all images and photos
    const images = document.querySelectorAll('img, .timeline-photo, .polaroid img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Add click sound to all interactive cards
    const cards = document.querySelectorAll('.timeline-content, .poetry-card, .romantic-line-card, .joke-card, .love-message-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            playClickSound();
        });
    });
}

// Toggle background music
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-music';
        musicText.textContent = 'Play Music';
        musicPlaying = false;
        showNotification('🎵 Music paused');
    } else {
        bgMusic.play().then(() => {
            musicIcon.className = 'fas fa-pause';
            musicText.textContent = 'Pause Music';
            musicPlaying = true;
            showNotification('🎵 Music playing - Enjoy the romantic atmosphere!');
        }).catch(e => {
            console.log('Audio play failed:', e);
            showNotification('🎵 Add your birthday-song.mp3 file for background music');
            // Don't change UI state if play failed
            musicIcon.className = 'fas fa-music';
            musicText.textContent = 'Play Music';
            musicPlaying = false;
        });
    }
}

// Blow candles animation
function blowCandles() {
    // Play music on interaction
    playMusicOnInteraction();
    
    const candles = document.querySelector('.candles');
    if (!candles.classList.contains('blown')) {
        candles.classList.add('blown');
        
        // Create extra confetti effect
        createConfettiBurst();
        
        // Show success message
        setTimeout(() => {
            showNotification('Make a wish! 🌟');
        }, 500);
    }
}

// Start confetti animation
function startConfetti() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;
    
    confettiInterval = setInterval(() => {
        createConfettiPiece(confettiContainer);
    }, 100);
}

// Stop confetti animation
function stopConfetti() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }
    
    const confettiContainer = document.getElementById('confetti');
    if (confettiContainer) {
        confettiContainer.innerHTML = '';
    }
}

// Create single confetti piece
function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    container.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

// Create confetti burst effect
function createConfettiBurst() {
    const confettiContainer = document.getElementById('confetti');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer);
        }, i * 20);
    }
}

// Get random color for confetti
function getRandomColor() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Reveal secret message
function revealSecret() {
    // Play music on interaction
    playMusicOnInteraction();
    
    const secretContent = document.getElementById('secretContent');
    const secretMessage = document.getElementById('secretMessage');
    
    secretContent.style.display = 'none';
    secretMessage.style.display = 'block';
    
    // Add typing effect
    const typingText = document.querySelector('.typing-text');
    typingText.style.width = '0';
    setTimeout(() => {
        typingText.style.width = '100%';
    }, 100);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 10000;
        animation: slideIn 0.5s ease;
        box-shadow: 0 5px 20px rgba(255, 105, 180, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Why I Love You feature
function showWhyILoveYou() {
    const extraContent = document.getElementById('extraContent');
    const reasons = [
        "Your smile lights up my entire world 🌟",
        "You understand me like no one else does 💕",
        "Your kindness makes me want to be a better person 🌸",
        "You laugh at my silly jokes 😄",
        "You support my dreams unconditionally 🚀",
        "Your presence makes everything better ✨",
        "You love me for who I truly am ❤️",
        "You make ordinary days extraordinary 🌈"
    ];
    
    let html = '<h4 class="romantic-font mb-3">Reasons Why I Love You:</h4>';
    reasons.forEach((reason, index) => {
        html += `
            <div class="love-reason-card" onclick="this.style.background='rgba(255, 105, 180, 0.3)'">
                <strong>${index + 1}.</strong> ${reason}
            </div>
        `;
    });
    
    extraContent.innerHTML = html;
}

// Show countdown to next meeting
function showCountdown() {
    const extraContent = document.getElementById('extraContent');
    
    // Set your next meeting date here
    const nextMeeting = new Date();
    nextMeeting.setDate(nextMeeting.getDate() + 7); // Example: 7 days from now
    
    function updateCountdown() {
        const now = new Date();
        const difference = nextMeeting - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            extraContent.innerHTML = `
                <h4 class="romantic-font mb-3">Until We Meet Again 💕</h4>
                <div class="countdown-timer">
                    ${days}d ${hours}h ${minutes}m ${seconds}s
                </div>
                <div class="countdown-label">
                    Counting down to our next magical moment together ✨
                </div>
            `;
        } else {
            extraContent.innerHTML = `
                <h4 class="romantic-font text-warning">Time to meet! 🎉</h4>
                <p>Our next meeting is here! I'm so excited to see you! 💕</p>
            `;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start mini game
function startMiniGame() {
    const extraContent = document.getElementById('extraContent');
    gameScore = 0;
    gameTimeLeft = 30;
    
    extraContent.innerHTML = `
        <h4 class="romantic-font mb-3">Catch the Hearts! 💕</h4>
        <div class="text-center mb-3">
            <div class="d-flex justify-content-around mb-3">
                <div>
                    <strong>Score:</strong> <span id="gameScore">${gameScore}</span>
                </div>
                <div>
                    <strong>Time:</strong> <span id="gameTime">${gameTimeLeft}</span>s
                </div>
            </div>
            <button class="btn btn-danger" onclick="startGame()">Start Game</button>
            <button class="btn btn-secondary ms-2" onclick="stopGame()">Stop Game</button>
        </div>
        <div id="gameArea" style="position: relative; height: 300px; background: rgba(255, 105, 180, 0.1); border-radius: 10px; overflow: hidden;">
            <div class="text-center mt-5 text-white-50">
                Click "Start Game" to begin catching hearts! 💕
            </div>
        </div>
    `;
}

// Start the actual game
function startGame() {
    const gameArea = document.getElementById('gameArea');
    gameScore = 0;
    gameTimeLeft = 30;
    
    document.getElementById('gameScore').textContent = gameScore;
    document.getElementById('gameTime').textContent = gameTimeLeft;
    
    // Clear game area
    gameArea.innerHTML = '';
    
    // Game timer
    gameInterval = setInterval(() => {
        gameTimeLeft--;
        document.getElementById('gameTime').textContent = gameTimeLeft;
        
        if (gameTimeLeft <= 0) {
            stopGame();
            showNotification(`Game Over! Final Score: ${gameScore} 💕`);
        }
    }, 1000);
    
    // Create hearts periodically
    const heartInterval = setInterval(() => {
        if (gameTimeLeft > 0) {
            createGameHeart(gameArea);
        } else {
            clearInterval(heartInterval);
        }
    }, 800);
}

// Create a heart in the game
function createGameHeart(gameArea) {
    const heart = document.createElement('div');
    heart.className = 'game-heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    heart.style.top = '-30px';
    
    heart.onclick = function() {
        gameScore++;
        document.getElementById('gameScore').textContent = gameScore;
        this.remove();
        
        // Show small score animation
        const scorePopup = document.createElement('div');
        scorePopup.textContent = '+1';
        scorePopup.style.cssText = `
            position: absolute;
            left: ${this.style.left};
            top: ${this.style.top};
            color: #ffd700;
            font-weight: bold;
            font-size: 20px;
            pointer-events: none;
            animation: scoreFloat 1s ease-out forwards;
        `;
        gameArea.appendChild(scorePopup);
        
        setTimeout(() => scorePopup.remove(), 1000);
    };
    
    gameArea.appendChild(heart);
    
    // Animate heart falling
    let position = -30;
    const fallInterval = setInterval(() => {
        position += 3;
        heart.style.top = position + 'px';
        
        if (position > gameArea.offsetHeight) {
            heart.remove();
            clearInterval(fallInterval);
        }
    }, 50);
}

// Stop the game
function stopGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    
    // Clear any remaining hearts
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.innerHTML = `
            <div class="text-center mt-5">
                <h5 class="text-white">Game Over! 🎮</h5>
                <p class="text-white-50">Final Score: ${gameScore} hearts caught! 💕</p>
                <button class="btn btn-danger" onclick="startGame()">Play Again</button>
            </div>
        `;
    }
}

// Show fullscreen image
function showFullscreenImage(imageSrc) {
    // Play music on interaction
    playMusicOnInteraction();
    
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenImage.src = imageSrc;
    modal.show();
}

// Check for birthday wish at 12:00 midnight
function checkForBirthdayWish() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Check if it's 12:00 AM (midnight)
    if (hours === 0 && minutes === 0) {
        showBirthdayWish();
    }
}

// Show birthday wish modal
function showBirthdayWish() {
    const modal = new bootstrap.Modal(document.getElementById('birthdayWishModal'));
    modal.show();
    
    // Start confetti
    setTimeout(() => {
        startModalConfetti();
    }, 500);
    
    // Play birthday music if available
    if (!musicPlaying) {
        toggleMusic();
    }
}

// Blow candles in modal
function blowCandlesInModal() {
    // Play music on interaction
    playMusicOnInteraction();
    
    const candles = document.getElementById('modalCandles');
    if (!candles.classList.contains('blown')) {
        candles.classList.add('blown');
        createModalConfettiBurst();
        setTimeout(() => {
            showNotification('Make a wish at midnight! 🌟✨');
        }, 500);
    }
}

// Start modal confetti
function startModalConfetti() {
    const confettiContainer = document.getElementById('modalConfetti');
    if (!confettiContainer) return;
    
    confettiInterval = setInterval(() => {
        createConfettiPiece(confettiContainer);
    }, 100);
}

// Create modal confetti burst
function createModalConfettiBurst() {
    const confettiContainer = document.getElementById('modalConfetti');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer);
        }, i * 20);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add keyboard navigation - DISABLED to ensure only button clicks work
    // document.addEventListener('keydown', function(e) {
    //     if (e.key === 'ArrowRight') {
    //         navigateSection('next');
    //     } else if (e.key === 'ArrowLeft') {
    //         navigateSection('prev');
    //     } else if (e.key === 'Escape') {
    //         showSection('homepage');
    //     }
    // });
    
    // Add touch gestures for mobile - DISABLED to prevent automatic navigation
    // let touchStartX = 0;
    // let touchEndX = 0;
    
    // document.addEventListener('touchstart', function(e) {
    //     touchStartX = e.changedTouches[0].screenX;
    // });
    
    // document.addEventListener('touchend', function(e) {
    //     touchEndX = e.changedTouches[0].screenX;
    //     handleSwipe();
    // });
    
    // function handleSwipe() {
    //     if (touchEndX < touchStartX - 50) {
    //         navigateSection('next');
    //     }
    //     if (touchEndX > touchStartX + 50) {
    //         navigateSection('prev');
    //     }
    // }
    
    // Add hover music effects to text elements
    addHoverMusicEffects();
}

// Add hover music effects to interactive text elements
function addHoverMusicEffects() {
    // Add hover effect to all romantic text elements
    const textElements = document.querySelectorAll('.romantic-font, .lead, h1, h2, h3, h4, p');
    
    textElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            playMusicOnHover();
        });
        
        element.addEventListener('mouseleave', function() {
            stopMusicOnHoverEnd();
        });
    });
    
    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            playMusicOnHover();
        });
        
        item.addEventListener('mouseleave', function() {
            stopMusicOnHoverEnd();
        });
    });
    
    // Add hover effect to poetry cards
    const poetryCards = document.querySelectorAll('.poetry-card, .romantic-line-card, .joke-card, .love-message-card');
    poetryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            playMusicOnHover();
        });
        
        card.addEventListener('mouseleave', function() {
            stopMusicOnHoverEnd();
        });
    });
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, .polaroid');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            playMusicOnHover();
        });
        
        item.addEventListener('mouseleave', function() {
            stopMusicOnHoverEnd();
        });
    });
}

// Navigate between sections
function navigateSection(direction) {
    const sections = ['homepage', 'lovestory', 'birthday', 'secret', 'gallery', 'final'];
    const currentIndex = sections.indexOf(currentSection);
    
    let newIndex;
    if (direction === 'next') {
        newIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
        newIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (newIndex !== currentIndex) {
        showSection(sections[newIndex]);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes scoreFloat {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopConfetti();
        if (musicPlaying) {
            document.getElementById('bgMusic').pause();
        }
    } else {
        if (currentSection === 'birthday') {
            startConfetti();
        }
        if (musicPlaying) {
            document.getElementById('bgMusic').play().catch(e => console.log('Audio play failed:', e));
        }
    }
});

// Add error handling for audio
document.getElementById('bgMusic').addEventListener('error', function() {
    console.log('Audio file not found. Please add a birthday song file named "birthday-song.mp3"');
    // You can show a user-friendly message here
});

// Performance optimization - limit active animations
let animationFrameId;
function optimizedAnimation() {
    // Your animation logic here
    animationFrameId = requestAnimationFrame(optimizedAnimation);
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    stopConfetti();
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});
