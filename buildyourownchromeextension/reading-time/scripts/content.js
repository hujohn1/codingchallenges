const article = document.querySelector("article")

if(article){
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);

    const wordCount = [...words].length; 
    const time = Math.round(wordCount/200);
    const badge = document.createElement("p")

    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${time} min read`;

    const heading = article.querySelector("h1"); 
    const date = article.querySelector("time")?.parentNode; 

    (date ?? heading).insertAdjacentElement("afterend", badge);
    
}