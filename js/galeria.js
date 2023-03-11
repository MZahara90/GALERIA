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
  var buscador=document.getElementById("buscador");

  var btnMarvelNavSuperior= document.getElementById("MARVEL1");
  var btnDcNavSuperior= document.getElementById("DC1");
  var btnGamingNavSuperior= document.getElementById("Gaming1");
  var btnCineSeriesNavSuperior= document.getElementById("CineSeries1");
  var btntodoNavSuperior= document.getElementById("todo1");

  btnMarvel.addEventListener("click", filtrarCategoria);
  btnDc.addEventListener("click", filtrarCategoria);
  btnGaming.addEventListener("click", filtrarCategoria);
  btnCineSeries.addEventListener("click", filtrarCategoria);
  btntodo.addEventListener("click", filtrarCategoria);
  buscador.addEventListener("keyup", filtrarCategoria);

  btnMarvelNavSuperior.addEventListener("click", filtrarCategoria);
  btnDcNavSuperior.addEventListener("click", filtrarCategoria);
  btnGamingNavSuperior.addEventListener("click", filtrarCategoria);
  btnCineSeriesNavSuperior.addEventListener("click", filtrarCategoria);
  btntodoNavSuperior.addEventListener("click", filtrarCategoria);


    function filtrarCategoria(e){
      const boton= e.target;

      var URL="https://my-json-server.typicode.com/Xeadnor/ApiFalsa/galeria"
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
            

              if(boton.id=="MARVEL" || boton.id=="MARVEL1"  ){
                var arrayMarvel= info[0].categorias[0].MARVEL;
                
                createCategoria(arrayMarvel, null);
                      
              }else if(boton.id=="DC"|| boton.id=="DC1" ){
                var arrayDC= info[0].categorias[0].DC;
                
                createCategoria(arrayDC, null);
                
              }else if(boton.id=="Gaming" || boton.id=="Gaming1" ){
                var arrayGaming= info[0].categorias[0].Gaming;
                
                createCategoria(arrayGaming, null);

              }else if(boton.id=="CineSeries" || boton.id=="CineSeries1"){
                var arrayCineSeries= info[0].categorias[0].cineSeries;
                
                createCategoria(arrayCineSeries, null);

              }else if(boton.id=="todo" || boton.id=="todo"){
                var arrayTodo= info[0].camisetas;

                createCategoria(arrayTodo, null);
              }else{//entrada por buscador
                var arrayTodo= info[0].camisetas;
                const texto= boton.value.toLowerCase();
                createCategoria(arrayTodo, texto);
              }



          }
          

    }


    function createCategoria(array, texto){
      mainDiv.innerHTML = '';
      if(texto!==null){

          for (let i = 0; i < array.length; i++) {
            if(array[i].nombre.toLowerCase().indexOf(texto) !== -1){
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
         
            if(mainDiv.childElementCount==0){
              var espacio=document.createElement("p");
              espacio.innerHTML="<br><br><br>"
              var p= document.createElement("h5");
              p.textContent= "No se ha encontrado nigún producto que coincida con la búsqueda..."
              
              mainDiv.appendChild(espacio);
              mainDiv.appendChild(p);
            }
          
      }else{

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

    }



 const getCamisetas = "https://my-json-server.typicode.com/Xeadnor/ApiFalsa/galeria"


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

