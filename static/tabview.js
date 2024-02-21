var sections = document.querySelectorAll('.section');
var projects = document.querySelectorAll(".project")
let cards = document.querySelectorAll(".card");


let childheight;
// toogle project collaspe
projects.forEach(function(project) {
    project.addEventListener("click", ()=> {
        if (innerWidth < 1500 && innerWidth > 1080 && project.children[1].style.maxHeight !== "675px") {
            project.children[1].style.maxHeight = "675px";
            project.children[1].style.opacity = "1"
            childheight = project.children[1].children[0].offsetHeight
            project.children[1].style.height = childheight + childheight*0.5 + "px"
        }
        else if (innerWidth < 1500 && innerWidth > 1080 && project.children[1].style.maxHeight === "675px") {
            project.children[1].style.maxHeight = "0";
            project.children[1].style.opacity = "0"
        } 
    })
})





// if (innerWidth < 1080) {
//     const script1080 = document.createElement('script');
//     script1080.src = 'static/phoneview.js';
//     script1080.defer = true;
//     document.head.appendChild(script1080);
// }
// else 
// if(innerWidth > 1080 && innerWidth < 1500){
//     const scriptL = document.createElement('script');
//     scriptL.src = 'static/tabview.js';
//     scriptL.defer = true;
//     document.head.appendChild(scriptL)
// }
