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
        togglebutton.style.display = "block"
        
        setTimeout(function() {
            contactform.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1000);
    }
})

togglebutton.addEventListener("click", ()=>{
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
})