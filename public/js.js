let id_to_write_information = 'container'

let html_tag_add_todo = '<div class="row">                             \
            <button class="add-button" onclick="alert("hola mundo")">+</button>                      \
            <textarea class="new_todo" rows=1 onchange="create_new_todo(this.value)"/></textarea>     \
            <div class="inv"></div>\
    </div>'
/* 
 * Calls the API and waits till the API returns a value for then return it
 * problem call_API (path: text, paremters: object) {
 *  pre: True
 *  post: returns the value returned from the API called via post method
 * }
 */
async function call_API(method, path, parameters) {
    let res
    await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: method,
        body: JSON.stringify(parameters)
    })
    .then(response => response.text())
    .then(response => {
        console.log("Se devuelve respose " + response)
        res = response
        console.log("Res ahora es: " +res)
    })
    return res
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getUsername() {
    let pathname = location.pathname
    console.log("Pathmane: " + pathname)
    return pathname.slice(pathname.lastIndexOf('/') + 1)
}

async function updateDatabase(id) {
    alert(id)
    let username = getUsername()
    let todo_text = document.getElementById(id).value
    if (username) {
        parameters = {
            "id": id,
            "user": username,
            "todo": todo_text,
            "state": 1,
        }
        let info = await call_API('POST', '/API/update_row', parameters)
        console.log(info)
    }
    console.log(username)

}

async function delete_todo(nodo) {
    let parent_div = nodo.parentNode
    let parent_parent_div = parent_div.parentNode
    let textarea_id = parent_div.children.item(1).id
    let username = getUsername()
    
    if (username) {
        parameters = {
            "user_name": username,
            "id": textarea_id,
        }
        let info = await call_API('DELETE', '/API/delete_row', parameters)
    }
    parent_parent_div.removeChild(parent_div)
}

window.onload = (event) => {
    add_button_to_create_new_todos()
}

function add_button_to_create_new_todos() {
    let todos_container = document.getElementById(id_to_write_information)
    
    todos_container.innerHTML += html_tag_add_todo
}

async function create_new_todo(todo_text) {
    console.log(todo_text)
    let todos_container = document.getElementById(id_to_write_information)
    let last_children = todos_container.children.item(todos_container.children.length - 1)
    todos_container.removeChild(last_children)
    
    let user_name = getUsername()
    parameters = {
        "user_name": user_name,
        "todo": todo_text,
        "state": 1,
    }
    let id = await call_API("POST", "/API/create_todo", parameters)

    let html = create_new_todo_to_the_view(todo_text, id)
    console.log(html)
    todos_container.innerHTML +=  html
    todos_container.innerHTML += html_tag_add_todo
    
}

function create_new_todo_to_the_view(todo_text, id) {
    let res = ""
    res += "<div class='row'>"
	res += "<input type='checkbox'>"
	res += "<textarea class='textarea' rows=1  onchange=updateDatabase(this.id) id=\"" + id +"\">"
    res += todo_text
	res += "</textarea>"
	res += "<button class='close' onClick='delete_todo(this)'/>"
	res += "</div>"
    return res
}