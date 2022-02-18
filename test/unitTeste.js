
function unitTesteClassMessage(){
    const Messages = require('../chat/messages')

    const message = {
        msg: 'Esta é uma mensagem',
        user: 'Carlos'
    }
    const message2 = {
        msg: 'Esta é uma nova mensagem',
        user: 'Lais'
    }
    
    const newMessage = new Messages()
    newMessage.add(message)
    newMessage.add(message2)
        
    console.log(newMessage.list())
}