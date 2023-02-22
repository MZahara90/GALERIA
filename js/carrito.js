var BotonesAnnadir= document.getElementsByClassName("annadir");
var body= document.getElementsByTagName("body")[0];
var listaCompra= document.getElementById("listaCompra")
var totalArticulos= document.getElementById("totalArticulos")
var totalPrecio= document.getElementById("total")
var carritoBoton= document.getElementById("carritoBtn")
var carritoCount= document.getElementById("carritoCount")


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
        carritoBoton.className="d-inline-block align-text-top animate__animated animate__rubberBand";
        addToCart(elemento);
        setTimeout(() => {
            carritoBoton.className="d-inline-block align-text-top";
          }, "1000")
        
    }
}

function botones(event){

    if(event.target.className == "borrarArticulos fa fa-trash"){

          var boton = event.target;
          var padreLi = boton.parentElement
          var padreUl = padreLi.parentElement;
          var arrayContenidoLi=  padreLi.textContent.split(" ");
         
          var obj= new Object();
          var arrayNombre=  padreLi.textContent.split(":");
          obj.nombreArticulo= arrayNombre[0]
  
          var text= arrayContenidoLi.join(" ")

          
          if(text.length - obj.nombreArticulo.length==13){//si sólo había uno
            //que se reste del precio total de la compra

                var restarPrecio= Number(arrayContenidoLi[arrayContenidoLi.length-4])
                var totalCarrito=Number(totalPrecio.textContent)-restarPrecio
                totalPrecio.innerHTML=Number(totalCarrito).toFixed(2)
            //que resten los articulos del total de artículos
                totalArticulos.innerHTML=Number(totalArticulos.textContent)-1
                carritoCount.innerHTML=totalArticulos.textContent
          }else{ //si había más de uno de ese objeto
            //que se reste del precio total de la compra
                var restarPrecio= Number(arrayContenidoLi[arrayContenidoLi.length-4])
                var diferencia=Number(totalPrecio.textContent)-restarPrecio
                var diferenciaRedondeo= Number(diferencia).toFixed(2)
                if(diferencia<1){
                    totalPrecio.innerHTML=0;
                }else{
                    totalPrecio.innerHTML=diferenciaRedondeo
                }
                
            //que resten los articulos del total de artículos
                var restarCantidad= Number(arrayContenidoLi[arrayContenidoLi.length-5])
                totalArticulos.innerHTML=Number(totalArticulos.textContent)-restarCantidad
                carritoCount.innerHTML=totalArticulos.textContent
          }
          //elimino el elemento de l lista
            padreUl.removeChild(padreLi)
    }
      
    if(event.target.className == "sumarArticulo"){
        var boton = event.target;
        var padre= boton.parentNode;
        var obj= new Object();
        var arrayTexto= padre.textContent.split(" ")
        
        
        
        var arrayNombre=  padre.textContent.split(":");
        obj.nombreArticulo= arrayNombre[0]

        var text= arrayTexto.join(" ")

        if(text.length - obj.nombreArticulo.length==13){ //si sólo se había añadido una vez ese artículo
           
            obj.price=Number(arrayTexto[arrayTexto.length-4]);

            anadirSegundo(obj,arrayTexto,padre);
                        
        }else{ //si se había añadido más de una vez ese artículo
            obj.price=Number(arrayTexto[arrayTexto.length-7]);
            anadirUnoMas(obj,arrayTexto,padre);
        }
            
    }
                 
    if(event.target.className == "restarArticulo"){
        var boton = event.target;
        var padreLiBoton = boton.parentElement
        var padreUl = padreLiBoton.parentElement;
        var arrayContenidoLi=  padreLiBoton.textContent.split(" ");
        
         var obj= new Object();
         var arrayNombre=  padreLiBoton.textContent.split(":");
        obj.nombreArticulo= arrayNombre[0]

        var text= arrayContenidoLi.join(" ")
        //comprobar si había uno a más de uno para restar
        if(text.length - obj.nombreArticulo.length==13){// si sólo había uno
            var nuevoArray= [];

            for (let i = 0; i < arrayContenidoLi.length-2 ; i++) {
                nuevoArray.push(arrayContenidoLi[i])
                
            }

            //restar del precio total de la compra
            var diferencia= Number(totalPrecio.textContent)- Number(nuevoArray[nuevoArray.length-2])
            var diferenciaRedondeada= Number(diferencia).toFixed(2)
                if(diferencia<1){
                    totalPrecio.innerHTML= 0
                }else{
                    totalPrecio.innerHTML= Number(diferenciaRedondeada);
                }
            //restar del total de artículos
                totalArticulos.innerHTML=Number(totalArticulos.textContent)-1
                carritoCount.innerHTML=totalArticulos.textContent
            
            //elimino la línea
                padreUl.removeChild(padreLiBoton)

        }else{// si había más de uno

            var nuevoArray= [];

            for (let i = 0; i < arrayContenidoLi.length-2  ; i++) {
                nuevoArray.push(arrayContenidoLi[i])
            }
            var precio= Number(nuevoArray[nuevoArray.length-5])
            var cantidad= Number(nuevoArray[nuevoArray.length-3])
            var totalPrecioLinea=Number(nuevoArray[nuevoArray.length-2])
            //recalculo el precio total de los artículos del mismo tipo
            nuevoArray[nuevoArray.length-2]=Number(totalPrecioLinea-precio).toFixed(2)
            nuevoArray[nuevoArray.length-3]= cantidad-1
            var nuevaLinea= nuevoArray.join(" ")
            padreLiBoton.innerHTML=nuevaLinea
            attachListItemButtons(padreLiBoton)

            //lo resto del precio total de artículos del carrito
            var diferencia= Number(totalPrecio.textContent)- precio
            var diferenciaRedondeada= Number(diferencia).toFixed(2)

            if(diferencia<1){
                totalPrecio.innerHTML= 0
            }else{
                totalPrecio.innerHTML= Number(diferenciaRedondeada);
            }
            //lo resto de la cantidad total de artículos
            totalArticulos.innerHTML=Number(totalArticulos.textContent)-1
            carritoCount.innerHTML=totalArticulos.textContent
            if( nuevoArray[nuevoArray.length-3]==0){
                padreUl.removeChild(padreLiBoton)
            }

        }
       
    }
}
    

