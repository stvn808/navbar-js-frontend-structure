// exportamos una funcion llamada loadCards que acepta:
// -containerSelector: un selctor CSS para el contenedor donde van las card
// -cardIds: un array opcional con los IDS de las card que se quieren mostrar.

export async function loadCards(containerSelector, cardIds = []){
    // obtenemos el contenedor del DOM
    const container = document.querySelector(containerSelector);

    if(!container)return;//si no existe simplemente nos salimos

    try{
        
        const[templateRes, dataRes] = await Promise.all([
            // hacer dos fetch al mismo tiempo
            // uno es espara laplantilla y 
            // el segundo es para los datos
            fetch("/frontend/public/views/components/card.html"),
            fetch("/frontend/public/data/cards.json"),
        ]);
        // convertir las respuestas a texto y a json
        const template = await templateRes.text();
        const cards = await dataRes.json();

        // filtramos las card si se proporcionan los IDS especificos
        const filteredCards = cardIds.length
        ? cards.filter(card => cardIds.includes(card.id))//solo las que estan en el arreglo
        :cards;//si no hay filtro, uselas todas

        filteredCards.forEach(card => {
            // remplazarlos paceholder{{...}} del template con los datos reales
            let html = template
            .replace("{{title}}",card.title)
            .replace("{{icon1}}",card.icon1)
            .replace("{{icon2}}",card.icon2)
            .replace("{{description}}",card.description);

            // container.innerHTML += html;
            container.insertAdjacentHTML("beforeend", html);
        })
    }catch(error){
        console.error("error cargando las cards", error);
    }

}