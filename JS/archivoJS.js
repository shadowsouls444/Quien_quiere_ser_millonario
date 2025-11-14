const preguntas = [
    { orden: 1, pregunta: "¿Cual de este animal es canina?", opciones: ["Conejo", "Gato", "Perro", "Ganso"], correcta: 2, premio: 100 },
    { orden: 2, pregunta: "¿Cuál es el planeta más grande del sistema solar?", opciones: ["Marte", "Júpiter", "Saturno", "Tierra"], correcta: 1, premio: 500 },
    { orden: 3, pregunta: "¿Quién pintó la Mona Lisa?", opciones: ["Picasso", "Da Vinci", "Van Gogh", "Miguel Ángel"], correcta: 1, premio: 1000 }
];

//orden
const preguntasOrdenadas = preguntas.slice().sort((a, b) => a.orden - b.orden);

// Estado del juego
let nivel = 0;
let premio_acumulado = 0;
let correctas = 0;
let incorrectas = 0;

// Elementos
const btnStart = document.getElementById("startGame");
const btnFinalizar = document.getElementById("finalizar");
const contPregunta = document.getElementById("pregunta");
const contOpciones = document.getElementById("opciones");
const contPremio = document.getElementById("premio");
const contAcumulado = document.getElementById("acumulado");

btnStart.addEventListener("click", iniciarJuego);
btnFinalizar.addEventListener("click", reiniciarJuego);

function iniciarJuego() {
    nivel = 0;
    premio_acumulado = 0;
    correctas = 0;
    incorrectas = 0;

    btnStart.style.display = "none";
    btnFinalizar.style.display = "inline-block";

    actualizarAcumulado();
    obtenerPreguntaActual(nivel);
}

//formato de la money
function formatearDinero(valor) {
    return "$ " + valor.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function obtenerPreguntaActual(nivel_actual) {
    const preguntaActual = preguntasOrdenadas[nivel_actual];

    if (!preguntaActual) {
        mostrarResultadosFinales();
        return;
    }

    contPregunta.textContent = preguntaActual.pregunta;
    contPremio.textContent = `Premio de la pregunta: ${formatearDinero(preguntaActual.premio)} dólares`;

    // Limpiar opciones y crear botones
    contOpciones.innerHTML = "";
    preguntaActual.opciones.forEach((opcion, indice) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.disabled = false;

        boton.onclick = () => {
            disableOpciones();
            verificarRespuesta(nivel_actual, indice);
        };

        contOpciones.appendChild(boton);
    });
}

function disableOpciones() {
    const botones = contOpciones.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);
}

function verificarRespuesta(nivel_actual, respuesta_usuario) {
    const pregunta = preguntasOrdenadas[nivel_actual];

    if (respuesta_usuario === pregunta.correcta) {
        premio_acumulado += pregunta.premio;
        correctas++;
        //para el modal
        alert(`✔ Respuesta correcta. ¡Ganaste ${formatearDinero(pregunta.premio)} dólares 🤩!`);
    } else {
        incorrectas++;
        //para el modal
        alert(`✘ Respuesta incorrecta 😔.`);
    }

    actualizarAcumulado();

    // Pasa a la siguiente pregunta
    nivel++;
    
    obtenerPreguntaActual(nivel);
}

function actualizarAcumulado() {
    contAcumulado.textContent = `Premio acumulado: ${formatearDinero(premio_acumulado)} dólares`;
}

function mostrarResultadosFinales() {
    alert(
`🏁 FIN DEL JUEGO
Total ganado: ${formatearDinero(premio_acumulado)} dólares
Respuestas correctas: ${correctas}
Respuestas incorrectas: ${incorrectas}`
    );

    // Limpieza de la UI
    contPregunta.textContent = "";
    contOpciones.innerHTML = "";
    contPremio.textContent = "";
   
    btnStart.style.display = "inline-block";
    btnFinalizar.style.display = "none";
}

function reiniciarJuego() {
    nivel = 0;
    premio_acumulado = 0;
    correctas = 0;
    incorrectas = 0;

    contPregunta.textContent = "";
    contOpciones.innerHTML = "";
    contPremio.textContent = "";
    actualizarAcumulado();

    btnStart.style.display = "inline-block";
    btnFinalizar.style.display = "none";

    alert("El juego ha sido reiniciado.");
}
