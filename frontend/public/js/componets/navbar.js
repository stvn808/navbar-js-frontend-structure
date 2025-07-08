document.addEventListener("DOMContentLoaded", function(){
    const navbarElement = document.querySelector(".navbar");

    if(navbarElement){
        fetch("/frontend/public/views/components/navbar.html")
        .then(response => response.text())
        .then(data => {
            navbarElement.innerHTML = data;

            //logica para resaltar el enlace activo en navbar

            //obtener la ruta actual 
            //si no hay un archivo especifico se asume que es el index
            const currentPage = window.location.pathname.split("/").pop() || "index.html";


            //selcciona todos los enlaces del navbar que uaran la clase personalizada
            const navLinks = navbarElement.querySelectorAll(".navbar__link"); 

            //recorrer cada enlace del navbar 
            navLinks.forEach(link => {

                //verifica que el href del enlace incluye nombre de la pagina actual
                if(link.getAttribute("href").includes(currentPage)){
                    //si es la pagina actual se le asigna la clase 'active' para destacarla visualmete
                    link.classList.add ("active"); 
            }
        });
    })
    .catch(error => console.error("error cargando el navbar", error));

    }

});