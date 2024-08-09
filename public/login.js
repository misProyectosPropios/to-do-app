function show_hide_password(node) {
    console.log(node)
    let node_parent_div = node.parentNode
    let password_input = node_parent_div.children.item(0)
    if (password_input.type == 'password') {
        password_input.type = 'text'
    } else {
        password_input.type = 'password'
    }
}