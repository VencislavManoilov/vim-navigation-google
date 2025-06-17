const page = document.querySelector("#search #rso");

const results = [...page.querySelectorAll("a > h3")]
    .map(h3 => h3.parentElement)
    .filter(a => {
        // Ensure it's a visible standard link and not part of special boxes
        const parent = a.closest('[data-hveid]');
        return parent && !parent.closest('.related-question-pair, .kp-blk, .g-blk, .xpdopen, .xpd');
    });

let currentIndex = 0;

function updateSelection(direction) {
    if (!results.length) return;

    if (direction === 'down' && currentIndex < results.length - 1) {
        currentIndex++;
    } else if (direction === 'up' && currentIndex > 0) {
        currentIndex--;
    }

    results[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    results[currentIndex].focus();
}

// Initial highlight
updateSelection();

addEventListener("keydown", (e) => {
    const isShift = e.shiftKey;
    
    if (e.code === "KeyJ") {
        updateSelection("down");
    } else if (e.code === "KeyK") {
        updateSelection("up");
    } else if (e.code === "Enter" && results[currentIndex]) {
        if (isShift) {
            window.open(results[currentIndex].href, '_blank', 'noopener, noreferrer');
        } else {
            window.location.href = results[currentIndex].href;
        }
    }
});

