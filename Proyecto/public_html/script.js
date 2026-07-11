/*CLASE PELICULA*/
class Pelicula
{
    constructor(nombre, genero, formato, precio, horarios, estado)
    {
        this.nombre = nombre;
        this.genero = genero;
        this.formato = formato;
        this.precio = precio;
        this.horarios = horarios;
        this.estado = estado;
    }
    mostrarFicha()
    {
        return "🎬 " + this.nombre +
                "<br>Género: " + this.genero +
                "<br>Formato: " + this.formato +
                "<br>Precio: S/ " + this.precio +
                "<br>Estado: " + this.estado;
    }
}

var listaPeliculas = [
    new Pelicula("Moana", "Familiar", "2D / 3D", 18,
            ["5:00 PM", "6:20 PM", "7:20 PM"], "Estreno"),
    new Pelicula("Evil Dead en llamas", "Terror", "2D", 18,
            ["1:30 PM", "3:00 PM", "4:30 PM"], "Estreno"),
    new Pelicula("Minions y Monstruos", "Animación", "2D", 12,
            ["3:00 PM", "6:00 PM", "9:00 PM"], "En cartelera"),
    new Pelicula("Supergirl", "Acción", "2D", 12,
            ["2:30 PM", "5:30 PM", "8:30 PM"], "En cartelera"),
    new Pelicula("Toy Story 5", "Animación", "2D", 12,
            ["3:40 PM", "8:15 PM"], "En cartelera"),
    new Pelicula("Obsesion", "Terror", "2D", 12,
            ["3:30 PM", "6:00 PM", "8:20 PM"], "En cartelera"),
    new Pelicula("Spider-Man Un nuevo día", "Acción", "2D", 22,
            ["2:00 PM"], "Pre-Estreno"),
    new Pelicula("La Odisea", "Acción", "2D", 22,
            ["6:30 PM"], "Pre-Estreno")
];

var peliculas = {};
function sincronizarPeliculas()
{
    peliculas = {};
    listaPeliculas.forEach(function (p)
    {
        peliculas[p.nombre] = {
            genero: p.genero,
            formato: p.formato,
            precio: p.precio,
            horarios: p.horarios,
            estado: p.estado
        };
    });
}
sincronizarPeliculas();

