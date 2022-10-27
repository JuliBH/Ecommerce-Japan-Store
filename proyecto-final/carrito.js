function recuperoCarrito() 
{   
    let carrito =  JSON.parse(localStorage.getItem("carrito"));
    let container = document.querySelector("#cartItems")
        carrito.forEach(productos => { 
            let fila = `<div class="itemBoxCart p-4" id="card${productos.id}">
                            <div class="card h-100 shadow">
                                <div class="card-body p-4">
                                    <div class="text-center">
                                        <h5>${productos.nombre}</h5>
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        </div>
                                        <span class="text-muted text-decoration-line-through"></span>
                                        ${productos.precio}
                                        <div class="cantidadButton row pt-3 pb-3 justify-content-center">
                                            <i id="disminuir${productos.id}" class="fa-solid fa-minus minusButton align-self-center"></i>
                                            <div id="cant${productos.id}" class="cantidad pl-2 pr-2 align-self-center">${productos.cantidad}</div>
                                            <i id="aumentar${productos.id}" class="fa-solid fa-plus plusButton align-self-center"></i>
                                        </div>
                                        <button id="${productos.id}" class="btn btn-outline-dark mt-auto">Eliminar</button>    
                                    </div>
                                </div>
                            </div>
                        </div>`
                        container.innerHTML += fila
        });

        let checkout = document.querySelector("#totalMessage")
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
            let finish = `<h3 class="pl-4">Total: $${total.toFixed(2)}</h3>
                        <div class="pl-4 pt-3 pb-4"><a id="finalizarCompra" class="btn btn-outline-dark mt-auto" href="#">Finalizar compra</a></div>`

                        checkout.innerHTML += finish
}
recuperoCarrito()

// CANTIDADES DE PRODUCTOS

const aumentarItem = () => {

    let botonAumentar = document.querySelectorAll(".plusButton");

    for(const plusButton of botonAumentar) {
        plusButton.addEventListener("click", ()=> {
            const id = plusButton.id.slice(8,plusButton.id.length);
            let carrito =  JSON.parse(localStorage.getItem("carrito"));
            let aumentar = carrito.find(productos => productos.id == Number(id));
            if(aumentar)
            {
                aumentar.cantidad++;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                const quantity = document.querySelector(`#cant${id}`); 
                quantity.innerHTML = `${aumentar.cantidad}`; 
                setTimeout(() => {
                    location.reload(true); 
                }, 1000);
            }
            
        });
    }
}
aumentarItem();

const disminuirItem = () => {

    let botonDisminuir = document.querySelectorAll(".minusButton");

    for (const minusButton of botonDisminuir) {
        minusButton.addEventListener("click", ()=> {
            const id = minusButton.id.slice(9, minusButton.id.length);
            let carrito =  JSON.parse(localStorage.getItem("carrito"));
            let disminuir = carrito.find(productos => productos.id == Number(id));
            if(disminuir) 
            {   
                if(disminuir.cantidad - 1 > 0)
                {
                    disminuir.cantidad--;
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    const quantity = document.querySelector(`#cant${id}`);
                    quantity.innerHTML = `${disminuir.cantidad}`; 
                    setTimeout(() => {
                        location.reload(true); 
                    }, 1000);
                }
            }
        });
    }
}
disminuirItem();

// ELIMINAR ITEMS DEL CARRITO

const eliminarItems = () => {

let botonEliminar = document.querySelectorAll(".btn");
        
    for (const eliminaItem of botonEliminar) {
        eliminaItem.addEventListener("click", ()=> { 
            let newCart = carrito.filter(productos => productos.id != eliminaItem.id);
            localStorage.setItem('carrito', JSON.stringify(newCart)); 
            let filas = document.querySelector(`#card${eliminaItem.id}`)
            filas.remove()
            setTimeout(() => {
                location.reload(true); 
            }, 1000);
        });  
    }
}
eliminarItems();

// FINALIZAR COMPRA Y VACIAR CARRITO

let botonFinalizar = document.querySelectorAll("#finalizarCompra");

for (const finalizarCompra of botonFinalizar) {
    finalizarCompra.addEventListener("click", ()=> { alertFinalizar()
        setTimeout(() => {
            location.reload(true); 
        }, 2000);
    });
}

const alertFinalizar = () => {
    Swal.fire({
        title: 'Desea finalizar su compra?',
        showDenyButton: true,
        confirmButtonText: 'Finalizar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Compra finalizada!', '', 'success')
          localStorage.removeItem('carrito');
        } else if (result.isDenied) {
          Swal.fire('Cancelado', '', 'info')
        }
      })
}


