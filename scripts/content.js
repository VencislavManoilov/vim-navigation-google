let currentIndex = 0;

// Fetch all search result anchors (Google often wraps titles in <h3> inside an <a>)
function getSearchResults() {
    return [...document.querySelectorAll('#rso a h3')].map(h3 => h3.parentElement);
}

function updateSelection(direction) {
    const results = getSearchResults();
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
    const results = getSearchResults();

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

