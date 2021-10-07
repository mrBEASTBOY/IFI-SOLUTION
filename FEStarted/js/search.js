document.getElementById("search-box").addEventListener("click", clickSign);
document.getElementById("search-box-md").addEventListener("click", clickSignMd);
function clickSign() {
    document.getElementById("search-pop").classList.toggle("visible");
}
function clickSignMd() {
    document.getElementById("search-pop-md").classList.toggle("visible");
}