/*CARTELERA.HTML*/
function mostrarPeliculas()
{
    var resultado = document.getElementById("resultado");
    var texto = "<h3>🎬 Cartelera (" + listaPeliculas.length + " películas)</h3>";
    listaPeliculas.forEach(function (p, i)
    {
        texto += (i + 1) + ". " + p.nombre +
                " — S/ " + p.precio + " — " + p.estado + "<br>";
    });
    resultado.innerHTML = texto;
}
function buscarPelicula()
{
    var dato = prompt("Ingrese película a buscar");
    var resultado = document.getElementById("resultado");
    if (!dato || !peliculas[dato])
    {
        alert("No existe la película");
        return;
    }
    var p = peliculas[dato];
    resultado.innerHTML =
            "<h3>🎟 Película encontrada</h3>" +
            "Nombre: " + dato +
            "<br>Formato: " + p.formato +
            "<br>Precio: S/ " + p.precio +
            "<br>Estado: " + p.estado;
}
function insertarPelicula()
{
    var nombre = prompt("Nombre de la nueva película:");
    if (!nombre)
    {
        alert("Debe ingresar un nombre");
        return;
    }
    if (peliculas[nombre])
    {
        alert("Esa película ya existe");
        return;
    }
    var genero = prompt("Género:") || "General";
    var formato = prompt("Formato (2D / 3D):") || "2D";
    var precio = parseFloat(prompt("Precio (S/):"));
    if (isNaN(precio))
    {
        alert("Precio inválido, no se agregó la película");
        return;
    }
    var horariosTexto = prompt("Horarios separados por coma (ej: 3:00 PM, 6:00 PM):") || "";
    var horarios = horariosTexto.split(",")
            .map(function (h)
            {
                return h.trim();
            })
            .filter(function (h)
            {
                return h.length > 0;
            });
    var estado = prompt("Estado (Estreno / En cartelera / Pre-Estreno):") || "En cartelera";

    listaPeliculas.push(new Pelicula(nombre, genero, formato, precio, horarios, estado));
    sincronizarPeliculas();
    mostrarPeliculas();
    alert("Película agregada correctamente");
}
function editarPelicula()
{
    var nombre = prompt("Nombre de la película a editar:");
    var indice = listaPeliculas.findIndex(function (p)
    {
        return p.nombre === nombre;
    });
    if (indice === -1)
    {
        alert("No existe esa película");
        return;
    }
    var p = listaPeliculas[indice];
    var nuevoPrecio = prompt("Nuevo precio (deje vacío para mantener S/ " + p.precio + "):");
    var nuevoEstado = prompt("Nuevo estado (deje vacío para mantener \"" + p.estado + "\"):");
    if (nuevoPrecio !== null && nuevoPrecio.trim() !== "" && !isNaN(parseFloat(nuevoPrecio)))
    {
        p.precio = parseFloat(nuevoPrecio);
    }
    if (nuevoEstado !== null && nuevoEstado.trim() !== "")
    {
        p.estado = nuevoEstado;
    }
    sincronizarPeliculas();
    mostrarPeliculas();
    alert("Película actualizada correctamente");
}
function eliminarPelicula()
{
    var nombre = prompt("Nombre de la película a eliminar:");
    var indice = listaPeliculas.findIndex(function (p)
    {
        return p.nombre === nombre;
    });
    if (indice === -1)
    {
        alert("No existe esa película");
        return;
    }
    if (confirm("¿Seguro que desea eliminar \"" + nombre + "\"?"))
    {
        listaPeliculas.splice(indice, 1);
        sincronizarPeliculas();
        mostrarPeliculas();
        alert("Película eliminada");
    }
}
function ordenarPeliculasPorNombre()
{
    listaPeliculas.sort(function (a, b)
    {
        return a.nombre.localeCompare(b.nombre);
    });
    mostrarPeliculas();
}
function ordenarPeliculasPorPrecio()
{
    listaPeliculas.sort(function (a, b)
    {
        return a.precio - b.precio;
    });
    mostrarPeliculas();
}
function resaltarTarjetaHermana(elemento)
{
    var padre = elemento.parentNode;
    var hijos = padre.children;
    for (var i = 0; i < hijos.length; i++)
    {
        hijos[i].classList.remove("resaltada");
    }
    elemento.classList.add("resaltada");
    if (elemento.nextElementSibling)
    {
        elemento.nextElementSibling.classList.add("vecina");
    }
    if (elemento.previousElementSibling)
    {
        elemento.previousElementSibling.classList.add("vecina");
    }
}

/*RESERVAS.HTML*/
function mostrarInfo()
{
    var pelicula = document.getElementById("pelicula").value;
    var info = document.getElementById("infoPelicula");
    var horario = document.getElementById("horario");
    horario.innerHTML = "";
    var p = peliculas[pelicula];
    if (!p)
    {
        info.innerHTML = "";
        return;
    }
    info.innerHTML =
            "🎬 " + pelicula +
            "<br>💰 Precio: S/ " + p.precio +
            "<br>🎭 Formato: " + p.formato;
    var i = 0;
    while (i < p.horarios.length)
    {
        var option = document.createElement("option");
        option.text = p.horarios[i];
        option.value = p.horarios[i];
        horario.appendChild(option);
        i++;
    }
}
function calcularReserva()
{
    var pelicula = document.getElementById("pelicula").value;
    var cantidad = parseInt(document.getElementById("cantidad").value);
    var resultado = document.getElementById("resultadoReserva");
    if (!peliculas[pelicula] || isNaN(cantidad))
    {
        alert("Completa todos los campos");
        return;
    }
    while (cantidad < 1 || cantidad > 10)
    {
        if (cantidad < 1)
        {
            cantidad = 1;
        }
        if (cantidad > 10)
        {
            cantidad = 10;
        }
    }
    document.getElementById("cantidad").value = cantidad;
    var p = peliculas[pelicula];
    var categoria;
    switch (p.genero)
    {
        case "Acción":
            categoria = "Acción";
            break;
        case "Anime":
        case "Animación":
            categoria = "Familiar/Anime";
            break;
        case "Terror":
            categoria = "Terror";
            break;
        default:
            categoria = "General";
    }
    var total = p.precio * cantidad;
    resultado.innerHTML =
            "🎬 Película: " + pelicula +
            "<br>📌 Categoría: " + categoria +
            "<br>🎟 Cantidad: " + cantidad +
            "<br>💰 Precio: S/ " + p.precio +
            "<br>💵 TOTAL: S/ " + total;
    var resumen = document.getElementById("resumenReserva");
    resumen.innerHTML =
            "🎬 " + pelicula +
            "<br>🎟 " + cantidad + " entrada(s)" +
            "<br>💵 Total a pagar: S/ " + total;
    document.getElementById("ventanaReserva").classList.add("activa");
}
function cerrarVentanaReserva()
{
    document.getElementById("ventanaReserva").classList.remove("activa");
}
function confirmarReserva()
{
    alert("¡Reserva confirmada! Te esperamos en Cine AQP.");
    window.location.href = "01 index.html";
}
function volverAtras()
{
    history.back();
}

