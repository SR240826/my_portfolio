var sections = document.querySelectorAll('.section');
var projects = document.querySelectorAll(".project")
let cards = document.querySelectorAll(".card")



sections.forEach(function(section) {
    section.addEventListener('wheel', function (event) {
        let getstyle = window.getComputedStyle(section);
        const flexDirection = getstyle.getPropertyValue('flex-direction');
        
        if(flexDirection !== "row") return;
        else {
            event.preventDefault();
            var scrollAmount = event.deltaY*0.5;
            section.scrollTop += scrollAmount;

            if (scrollAmount < 0) {
                // Scroll Up
                section.scrollLeft -= 15;
            } else {
                section.scrollLeft += 15;
            }
            }
    })
});

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

// click and drag when flex row
let ismousedown = false;
let initialmouseX;
let scrollX;

sections.forEach(function(section) {
    section.addEventListener("mousedown", (e) => {
        ismousedown = true;
        initialmouseX = e.pageX - section.offsetLeft;
        scrollX = section.scrollLeft;
    })

    section.addEventListener("mouseleave", () => {
        ismousedown = false;
    })

    section.addEventListener("mouseup", () => {
        ismousedown = false;
    })


    section.addEventListener("mousemove", (e) => {
        if (!ismousedown) return;
        
        e.preventDefault();
        const x = e.pageX - section.offsetLeft;
        const move = (x - initialmouseX) * 2;
        section.scrollLeft = scrollX - move;
    })
})


contactbutton.addEventListener("click", ()=>{
    if(contactform.style.maxHeight !== "1100px") {
        contactform.style.maxHeight = "1100px";
        setTimeout(function() {
            contactform.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1000);
    }
    else {
        contactform.style.maxHeight = "0px";
    }
})

addEventListener("load",()=>{
    intro.style.opacity = "1";
})