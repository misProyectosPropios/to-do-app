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