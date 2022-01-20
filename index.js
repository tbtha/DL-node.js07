const http = require("http");
const url = require ("url")
const fs = require("fs");

const server = http.createServer((req,res) => {

    // Pintar html
    if(req.url === "/"){
        fs.readFile('index.html', 'utf-8', (err,data) =>{
            res.end(data)
        })
    }

    // leer json
    if(req.url === "/deportes"){
        fs.readFile('deportes.json', (err,data) =>{
            res.end(data)
        })
    }

    // agregar informaicon
    if(req.url.includes("/agregar")){
        const {nombre,precio} = url.parse(req.url,true).query

        let {deportes} = JSON.parse(fs.readFileSync("deportes.json"))
        
        deportes.push({nombre,precio})
         
        fs.writeFile("deportes.json",JSON.stringify({deportes}), (err)=>{
            if(err) return res.end("error: no se pudo agregar el deporte");
            res.end("deporte creado")
    })
    }

    // editar informaicon
    if(req.url.includes("/editar")){
        const {nombre,precio} = url.parse(req.url,true).query

        let {deportes} = JSON.parse(fs.readFileSync("deportes.json"))
        
        deportes = deportes.map(d =>{
            if(d.nombre === nombre){
                d.precio = precio
            }
            return d
        })
         
        fs.writeFile("deportes.json",JSON.stringify({deportes}), (err)=>{
            if(err) return res.end("error: no se pudo modificar el deporte");
            res.end("deporte modificado")
    })
    }

    // eliminar informaicon
    if(req.url.includes("/eliminar")){
        const {nombre} = url.parse(req.url,true).query;

        let {deportes} = JSON.parse(fs.readFileSync("deportes.json"))
        
        deportes = deportes.filter((d) => d.nombre !== nombre)
         
        fs.writeFile("deportes.json",JSON.stringify({deportes}), (err)=>{
            if(err) return res.end("error: no se pudo eliminar el deporte");
            res.end("deporte eliminado")
    })
    }
})

server.listen(3000, () => console.log("servido activo"))