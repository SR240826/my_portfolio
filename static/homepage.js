
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
    intro.classList.add("loaded");
    logo.classList.add("loaded");
    setTimeout(function () {
        myw.style.width = '100%';
    }, 1000);
})

