const accessKey = "cEHVFCUvRe8UGFLpLA2smWN0avSskHO4EC65sIQ4R6Q";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/collections?page=${page}
    &query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
        if (result.cover_photo && result.cover_photo.urls && result.cover_photo.urls.small) {
            const image = document.createElement("img");
            image.src = result.cover_photo.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        }
    });
    showMoreBtn.style.display = "block"
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous results
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

