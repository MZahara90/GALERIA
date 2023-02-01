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

            if(listaCompra.childElementCount!=0){
                for (let i = 0; i < listaCompra.childElementCount; i++) {
   
                  if(listaCompra.children[i].textContent.match(obj.nombreArticulo)!=null){
                       elementoIgual= listaCompra.children[i]
                        count++;
                    }
                  
                } 
                
                if (count !=0){
                    var arrayTexto= elementoIgual.textContent.split(" ")
                    var precioTotalArticulo= Number(arrayTexto[arrayTexto.length - 2]) + obj.price
                    
                    if(arrayTexto.length == 4){
                       
                        arrayTexto.push(precioTotalArticulo)
                        arrayTexto.push("€")
                        totalPrecio.innerHTML= Number(Number(arrayTexto[2]) + obj.price);
                        var nuevoPrecio= arrayTexto.join(" ")
                        console.log(nuevoPrecio)
                        elementoIgual.innerHTML= nuevoPrecio;
                        var numeroArticulos=Number(totalArticulos.textContent)
                        totalArticulos.innerHTML= numeroArticulos+1;
                        
                    }else{
                        
                        arrayTexto[arrayTexto.length - 2] =  Number(arrayTexto[arrayTexto.length - 2]) + obj.price
                        var nuevoPrecio= arrayTexto.join(" ")
                        elementoIgual.innerHTML= nuevoPrecio;
                        var numeroArticulos=Number(totalArticulos.textContent)
                        totalArticulos.innerHTML= numeroArticulos+1;
                        var totalPagar=Number(totalPrecio.textContent)
                        totalPrecio.innerHTML= totalPagar+ Number(obj.price);
                    }
                   

                }else{
                    var nuevoLi = document.createElement("li")
                    nuevoLi.innerHTML=obj.nombreArticulo + " " + obj.price + " €";
                    listaCompra.appendChild(nuevoLi);
                    var numeroArticulos=Number(totalArticulos.textContent)
                    totalArticulos.innerHTML= numeroArticulos+1;
                    var totalPagar=Number(totalPrecio.textContent)
                    totalPrecio.innerHTML= totalPagar+ Number(obj.price);
                }

            } else{
                var nuevoLi = document.createElement("li")
                nuevoLi.innerHTML=obj.nombreArticulo + " " + obj.price + " €";
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
