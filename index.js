const Discord = require('discord.js');
const client = new Discord.Client();
const cartasOrigin = ['0 vermelho', '1 vermelho', '2 vermelho', '3 vermelho', '4 vermelho', '5 vermelho', '6 vermelho', '7 vermelho', '8 vermelho', '9 vermelho', '+2 vermelho', 'block vermelho', 'back vermelho','0 azul', '1 azul', '2 azul', '3 azul', '4 azul', '5 azul', '6 azul', '7 azul', '8 azul', '9 azul', '+2 azul', 'block azul', 'back azul','0 amarelo', '1 amarelo', '2 amarelo', '3 amarelo', '4 amarelo', '5 amarelo', '6 amarelo', '7 amarelo', '8 amarelo', '9 amarelo', '+2 amarelo', 'block amarelo', 'back amarelo','0 verde', '1 verde', '2 verde', '3 verde', '4 verde', '5 verde', '6 verde', '7 verde', '8 verde', '9 verde', '+2 verde', 'block verde', 'back verde', 'color-change', '+4','0 vermelho', '1 vermelho', '2 vermelho', '3 vermelho', '4 vermelho', '5 vermelho', '6 vermelho', '7 vermelho', '8 vermelho', '9 vermelho', '+2 vermelho', 'block vermelho', 'back vermelho','0 azul', '1 azul', '2 azul', '3 azul', '4 azul', '5 azul', '6 azul', '7 azul', '8 azul', '9 azul', '+2 azul', 'block azul', 'back azul','0 amarelo', '1 amarelo', '2 amarelo', '3 amarelo', '4 amarelo', '5 amarelo', '6 amarelo', '7 amarelo', '8 amarelo', '9 amarelo', '+2 amarelo', 'block amarelo', 'back amarelo','0 verde', '1 verde', '2 verde', '3 verde', '4 verde', '5 verde', '6 verde', '7 verde', '8 verde', '9 verde', '+2 verde', 'block verde', 'back verde', 'color-change', '+4']
var tmpcards;

client.once('ready', () => {
	console.log('Ready!');
});

match = false
var players = []
var post = []
var playorder = []
var player
var rodada
var actNum
var actCol
var way = 'pos'
var action = 'ja1'

client.on('message', message => {
    if(message.content === 'imgtest') {
        message.channel.send("My Bot's message", {files: ["https://i.imgur.com/9KhOGjo.png"]});
    }
    if(message.content === '.new'){
        message.channel.send('>> **Iniciando uma partida** <<')
        message.channel.send('>> Envie `.join` para participar da partida')
        message.channel.send('>> Para embaralhar e entregar as cartas digite `.shuffle`')
        players = []
        match = true
        tmpcards = cartasOrigin
    } else if (message.content === '.join' && match) {
        if(players.length === 8){
            message.channel.send('>> Sala cheia, aguarde a próxima rodada')
        } else {
            players.push(message.author.username)
            message.channel.send('>> ('+players.length+'/8) jogadores na sala')
            message.author.send('Você entrou')
        }
        
    } else if (message.content === '.shuffle') {
        shuffle(message)
    } else if (message.content === '.get') {
        let obj = post.find(obj => obj.user === message.author.username)
        message.author.send(obj.cards)
    } else if (message.content === '.play') {
        message.channel.send('A ordem de jogo é:')
        for(let a = 0; a < post.length; a++){
            message.channel.send(a + 1 +': '+ post[a].user)
        }
        player = 0
        message.channel.send('---- INICIANDO JOGO ----')
        rodada = 1
        let rnum = Math.random() * (tmpcards.length - 0) + 0
        let n = Math.round(rnum)
        if(tmpcards[n] === 'color-change'){
            rnum = Math.random() * (tmpcards.length - 0) + 0
            n = Math.round(rnum)
        }
        message.channel.send('**'+tmpcards[n]+'** é a carta inicial')
        setCard(tmpcards[n], message, 1)
        tmpcards.splice(tmpcards[n], 1)
    } else if (message.content[0] === '.' && message.content[1] === 'j') {
        //modo de jogada
        console.log(message.author.username+' '+post[player].username)
        if (message.author.username != post[player].user) {
            message.channel.send('**É a vez de: '+post[player].user+' jogar**. Aguarde sua vez viado!')
        } else {
            let composed = message.content.split(' ')
            if(composed[1] == 'buy'){
                comprar(message.author.username, message)
            }else{
                let card
                if(composed.length === 3){
                    card = composed[1].concat(' ',composed[2])
                }else{
                    card = composed[1]
                }              
                if (post[player].cards.indexOf(card) === -1){
                    message.channel.send(message.author.username+' não possui essa carta')
                } else if(composed.length === 3){
                    if(composed[1] == actNum){
                        post[player].cards.splice(post[player].cards.indexOf(card), 1)
                        setCard(card, message)
                    }else if(composed[2] == actCol){
                        post[player].cards.splice(post[player].cards.indexOf(card), 1)
                        setCard(card, message)
                    }else{
                        message.channel.send('não é possível jogar essa carta')
                    }
                } else if (composed.length === 2){
                    setCard(card, message)
                    post[player].cards.splice(post[player].cards.indexOf(card), 1)
                }
            }
        }
    } else if (message.content[0] === '.' && message.content[1] === 's') {
        if(action == message.author.username){
            let c = message.content.split(' ')
            console.log('cor alterada para: '+c[1])
            actCol = c[1]
            message.channel.send('>> A COR ATUAL É `'+actCol+'`')
        } else {
            message.channel.send('>> Você não possui essa permissão')
        }
    } else if (message.content === '.cleanLast') {
        match = false
        players = []
        post = []
        playorder = []
        player = null
        rodada = null
        actNum = null
        actCol = null
        way = 'pos'
        action = null
        message.channel.send('>> Jogo finalizado')
    }
})

