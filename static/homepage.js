
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
    logo.classList.add("loaded");
    if(innerWidth > 1080){
        intro.classList.add("loaded");
        
    }
})

