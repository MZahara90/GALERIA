document.addEventListener('DOMContentLoaded', () => {

    const arrayProductos = [];
    class Producto  {
      constructor(){
        this.id;
        this.nombre;
        this.catergoria;
        this.percio;
        this.imagenURL;
        this.descripcion;
      }
    };

const mainDiv = document.querySelector('.galeria');

  function createCard(obj){
         
    const divCol = document.createElement('div');
    divCol.className="col-6 col-sm-4 col-md-3 p-0 d-flex justify-content-center"

    const divCard = document.createElement('div');
    divCard.className="card ms-1 mt-1"
    divCard.style="width: 12rem; height: 24rem;"
    divCol.appendChild(divCard)

    var imagen=  document.createElement('img');
    imagen.src= obj.imagenURL;//aquí va la URL de la imagen
    divCard.appendChild(imagen)

    var cardBody=  document.createElement('div');
    cardBody.className="card-body";
    divCard.appendChild(cardBody)

    var nombreArticulo= document.createElement('h6');
    nombreArticulo.className="card-title";
    nombreArticulo.textContent=obj.nombre;
    cardBody.appendChild(nombreArticulo);

    /*var descripcionArticulo= document.createElement('p');
    descripcionArticulo.className="card-text"
    descripcionArticulo.textContent=obj.descripcion;
    cardBody.appendChild(descripcionArticulo);*/

    var precioArticulo= document.createElement('p');
    precioArticulo.className="price"
    precioArticulo.textContent= obj.precio
    cardBody.appendChild(precioArticulo);

    var botonAddToCart= document.createElement('button')
    botonAddToCart.className="btn btn-primary annadir"
    botonAddToCart.textContent="Añadir al Carrito"
    cardBody.appendChild(botonAddToCart);

    return divCol;
  }

  var btnMarvel= document.getElementById("MARVEL");
  var btnDc= document.getElementById("DC");
  var btnGaming= document.getElementById("Gaming");
  var btnCineSeries= document.getElementById("CineSeries");
  var btntodo= document.getElementById("todo");

  btnMarvel.addEventListener("click", mostrarCategoria);
  btnDc.addEventListener("click", mostrarCategoria);
  btnGaming.addEventListener("click", mostrarCategoria);
  btnCineSeries.addEventListener("click", mostrarCategoria);
  btntodo.addEventListener("click", mostrarCategoria);

    function mostrarCategoria(e){
      const boton= e.target;

      var URL="http://localhost:3000/galeria"
            async function obtenerJSON(url){
                return await new Promise ( (resolve, reject)=>{
                    const xhr= new XMLHttpRequest();
            
                    xhr.onreadystatechange = ()=>{
                        if(xhr.readyState===4){
                            if(xhr.status===200){
                                resolve(xhr.response)
                            }else{
                                reject(xhr.status)
                            }
                        }
            
                    }
                    xhr.open("get", url, true);
                    xhr.send();
                })
            
            }
            
            const myPromise= obtenerJSON(URL);
            
            myPromise
            .then(function categoria(json){
                
                mostrarCategoria(json,boton);
                
            
            })
            .catch( function gestionErrores(error){
                console.log("ha sucedido un erro " + error)
            })
            

          function mostrarCategoria(json,boton){
            
            var info= JSON.parse(json);
            

              if(boton.id=="MARVEL"){

                var arrayMarvel= info[0].categorias[0].MARVEL;
                
                createCategoria(arrayMarvel);
                      
              }else if(boton.id=="DC"){
                var arrayDC= info[0].categorias[0].DC;
                
                createCategoria(arrayDC);
                
              }else if(boton.id=="Gaming"){
                var arrayGaming= info[0].categorias[0].Gaming;
                
                createCategoria(arrayGaming);

              }else if(boton.id=="CineSeries"){
                var arrayCineSeries= info[0].categorias[0].cineSeries;
                
                createCategoria(arrayCineSeries);

              }else{//mostrar todo
                var arrayTodo= info[0].camisetas;

                createCategoria(arrayTodo);
              }



          }
          

    }


    function createCategoria(array){
      mainDiv.innerHTML = '';
      for (let i = 0; i < array.length; i++) {
        var producto = new Producto();
        producto.id = array[i].id;
        producto.nombre = array[i].nombre;
        producto.precio = array[i].precio;
        producto.imagenURL = array[i].imagenURL;
        producto.descripcion = array[i].descripcion;
        const card = createCard(producto);
        card.setAttribute("id",array[i].id);
        mainDiv.appendChild(card);
      }    


    }



 const getCamisetas = "http://localhost:3000/galeria";

  async function request(url) {
     
    return await new Promise((resolve, reject) =>{
      const xhr =  new XMLHttpRequest();
      xhr.timeout = 2000;
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
              console.log(xhr.status);
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
           
            reject(xhr.status)
          
          }
        }
      }
      xhr.ontimeout = function () {
        reject('timeout')
      }
      xhr.open('get', url, true)
      xhr.send();
    })
  
  }
  
  const myPromise = request(getCamisetas)
  

  myPromise
    .then( function imprimirPosts(json) {
      const contenido=JSON.parse(json);
      const listPosts = contenido[0].camisetas;
      for (let i = 0; i < listPosts.length; i++) {
        var producto = new Producto();
        producto.id = listPosts[i].id;
        producto.nombre = listPosts[i].nombre;
        producto.precio = listPosts[i].precio;
        producto.imagenURL = listPosts[i].imagenURL;
        producto.descripcion = listPosts[i].descripcion;
        const card = createCard(producto);
        card.setAttribute("id",listPosts[i].id);
        mainDiv.appendChild(card);
      }    

    })
    .catch(function handleErrors(error) {
      console.log('when a reject is executed it will come here ignoring the then statement ', error)
    })
  
}); 

