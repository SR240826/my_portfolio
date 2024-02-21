var cards = document.querySelectorAll('.section');
var projects = document.querySelectorAll(".project")



cards.forEach(function(card) {
    card.addEventListener('wheel', function (event) {
        let getstyle = window.getComputedStyle(card);
        const flexDirection = getstyle.getPropertyValue('flex-direction');
        
        if(flexDirection !== "row") return;
        else {
            event.preventDefault();
            var scrollAmount = event.deltaY*0.5;
            // event.preventDefault();
            card.scrollTop += scrollAmount;

            // Check the direction of the scroll and adjust the scrollLeft accordingly
            if (scrollAmount < 0) {
                // Scroll Up
                card.scrollLeft -= 15;
            } else {
                // Scroll Down
                card.scrollLeft += 15;
            }
            }
    })
});

// let childheight;
// // toogle project collaspe
// projects.forEach(function(project) {
//     project.addEventListener("click", ()=> {
//         if (innerWidth > 1000 && project.nextElementSibling.style.display !== "flex") {
//             project.nextElementSibling.style.display = "flex";
//             childheight = project.nextElementSibling.children[0].offsetHeight
//             project.nextElementSibling.style.height = childheight + childheight*0.5 + "px"
//         }
//         else if (innerWidth > 1000 && project.nextElementSibling.style.display === "flex") {
//             project.nextElementSibling.style.display = "none";
//         } 
//     })
// })

// click and drag when flex row
let ismousedown = false;
let initialmouseX;
let scrollX;

cards.forEach(function(card) {
    card.addEventListener("mousedown", (e) => {
        ismousedown = true;
        initialmouseX = e.pageX - card.offsetLeft;
        scrollX = card.scrollLeft;
    })

    card.addEventListener("mouseleave", () => {
        ismousedown = false;
    })

    card.addEventListener("mouseup", () => {
        ismousedown = false;
    })


    card.addEventListener("mousemove", (e) => {
        if (!ismousedown) return;
        
        e.preventDefault();
        const x = e.pageX - card.offsetLeft;
        const move = (x - initialmouseX) * 2;
        card.scrollLeft = scrollX - move;
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