/* ============================================================
   CLASE PRODUCTO
   Representa cada producto de la dulcería (combos y snacks).
   ============================================================ */
class Producto
{
    constructor(nombre, precio, categoria)
    {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
    mostrarFicha()
    {
        return this.nombre + " (" + this.categoria + ") — S/. " + this.precio;
    }
}

/* Arreglo de objetos: instancias de la clase Producto */
var listaProductos = [
    new Producto("Canchita Mediana + Gaseosa", 20, "Dulcería"),
    new Producto("Canchita Grande + 2 Gaseosas", 36, "Dulcería"),
    new Producto("Nachos con Queso", 10, "Snack"),
    new Producto("Hot Dog", 10, "Snack"),
    new Producto("Vizzio", 6, "Snack")
];

function mostrarDulceria()
{
    var texto = "<h3>🍿 Lista de Precios (" + listaProductos.length + " productos)</h3>";
    listaProductos.forEach(function (p, i)
    {
        texto += (i + 1) + ". " + p.mostrarFicha() + "<br>";
    });
    var resultado = document.getElementById("resultado");
    if (resultado)
    {
        resultado.innerHTML = texto;
    }
}
function buscarProducto()
{
    var dato = prompt("Ingrese el nombre del producto a buscar:");
    var resultado = document.getElementById("resultado");
    var producto = listaProductos.find(function (p)
    {
        return p.nombre.toLowerCase() === (dato || "").toLowerCase();
    });
    if (!producto)
    {
        alert("No existe ese producto");
        return;
    }
    if (resultado)
    {
        resultado.innerHTML = "<h3>🔎 Producto encontrado</h3>" + producto.mostrarFicha();
    }
}
function insertarProducto()
{
    var nombre = prompt("Nombre del nuevo producto:");
    if (!nombre)
    {
        alert("Debe ingresar un nombre");
        return;
    }
    var yaExiste = listaProductos.some(function (p)
    {
        return p.nombre.toLowerCase() === nombre.toLowerCase();
    });
    if (yaExiste)
    {
        alert("Ese producto ya existe");
        return;
    }
    var precio = parseFloat(prompt("Precio (S/):"));
    if (isNaN(precio))
    {
        alert("Precio inválido, no se agregó el producto");
        return;
    }
    var categoria = prompt("Categoría (Dulcería / Snack):") || "Snack";
    listaProductos.push(new Producto(nombre, precio, categoria));
    mostrarDulceria();
    alert("Producto agregado correctamente");
}
function editarProducto()
{
    var nombre = prompt("Nombre del producto a editar:");
    var indice = listaProductos.findIndex(function (p)
    {
        return p.nombre.toLowerCase() === (nombre || "").toLowerCase();
    });
    if (indice === -1)
    {
        alert("No existe ese producto");
        return;
    }
    var p = listaProductos[indice];
    var nuevoPrecio = prompt("Nuevo precio (deje vacío para mantener S/. " + p.precio + "):");
    if (nuevoPrecio !== null && nuevoPrecio.trim() !== "" && !isNaN(parseFloat(nuevoPrecio)))
    {
        p.precio = parseFloat(nuevoPrecio);
    }
    mostrarDulceria();
    alert("Producto actualizado correctamente");
}
function eliminarProducto()
{
    var nombre = prompt("Nombre del producto a eliminar:");
    var indice = listaProductos.findIndex(function (p)
    {
        return p.nombre.toLowerCase() === (nombre || "").toLowerCase();
    });
    if (indice === -1)
    {
        alert("No existe ese producto");
        return;
    }
    if (confirm("¿Seguro que desea eliminar \"" + listaProductos[indice].nombre + "\"?"))
    {
        listaProductos.splice(indice, 1);
        mostrarDulceria();
        alert("Producto eliminado");
    }
}
function ordenarProductosPorNombre()
{
    listaProductos.sort(function (a, b)
    {
        return a.nombre.localeCompare(b.nombre);
    });
    mostrarDulceria();
}
function ordenarProductosPorPrecio()
{
    listaProductos.sort(function (a, b)
    {
        return a.precio - b.precio;
    });
    mostrarDulceria();
}

/*CLUB.HTML*/
var beneficios = [
    "Descuentos",
    "Puntos",
    "Funciones especiales"
];
function mostrarBeneficios()
{
    var texto = "🎁 Beneficios del Club:\n";
    beneficios.forEach(function (dato)
    {
        texto += "• " + dato + "\n";
    });
    alert(texto);
}

/*COMUNIDAD.HTML*/
var votos = [0];
function enviarVoto()
{
    var calificacion =
            parseInt(document.getElementById("calificacionVoto").value);
    if (isNaN(calificacion))
    {
        alert("Selecciona una calificación del 1 al 5");
        return;
    }
    votos.push(calificacion);
    alert("¡Gracias por tu voto!");
    promedioPeliculas();
}
function promedioPeliculas()
{
    var suma = 0;
    for (var i = 0; i < votos.length; i++)
    {
        suma += votos[i];
    }
    var promedio =
            suma / votos.length;
    var calificacion;
    if (promedio >= 4.5)
    {
        calificacion = "Excelente";
    } else if (promedio >= 3.5)
    {
        calificacion = "Buena";
    } else if (promedio >= 2.5)
    {
        calificacion = "Regular";
    } else
    {
        calificacion = "Mala";
    }
    alert(
            "⭐ Promedio de votos de la comunidad: " + promedio.toFixed(2)
            + " (" + votos.length + " votos)"
            + "\n📌 Calificación: " + calificacion
            );
}

/*TRABAJA.HTML*/
function enviarCV()
{
    var nombre =
            prompt("Ingrese nombre");
    if (nombre)
    {
        alert(
                "Gracias por registrarte "
                + nombre
                );
    } else
    {
        alert("Complete los datos");
    }
}

/*FAQ.HTML*/
function pregunta()
{
    var respuesta =
            confirm(
                    "¿Tienes más dudas?"
                    );
    if (respuesta)
    {
        var irContacto =
                confirm("¿Quieres contactarnos?");
        if (irContacto)
        {
            window.location.href = "14 contacto.html";
        }
    } else
    {
        alert("Cancelado");
    }
}

/*SOBRE NOSOTROS.HTML*/
const infoCineAQP = {
    nombre: "Cine AQP",
    eslogan: "El cine que vive Arequipa",
    fundacion: 2026,
    mision: "Acercar la mejor experiencia cinematográfica a Arequipa, combinando tecnología de punta con la calidez arequipeña.",
    valores: ["Pasión por el cine", "Calidad de servicio", "Identidad arequipeña", "Innovación constante"]
};
function mostrarNombre()
{
    alert(
            infoCineAQP.nombre
            + " - " + infoCineAQP.eslogan
            + "\nDesde " + infoCineAQP.fundacion
            );
}
function mostrarMision()
{
    alert("MISIÓN:\n" + infoCineAQP.mision);
}
function mostrarValores()
{
    var texto = "NUESTROS VALORES:\n";
    var i = 0;
    while (i < infoCineAQP.valores.length)
    {
        texto += "• " + infoCineAQP.valores[i] + "\n";
        i++;
    }
    alert(texto);
}

/*VENTANA COMPLETA*/
function pantallaCompleta()
{
    var video = document.getElementById("video");
    if (video.requestFullscreen)
    {
        video.requestFullscreen();
    }
}
function toggleMenu()
{
    var nav = document.getElementById("navPrincipal");
    nav.classList.toggle("activo");
}