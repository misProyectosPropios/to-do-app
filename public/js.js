let id_to_write_information = 'container'


/* 
 * Calls the API and waits till the API returns a value for then return it
 * problem call_API (path: text, paremters: object) {
 *  pre: True
 *  post: returns the value returned from the API called via post method
 * }
 */
async function call_API(path, parameters) {
    let res
    await fetch(path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
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