client.login('NTUwNzc2ODQ4NjA3NjA4ODQy.D1nW-w.pyJXrYdgABScCEAibca90jExmeo');

function shuffle(callback) {
    for(let a = 0; a < players.length; a++){
        let pobj = {
            user: players[a],
            cards: []
        }
        while(pobj.cards.length < 7){
            var rnum = Math.random() * (tmpcards.length - 0) + 0
            let n = Math.round(rnum)
            console.log(n)
            pobj.cards.push(tmpcards[n])
            tmpcards.splice(tmpcards[n], 1)
        }
        post.push(pobj)
    }
    callback.channel.send('>> Envie `.get` para receber suas cartas')
    callback.channel.send('>> Digite `.play` para inciar a partida')
}

function setCard(carta, msg, fround){
    let flag = false
    let dec = carta.split(' ')
    if(dec.length === 1 && dec[0] == '+4'){
        if(way == 'pos'){
            if(player + 1 > players.length - 1){
                p = 0
            }else{
                p = player + 1
            }
            msg.channel.send('>> O jogador **'+post[p].user+'** compra quatro cartas, digite `.get` para recebê-las')
            addCard(4, post[p].user, msg)
            msg.channel.send('>> **'+msg.author.username+'** escolha uma cor: `vermelho` `verde` `azul` `amarelo`')
            msg.channel.send('>> envie ".s {cor}" para definir')
            action === msg.author.username
        }else if(way == 'neg'){
            if(player - 1 < 0){
                p = players.length - 1
            }else{
                p = player - 1
            }
            msg.channel.send('>> O jogador **'+post[p].user+'** compra quatro cartas, digite `.get` para recebê-las')
            addCard(4, post[p].user, msg)
            msg.channel.send('>> **'+msg.author.username+'** escolha uma cor: `vermelho` `verde` `azul` `amarelo`')
            msg.channel.send('>> envie ".s {cor}" para definir')
            action === msg.author.username
        }
    }else if(dec.length === 1 && dec[0] == 'color-change'){
        msg.channel.send('>> **'+msg.author.username+'** escolha uma cor: `vermelho` `verde` `azul` `amarelo`')
        msg.channel.send('>> envie ".s {cor}" para definir')
        action === msg.author.username
    }else if(dec.length === 2){
        
        if(dec[0] === 'back'){
                if(way === 'pos'){
                    way = 'neg'
                }else if(way === 'neg'){
                    way = 'pos'
                }
                msg.channel.send('>> Ordem alterada!')
                actCol = dec[1]
        }else if(dec[0] === '+2'){
                if(way == 'pos'){
                    if(player + 1 > players.length - 1){
                        p = 0
                    }else{
                        p = player + 1
                    }
                    msg.channel.send('>> O jogador **'+post[p].user+'** compra duas cartas, digite `.get` para recebê-las')
                    addCard(2, post[p].user, msg)
                }else if(way == 'neg'){
                    if(player - 1 < 0){
                        p = players.length - 1
                    }else{
                        p = player - 1
                    }
                    msg.channel.send('>> O jogador **'+post[p].user+'** compra duas cartas, digite `.get` para recebê-las')
                    addCard(2, post[p].user, msg)
                }
                
        }else if(dec[0] === 'block'){
                if(way == 'pos'){
                    if(player + 2 > players.length - 1){
                        msg.channel.send('>> O jogador **'+post[player + 1]+' foi pulado')
                        nplayer = 0
                    }else{
                        nplayer = player + 2
                        msg.channel.send('>> O jogador **'+post[player + 1]+' foi pulado')
                    }
                    flag = true
                }else if(way == 'neg'){
                    if(player - 2 < 0){
                        msg.channel.send('>> O jogador **'+post[player - 1]+' foi pulado')
                        nplayer = players.length - 1
                    }else{
                        msg.channel.send('>> O jogador **'+post[player - 1]+' foi pulado')
                        nplayer = player - 2
                    }
                    flag = true
                }
        }else{
            actNum = dec[0]
            actCol = dec[1]
        }
        
        actNum = dec[0]
        actCol = dec[1]
    }
    if(flag == true){
        player = nplayer
    }else if(fround){
        player = player
    }
    else{
        if(way == 'pos'){
            if(player + 1 > players.length - 1){
                player = 0
            }else{
                player += 1
            }
        }else if(way == 'neg'){
            if(player - 1 < 0){
                player = players.length - 1
            }else{
                player -= 1
            }
        }
    }
    msg.channel.send('>> VEZ DE **'+post[player].user+'** JOGAR')
}

function addCard(num, player, msg){
    let pobj = post.find(obj => obj.user === player)
    console.log(pobj)
    added = 0
    while(added < num){
        var rnum = Math.random() * (tmpcards.length - 0) + 0
        let n = Math.round(rnum)
        console.log(n)
        pobj.cards.push(tmpcards[n])
        tmpcards.splice(tmpcards[n], 1)
        added += 1
    }
    msg.channel.send('>> **'+player+'** digite .get para ver suas novas cartas')
}

function comprar(player, msg){
    let pobj = post.find(obj => obj.user === player)
    var rnum = Math.random() * (tmpcards.length - 0) + 0
    let n = Math.round(rnum)
    pobj.cards.push(tmpcards[n])
    tmpcards.splice(tmpcards[n], 1)
    msg.channel.send('>> **'+player+'** comprou uma carta, digite `.get` para ver seu deck')
    let obj = post.find(obj => obj.user === msg.author.username)
    msg.author.send(obj.cards)
}