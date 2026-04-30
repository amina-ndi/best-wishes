# 💕 Romantic Birthday Website

A beautiful, romantic birthday wishes website created with Bootstrap 5, featuring animated stars, floating hearts, interactive elements, and a mobile-responsive design.

## 🌟 Features

### Main Sections
- **Homepage**: Animated starry background with floating hearts and romantic welcome message
- **Love Story Timeline**: Interactive timeline showcasing your relationship journey
- **Birthday Special Page**: Animated cake with blowable candles, confetti effects
- **Secret Message Page**: Click-to-reveal romantic messages with typing animation
- **Gallery Section**: Polaroid-style photo gallery with hover effects
- **Final Page**: Emotional ending with slow text animations

### Extra Features (via floating gift button)
- **Why I Love You**: Random reasons with interactive cards
- **Countdown Timer**: Countdown to next meeting/date
- **Mini Game**: Catch falling hearts game with score tracking

### Interactive Elements
- Background music toggle (add your own `birthday-song.mp3`)
- Click-to-blow birthday cake candles
- Animated confetti effects
- Keyboard navigation (arrow keys)
- Touch/swipe gestures for mobile
- Smooth scroll animations with AOS

## 🎨 Design Features
- Dark romantic theme with pink/red gradients
- Bootstrap 5 responsive framework
- Custom CSS animations and transitions
- Romantic fonts (Dancing Script + Poppins)
- Mobile-first responsive design
- Custom scrollbar styling

## 📱 Mobile Responsive
- Fully responsive layout for all screen sizes
- Touch-friendly interactions
- Optimized animations for mobile performance
- Swipe gestures for navigation

## 🚀 Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **Add music**: Replace `birthday-song.mp3` with your preferred romantic song
3. **Customize photos**: Replace placeholder images in the gallery section with your actual photos
4. **Personalize messages**: Edit the text content to match your personal story

## 📁 File Structure
```
birthday wishes/
├── index.html          # Main HTML file
├── style.css           # Custom styles and animations
├── script.js           # Interactive JavaScript functionality
├── README.md           # This file
└── birthday-song.mp3   # Add your romantic song here
```

## 🎵 Adding Music

To add background music:
1. Place your audio file in the same directory as `index.html`
2. Name it `birthday-song.mp3` OR update the audio source in `index.html`:
   ```html
   <source src="your-song-file.mp3" type="audio/mpeg">
   ```

## 📸 Adding Photos

To add your own photos to the gallery:
1. Replace the placeholder URLs in the gallery section:
   ```html
   <img src="your-photo-1.jpg" alt="Memory 1">
   <img src="your-photo-2.jpg" alt="Memory 2">
   ```
2. Or place photos in a folder and update paths accordingly

## 🎮 How to Use

1. **Navigate**: Click buttons or use arrow keys to move between sections
2. **Interact**: Click the cake to blow candles, click the secret button to reveal messages
3. **Play**: Click the floating gift button to access extra features
4. **Music**: Toggle background music with the play/pause button
5. **Mobile**: Swipe left/right to navigate between sections

## 🛠️ Customization

### Colors
Edit the CSS variables in `style.css`:
```css
/* Main romantic colors */
--primary-pink: #ff69b4;
--deep-pink: #ff1493;
--gold: #ffd700;
```

### Messages
Edit the text content in `index.html` to personalize:
- Love story timeline entries
- Birthday messages
- Secret messages
- "Why I Love You" reasons

### Timing
Adjust animation timings in `script.js`:
- Confetti intervals
- Heart floating speeds
- Game duration

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- The website uses CDN links for Bootstrap, Font Awesome, and AOS
- All animations are optimized for performance
- The website works offline once loaded
- Audio autoplay may be blocked by some browsers (user interaction required)

## 💝 Perfect For

- Birthday surprises for your partner
- Anniversary celebrations
- Valentine's Day gifts
- Romantic gestures
- Long-distance relationships

---

Made with 💕 for someone special!
