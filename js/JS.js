
// const frames = document.querySelectorAll(".frame");
// const seccionMuneco = document.querySelector("#muneco");
// const portada = document.querySelector("#portada");

// let progreso = 0;
// let progresoObjetivo = 0;

// let animacionTerminada = false;
// let frameActual = 0;
// const tamañoInicial = 40;
// const tamañoFinal = 130;

// let cambiandoSeccion = false;


// // ----------------------------------
// // PRIMER FRAME
// // ----------------------------------

// frames[0].classList.add("activo");


// // ----------------------------------
// // SABER SI ESTAMOS EN EL MUÑECO
// // ----------------------------------

// function estamosEnMuneco() {

//     const posicionMuneco = seccionMuneco.offsetTop;
//     const posicionPortada = portada.offsetTop;

//     return (
//         window.scrollY >= posicionMuneco - 5 &&
//         window.scrollY < posicionPortada - 5
//     );
// }


// // ----------------------------------
// // SCROLL
// // ----------------------------------

// window.addEventListener("wheel", (event) => {

//     // ----------------------------------
//     // ANIMACIÓN TERMINADA
//     // ----------------------------------
// if (animacionTerminada) {

//     // ----------------------------------
//     // SCROLL HACIA ARRIBA
//     // ----------------------------------

//     if (event.deltaY < 0) {

//         animacionTerminada = false;

//         progresoObjetivo =
//             Math.max(
//                 0,
//                 progresoObjetivo + event.deltaY * 0.0015
//             );

//         return;
//     }


//     // ----------------------------------
//     // SCROLL HACIA ABAJO → PORTADA
//     // ----------------------------------

//     if (event.deltaY > 0 && !cambiandoSeccion) {

//         event.preventDefault();

//         cambiandoSeccion = true;

//         window.scrollTo({
//             top: portada.offsetTop,
//             behavior: "smooth"
//         });

//         setTimeout(() => {
//             cambiandoSeccion = false;
//         }, 1000);
//     }

//     return;
// }

//  // Si no estamos en la sección del muñeco,
//     // no hacemos nada
//     if (!estamosEnMuneco()) {
//         return;
//     }


//     // ----------------------------------
//     // ANIMACIÓN TODAVÍA EN CURSO
//     // ----------------------------------

//     event.preventDefault();


//     // Solo avanzar hacia abajo
//     if (event.deltaY > 0) {

//         progresoObjetivo +=
//             event.deltaY * 0.0008;

//         progresoObjetivo =
//             Math.min(1, progresoObjetivo);
//     }


//     if (event.deltaY < 0) {

//     progresoObjetivo +=
//         event.deltaY * 0.0008;

//     progresoObjetivo =
//         Math.max(0, progresoObjetivo);

//     // Si hemos vuelto al principio,
//     // permitimos volver a bajar normalmente
//     if (progresoObjetivo === 0) {
//         animacionTerminada = false;
//     }
// }

// }, { passive: false });


// // ----------------------------------
// // ANIMACIÓN
// // ----------------------------------

// function animar() {

//     // Movimiento suave
//     progreso +=
//         (progresoObjetivo - progreso) * 0.08;


//     // ----------------------------------
//     // FRAMES DE LA BOCA
//     // ----------------------------------

//     const progresoFrames =
//         Math.min(progreso / 0.5, 1);

//     const nuevoFrame =
//         Math.floor(
//             progresoFrames *
//             (frames.length - 1)
//         );


//     if (nuevoFrame !== frameActual) {

//         frames[frameActual]
//             .classList.remove("activo");

//         frameActual = nuevoFrame;

//         frames[frameActual]
//             .classList.add("activo");
//     }


//     // ----------------------------------
//     // CRECIMIENTO
//     // ----------------------------------

//     if (progreso >= 0.5) {

//         const progresoCrecimiento =
//             (progreso - 0.5) / 0.5;


//         const tamaño =
//             tamañoInicial +
//             (tamañoFinal - tamañoInicial) *
//             progresoCrecimiento;


//         frames[frameActual].style.width =
//             tamaño + "%";


//         // ----------------------------------
//         // FINAL DE LA ANIMACIÓN
//         // ----------------------------------

//         if (progreso >= 0.99) {

//             frames[frameActual].style.width = "130%";

//             progreso = 1;
//             progresoObjetivo = 1;

//             animacionTerminada = true;

//             console.log("MUÑECO TERMINADO");
//         }
//     }


//     requestAnimationFrame(animar);
// }


