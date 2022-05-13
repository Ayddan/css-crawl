let json          = '';
let usedClasses   = [];
let allClasses    = [];
let unusedClasses = [];
fetch('sitemap.php')
.then(resp => {
    return resp.text();
})
.then(data => {
    json = JSON.parse(data);
    for(let el of json){
        fetch('getPage.php?url='+el[0])
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            getHTMLUsedClasses(htmlDocument);
        })
    }
})
let countClasses = 0;
let verifClasses = setInterval(()=>{
    console.log(usedClasses.length)
    console.log(countClasses)
    if(countClasses != usedClasses.length){
        countClasses = usedClasses.length;
    }else{
        clearInterval(verifClasses);
        console.log(getUnusedClasses(usedClasses,allClasses));
    }
},2000)

fetch('provided/style.css')
.then(resp => {
    return resp.text();
})
.then(data => {
    allClasses = data.match(/(?:[\.]{1})([a-zA-Z_]+[\w-_]*)(?:[\s\.\,\{\>#\:]{0})/igm);
})

function getHTMLUsedClasses(htmlDocument) {
    var allElements = htmlDocument.querySelectorAll('*');
    for (var i = 0; i < allElements.length; i++) {
        var classes = allElements[i].className.toString().split(/\s+/);
        for (var j = 0; j < classes.length; j++) {
        var cls = classes[j];
        if (cls && usedClasses.indexOf(cls) === -1)
            usedClasses.push(cls);
        }
    }
    return usedClasses;
}

function getUnusedClasses(domClasses,styleClasses){
    for(let el of allClasses){
        if (unusedClasses.indexOf(el) === -1 && usedClasses.indexOf(el.replace('.','')) === -1){
            unusedClasses.push(el);
        }
    }
    return unusedClasses;
}