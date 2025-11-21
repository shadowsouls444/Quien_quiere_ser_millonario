const preguntas = [
    { orden: 1, pregunta: "¿Qué es una licencia de software?", opciones: ["Un virus", "Un permiso legal de uso", "Un archivo temporal", "Un hardware de seguridad"], correcta: 1, premio: 100 },

    { orden: 2, pregunta: "¿Cuál de los siguientes es un tipo de licencia libre?", opciones: ["MIT", "Adobe", "Windows", "Oracle"], correcta: 0, premio: 200 },

    { orden: 3, pregunta: "¿Qué significa 'software propietario'?", opciones: ["Es gratuito", "Su código es abierto", "El código es privado y controlado por su dueño", "Solo funciona en Linux"], correcta: 2, premio: 300 },

    { orden: 4, pregunta: "¿Qué entidad protege los derechos de autor del software?", opciones: ["La policía", "El mercado", "El copyright", "El hardware"], correcta: 2, premio: 500 },

    { orden: 5, pregunta: "¿Qué es el 'código fuente'?", opciones: ["Un documento financiero", "Un archivo comprimido", "La estructura interna del procesador", "El conjunto de instrucciones legibles del programa"], correcta: 3, premio: 1000 },

    { orden: 6, pregunta: "¿Cuál es una consecuencia de usar software pirata?", opciones: ["Mayor rendimiento", "Actualizaciones garantizadas", "Riesgos legales y de seguridad", "Mayor soporte técnico"], correcta: 2, premio: 2000 },

    { orden: 7, pregunta: "¿Qué es un contrato de licencia EULA?", opciones: ["Un acuerdo para comprar un carro", "Un acuerdo de uso final del software", "Un permiso laboral", "Una factura electrónica"], correcta: 1, premio: 4000 },

    { orden: 8, pregunta: "¿Qué garantiza una licencia GPL?", opciones: ["Código cerrado", "Redistribución solo comercial", "Libertad para usar, modificar y compartir", "Pago por cada instalación"], correcta: 2, premio: 8000 },

    { orden: 9, pregunta: "¿Qué es la ingeniería inversa en software?", opciones: ["Crear un código desde cero", "Copiar un programa legalmente", "Analizar un programa para entender su funcionamiento interno", "Actualizar la licencia"], correcta: 2, premio: 16000 },

    { orden: 10, pregunta: "¿Cuál de estos NO es un derecho del autor de software?", opciones: ["Distribuir su obra", "Recibir crédito", "Modificar el clima del sistema", "Permitir o negar usos"], correcta: 2, premio: 32000 },

    { orden: 11, pregunta: "¿Qué implica una violación de licencia?", opciones: ["Uso fuera de los permisos otorgados", "Eliminación del instalador", "No activar el antivirus", "Cambiar de sistema operativo"], correcta: 0, premio: 64000 },

    { orden: 12, pregunta: "¿Qué regula el GDPR en relación con software?", opciones: ["Propiedad intelectual", "Protección de datos personales", "Velocidad de internet", "Función del hardware"], correcta: 1, premio: 125000 },

    { orden: 13, pregunta: "¿Qué es un 'patente de software'?", opciones: ["Protección a una invención o proceso tecnológico", "Un documento de copyright", "Un acuerdo de licencia libre", "Un malware protegido"], correcta: 0, premio: 250000 },

    { orden: 14, pregunta: "En Apocalypto, ¿cómo se llama el protagonista?", opciones: ["Garra Jaguar", "Serpiente Negra", "Lobo Gris", "Águila Roja"], correcta: 0, premio: 500000 },

    { orden: 15, pregunta: "¿Qué civilización aparece retratada en Apocalypto?", opciones: ["Aztecas", "Mayas", "Incas", "Olmecas"], correcta: 1, premio: 750000 },

    { orden: 16, pregunta: "¿Cuál es la motivación principal de Garra Jaguar en la película?", opciones: ["Vengarse del rey", "Rescatar a su familia", "Conseguir riqueza", "Convertirse en jefe de la tribu"], correcta: 1, premio: 1000000 },

    { orden: 17, pregunta: "¿Qué evento marca el clímax de la persecución en Apocalypto?", opciones: ["La llegada de los colonizadores", "Un eclipse lunar", "Un terremoto", "Un sacrificio fallido"], correcta: 0, premio: 1500000 },
    { orden: 18, pregunta: "¿Quién es el creador principal de Facebook según la película The Social Network?", opciones: ["Steve Jobs", "Elon Musk", "Mark Zuckerberg", "Bill Gates"], correcta: 2, premio: 2000000 },

    { orden: 19, pregunta: "¿Qué problema legal enfrenta Zuckerberg en la película?", opciones: ["Robo de hardware", "Acusación de plagio de idea", "Hackeo al FBI", "Fraude financiero"], correcta: 1, premio: 3000000 },

    { orden: 20, pregunta: "¿Cuál fue el proyecto inicial de Zuckerberg que causó polémica en Harvard?", opciones: ["FaceMash", "HarvardGo", "CampusLink", "ProfileMe"], correcta: 0, premio: 5000000 }
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

function abrirModal(titulo, mensaje) {
    document.getElementById("modal-titulo").textContent = titulo;
    document.getElementById("modal-mensaje").textContent = mensaje;
    document.getElementById("miModal").style.display = "block";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

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
        abrirModal("✔ Respuesta correcta", `¡Ganaste ${formatearDinero(pregunta.premio)} dólares 🤩!`);
    } else {
        incorrectas++;
        //para el modal
        abrirModal("✘ Respuesta incorrecta", "Respuesta incorrecta 😔.");
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
    abrirModal("🏁 FIN DEL JUEGO",
        `Total ganado: ${formatearDinero(premio_acumulado)} dólares \n
         Correctas: ${correctas} \n
         Incorrectas: ${incorrectas}`);

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

    abrirModal("Juego reiniciado", "El juego ha sido reiniciado.");
}