// animar();


const frames = document.querySelectorAll(".frame");
const seccionMuneco = document.querySelector("#muneco");
const transicionNegra = document.querySelector(".transicion-negra");
const portada = document.querySelector("#portada");

let frameActual = 0;
let faseCrecimiento = false;
let tamaño = 40;
let volviendoAlMuneco = false;




// ----------------------------------
// MOSTRAR FRAME
// ----------------------------------

function mostrarFrame(numero) {

    frames[frameActual].classList.remove("activo");

    frameActual = numero;

    frames[frameActual].classList.add("activo");
}


// ----------------------------------
// REINICIAR MUÑECO
// ----------------------------------

function reiniciarMuneco() {

    frameActual = 0;
    faseCrecimiento = false;
    tamaño = 40;

    frames.forEach(frame => {
        frame.classList.remove("activo");
        frame.style.width = "40%";
    });

    frames[0].classList.add("activo");
}


// ----------------------------------
// SCROLL
// ----------------------------------

window.addEventListener("wheel", (event) => {


    if (!seccionMuneco || !portada || frames.length === 0) {
        return;
    }

    const rect = seccionMuneco.getBoundingClientRect();

    const dentroDeLaSeccion =
        rect.top <= 0 &&
        rect.bottom >= window.innerHeight;


    // ----------------------------------
    // VOLVER DESDE PORTADA AL MUÑECO
    // ----------------------------------

   // ----------------------------------
// VOLVER DESDE PORTADA AL MUÑECO
// ----------------------------------

if (
    !dentroDeLaSeccion &&
    window.scrollY >= portada.offsetTop - 10 &&
    event.deltaY < 0 &&
    !volviendoAlMuneco
) {

    event.preventDefault();

    volviendoAlMuneco = true;

    // Reiniciamos directamente el muñeco
    reiniciarMuneco();
    
    // Bloqueamos el siguiente evento de scroll
    bloquearSiguienteScroll = true;

    // Volvemos al principio
    window.scrollTo({
        top: seccionMuneco.offsetTop,
        behavior: "auto"
    });

    volviendoAlMuneco = false;

    return;
}


    // ----------------------------------
    // SI NO ESTAMOS EN EL MUÑECO
    // ----------------------------------

    if (!dentroDeLaSeccion) {
        return;
    }


    // ----------------------------------
    // FASE DE CRECIMIENTO
    // ----------------------------------

    if (faseCrecimiento) {

        event.preventDefault();

        if (event.deltaY > 0) {

            tamaño += event.deltaY * 0.15;

            if (tamaño >= 180) {

                tamaño = 180;

                // Pantalla negra
                transicionNegra.classList.add("activa");


                // Esperamos a que se vuelva negra
                setTimeout(() => {

                    // Vamos a portada
                    portada.scrollIntoView({
                        behavior: "auto"
                    });


                    // Quitamos el negro
                    setTimeout(() => {

                        transicionNegra.classList.remove("activa");

                    }, 100);

                }, 150);
            }


            frames[frameActual].style.width =
                tamaño + "%";
        }

        return;
    }


    // ----------------------------------
    // BLOQUEAR SCROLL
    // ----------------------------------

    event.preventDefault();


    // ----------------------------------
    // SCROLL HACIA ABAJO
    // ----------------------------------

    if (event.deltaY > 0) {

        if (frameActual < frames.length - 1) {

            mostrarFrame(frameActual + 1);

        } else {

            // Ya estamos en boca5
            // Ahora empieza a crecer

            faseCrecimiento = true;
        }
    }


    // ----------------------------------
    // SCROLL HACIA ARRIBA
    // ----------------------------------

    if (event.deltaY < 0) {

        if (frameActual > 0) {

            mostrarFrame(frameActual - 1);

        }
    }

}, { passive: false });





const manzana = document.querySelector(".manzana");
const tarjetaManzana = document.querySelector(".container-tarjeta-manza");

const mango =document.querySelector(".mango1");
const tarjetaMango =document.querySelector(".container-tarjeta-mango");

// const grana =document.querySelector(".granada");
// const tarjetaGrana =document.querySelector(".container-tarjeta-grana")

const zana=document.querySelector(".zanahoria");
const tarjetaZana=document.querySelector(".container-tarjeta-zana");

const plata=document.querySelector(".platano");
const tarjetaPlata=document.querySelector(".container-tarjeta-plata");

