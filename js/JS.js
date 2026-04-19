// MAP

// Coordenadas del la tienda
document.addEventListener("DOMContentLoaded", () => {
  if (typeof L === "undefined") {
    // Leaflet no está cargado, salir para evitar error
    return;
  }
  const negocio = [39.0852344287194, -0.21484137116453886];  
  const map = L.map('map').setView(negocio, 14); 

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
        const activeSlide = carousel.querySelector('.carousel-item.active');
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

