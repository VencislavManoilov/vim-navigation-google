// Search results html path
// document.querySelector("#rso > div:nth-child(4) > div > div > div > div > div.kb0PBd.A9Y9g.jGGQ5e > div > div > span > a > h3")
const searchResults = document.querySelector("#rso");
let currPage;
let pageNumber = 1;

async function selectPage(number) {
    currPage = searchResults.querySelector(`div:nth-child(${number}) > div > div > div > div > div:nth-child(1) > div > div > span > a`);

    if(currPage) {
        currPage?.focus();
    }

    return;
    const h3 = currPage?.querySelector("h3");
    if(h3) {
        h3.focus();
    }
}

selectPage(1);

addEventListener("keypress", (e) => {
    if(e.key == "j") {
        pageNumber++;
    } else if(e.key == "k") {
        pageNumber = pageNumber > 1 ? pageNumber - 1 : 1;
    }

    selectPage(pageNumber);

    if(e.key == "enter") {
        let siteURL = currPage?.href;
        if(siteURL) {
            window.location.href = siteURL;
        }
    }
});
