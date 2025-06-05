const timeobj = document.getElementById("time");
const dateobj = document.getElementById("date");
const sybauobj = document.getElementById("sybau");
const currencyUl = document.getElementById("cryptolist");

async function getCurrencies(){
    const currency = "USD"
    const baseUrl = "https://data-api.coindesk.com/index/cc/v1/latest/tick";
    const params = {"market":"cadli","instruments":`BTC-${currency},ETH-${currency}, SOL-${currency}, USDC-${currency}, XRP-${currency}, USDT-${currency}`,"apply_mapping":"true"};
    const url = new URL(baseUrl);
    url.search = new URLSearchParams(params).toString();

    const options = {
    method: 'GET',
    headers:  {"Content-type":"application/json; charset=UTF-8"},
    };
    try{
    const res = await fetch(url, options);
    if(!res.ok){throw new Error(res.status)}
    else{const json = await res.json(); return json;}
    }
    catch(error){console.error('sybau')}
}


async function refreshDate(){
    const datenow = new Date(); 

    const parsedTime = datenow.toLocaleTimeString('en-US'); 
    const parsedDate = datenow.toLocaleDateString();

    timeobj.textContent = parsedTime; 
    dateobj.textContent = parsedDate; 
    const currencystream = await getCurrencies();

    const vals = currencystream?.Data; 
    if (vals) {
        for(const curency in vals){
            const regexp = /^(.*)-.*/;
            let searchid = curency.replace('-', '');
            let liExists = document.getElementById(searchid);
            if(liExists && vals?.[curency].VALUE){
                liExists.textContent = `${curency}: ${vals?.[curency].VALUE}`; 
                const img = document.createElement("img");
                    //<img width="20" src="assets/BTC.svg"/>
                    let match1 = curency.match(regexp);
                    img.src=`icons/${match1[1]}.svg`;
                    img.width="10";
                    liExists.prepend(img);
            }
            else{
                const regexp = /^(.*)-.*/;
                if(vals?.[curency].VALUE){
                    const newli = document.createElement("li"); 
                    const displayText = document.createTextNode(`${curency}: ${vals?.[curency].VALUE}`);
                    newli.appendChild(displayText);
                
                    const img = document.createElement("img");
                    //<img width="20" src="assets/BTC.svg"/>
                    let match1 = curency.match(regexp);
                    img.src=`icons/${match1[1]}.svg`;
                    img.width="10";
                    newli.prepend(img);

                    newli.id = curency.replace('-', ''); 
                    currencyUl.appendChild(newli);
                }
            }
        }
    } else {
        sybauobj.textContent = "BTC data unavailable";
        console.warn("BTC data structure not found or null. Check API response and path.");
    }
}

refreshDate(); 
setInterval(refreshDate, 1000);
