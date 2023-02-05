var BotonesAnnadir= document.getElementsByClassName("annadir");
var body= document.getElementsByTagName("body")[0];
var listaCompra= document.getElementById("listaCompra")
var totalArticulos= document.getElementById("totalArticulos")
var totalPrecio= document.getElementById("total")

window.addEventListener("load",iniciar);

 function iniciar(){
  listDiv = document.querySelector('.modal-body');
  listUl = listDiv.querySelector('ul');
  listUl.addEventListener('click', botones); 
  body.addEventListener("click",comprobar);
 }

function comprobar(evnt){
    var elemento=evnt.target;
    if(elemento.textContent === "Añadir al Carrito"){
        addToCart(elemento);
    }
}

function botones(event){

    if(event.target.className == "borrarArticulos"){
          var boton = event.target;
          var padreLi = boton.parentElement
          var padreUl = padreLi.parentElement;
          padreUl.removeChild(padreLi)
            //TODO aqui tendré que hacer que se elimine del total
            //que reste articulos de la cantidad de artículos
    }
      
    if(event.target.className == "sumarArticulo"){
        var boton = event.target;
        var padre= boton.parentNode;
        var obj= new Object();
        var arrayTexto= padre.textContent.split(" ")
        obj.price=Number(arrayTexto[2]);
        console.log("Tamaño array inicial para entrar a IF: "+arrayTexto.length)
        console.log(arrayTexto)

        if(arrayTexto.length == 7){ //si sólo se había añadido una vez ese artículo
                       
            anadirSegundo(obj,arrayTexto,padre);
                        
        }else{ //si se había añadido más de una vez ese artículo
                        
            anadirUnoMas(obj,arrayTexto,padre);
        }
            
    }
                 
    if(event.target.className == "restarArticulo"){
        var boton = event.target;
        //TODO aquí comprobar si había uno a más de uno para restar
    }
}
    


function addToCart(elemento){
            var padre= elemento.parentNode;
            var obj= new Object();

            obj.nombreArticulo=padre.firstElementChild.textContent
            obj.price=Number(padre.lastElementChild.previousElementSibling.textContent)
            
            var count=0;
            var elementoIgual="";

            if(listaCompra.childElementCount!=0){//si la lista no está vacia

                for (let i = 0; i < listaCompra.childElementCount; i++) {
                    //comprueba si hay algún artículo igual en la lista
                  if(listaCompra.children[i].textContent.match(obj.nombreArticulo)!=null){
                       elementoIgual= listaCompra.children[i]
                        count++;
                    }
                  
                } 
                
                if (count !=0){ //si hay un artículo igual en la lista
                    var arrayTexto= elementoIgual.textContent.split(" ")
                    console.log("Tamaño array inicial para entrar a IF: "+arrayTexto.length)
                    console.log(arrayTexto)

                    if(arrayTexto.length == 7){ //si sólo se había añadido una vez ese artículo
                       
                       // anadirSegundo(obj,arrayTexto);

                            var nuevoArray= [];
                            for (let i = 0; i <= 3 ; i++) {
                                nuevoArray.push(arrayTexto[i])
                                
                            }
                            console.log ("Length 4:"+ nuevoArray.length)
                            console.log(nuevoArray)
                            nuevoArray.push(Number(nuevoArray[nuevoArray.length - 2]) + obj.price)
                            nuevoArray.push("€")
                            console.log(nuevoArray)
                            var nuevoPrecio= nuevoArray.join(" ")
                            elementoIgual.innerHTML= nuevoPrecio;
                            attachListItemButtons(elementoIgual)
                            var totalPagar=Number(totalPrecio.textContent)
                            totalPrecio.innerHTML= totalPagar + Number(obj.price);
                            var numeroArticulos=Number(totalArticulos.textContent)
                            totalArticulos.innerHTML= numeroArticulos+1;
                                                
                    }else{ //si se había añadido más de una vez ese artículo
                        
                      //  anadirUnoMas(obj,arrayTexto);
                        var nuevoArray= [];
                        for (let i = 0; i <= 5 ; i++) {
                            nuevoArray.push(arrayTexto[i])
                            
                        }
                        console.log ("Length 6:"+ nuevoArray.length)
                        console.log(nuevoArray)
                        nuevoArray[nuevoArray.length - 2] =  Number(nuevoArray[nuevoArray.length - 2]) + obj.price
                        var nuevoPrecio= nuevoArray.join(" ")
                        elementoIgual.innerHTML= nuevoPrecio;
                        attachListItemButtons(elementoIgual)
                        var numeroArticulos=Number(totalArticulos.textContent)
                        totalArticulos.innerHTML= numeroArticulos+1;
                        var totalPagar=Number(totalPrecio.textContent)
                        totalPrecio.innerHTML= totalPagar + Number(obj.price);  
                    }
                   

                }else{ //si no hay un artículo igual en la lista
                    crearNuevaLinea(obj);
                }

            } else{ //si la lista está vacía
                crearNuevaLinea(obj);
            }   

}


