// Interfaz
const tareasID = document.querySelector('#tareas');
const guardarID = document.querySelector('#guardar');
const tituloID = document.querySelector('#titulo');
const prioridadesID = document.querySelector('#prioridades');
const filterID = document.querySelector('#filter');
const searchID = document.querySelector('#search');

// Listeners
guardarID.addEventListener('click', e => {
    e.preventDefault();

    let tarea = {
        titulo: tituloID.value,
        prioridad: prioridadesID.options[prioridadesID.selectedIndex].value
    }

    guardarTarea(tarea);

});

filterID.addEventListener('change', e => {
    e.preventDefault();

    filterTareas(e.target.value);
});

// Delete tarea
tareasID.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.className == "btn") {
        deleteTarea(e.target.dataset.id);
    }
});

// Search
searchID.addEventListener('input', e => {
    e.preventDefault();
    
    searchTareas(e.target.value);
});

// Logica
function getTareas() {
    
    return fetch('http://localhost:5000/api/todos')
        .then(response => response.json())
        .then(json => pintarTareas(json))
        .catch(err => console.error(err));
}

function guardarTarea(tarea) {

    fetch("http://localhost:5000/api/todos", {
        method: 'POST',
        body: JSON.stringify(tarea),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        getTareas();
      })
      .catch(error => console.error('Error:', error));

}

function filterTareas(prioridad) {
    return fetch(`http://localhost:5000/api/todos/filter/${prioridad}`)
        .then(response => response.json())
        .then(json => pintarTareas(json))
        .catch(err => console.error(err));
}

function searchTareas(query) {
    return fetch(`http://localhost:5000/api/todos/search/${query}`)
        .then(response => response.json())
        .then(json => pintarTareas(json))
        .catch(err => console.error(err));
}

function deleteTarea(id) {
    fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(json => {
          console.log(json);
          getTareas();
      })
      .catch(error => console.error('Error:', error));
}

function pintarTareas(tareas) {

    tareasID.innerHTML = "";

    tareas.forEach(tarea => {
        tareasID.innerHTML += `
        <article class="${tarea.prioridad}">
            <h2>${tarea.titulo}</h2>
            <a data-id="${tarea.id}" href="#" class="btn" title="eliminar">Eliminar</a>
        </article>
        `;
    });
}

getTareas();