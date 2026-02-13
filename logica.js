const container = document.getElementById('pokemon-container');    // Selecciona el contenedor donde se mostraran las tarjetas de los pokemones

async function fetchPokemons() {                        // Funcion asincrona para obtener los datos de los pokemones desde la API
    try {                                               // Realiza una solicitud a la API para obtener una lista de pokemones, con un limite de 10 resultados

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');  // Espera la respuesta de la API y la convierte a formato JSON
        const data = await response.json();                                         // Imprime en la consola los datos recibidos para verificar que se han obtenido correctamente


        console.log("Datos recibidos:", data.results);         // Itera sobre cada pokemon en los resultados y realiza una solicitud adicional para obtener los detalles de cada pokemon, luego crea una tarjeta para mostrar su informacion

        data.results.forEach(async (pokemon) => {
            const res = await fetch(pokemon.url);            // Espera la respuesta de la solicitud para obtener los detalles del pokemon y la convierte a formato JSON
            const pokeData = await res.json();              // Imprime en la consola los detalles de cada pokemon para verificar que se han obtenido correctamente
            createCard(pokeData);                           // Llama a la funcion createCard para crear una tarjeta con la informacion del pokemon
        });
    } catch (error) {                                    // Si ocurre un error durante la solicitud o el procesamiento de los datos se captura y se muestra un mensaje de error en la consola
        console.error("Error al obtener datos:", error);   // Muestra un mensaje de error en la consola 
    }
}

function createCard(pokemon) {                 // Funcion para crear una tarjeta con la informacion de un pokemon, recibe como parametro los detalles del pokemon obtenidos de la API
    const card = document.createElement('div');    // Crea un nuevo elemento div para la tarjeta del pokemon y le asigna la clase 'card' para aplicar estilos
    card.classList.add('card');                     // Establece el contenido HTML de la tarjeta utilizando los datos del pokemon, incluyendo su imagen, nombre, ID 


    // El contenido de la tarjeta incluye la imagen del pokemon, su nombre en mayusculas, su ID y sus tipos, que se obtienen a partir de los datos del pokemon
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">     
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p>ID: #${pokemon.id}</p>
        <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
    
    container.appendChild(card);             // Agrega la tarjeta creada al contenedor principal para que se muestre en la pagina
}

fetchPokemons(); // Llama a la funcion fetchPokemons para iniciar el proceso de obtencion y visualizacion de los pokemones en la pagina