//TODO ya funcionan los añadir desde la página y sumar desde el carrito
//TODO hay que solucionar el restar y el eliminar 


function addToCart(elemento){
            var padre= elemento.parentNode;
            var obj= new Object();

            obj.nombreArticulo=padre.firstElementChild.textContent+":"
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
                   
                   
                    if(elementoIgual.textContent.length-obj.nombreArticulo.length==12){ //si sólo se había añadido una vez ese artículo
                    
                            var nuevoArray= [];
                            for (let i = 0; i < arrayTexto.length-3 ; i++) {
                                nuevoArray.push(arrayTexto[i])
                                
                            }
                            nuevoArray.push("x")
                            nuevoArray.push("2")
                            var totalLineaArticulos= Number(nuevoArray[nuevoArray.length - 3]) + obj.price
                            nuevoArray.push(Number(totalLineaArticulos).toFixed(2))
                            nuevoArray.push("€")
                            var nuevoPrecio= nuevoArray.join(" ")
                            elementoIgual.innerHTML= nuevoPrecio;
                            attachListItemButtons(elementoIgual)
                            var totalPagar=Number(totalPrecio.textContent)
                            totalPrecio.innerHTML= Number(totalPagar + Number(obj.price)).toFixed(2);
                            var numeroArticulos=Number(totalArticulos.textContent)
                            totalArticulos.innerHTML= numeroArticulos+1;
                            carritoCount.innerHTML=totalArticulos.textContent
                                                
                    }else{ //si se había añadido más de una vez ese artículo
                      //anadirUnoMas(obj,arrayTexto);
                        var nuevoArray= [];
                        for (let i = 0; i < arrayTexto.length-2 ; i++) {
                            nuevoArray.push(arrayTexto[i])
                            
                        }

                        nuevoArray[nuevoArray.length-3]=Number(nuevoArray[nuevoArray.length-3])+1;
                        var totalLineaArticulos= Number(nuevoArray[nuevoArray.length - 2]) + obj.price
                        nuevoArray[nuevoArray.length - 2] = Number(totalLineaArticulos).toFixed(2)
                        var nuevoPrecio= nuevoArray.join(" ")
                        elementoIgual.innerHTML= nuevoPrecio;
                        attachListItemButtons(elementoIgual)
                        var numeroArticulos=Number(totalArticulos.textContent)
                        totalArticulos.innerHTML= numeroArticulos+1;
                        var totalPagar=Number(totalPrecio.textContent)
                        totalPrecio.innerHTML=Number(totalPagar + Number(obj.price)).toFixed(2);  
                        carritoCount.innerHTML=totalArticulos.textContent
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
    totalPrecio.innerHTML= Number(totalPagar+ Number(obj.price)).toFixed(2);
    carritoCount.innerHTML=totalArticulos.textContent
}

function anadirSegundo(obj,arrayTexto,padre){
    
    
    var nuevoArray= [];
    for (let i = 0; i< arrayTexto.length-3 ; i++) {
        nuevoArray.push(arrayTexto[i])
        
    }
    nuevoArray.push("x")
    nuevoArray.push("2")
    var sumaPrecioArticulos= Number(nuevoArray[nuevoArray.length - 3]) + obj.price
    nuevoArray.push(Number(sumaPrecioArticulos.toFixed(2)))
    nuevoArray.push("€")
    var nuevoPrecio= nuevoArray.join(" ")
    padre.innerHTML= nuevoPrecio;
    attachListItemButtons(padre)
    var totalPagar=Number(totalPrecio.textContent)
    totalPrecio.innerHTML= Number(totalPagar + Number(obj.price)).toFixed(2);
    var numeroArticulos=Number(totalArticulos.textContent)
    totalArticulos.innerHTML= numeroArticulos+1;
    carritoCount.innerHTML=totalArticulos.textContent
}

function anadirUnoMas(obj,arrayTexto,padre){

    var nuevoArray= [];
    for (let i = 0; i < arrayTexto.length-2 ; i++) {
        nuevoArray.push(arrayTexto[i])
        
    }
    //cantidad de producto
     nuevoArray[nuevoArray.length - 3]=Number(nuevoArray[nuevoArray.length - 3])+1;
    //precioTotal de los articulos
    var sumaPrecioArticulos2= Number(nuevoArray[nuevoArray.length - 2]) + obj.price
    nuevoArray[nuevoArray.length - 2] =  Number(sumaPrecioArticulos2.toFixed(2))
    var nuevoPrecio= nuevoArray.join(" ")
    padre.innerHTML= nuevoPrecio;
    attachListItemButtons(padre)
    var numeroArticulos=Number(totalArticulos.textContent)
    totalArticulos.innerHTML= numeroArticulos+1;
    carritoCount.innerHTML=totalArticulos.textContent
    var totalPagar=Number(totalPrecio.textContent)
    totalPrecio.innerHTML= Number(totalPagar + Number(obj.price)).toFixed(2);
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
    borrar.className = 'borrarArticulos fa fa-trash';
    //borrar.className= "<i class='fa fa-trash'></i>"
   // let icono = document.createElement('i');
   // icono.className= 'fa fa-trash'
   // borrar.appendChild(icono)
    li.appendChild(borrar);
  }
