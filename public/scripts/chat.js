//INSTANCIANDO O SOCKET DO SERVIDOR IO, ESTE QUE ESTÁ CONECTADO NO LOCALHOST
const socket = io(`http://localhost:3000`)

//VARIAVEL QUE RECEBERÁ O USUARIO QUE ESTA LOGADO NA PÁGINA
var localUser = ''

//TODA VEZ QUE HOUVER UM EVENTO UPDATEMESSAGE ESSA FUNCÃO SERÁ INICIADA
socket.on('updateMessage', (data)=>{onInsertMessage(data)})

//INSERI TODAS AS MENSAGENS SALVAS NO DIVMESSAGE
function onInsertMessage(data){
    console.log(data)
    //INSTANCIA A DIV RESPONSÁVEL POR MOSTRAR AS MENSAGENS
    let divMessages = document.getElementById('divMessages')
    //CRIA O HTML DA DIV
    let listMessages = '<ul>'
    data.forEach(message=>{
        listMessages += `<li>${message.user}: ${message.msg}</li>`
    })
    listMessages += '</ul>'
    //ENVIA O HTML DE TODAS AS MENSAGENS SALVAS PARA A DIVMESSAGES
    divMessages.innerHTML = listMessages
}

//SALVAR NO SERVIDOR TODAS AS MENSAGENS ENVIADAS
function saveMessage(){
    let newMessage = document.getElementById('inputText').value
    //VERIFICA SE EXISTE ALGUM TEXTO ESCRITO NO INPUT
    if(newMessage == '' && localUser == ''){return ''}
    //CRIAR O OBJETO MENSAGEM A SER ENVIADO PARA O SERVIDOR
    let objMessage = {msg: newMessage, user: localUser}
    //ENVIA A MENSAGEM PARA O SERVIDOR
    socket.emit('newMessage', objMessage)
    //APAGA O TEXTO QUE ESTÁ ESCRITO NA INPUT
    document.getElementById('inputText').value = ""
}

//SALVAR O USUARIO INSERIDO
function saveUser(){
    //INSTANCIA O ELEMENTO INPUT QUE RECEBE O NOME DO USUARIO
    let inputUser = document.getElementById('inputUser')
    //VERIFICAR SE A INPUT DE USUARIO ESTÁ PREENCHIDA
    if(inputUser.value == ''){
        window.alert('Preencha o campo usuário')
    }else{
        //DEFINIR O USUARIO
        localUser = inputUser.value
        //REMOVER A INPUT DE USUARIO DA TELA
        inputUser.parentNode.removeChild(inputUser)
        //REMOVER O BUTTON DE USUARIO DA TELA
        const buttonEntrar = document.getElementById('buttonEntrar')
        buttonEntrar.parentNode.removeChild(buttonEntrar)
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    //ADICIONAR A FUNÇÃO DE GRAVAR MENSAGENS
    document.getElementById('buttonEnviar').addEventListener('click', saveMessage)
    //ADICIONAR A FUNÇÃO DE GRAVAR O USUARIO
    document.getElementById('buttonEntrar').addEventListener('click', saveUser)


})

