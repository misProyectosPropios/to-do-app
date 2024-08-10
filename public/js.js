let id_to_write_information = 'container'



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
    let html_tag_add_todo = document.createElement('div')
    let button = document.createElement('button')
    let textarea = document.createElement('textarea')
    let inv = document.createElement('div')
    
    html_tag_add_todo.className='row'
    button.className = 'add-button'
    button.setAttribute('onclick', 'alert("hola mundo")')
    button.innerHTML = '+'
    textarea.className='new_todo'
    textarea.setAttribute('rows', '1')
    textarea.setAttribute('onchange', 'create_new_todo(this.value)')
    inv.className = 'inv'
    
    html_tag_add_todo.appendChild(button)
    html_tag_add_todo.appendChild(textarea)
    html_tag_add_todo.appendChild(inv)


    html_tag_add_todo.children.item(1).innerHTML = ''
    todos_container.appendChild(html_tag_add_todo)
}

async function create_new_todo(todo_text) {
    console.log(todo_text)
    alert(todo_text)
    let todos_container = document.getElementById(id_to_write_information)
    let last_children = todos_container.children.item(todos_container.children.length - 1)
    todos_container.removeChild(last_children)
    alert("Se elimino al hijo")
    let user_name = getUsername()
    parameters = {
        "user_name": user_name,
        "todo": todo_text,
        "state": 1,
    }
    let id = await call_API("POST", "/API/create_todo", parameters)

    let html = create_new_todo_to_the_view(todo_text, id)
    alert("Se agrego el otro")
    console.log(html)
    todos_container.appendChild(html)
    alert("Se agrego el nuevo todo")
    add_button_to_create_new_todos()
    
}

function create_new_todo_to_the_view(todo_text, id) {
    let res = document.createElement('div')
    res.className = 'row'

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('onchange', 'change_state(this)')

    let textarea = document.createElement('textarea')
    textarea.className = 'textarea'
    textarea.setAttribute('rows', '1')
    textarea.setAttribute('onchange', 'updateDatabase(this.id)')
    textarea.setAttribute('id', id)
    textarea.innerHTML = todo_text

    let button =  document.createElement('button')
    button.className = 'close'
    button.setAttribute('onclick', 'delete_todo(this)')

    res.appendChild(checkbox)
    res.appendChild(textarea)
    res.appendChild(button)
    return res
}

function change_state(node) {
    console.log(node)
    modify_state_text_area_decoration(node)
}

function modify_state_text_area_decoration(node) {
    let nodeParent = node.parentNode
    let textarea = nodeParent.children.item(1)
    let id = textarea.id
    let newDiv = document.createElement('div')
    newDiv.className = 'row'

    let newButton = document.createElement('button')  //res += "<button class='close' onClick='delete_todo(this)'/>"
    newButton.className='close'
    newButton.setAttribute("onclick", "delete_todo(this)");
    //new_text.id = node.id
    let parent_parent_node = nodeParent.parentNode
    if (node.checked == 1) {
        
        
        let new_text = document.createElement("p")
        new_text.innerHTML = textarea.value
        new_text.setAttribute('id', '-1')
        new_text.classList.add('textarea', "line")

        newDiv.appendChild(node)
        newDiv.appendChild(new_text)
        newDiv.appendChild(newButton)
        
        parent_parent_node.insertBefore(newDiv, nodeParent)
        parent_parent_node.removeChild(nodeParent)
        let text_p = document.getElementById('-1')
        text_p.setAttribute('id', id)
    } else {
        
        let new_text = document.createElement("textarea")
        new_text.innerHTML = textarea.innerHTML
        console.log("EL textarea es: ")
        console.log(textarea)
        new_text.setAttribute('id', '-1')
        new_text.classList.add('textarea')
        new_text.setAttribute("rows", '1')
        new_text.setAttribute('onchange','updateDatabase(this.id)')

        newDiv.appendChild(node)
        console.log(node)
        newDiv.appendChild(new_text)
        newDiv.appendChild(newButton)

        parent_parent_node.insertBefore(newDiv, nodeParent)
        parent_parent_node.removeChild(nodeParent)

        let text_p = document.getElementById('-1')
        text_p.setAttribute('id', id)
    }
}
