const page = document.querySelector("#search #rso");
const results = [...page.querySelectorAll("a h3")].map(h3 => h3.parentElement);
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
    if (e.key === "j") {
        updateSelection("down");
    } else if (e.key === "k") {
        updateSelection("up");
    } else if (e.key === "Enter") {
        if (results[currentIndex]) {
            window.location.href = results[currentIndex].href;
        }
    }
});

