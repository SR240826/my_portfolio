var modalimg = document.getElementById("modalimg");

// Get the image and insert it inside the modalimg - use its "alt" text as a caption
var img = document.querySelectorAll(".sd_img");
var modalimgImg = document.getElementById("modalimg_img");
var captionText = document.getElementById("caption");

function getmodalimg() {
    modalimg.style.display = "flex";
    modalimgImg.src = this.src;
    captionText.innerHTML = this.alt;
}
img.forEach(function(image) {
    image.addEventListener("click", getmodalimg)
})

// Get the <span> element that closes the modalimg
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modalimg
span.onclick = function() { 
    modalimg.style.display = "none";
}
modalimg.addEventListener("click", ()=> {
    modalimg.style.display = "none";
})