const tomate=document.querySelector(".tomate1");
const tarjetaTomate=document.querySelector(".container-tarjeta-tomate");

// const bere=document.querySelector(".berenjena");
// const tarjetaBere=document.querySelector(".container-tarjeta-bere");


function cerrarTodo() {
    manzana.classList.remove("activa");
    tarjetaManzana.classList.remove("activa");

    mango.classList.remove("activa");
    tarjetaMango.classList.remove("activa");

    // grana.classList.remove("activa");
    // tarjetaGrana.classList.remove("activa");

    zana.classList.remove("activa");
    tarjetaZana.classList.remove("activa");

    plata.classList.remove("activa");
    tarjetaPlata.classList.remove("activa");

    tomate.classList.remove("activa");
    tarjetaTomate.classList.remove("activa");

    // bere.classList.remove("activa");
    // tarjetaBere.classList.remove("activa");

   
}

if (manzana) {
    manzana.addEventListener("click", () => {
        const estabaActiva = manzana.classList.contains("activa");

        cerrarTodo();

        if (!estabaActiva) {
            manzana.classList.add("activa");
            tarjetaManzana.classList.add("activa");
        }
    });
}

if (mango) {
    mango.addEventListener("click", () => {
        const estabaActiva = mango.classList.contains("activa");

        cerrarTodo();

        if (!estabaActiva) {
            mango.classList.add("activa");
            tarjetaMango.classList.add("activa");
        }
    });
}


// if (grana) {
//     grana.addEventListener("click", () => {
//         const estabaActiva = grana.classList.contains("activa");

//         cerrarTodo();

//         if (!estabaActiva) {
//             grana.classList.add("activa");
//             tarjetaGrana.classList.add("activa");
//         }
//     });
// }


if (zana) {
    zana.addEventListener("click", () => {
        const estabaActiva = zana.classList.contains("activa");

        cerrarTodo();

        if (!estabaActiva) {
            zana.classList.add("activa");
            tarjetaZana.classList.add("activa");
        }
    });
}


if (plata) {
    plata.addEventListener("click", () => {
        const estabaActiva = plata.classList.contains("activa");

        cerrarTodo();

        if (!estabaActiva) {
            plata.classList.add("activa");
            tarjetaPlata.classList.add("activa");
        }
    });
}


if (tomate) {
    tomate.addEventListener("click", () => {
        const estabaActiva = tomate.classList.contains("activa");

        cerrarTodo();

        if (!estabaActiva) {
            tomate.classList.add("activa");
            tarjetaTomate.classList.add("activa");
        }
    });
}


// if (bere) {
//     bere.addEventListener("click", () => {
//         const estabaActiva = bere.classList.contains("activa");

//         cerrarTodo();

//         if (!estabaActiva) {
//             bere.classList.add("activa");
//             tarjetaBere.classList.add("activa");
//         }
//     });
// }

const flechaAbajo = document.querySelector("#flechaAbajo");
const secciones = document.querySelectorAll(".seccion");
const contacto = document.querySelector("#contacto");
const cv =document.querySelector("#cv");
const web=document.querySelector("#web");
const ux=document.querySelector("#ux");




let seccionActual = 0;

if (flechaAbajo) {
    flechaAbajo.addEventListener("click", () => {

        seccionActual++;

        if (seccionActual >= secciones.length) {
            seccionActual = 0;
        }

        secciones[seccionActual].scrollIntoView({
            behavior: "smooth"
        });

    });
}

function controlarFlecha() {

    if (!portada || !flechaAbajo) {
        return;
    }

    if (window.scrollY < portada.offsetTop) {
        flechaAbajo.style.display = "none";
    } else {
        flechaAbajo.style.display = "block";
    }

}

controlarFlecha();

window.addEventListener("scroll", controlarFlecha);

if(flechaAbajo){
   flechaAbajo.addEventListener("click", () => {

    if (window.scrollY >= contacto.offsetTop - 50) {

        reiniciarMuneco();

    }
     if (window.scrollY >= cv.offsetTop - 50) {

        reiniciarMuneco();

    }
     if (window.scrollY >= web.offsetTop - 50) {

        reiniciarMuneco();

    }
     if (window.scrollY >= ux.offsetTop - 50) {

        reiniciarMuneco();

    }
});
 
}













// VELAR


// BOTON DE SUBIR

