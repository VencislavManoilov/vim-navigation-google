const page = document.querySelector("#search #rso");

const results = page ? [...page.querySelectorAll("a > h3")]
    .map(h3 => h3.parentElement)
    .filter(a => {
        // Ensure it's a visible standard link and not part of special boxes
        const parent = a.closest('[data-hveid]');
        return parent && !parent.closest('.related-question-pair, .kp-blk, .g-blk, .xpdopen, .xpd');
    }) : false;

let currentIndex = 0;

function isInAllSection() {
    const currSection = document.querySelectorAll('[aria-current="page"]');
    const html = currSection[0]?.innerHTML;
    if(html) {
        return !(html.includes("Images") || html.includes("Short videos"));
    }

    return false;
}

const isAllSection = isInAllSection();

function updateSelection(direction) {
    if (!isAllSection || !results || !results.length) return;

    if (direction === 'down' && currentIndex < results.length - 1) {
        currentIndex++;
    } else if (direction === 'up' && currentIndex > 0) {
        currentIndex--;
    } else if (direction === 'first') {
        currentIndex = 0;
    } else if (direction === 'last') {
        currentIndex = results.length - 1;
    }

    results[currentIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    results[currentIndex].focus();
}

// Initial highlight
updateSelection();

let pressedG = false;

let lastOpenTime = 0;

if (!window.hasRunVimNavigationListener) {
    window.hasRunVimNavigationListener = true;

    addEventListener("keydown", (e) => {
        const active = document.activeElement;
        const isTyping = active.tagName === 'INPUT' ||
                         active.tagName === 'TEXTAREA' ||
                         active.isContentEditable;

        if(isTyping) return;

        const isShift = e.shiftKey;

        if (e.code === "KeyG") {
            if(isShift) {
                updateSelection("last");
                return pressedG = false;
            }

            if(pressedG) {
                updateSelection("first");
                pressedG = false;
            } else {
                pressedG = true;
            }
        } else {
            pressedG = false;
        }
        
        if (e.code === "KeyJ") {
            updateSelection("down");
        } else if (e.code === "KeyK") {
            updateSelection("up");
        } else if (e.code === "Enter" && results[currentIndex]) {
            e.preventDefault();
            if (isShift && now - lastOpenTime > 500) {
                lastOpenTime = now;

                chrome.runtime.sendMessage({
                    action: "openTab",
                    url: results[currentIndex].href
                });
            } else {
                window.location.href = results[currentIndex].href;
            }
        }
    });
}
