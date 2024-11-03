const overlay = document.getElementById('overlay');
const brightnessSlider = document.getElementById('brightnessSlider');
const warmSlider = document.getElementById('warmSlider');

// Update overlay based on slider values
function updateOverlay() {
    const brightnessValue = brightnessSlider.value / 100; // Scale to 0-1
    const warmthValue = warmSlider.value / 100; // Scale to 0-1
    
    // Set overlay color with dynamic brightness and warmth
    overlay.style.backgroundColor = `rgba(255, 150, 50, ${warmthValue * (1 - brightnessValue)})`;
}

// Listen to slider changes and update overlay
brightnessSlider.addEventListener('input', updateOverlay);
warmSlider.addEventListener('input', updateOverlay);
