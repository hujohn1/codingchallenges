import express from 'express'
import crypto from 'node:crypto'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())

//Globals
const memory_store = {}
const reverse_map = {}
const MAX_ATTEMPTS = 10
const randSalt = "asfjkl1id123"

const checkIfTaken = (long_url)=>{
    const existingShortUrl = Object.entries(reverse_map).find(([_, value]) => value === long_url)
    if (existingShortUrl) {
        return existingShortUrl[0].split('/').pop()
    }
    let url = long_url
    let SHA256hash = crypto.createHash('sha256');
    let updated = SHA256hash.update(url, 'utf8');
    let attempt = 0;
    let digest = updated.digest('hex')
    while(memory_store[digest.substring(0, Math.min(7, digest.length))]){
        if(attempt > MAX_ATTEMPTS) break
        SHA256hash = crypto.createHash('sha256');
        url = url + randSalt;
        updated = SHA256hash.update(url, 'utf8')
        digest = updated.digest('hex')
        attempt ++;
    }
    digest = digest.substring(0, Math.min(7, digest.length))
    let short_url = `http://localhost:${PORT}/${digest}`
    memory_store[digest] = {
        key: digest, 
        long_url: long_url,
        short_url: short_url
    }
    reverse_map[short_url] = long_url
    //return JSON.stringify(memory_store[digest])
    return digest
}

app.listen(PORT, (error)=>{
    if(!error){console.log(`Server succesfully running at Port ${PORT}...`);}
    else{console.log("Error occurred", error);}
})

app.get('/:short_url',(req, res)=>{
    const short_url = req.params.short_url;   
    const long_url = reverse_map[`http://localhost:${PORT}/${short_url}`]
    if(long_url){
        res.redirect(301, long_url)
    } 
    else{
        res.status(404).send("404 Not Found")
    }
})

app.post('/', (req, res)=>{
    const long_url = req.body.url;
    if(!long_url){
        console.log('No URL provided')
        res.status(400).send("400 Bad Request")
    }
    else{
        console.log('Processing URL:', long_url)
        let shortened = checkIfTaken(long_url);
        res.status(200).send(shortened)
    }
})

app.delete('/:digest', (req, res)=>{
    const digest = req.params.digest;   
    if(memory_store[digest]){
        delete reverse_map[`http://localhost:${PORT}/${digest}`]
        delete memory_store[digest]
        res.status(200).send("Succesfully deleted digest")
    } 
    else{
        res.status(404).send("404 Not Found")
    }
})