const message = document.getElementById('message')
const received_messages = document.getElementById('received_messages')
const socket = io() // Cliente de socket.io

let user

socket.on('messageLogs', data => {
    let messages = ''
    data.forEach(message => {
        messages += `${message.user} dice ${message.message}<br />`
    })

    received_messages.innerHTML = messages
})

const sendMessage = () => {
    if (message.value.trim() !== '') {
        socket.emit('message', { user: user, message: message.value.trim()})
    }
}
const users = [

    { id: 1, firstName: 'Carlos', lastName: 'Perren', userName: 'cperren' },

    { id: 2, firstName: 'Carolina', lastName: 'Ferrero', userName: 'cferrero' },

    { id: 3, firstName: 'Juan', lastName: 'Perez', userName: 'jperez' }

]
const authenticate = () => {

   
    Swal.fire({
        title: 'Login',
        input: 'text',
        text: 'Ingresar usuario:',
        inputValidator: value => {
            return !value && 'Por favor ingresar usuario!'
        },
        allowOutsideClick: false
    }).then(res => {
        user = users.find(item => item.userName === res.value)
        if(user !== undefined){
            socket.emit('user_conneted', {user: user})
        }else{
           Swal.fire({
            text: 'Usuario no valido',
            toast: true,
            position:'top-right'
           }).then(res =>{
                authenticate()
           })
        }
    })
}