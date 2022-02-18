const socketIO = require('socket.io')
const Messages = require('./chat/messages')
//CRIAR UMA INSTÂNCIA COM A CLASSE MESSAGES
var Message = new Messages()

function newMessage(io, data) {
  //ADICIONA UMA NOVA MENSAGEM NO ARRAY DE MENSAGENS
  Message.add(data)
  //ENVIA PARA TODAS AS CONEXÕES TODAS AS MENSAGENS INSERIDAS
  io.emit('updateMessage', Message.list())
}

//TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
function onConnection(io, socket) {
  //TODO EVENTO COM IDENTIFICAÇÃO DE NEWMESSAGE SERÁ ENVIADO PARA FUNÇÃO NEWMESSAGE
  socket.on('newMessage', (data) => {newMessage(io, data)})
}

module.exports = (server) => {
  //CONNECTA O MÓDULO AO SERVIDOR
  const io = socketIO(server)
  //TODA VEZ QUE O EVENT LISTENER PERCEBER ALGUM EVENTO DE CONNECTION, ACIONARÁ ESTA FUNÇÃO
  io.on('connection', (socket) => onConnection(io, socket))
}
