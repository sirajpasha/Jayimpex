// Usage: Add <img id="rotatingImage" src="images/image1.jpg" alt="Rotating" /> in your HTML

const imageList = [
    "images/Rotate-Rice.png",
    "images/Rotate-Spices.png",
    "images/Rotate-FMCG.png"
];

let currentIndex = 0;

function rotateImage() {
    const img = document.getElementById("rotatingImage");
    if (!img) return;
    currentIndex = (currentIndex + 1) % imageList.length;
    img.src = imageList[currentIndex];
}

// Start rotation when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    setInterval(rotateImage, 5000);
});