function crearNuevaLinea(obj){
    var nuevoLi = document.createElement("li")
    nuevoLi.innerHTML=obj.nombreArticulo + " " + obj.price + " €";
    attachListItemButtons(nuevoLi)
    listaCompra.appendChild(nuevoLi);
    var numeroArticulos=Number(totalArticulos.textContent)
    totalArticulos.innerHTML= numeroArticulos+1;
    var totalPagar=Number(totalPrecio.textContent)
    totalPrecio.innerHTML= totalPagar+ Number(obj.price);
}

function anadirSegundo(obj,arrayTexto,padre){
    
    var nuevoArray= [];
    for (let i = 0; i <= 3 ; i++) {
        nuevoArray.push(arrayTexto[i])
        
    }
    console.log ("Length 4:"+ nuevoArray.length)
    console.log(nuevoArray)
    nuevoArray.push(Number(nuevoArray[nuevoArray.length - 2]) + obj.price)
    nuevoArray.push("€")
    console.log(nuevoArray)
    var nuevoPrecio= nuevoArray.join(" ")
    padre.innerHTML= nuevoPrecio;
    attachListItemButtons(padre)
    var totalPagar=Number(totalPrecio.textContent)
    totalPrecio.innerHTML= totalPagar + Number(obj.price);
    var numeroArticulos=Number(totalArticulos.textContent)
    totalArticulos.innerHTML= numeroArticulos+1;
}

function anadirUnoMas(obj,arrayTexto,padre){
    var nuevoArray= [];
    for (let i = 0; i <= 5 ; i++) {
        nuevoArray.push(arrayTexto[i])
        
    }
    console.log ("Length 6:"+ nuevoArray.length)
    console.log(nuevoArray)
    nuevoArray[nuevoArray.length - 2] =  Number(nuevoArray[nuevoArray.length - 2]) + obj.price
    var nuevoPrecio= nuevoArray.join(" ")
    padre.innerHTML= nuevoPrecio;
    attachListItemButtons(padre)
    var numeroArticulos=Number(totalArticulos.textContent)
    totalArticulos.innerHTML= numeroArticulos+1;
    var totalPagar=Number(totalPrecio.textContent)
    totalPrecio.innerHTML= totalPagar + Number(obj.price);  
} 

function attachListItemButtons(li) {
    let mas = document.createElement('button');
    mas.className = 'sumarArticulo';
    mas.textContent = ' +';
    li.appendChild(mas);
 
    let menos = document.createElement('button');
    menos.className = 'restarArticulo';
    menos.textContent = ' -';
    li.appendChild(menos);  
 
    let borrar = document.createElement('button');
    borrar.className = 'borrarArticulos';
    borrar.textContent= " Eliminar"
    
    li.appendChild(borrar);
  }