document.addEventListener('DOMContentLoaded', () => {
    const buttonSubir = document.getElementById("buttonSubir");

    if (!buttonSubir) return;

    const button = buttonSubir.querySelector('button');

    if (!button) return;

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

 // SLIDER DE INICIO

document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel-slider-velar');
    const slides = document.querySelectorAll('.slide-velar');
       // Comprobar que existen el carrusel y las diapositivas
    if (!carrusel || slides.length === 0) {
        return;
    }
    const totalSlides = slides.length;

    slides.forEach(slide => {
        let clone = slide.cloneNode(true);
        carrusel.appendChild(clone);
    });

    let index = 0;
    const slideWidth = slides[0].offsetWidth;

    function moverCarrusel() {
        index++;
        carrusel.style.transition = "transform 0.5s ease-in-out";
        carrusel.style.transform = `translateX(-${index * slideWidth}px)`;

        if (index >= totalSlides) {
            setTimeout(() => {
                carrusel.style.transition = "none";
                carrusel.style.transform = "translateX(0)";
                index = 0;
            }, 500);
        }
    }

    setInterval(moverCarrusel, 4000); // Mueve el carrusel cada 4 segundos
});

 // SLIDER 1 DE GALERIA 

document.addEventListener("DOMContentLoaded", function () {
    const carruseles = document.querySelectorAll(".slider-conte-velar, .slider-conte1-velar");
  
    carruseles.forEach(carrusel => {
      const slideManual = carrusel.querySelector('.slider-manual-velar');
      const nextButton = carrusel.querySelector('.button-next-slider-velar');
      const prevButton = carrusel.querySelector('.button-prev-slider-velar');
      const slides = slideManual.querySelectorAll('.slider-velar');
      
  
      if (slides.length === 0) return;
  
      const slideWidth = slides[0].offsetWidth;
      const totalSlides = slides.length;
      const visibleSlides = 3; // Cuántas slides se ven al mismo tiempo
      let index = 0; // Empieza en 0 (se ven las primeras 3)
  

      function actualizarBotones() {
        nextButton.style.display = (index >= totalSlides - visibleSlides) ? 'none' : 'block';
        prevButton.style.display = (index <= 0) ? 'none' : 'block';
      }
  
      function moverCarrusel(index) {
        if (index > totalSlides - visibleSlides) {
            index = totalSlides - visibleSlides;
          }
          if (index < 0) {
            index = 0;
          }
  
        slideManual.style.transition = "transform 0.5s ease-in-out";
        slideManual.style.transform = `translateX(-${index * slideWidth}px)`;

        actualizarBotones();

      }
  
      nextButton.addEventListener("click", () => {
        index++;
        moverCarrusel(index);
      });
  
      prevButton.addEventListener("click", () => {
        index--;
        moverCarrusel(index);
      });

      actualizarBotones();

    });
  });

 // SLIDER 2 DE GALERIA 

  document.addEventListener("DOMContentLoaded", function () {
    const carruseles = document.querySelectorAll(".slider-conte1-velar");
  
    carruseles.forEach(carrusel => {
      const slideManual1 = carrusel.querySelector('.slider-manual1-velar');
      const nextButton1 = carrusel.querySelector('.button-next-slider1-velar');
      const prevButton1 = carrusel.querySelector('.button-prev-slider1-velar');
      const slides1 = slideManual1.querySelectorAll('.slider1-velar');
      
  
      if (slides1.length === 0) return;
  
      const slide1Width = slides1[0]. offsetWidth;
      const totalSlides1 = slides1.length;
      const visibleSlides1 = 3; // Cuántas slides se ven al mismo tiempo
      let index = 0; // Empieza en 0 (se ven las primeras 3)
  

      function actualizarBotones() {
        nextButton1.style.display = (index >= totalSlides1 - visibleSlides1) ? 'none' : 'block';
        prevButton1.style.display = (index <= 0) ? 'none' : 'block';
      }
  
      function moverCarrusel(index) {
        if (index > totalSlides1 - visibleSlides1) {
            index = totalSlides1 - visibleSlides1;
          }
          if (index < 0) {
            index = 0;
          }
  
        slideManual1.style.transition = "transform 0.5s ease-in-out";
        slideManual1.style.transform = `translateX(-${index * slide1Width}px)`;

        actualizarBotones();

      }
  
      nextButton1.addEventListener("click", () => {
        index++;
        moverCarrusel(index);
      });
  
      prevButton1.addEventListener("click", () => {
        index--;
        moverCarrusel(index);
      });

      actualizarBotones();

    });
  });


/* MAPA DE CONTACTO */

const contenedorMapa = document.getElementById("map-velar");

