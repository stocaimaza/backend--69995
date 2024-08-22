
// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i; 
//     }

//     return resultado; 
// }

//La voy a configurar para que se ejecute solo cuando el padre lo pida: 

process.on("message", message => {
    let resultado = 0; 

    for(let i = 0; i < 5e9; i++) {
        resultado += i; 
    }

    process.send(resultado);
})