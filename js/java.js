
// BOTON DE SUBIR

document.addEventListener('DOMContentLoaded', () => {
  const buttonSubir = document.getElementById("buttonSubir");

  const button = buttonSubir.querySelector('button');
  button.addEventListener('click', () => {
        console.log('Botón pulsado');
        window.scrollTo({ top: 0, behavior: 'smooth' });

  });
})

 // SLIDER DE INICIO

document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel-slider');
    const slides = document.querySelectorAll('.slide');
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
    const carruseles = document.querySelectorAll(".slider-conte, .slider-conte1");
  
    carruseles.forEach(carrusel => {
      const slideManual = carrusel.querySelector('.slider-manual');
      const nextButton = carrusel.querySelector('.button-next-slider');
      const prevButton = carrusel.querySelector('.button-prev-slider');
      const slides = slideManual.querySelectorAll('.slider');
      
  
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
    const carruseles = document.querySelectorAll(".slider-conte1");
  
    carruseles.forEach(carrusel => {
      const slideManual1 = carrusel.querySelector('.slider-manual1');
      const nextButton1 = carrusel.querySelector('.button-next-slider1');
      const prevButton1 = carrusel.querySelector('.button-prev-slider1');
      const slides1 = slideManual1.querySelectorAll('.slider1');
      
  
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

// MAPA DE CONTACTO

// Coordenadas de tu negocio (cambia esto)
const negocio = [40.419969536386866, -3.7006920136167474];  // Ejemplo: Madrid (cambia por tu negocio)

// Crear el mapa centrado en tu negocio
const map = L.map('map').setView(negocio, 14); // El 14 es el nivel de zoom

// Agregar capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Colocar un marcador en tu negocio
L.marker(negocio).addTo(map)
  .bindPopup("Velar Store")
  .openPopup();

// Obtener la ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.latitude, position.coords.longitude];

    // Colocar un marcador en la ubicación del usuario
    L.marker(userLocation).addTo(map)
      .bindPopup("Estás aquí")
      .openPopup();

    // Dibujar la ruta (usamos polyline para unir los puntos)
    const route = [userLocation, negocio];
    L.polyline(route, { color: 'blue' }).addTo(map);
  }, () => {
    alert('No se pudo obtener tu ubicación.');
  });
} else {
  alert('Tu navegador no soporta geolocalización.');
}

// FORMULARIO DE PRESUPUESTO

document.addEventListener("DOMContentLoaded" , () => {
  const formulario =document.getElementById("formulario-presu");
  
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

  





  



