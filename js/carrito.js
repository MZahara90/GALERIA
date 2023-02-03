var BotonesAnnadir= document.getElementsByClassName("annadir");
var body= document.getElementsByTagName("body")[0];
var listaCompra= document.getElementById("listaCompra")
var totalArticulos= document.getElementById("totalArticulos")
var totalPrecio= document.getElementById("total")

body.addEventListener("click",comprobar);


function comprobar(evnt){
    var elemento=evnt.target;
    if(elemento.textContent === "Añadir al Carrito"){
        addToCart(elemento);
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
                    var nuevoLi = document.createElement("li")
                    nuevoLi.innerHTML=obj.nombreArticulo + " " + obj.price + " €";
                    attachListItemButtons(nuevoLi)
                    listaCompra.appendChild(nuevoLi);
                    var numeroArticulos=Number(totalArticulos.textContent)
                    totalArticulos.innerHTML= numeroArticulos+1;
                    var totalPagar=Number(totalPrecio.textContent)
                    totalPrecio.innerHTML= totalPagar+ Number(obj.price);
                }

            } else{ //si la lista está vacía
                var nuevoLi = document.createElement("li")
                nuevoLi.innerHTML=obj.nombreArticulo + " " + obj.price + " €";
                attachListItemButtons(nuevoLi)
                listaCompra.appendChild(nuevoLi);
                var numeroArticulos=Number(totalArticulos.textContent)
                totalArticulos.innerHTML= numeroArticulos+1;
                var totalPagar=Number(totalPrecio.textContent)
                totalPrecio.innerHTML= totalPagar+ Number(obj.price);
            }
            //si existe un elemento dentro del <ul> con el mismo nombre que lo sume
    
            //sino que cree un nuevo elemento <li>  en el modal con obj.nombreArticulo y obj.price 
            //y crear el botón de + para sumar  y - para eliminar y el contador de objetos
             
          
       

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
/* Create a shopping cart object
var shoppingCart = {
    items: [],
    addItem: function(name, price) {
        this.items.push({name: name, price: price});
    },
    removeItem: function(name) {
        this.items = this.items.filter(function(item) {
            return item.name !== name;
        });
    },
    total: function() {
        return this.items.reduce(function(total, item) {
            return total + item.price;
        }, 0);
    }
}

// Add some items to the cart
//shoppingCart.addItem("Product 1", 10.99);
//shoppingCart.addItem("Product 2", 5.99);

// Print the total
console.log(shoppingCart.total()); // 16.98

// Remove an item
shoppingCart.removeItem("Product 1");

// Print the total again
console.log(shoppingCart.total()); // 5.99


// Render the cart in the HTML
function renderCart() {
    var cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    for (var i = 0; i < shoppingCart.items.length; i++) {
        var item = shoppingCart.items[i];
        var li = document.createElement("li");
        li.innerHTML = item.name + " - $" + item.price.toFixed(2);
        cartList.appendChild(li);
    }
    var total = document.getElementById("cart-total");
    total.innerHTML = "$" + shoppingCart.total().toFixed(2);
}

// Get all the add-to-cart buttons
var addToCartButtons = document.getElementsByClassName("add-to-cart");

// Add a click event listener to each button
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", function(event) {
        // Get the name and price of the item from the button's data attributes
        var name = this.getAttribute("data-name");
        var price = parseFloat(this.getAttribute("data-price"));
        
        // Add the item to the cart
        shoppingCart.addItem(name, price);
        
        // Re-render the cart
        renderCart();
    });
}


// Initial render
renderCart();

// Add an item to the cart
//shoppingCart.addItem("Product 1", 10.99);

*/
