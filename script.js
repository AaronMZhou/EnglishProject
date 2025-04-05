
const cube = document.getElementById('cube');
const cubeContainer = document.getElementById('cube-container');
let isSpinning = false;
let isMouseTracking = false;
const proximityThreshold = 300; // Distance in pixels to trigger interaction

// Start with floating animation
cube.classList.add('floating');

document.addEventListener('DOMContentLoaded', function() {
  // Get the header element
  const header = document.querySelector('header');
  
  // Set initial margin-bottom
  header.style.marginBottom = '30rem';
  
  // Add CSS transition for smooth effect
  header.style.transition = 'margin-bottom 0.8s ease-out';
  
  // Add event listener for mouse movement
  document.addEventListener('mousemove', function() {
    // Decrease margin-bottom to 5rem with smooth transition
    header.style.marginBottom = '5rem';
  }, { once: true }); // The 'once: true' option ensures this only happens once
});

// Function to calculate distance between mouse and cube center
function getDistance(mouseX, mouseY, centerX, centerY) {
  return Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
}

// Main function to handle mouse movement and animations
function handleMouseMove(e) {
  const { width, height, left, top } = cubeContainer.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  
  // Calculate distance from mouse to cube center
  const distance = getDistance(e.clientX, e.clientY, centerX, centerY);
  
  // If mouse is close to cube
  if (distance < proximityThreshold) {
    // If cube is currently floating (far from mouse), start spin animation
    if (cube.classList.contains('floating') && !isSpinning) {
      startSpinAnimation();
    } 
    // Otherwise, if not spinning, track mouse movement
    else if (!isSpinning) {
      trackMouse(e, centerX, centerY);
    }
  } 
  // If mouse is far from cube and not already floating
  else if (!cube.classList.contains('floating') && !isSpinning) {
    // Reset to floating animation
    resetToFloating();
  }
}

// Start the spin animation
function startSpinAnimation() {
  isSpinning = true;
  
  // Remove floating animation
  cube.classList.remove('floating');
  
  // Add spinning animation
  cube.classList.add('spinning');
  
  // Listen for the end of the animation
  cube.addEventListener('animationend', function onAnimationEnd() {
    // Remove the spin animation and the listener
    cube.classList.remove('spinning');
    cube.removeEventListener('animationend', onAnimationEnd);
    
    // Mark spinning as complete
    isSpinning = false;
    
    // Start mouse tracking
    isMouseTracking = true;
  }, { once: true });
}

// Track mouse movement to rotate cube
function trackMouse(e, centerX, centerY) {
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  const rotateX = -(deltaY / 100) * 15; // Less sensitive rotation
  const rotateY = (deltaX / 100) * 15;
  
  // Apply smooth rotation based on mouse position
  cube.style.transform = `rotateX(${-25 + rotateX}deg) rotateY(${-50 + rotateY}deg)`;
}

// Reset to floating animation
function resetToFloating() {
  // Reset animation
  cube.style.transform = ''; // Clear inline styles
  cube.classList.add('floating');
  isMouseTracking = false;
}

// Add event listener for mouse movement
window.addEventListener('mousemove', handleMouseMove);

// Add subtle parallax effect to sections
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.pageYOffset;
  
  sections.forEach((section, index) => {
    const speed = index % 2 === 0 ? 0.05 : -0.05;
    const yPos = scrollPosition * speed;
    section.style.transform = `translateY(${yPos}px)`;
  });
});
