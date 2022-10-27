const URL = "productos.json"
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = []

// CARGAR PRODUCTOS

const setQuantity = () =>
{
    const label = document.querySelector('#cart-quantity');
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if(total > 0)
    {
        label.innerText = total;
    }
}

const mostrarProductos = (productos) =>
{
    let contenedor = document.querySelector('#contenedor');
    for (const product of productos)
    {   
        let item = `<div class="itemBox p-4" id="${product.id}">
                        <div class="card h-100 shadow">
                            <img id="${product.id}" class="card-img-top" src="${product.img}" alt="..."/>
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5>"${product.nombre}"</h5>
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <span class="text-muted text-decoration-line-through"></span>
                                    $${product.precio}
                                </div>
                             </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="cartButton btn btn-outline-dark mt-auto" id="${product.id}" href="#">Agregar al carrito</a></div>
                             </div>
                        </div>
                    </div>`;
        contenedor.innerHTML += item
    }
    loadEvents();
}

const getData = async () =>
{
    try
    {
        const response = await fetch(URL);
        const data = await response.json();
        productos.push(...data);
        mostrarProductos(data);
    }
    catch(e)
    {
        console.log(e);
    }
}

getData();

//AGREGAR PRODUCTOS AL CARRITO

const loadEvents = () =>
{

    let boton = document.querySelectorAll(".cartButton");
    
    for (const cartButton of boton) 
    {
        cartButton.addEventListener("click", ()=> { 
            alertaCarrito()
            let producto = carrito.find(productos => productos.id == Number(cartButton.id));
            if(producto)
            {
                producto.cantidad++;
            } 
            else
            {
                let product = productos.find(element => element.id == Number(cartButton.id));
                if(product)
                {
                    carrito.push(product);
                }
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            setQuantity(carrito);
        });  
    }
}
    
    const alertaCarrito = () => {
        Toastify({
            text: "Producto agregado al carrito.",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            style: {
              background: "#71d97e",
            },
            onClick: function(){} 
          }).showToast();
    }