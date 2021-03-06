const IMAGELIST = [];

window.onload = function() {
    imgCount(20, getImgs);
    setTimeout(() => {
        document.querySelector(".slider-img").setAttribute("src", IMAGELIST[0]);
        showGallery();
        setOnClickEvent();
    }, 600);
}

document.querySelector(".left").addEventListener("click", () => {
    prevImg();
    animTransparent();
    showGallery();
})

document.querySelector(".right").addEventListener("click", () => {
    nextImg();
    animTransparent();
    showGallery();
})

document.querySelector(".right").addEventListener("keydown", (e) => {
    if (e.code === "Tab") {
        nextImg();
        animTransparent();
        showGallery();
    }
})

function prevImg() {
    let currImg = document.querySelector(".slider-img").getAttribute("src");
    let imgIndex = IMAGELIST.indexOf(currImg);
    if (imgIndex === 0)
        currImg = IMAGELIST[IMAGELIST.length - 1];
    else
        currImg = IMAGELIST[imgIndex - 1];

    document.querySelector(".slider-img").setAttribute("src", currImg);
}

function nextImg() {
    let currImg = document.querySelector(".slider-img").getAttribute("src");
    let imgIndex = IMAGELIST.indexOf(currImg);
    if (imgIndex === IMAGELIST.length - 1)
        currImg = IMAGELIST[0];
    else
        currImg = IMAGELIST[imgIndex + 1];

    document.querySelector(".slider-img").setAttribute("src", currImg);
}

function animTransparent() {
    document.querySelector(".slider-img").style.opacity = 0;
    let n = 0;
    setInterval(() => {
        if (n < 1) {
            n += 0.01;
            document.querySelector(".slider-img").style.opacity = n;
        }
    }, 5)
}

function showGallery() {
    let currImg = document.querySelector(".slider-img").getAttribute("src");
    let imgIndex = IMAGELIST.indexOf(currImg);
    let iList = indexHandler(imgIndex);

    let childList = document.querySelector(".gallery").children;
    for (let i = 0; i < childList.length; i++) {
        childList[i].setAttribute("src", IMAGELIST[iList[i]]);
    }
}

function indexHandler(index) {
    let arr = [];
    if (index === 0) {
        arr.push(IMAGELIST.length - 2);
        arr.push(IMAGELIST.length - 1);
        arr.push(index);
        arr.push(index + 1);
        arr.push(index + 2);
    } else if (index === 1) {
        arr.push(IMAGELIST.length - 1);
        arr.push(0);
        arr.push(index);
        arr.push(index + 1);
        arr.push(index + 2);
    } else if (index === IMAGELIST.length -1) {
        arr.push(index - 2);
        arr.push(index - 1);
        arr.push(index);
        arr.push(0);
        arr.push(1);
    } else if (index === IMAGELIST.length - 2) {
        arr.push(index - 2);
        arr.push(index - 1);
        arr.push(index);
        arr.push(IMAGELIST.length - 1);
        arr.push(0);
    } else {
        arr.push(index - 2);
        arr.push(index - 1);
        arr.push(index);
        arr.push(index + 1);
        arr.push(index + 2);
    }
    return arr
}

function setOnClickEvent() {
    let elems = document.querySelectorAll(".gal-img");
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", (e) => {
            let targetImg = e.target.getAttribute("src");
            document.querySelector(".slider-img").setAttribute("src", targetImg);
            animTransparent();
            showGallery();
        })
    }
}

function imgCount(count, callback) {
    for (let i = 0; i < count - 1; i++) {
        callback(IMAGELIST);
    }
    console.log(IMAGELIST.length)
}

function getImgs(arr) {
    fetch("https://picsum.photos/1280/720")
        .then(response => {
            if (response.status < 200 || response.status > 300)
                throw error
            else
                return response;
        })
        .then(response => {
            arr.push(response.url);
        })
        .catch(e => consol.log("Request error: " + e.message))
}
