// ==========================================
// SISTEMA DE VENTAS
// CRUD CON LOCALSTORAGE
// ==========================================

// Arreglo principal
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Elementos
const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tablaProductos");
const buscar = document.getElementById("buscar");


const txtNombre = document.getElementById("nombre");
const txtPrecio = document.getElementById("precio");
const txtCantidad = document.getElementById("cantidad");
const indice = document.getElementById("indice");

//============================
// Guardar LocalStorage
//============================

function guardarLocal(){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}

//============================
// Mostrar Productos
//============================

function mostrarProductos(lista = productos){

    tabla.innerHTML = "";

    lista.forEach((producto, i)=>{

        tabla.innerHTML += `

        <tr>

            <td>${producto.nombre}</td>

            <td>$${producto.precio}</td>

            <td>${producto.cantidad}</td>

            <td>

                <button
                    class="editar"
                    onclick="editarProducto(${i})">

                    Editar

                </button>

                <button
                    class="eliminar"
                    onclick="eliminarProducto(${i})">

                    Eliminar

                </button>

            </td>

        </tr>

        `;

    });

}

//============================
// Crear o Actualizar
//============================

formulario.addEventListener("submit",function(e){

    e.preventDefault();

    let nombre = txtNombre.value.trim();

    let precio = Number(txtPrecio.value);

    let cantidad = Number(txtCantidad.value);

    if(nombre==="" || precio<=0 || cantidad<=0){

        alert("Complete correctamente el formulario.");

        return;

    }

    if(indice.value===""){

        productos.push({

            nombre,
            precio,
            cantidad

        });

    }

    else{

        productos[indice.value]={

            nombre,
            precio,
            cantidad

        };

        indice.value="";

    }

    guardarLocal();

    mostrarProductos();

    formulario.reset();

});

//============================
// Editar
//============================

function editarProducto(i){

    txtNombre.value = productos[i].nombre;

    txtPrecio.value = productos[i].precio;

    txtCantidad.value = productos[i].cantidad;

    indice.value = i;

}

//============================
// Eliminar
//============================

function eliminarProducto(i){

    if(confirm("¿Eliminar este producto?")){

        productos.splice(i,1);

        guardarLocal();

        mostrarProductos();

    }

}
//=====================================
// BUSCADOR EN TIEMPO REAL
//=====================================

buscar.addEventListener("keyup", function () {

    let texto = buscar.value.toLowerCase();

    let resultado = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado);

});

//=====================================
// ESTADÍSTICAS
//=====================================

function obtenerTotalProductos() {

    return productos.length;

}

function obtenerInventario() {

    let total = 0;

    productos.forEach(producto => {

        total += producto.precio * producto.cantidad;

    });

    return total;

}

function mostrarEstadisticas() {

    let estadisticas = document.getElementById("estadisticas");

    if (!estadisticas) return;

    estadisticas.innerHTML = `

        <div class="estadistica">

            <h3>Total de Productos</h3>

            <p>${obtenerTotalProductos()}</p>

        </div>

        <div class="estadistica">

            <h3>Valor del Inventario</h3>

            <p>$${obtenerInventario().toFixed(2)}</p>

        </div>

    `;

}

//=====================================
// LIMPIAR FORMULARIO
//=====================================

function limpiarFormulario() {

    formulario.reset();

    indice.value = "";

}

//=====================================
// LIMPIAR TODO EL INVENTARIO
//=====================================

function limpiarInventario() {

    let respuesta = confirm(
        "¿Desea eliminar todos los productos?"
    );

    if (!respuesta) return;

    productos = [];

    guardarLocal();

    mostrarProductos();

    mostrarEstadisticas();

    limpiarFormulario();

    alert("Inventario eliminado correctamente.");

}

//=====================================
// VALIDAR SOLO NÚMEROS
//=====================================

txtPrecio.addEventListener("input", function () {

    if (this.value < 0) {

        this.value = "";

    }

});

txtCantidad.addEventListener("input", function () {

    if (this.value < 0) {

        this.value = "";

    }

});

//=====================================
// MENSAJE DE BIENVENIDA
//=====================================

function mensajeBienvenida() {

    console.log("Sistema de Ventas iniciado correctamente.");

}

//=====================================
// INICIALIZAR SISTEMA
//=====================================

function iniciarSistema() {

    mostrarProductos();

    mostrarEstadisticas();

    mensajeBienvenida();

}

iniciarSistema();
