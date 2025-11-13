// EJEMPLO DE UNA LISTA DE PREGUNTAS
const preguntas = [

    // NOTA: El atributo 'correcta' debe contener el índice de la opción correcta en el array 'opciones'.

    {
        pregunta: "¿Cual de este animal es canina?",
        opciones: ["Conejo", "Gato", "Perro", "Ganso"],

        // Índice de la opción por ejemplo 2 corresponde a "Perro"
        correcta: 2,
        premio: 100
    },
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Marte", "Júpiter", "Saturno", "Tierra"],

        // Índice de la opción por ejemplo 1 corresponde a "Júpiter"
        correcta: 1,
        premio: 500
    },
    {
        pregunta: "¿Quién pintó la Mona Lisa?",
        opciones: ["Picasso", "Da Vinci", "Van Gogh", "Miguel Ángel"],

        // Índice de la opción por ejemplo 1 corresponde a "Da Vinci"
        correcta: 1,
        premio: 1000
    }
];

// Variables del juego
let nivel = 0;
let dinero = 0;
let premio_acumulado = 0;

// Función para obtener la pregunta actual por indice 
function obtenerPreguntaActual(nivel_actual) {

    const titulo_pregunta = preguntas[nivel_actual].pregunta;
    const preguntas_opciones = preguntas[nivel_actual].opciones;
    const premio_pregunta = preguntas[nivel_actual].premio;

    //Mostrar la pregunta en el HTML por el ID
    document.getElementById("pregunta").textContent = titulo_pregunta;

    //Mostrar premio en el HTML por el ID
    document.getElementById("premio").textContent = `Premio de la pregunta: ${premio_pregunta} dólares`;

    // Obtener el elemento HTML por el ID
    const listaHTML = document.getElementById("opciones");

    // Limpiar opciones anteriores
    listaHTML.innerHTML = "";

    // Recorrer las opciones de la pregunta actual y le pasamos el indice
    preguntas_opciones.forEach(function (opciones, indice) {

        //Crear un elemento HTML de tipo botón
        const botones = document.createElement("button");

        //Añadir texto al elemento HTML (boton)
        botones.textContent = opciones;

        // Añadir un evento de clic al botón
        botones.onclick = function () {
            verificarRespuesta(nivel_actual, indice);
        };

        // Añadir el elemento HTML creado (boton)
        listaHTML.appendChild(botones)

    })

}

// Función para verificar la respuesta del usuario
function verificarRespuesta(nivel_actual, respuesta_usuario) {

    const opcionCorrecta = preguntas[nivel_actual].correcta;
    const premioNivel = preguntas[nivel_actual].premio;

    if (respuesta_usuario == opcionCorrecta) {

        premio_acumulado += premioNivel;
        return alert("¡Respuesta correcta! Has ganado " + premioNivel + " dólares. Premio acumulado: " + premio_acumulado + " dólares.");

    } else {

        premio_acumulado = 0;
        return alert("Respuesta incorrecta. Has perdido todo tu premio acumulado.");

    }

}

//Para probar la función obtenerPreguntaActual
const pregunta = obtenerPreguntaActual(0);

/*
const pregunta = obtenerPreguntaActual(0);
console.log(pregunta.pregunta);
console.log(pregunta.opciones);
console.log(pregunta.correcta);
console.log(pregunta.premio);

verificarRespuesta(0, 2); // Prueba con la respuesta correcta
verificarRespuesta(1, 0); // Prueba con una respuesta incorrecta
*/