if (contenedorMapa && typeof L !== "undefined") {

    // Coordenadas del negocio
    const negocio = [40.419969536386866, -3.700692013616747];

    // Crear el mapa
    const map = L.map(contenedorMapa).setView(negocio, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador del negocio
    L.marker(negocio)
        .addTo(map)
        .bindPopup("Velar Store")
        .openPopup();

    // Ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = [
                    position.coords.latitude,
                    position.coords.longitude
                ];

                L.marker(userLocation)
                    .addTo(map)
                    .bindPopup("Estás aquí");

                L.polyline([userLocation, negocio], {
                    color: "blue"
                }).addTo(map);
            },
            () => {
                console.log("No se pudo obtener la ubicación.");
            }
        );
    }
}


// FORMULARIO DE PRESUPUESTO

document.addEventListener("DOMContentLoaded" , () => {
  const formulario = document.getElementById("formulario-presu");

  // Este script se comparte con páginas que no tienen el formulario de Velar.
  if (!formulario) return;
  
  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // previene el envio por defecto
    let errores = [];

    const nombre= document.getElementById("nombre").value.trim();
    const apellido= document.getElementById("apellido").value.trim();
    const telefono= document.getElementById("telefono").value.trim();
    const email= document.getElementById("email").value.trim();
    const duracion= document.getElementById("duracion").value.trim();
    const condiciones = document.getElementById("condiciones").checked;

    //validacion de los campos

    if(nombre === "")errores.push("El nombre es obligatorio");
    if(apellido ==="") errores.push("El apellido es obligatorio");

    const telRegex = /^[0-9]{9}$/;
    if (!telRegex.test(telefono)) errores.push("El telefono dede de tener entre 9 numeros");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))errores.push("Correo no valido");

    if (duracion ===""|| isNaN(duracion)|| duracion< 1 || duracion> 24){
      errores.push("La duracion dede de estar entre 1 y 24 meses");
    }

    if (!condiciones)errores.push("Debes aceptar las condiciones");

    //mostrar errores o enviar
    if(errores.length > 0){
      alert("Errores:\n\n" + errores.join("\n"));
    } else {
     formulario.reset(); // Limpia el formulario
    }
  });
});


// PRESUPUESTO: mostra el producto seleccionado y los plazos que los quiere financiar//

  function mostrarPrecio(){

    const producto =document.getElementById("opciones");
    const duracion =document.getElementById("duracion").value;
    const resultado =document.getElementById("resultado");
    const resultadoExtra =document.getElementById("resultadoExtra");
    const checkbox =document.querySelectorAll('input[name="extra"]:checked');
    const buttonResetear =document.getElementById("resetear")

    const opcionSeleccionada= producto.options[producto.selectedIndex];
    const precio = opcionSeleccionada.getAttribute("data-precio");
    let total =0;


    //calcula el precio por los meses que los quieras finaciar//
    if (precio && duracion){
         total = parseInt(precio) / parseInt(duracion);
      resultado.textContent=`Total: ${total.toLocaleString('es-ES')}€ mensual`;
    }else{
      resultado.textContent=`total:0€ mensual`;
    }
  

    let totalExtras =0;
    checkbox.forEach(checkbox => {
      switch (checkbox.value) {
        case "envio-rapido":
          totalExtras += 20;
          break;
        case "grabado-personalizado":
          totalExtras += 15;
          break;
        case "regalo":
          totalExtras += 10;
          break;
    }
    
  });
  //calcular el ressultado de los meses mas los extras //
      const totalConExtras =total + totalExtras;
      resultado.textContent = `Total: ${total.toLocaleString('es-ES')}€ mensual`;
      resultadoExtra.textContent = `+ Extras: ${totalExtras.toLocaleString('es-ES')}€ → Total final: ${totalConExtras.toLocaleString('es-ES')}€`;
        
   // resetear los resultados 
   
   buttonResetear.addEventListener("click", function () {
    document.querySelector("form").reset();
    document.getElementById("resultado").textContent="Total: 0€ mensual";
    document.getElementById("resultadoExtra").textContent= "Total con extra 0€";

   });
  }





//   fogon

// MAP

