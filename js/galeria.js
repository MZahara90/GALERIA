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
    divCol.className="col"

    const divCard = document.createElement('div');
    divCard.className="card m-3"
    divCard.style="width: 11rem; height: 24rem;"
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





 const getCamisetas = "http://localhost:3000/camisetas";

  async function request(url) {
     
    return await new Promise(async function (resolve, reject) {
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
  
  console.log('will be pending when logged', myPromise)

  myPromise
    .then( function imprimirPosts(json) {
      const listPosts = JSON.parse(json);
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