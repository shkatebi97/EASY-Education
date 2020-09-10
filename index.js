function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
    // DOM is loaded and ready for manipulation here
    fetch('data.json')
    .then(resp => {
        if(resp.ok)
            return resp.json()
        else
            throw resp.status
    })
    .then(json => {
        let educators = json.educators
        educators = educators.map(educator => (educator.pic === '')?({...educator, pic: "template.jpg"}):(educator))
        let context = educators.map(educator => `
<li class="container">
    <img class="image" src="${educator.pic}">
    <h3 class="name">${educator.name}</h3>
    <p class="desc">${educator.description}</p>
    <h6 class="contact">${educator.contact}</h6>
    <h6 class="skype">Skype: ${educator.skype}</h6>
</li>`)
        document.getElementById("educatorsList").innerHTML = context.join('\n')
    })
    .catch(err => {
        console.error(err)
    })
});
