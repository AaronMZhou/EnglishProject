
// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
    
    // Transcript toggle functionality
    const transcriptButtons = document.querySelectorAll('.transcript-toggle');
    
    transcriptButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const transcriptSection = document.getElementById(targetId);
        
        // Toggle active class
        transcriptSection.classList.toggle('active');
        
        // Change button text based on state
        if (transcriptSection.classList.contains('active')) {
          this.textContent = 'Hide Transcript';
        } else {
          this.textContent = 'Show Transcript';
        }
      });
    });
    
    // Audio player enhancements
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach((player, index) => {
      // Set custom colors for audio players
      player.style.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
      
      // Add event listeners for play/pause actions
      player.addEventListener('play', function() {
        // Pause other players when one starts playing
        audioPlayers.forEach((otherPlayer, otherIndex) => {
          if (index !== otherIndex && !otherPlayer.paused) {
            otherPlayer.pause();
          }
        });
      });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }); 