var sections = document.querySelectorAll('.section');
var projects = document.querySelectorAll(".project")
let cards = document.querySelectorAll(".card");

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

