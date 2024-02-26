let isIframeLoaded = false;
let contactDiv = document.getElementById('contact');
let iframeContainer = contactDiv.getElementsByTagName('div')[0];
let iframe = iframeContainer.getElementsByTagName('iframe')[0];

function loadContactForm() {

        iframe = document.createElement('iframe');

        iframe.id = 'contactform';
        iframe.src = 'https://docs.google.com/forms/d/e/1FAIpQLSdF38uFs_JeObTtYbnhyTklZ6kdxNY1q4i0CtSTb9drkIF3tg/viewform?embedded=true';
        iframe.width = '300';
        iframe.height = '1000';
        iframe.frameborder = '0';
        iframe.marginheight = '0';
        iframe.marginwidth = '0';
        iframe.title = 'Contact Form via Google Form';
        iframe.loading = "lazy";

        iframeContainer.appendChild(iframe);
        isIframeLoaded = true;
    }
contactbutton.addEventListener("click", ()=>{
    if(!isIframeLoaded){
        loadContactForm();
        contactform.style.maxHeight = "1100px";
        contactbutton.style.display = "none";
        togglebutton.style.display = "block";
        
        setTimeout(function() {
            contactform.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1000);
    }
})


function loadcontact() {
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
}

addEventListener("load",()=>{
    intro.classList.add("loaded");
    logo.classList.add("loaded");
})

let sections = document.querySelectorAll('.section');
let prevs = document.querySelectorAll('.prev');
let nexts = document.querySelectorAll('.next');

function crossScroll(event) {

        // el.forEach(function(es) {
        //     es.addEventListener('wheel', function (event) {
                // let getstyle = window.getComputedStyle(section);
                // const flexDirection = getstyle.getPropertyValue('flex-direction');
                
                // if(flexDirection !== "row") return;
                // else {
                    if(innerWidth < 1081 && innerWidth > 1000) {
                        event.preventDefault();
                    }
                    var scrollAmount = event.deltaY;
                    this.scrollTop += scrollAmount;

                    if (scrollAmount < 0) {
                        // Scroll Up
                        this.scrollLeft -= 15;
                    } else {
                        this.scrollLeft += 15;
                    }
                // }
            } //)
//         })

// }

// function clickscroll() {
    
// }

togglebutton.addEventListener("click", loadcontact);
navcontact.addEventListener("click", ()=>{
    contactbutton.style.display = "none";
    togglebutton.style.display = "block";
    loadContactForm();
    loadcontact();
});
// crossScroll(e,sections);
sections.forEach(function(section) {
    section.addEventListener('wheel', crossScroll)})

prevs.forEach(function(prev){
    prev.addEventListener('click', ()=>{
        var classIndex = Array.from(document.querySelectorAll('.prev')).indexOf(prev);
        sections[parseInt(classIndex)].scrollBy({
            left: -260,
            behavior: 'smooth'
        });
    })
})

nexts.forEach(function(next){
    next.addEventListener('click', ()=>{
        var classIndex = Array.from(document.querySelectorAll('.next')).indexOf(next);     
        sections[parseInt(classIndex)].scrollBy({
            left: 260,
            behavior: 'smooth'
        });
    })
})

let submenu = document.querySelectorAll(".submenu");

gamemenu.addEventListener("click", () => {
    submenu[0].classList.toggle("visible");
});

texturemenu.addEventListener("click", () => {
    submenu[1].classList.toggle("visible");
});

artmenu.addEventListener("click", () => {
    submenu[2].classList.toggle("visible");
});
let side = ["left", "right", "center"]
let side2 = ["bottom", "top", "center"]
menubtn.addEventListener("click", ()=>{
    menulist.style.transform = "scale(0)";
    menulist.style.transformOrigin = side[Math.round(Math.random() * 2)] + " " + side2[Math.round(Math.random() * 2)]  ;
})

menu.addEventListener("click", ()=>{
    menulist.style.transform = "scale(1)"; 
})


