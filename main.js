let menu = document.getElementById('mnuUsers');
menu.addEventListener('change', () => {
    fetch('https://jsonplaceholder.typicode.com/users/' + menu.value)
        .then(response => response.json())
        .then(json => {
            let us = document.getElementById('infoUsers');
            us.innerHTML = '';
            us.innerHTML +=
                `<p class='negro padd'>
            <br>Nombre: ${json.name}<br>
            Correo: ${json.email}<br>
            Telefono: ${json.phone}<br>
            Direccion:${json.address.street}<br>
            Compañia:${json.company.name}<br><br>
            </p>`
            console.log(json)
        })
})

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        let menu = document.getElementById('mnuUsers');
        let opciones = '';
        for (let i = 0; i < json.length; i++) {
            opciones +=
                `<option value="${json[i].id}">
            ${json[i].username}</option>`;
        }
        menu.innerHTML = opciones;
    })

const btnpo = document.getElementById('btnposts');
btnpo.addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${menu.value}`)
        .then(response => response.json())
        .then(json => {
            let pt = document.getElementById('publicaciones');
            pt.innerHTML = '';
            json.forEach(pos => {
                pt.innerHTML +=
                    `<div id="pub"${pos.id} class='bord'>
                            <h1 class="stitle upcase">
                                ${pos.title}
                            </h1>
                            <p class="custom-select"
                                >${pos.body}
                            </p>
                            <div id='divbtn${pos.id}'>
                            <button class="boton2 azul" onclick="dcom(${pos.id})">
                                Ver comentarios
                            </button>
                            </div>
                            <div id='coms${pos.id}'></div>
                            <div id='pcom${pos.id}'></div>
                        </div>`

            })
        })
})



function dcom(nm) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${nm}`)
        .then(response => response.json())
        .then(json => {
            let cmts = document.getElementById(`coms${nm}`);
            cmts.innerHTML = ''
            json.forEach(com => {
                cmts.innerHTML += `
            <br>Correo:  ${com.email}<br>
            Comentario:  ${com.body}<br><br>
            `
            })

        })
    let w = document.getElementById(`pcom${nm}`);
    w.innerHTML += `
    <button type='button' class="boton2 naranja" onclick="deletecom(${nm})">
    Borrar comentarios
    </button><br><br>
    `
}

function deletecom(nm) {
    let btndelet = document.getElementById(`pcom${nm}`);
    btndelet.innerHTML = '';
    let comdele = document.getElementById(`coms${nm}`);
    comdele.innerHTML = '';
}