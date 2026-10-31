// Aquí guardo todas las tareas
let tareas = [];

// Traigo los elementos del HTML
const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");

// Cuando se envía el formulario (con Enter ) se agrega la tarea
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // para que no se recargue la página

  const texto = inputTarea.value.trim();

  // si está vacío no hago nada
  if (texto === "") {
    return;
  }

  // creo el objeto y lo meto al array
  const nuevaTarea = {
    descripcion: texto,
    completada: false
  };
  tareas.push(nuevaTarea);

  inputTarea.value = ""; // limpio el input
  renderTasks();
});

// Esta función crea un <li> con checkbox, texto y botón de eliminar
function crearTarea(tarea, posicion) {
  const li = document.createElement("li");

  if (tarea.completada === true) {
    li.classList.add("completada");
  }

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarea.completada;
  checkbox.addEventListener("click", function () {
    // si estaba completada pasa a pendiente y al revés
    tareas[posicion].completada = !tareas[posicion].completada;
    renderTasks();
  });

  // texto de la tarea
  const texto = document.createElement("span");
  texto.classList.add("texto");
  texto.textContent = tarea.descripcion;

  // botón eliminar
  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add("eliminar");
  botonEliminar.textContent = "🗑";
  botonEliminar.addEventListener("click", function () {
    tareas.splice(posicion, 1); // quito la tarea del array
    renderTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(texto);
  li.appendChild(botonEliminar);

  return li;
}

// Borra todo lo que hay en la lista y lo vuelve a dibujar con el array
function renderTasks() {
  listaTareas.innerHTML = "";

  // primero dibujo las pendientes
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].completada === false) {
      listaTareas.appendChild(crearTarea(tareas[i], i));
    }
  }

  // después las completadas, así quedan al final
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].completada === true) {
      listaTareas.appendChild(crearTarea(tareas[i], i));
    }
  }
}