// Coordenadas del la tienda
document.addEventListener("DOMContentLoaded", () => {
  if (typeof L === "undefined") {
    // Leaflet no está cargado, salir para evitar error
    return;
  }
  const negocio = [39.0852344287194, -0.21484137116453886];  
  const map = L.map('map-fogon').setView(negocio, 14); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const iconoRojo = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

  L.marker(negocio,{ icon: iconoRojo } ).addTo(map) // Crea un marcador en la ubicación "negocio"
    .bindPopup("Fogón de More") // muestra un popup con el texto "fongon de more"
    .openPopup();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.latitude, position.coords.longitude];

      L.marker(userLocation).addTo(map) // Crea un marcador en la ubicación "cliente"
        .bindPopup("Estás aquí")
        .openPopup();
         // API Key de OpenRouteService
        const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjMwYTU2MjdhOWJlMDRkODA5OWY4YzhjNTQ0NzRkMDkxIiwiaCI6Im11cm11cjY0In0=";

        // solicitar ruta 
       fetch("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
          method: "POST",
          headers:{
            "content-Type":"application/json",
             Authorization:apiKey,
          },
          body:JSON.stringify({
            coordinates: [userLocation.reverse(), negocio.reverse()],
          }),
        })
         .then((response) => response.json())
          .then((data) => {
            // Dibujar la ruta
            const ruta = L.geoJSON(data, {
              style: {
                color: "blue",
                weight: 5,
              },
            }).addTo(map);

            map.fitBounds(ruta.getBounds());
          })
          .catch((error) => {
            console.error("Error al obtener la ruta:", error);
            alert("No se pudo calcular la ruta.");
          });
      },
      
     () => {
      alert('No se pudo obtener tu ubicación.');
    });
  } else {
    alert('Tu navegador no soporta geolocalización.');
  }
});


// SLIDER

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona tu carousel
    const carousel = document.querySelector('#heroCarousel');
    if (!carousel) return; // previene errores si no encuentra el carousel

    // Al iniciar el cambio de slide, ocultamos todos los textos
    carousel.addEventListener('slide.bs.carousel', () => {
        document.querySelectorAll('.text-wrapper').forEach(el => {
            el.style.opacity = 0;
            el.style.transition = 'opacity 0.5s'; // efecto suave
        });
    });

    // Al terminar el cambio de slide, mostramos el texto del slide activo
    carousel.addEventListener('slid.bs.carousel', () => {
        const activeSlide = carousel.querySelector('.carousel-item-fogon.active');
        const textWrapper = activeSlide.querySelector('.text-wrapper');
        if (textWrapper) {
            textWrapper.style.opacity = 1;
            textWrapper.style.transition = 'opacity 0.5s'; // efecto suave
        }
    });
});

// forulario

 const inputName =document.getElementById("inputName");
 if(inputName){
  inputName.addEventListener("input", function(){
  this.value=this.value.replace(/[^A-Za-z]/g, '');
 });
}

 const inputApellido =document.getElementById("inputapellido");
 if(inputApellido){
  inputApellido.addEventListener("input", function(){
  this.value=this.value.replace(/[^A-Za-z]/g, '');
});
}
 
const inputTelefono =document.getElementById("inputtelefono");
if(inputTelefono){
  inputTelefono.addEventListener("input", function(){
  this.value=this.value.replace(/[^0-9]/g, '');
});
}

// formulario presupuesto

const inputNombre =document.getElementById("inputNombre");
if(inputNombre){
  inputNombre.addEventListener("input", function(){
  this.value=this.value.replace(/[^A-Za-z]/g, '');
});
}


  




// UX / UI

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const frutasCesta = gsap.utils.toArray(".platano-cesta-fogon, .tomate-cesta-velar, .zanahoria-cesta-eli");
    const cesta = document.querySelector(".contene-cesta-fogon");

    if (frutasCesta.length && cesta) {
        frutasCesta.forEach((fruta, i) => {
            const estilos = getComputedStyle(fruta);
            const xFinal = estilos.getPropertyValue("--x-final").trim() || "0px";
            const yFinal = parseFloat(estilos.getPropertyValue("--y-final")) || 0;
            const giroFinal = parseFloat(estilos.getPropertyValue("--giro-final")) || 0;

            gsap.fromTo(fruta,
                {
                    x: xFinal,
                    y: -window.innerHeight * 3.9,
                    rotation: 0,
                    opacity: 1
                },
                {
                    x: xFinal,
                    y: yFinal,
                    rotation: giroFinal,
                    duration: 1.3,
                    delay: i * 0.3,
                    ease: "bounce.out",
                    scrollTrigger: {
                        trigger: cesta,
                        start: "top 75%",
                        once: true
                    }
                }
            );
        });
    }
}

