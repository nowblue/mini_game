document.getElementById("startButton").onclick = function () {
    window.location.href = "./start.html";  // Replace with the actual game page URL
};

document.getElementById("howButton").onclick = function () {
    document.getElementById("modal").style.display = "block";
};

document.getElementById("closeButton").onclick = function () {
    document.getElementById("modal").style.display = "none";
};

window.onclick = function (event) {
    if (event.target == document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
};
