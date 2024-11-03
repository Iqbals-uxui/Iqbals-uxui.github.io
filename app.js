const overlay = document.getElementById('overlay');
const brightnessToggle = document.getElementById('brightnessToggle');
const warmToggle = document.getElementById('warmToggle');

let brightnessOn = false;
let warmLightOn = false;

// Brightness toggle functionality
brightnessToggle.addEventListener('click', () => {
    brightnessOn = !brightnessOn;
    brightnessToggle.classList.toggle('active', brightnessOn);

    // Adjust overlay opacity for brightness effect
    overlay.style.backgroundColor = brightnessOn ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 150, 50, 0)';
});

// Warm light toggle functionality
warmToggle.addEventListener('click', () => {
    warmLightOn = !warmLightOn;
    warmToggle.classList.toggle('active', warmLightOn);

    // Adjust overlay color for warm light effect
    overlay.style.backgroundColor = warmLightOn 
        ? (brightnessOn ? 'rgba(255, 150, 50, 0.5)' : 'rgba(255, 150, 50, 0.7)')
        : (brightnessOn ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 150, 50, 0)');
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('Service Worker registration failed', err));
}
