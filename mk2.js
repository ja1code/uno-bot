const Discord = require('discord.js') // Importa a lib do Discord

const client = new Discord.Client() // Inicia um cliente

var prefix = '.' // Prefixo de chamada do BOT

const cartasOrigin = ['0 vermelho', '1 vermelho', '2 vermelho', '3 vermelho', '4 vermelho', '5 vermelho', '6 vermelho', '7 vermelho', '8 vermelho', '9 vermelho', '+2 vermelho', 'block vermelho', 'back vermelho','0 azul', '1 azul', '2 azul', '3 azul', '4 azul', '5 azul', '6 azul', '7 azul', '8 azul', '9 azul', '+2 azul', 'block azul', 'back azul','0 amarelo', '1 amarelo', '2 amarelo', '3 amarelo', '4 amarelo', '5 amarelo', '6 amarelo', '7 amarelo', '8 amarelo', '9 amarelo', '+2 amarelo', 'block amarelo', 'back amarelo','0 verde', '1 verde', '2 verde', '3 verde', '4 verde', '5 verde', '6 verde', '7 verde', '8 verde', '9 verde', '+2 verde', 'block verde', 'back verde', 'color-change', '+4','0 vermelho', '1 vermelho', '2 vermelho', '3 vermelho', '4 vermelho', '5 vermelho', '6 vermelho', '7 vermelho', '8 vermelho', '9 vermelho', '+2 vermelho', 'block vermelho', 'back vermelho','0 azul', '1 azul', '2 azul', '3 azul', '4 azul', '5 azul', '6 azul', '7 azul', '8 azul', '9 azul', '+2 azul', 'block azul', 'back azul','0 amarelo', '1 amarelo', '2 amarelo', '3 amarelo', '4 amarelo', '5 amarelo', '6 amarelo', '7 amarelo', '8 amarelo', '9 amarelo', '+2 amarelo', 'block amarelo', 'back amarelo','0 verde', '1 verde', '2 verde', '3 verde', '4 verde', '5 verde', '6 verde', '7 verde', '8 verde', '9 verde', '+2 verde', 'block verde', 'back verde', 'color-change', '+4']

const cartasURL = {"0 vermelho": "https://i.imgur.com/h9KNhJo.png",
"1 vermelho": "https://i.imgur.com/lXFJ4UA.png",
"2 vermelho": "https://i.imgur.com/E41uDYm.png",
"3 vermelho": "https://i.imgur.com/uwP9z4w.png",
"4 vermelho": "https://i.imgur.com/1S51bpG.png",
"5 vermelho": "https://i.imgur.com/ZKrPpiR.png",
"6 vermelho": "https://i.imgur.com/jE1lzAq.png",
"7 vermelho": "https://i.imgur.com/W8nIpdB.png",
"8 vermelho": "https://i.imgur.com/jwxh90f.png",
"9 vermelho": "https://i.imgur.com/1ssJbHx.png",
"+2 vermelho": "https://i.imgur.com/KbVh7xp.png",
"block vermelho": "https://i.imgur.com/RClXm17.png",
"back vermelho": "https://i.imgur.com/I1rw5mz.png",
"0 azul": "https://i.imgur.com/IdAkhQr.png",
"1 azul": "https://i.imgur.com/F4u3H8H.png",
"2 azul": "https://i.imgur.com/fYMET1a.png",
"3 azul": "https://i.imgur.com/ccyy28a.png",
"4 azul": "https://i.imgur.com/PgKaNNJ.png",
"5 azul": "https://i.imgur.com/va9FCFw.png",
"6 azul": "https://i.imgur.com/TzXtCfv.png",
"7 azul": "https://i.imgur.com/6CYzUX1.png",
"8 azul": "https://i.imgur.com/XKKTe1Y.png",
"9 azul": "https://i.imgur.com/3GWoRUu.png",
"+2 azul": "https://i.imgur.com/9KhOGjo.png",
"block azul": "https://i.imgur.com/jjGZAnM.png",
"back azul": "https://i.imgur.com/rvUDIpP.png",
"0 amarelo": "https://i.imgur.com/yp0FXsH.png",
"1 amarelo": "https://i.imgur.com/DRzNYNi.png",
"2 amarelo": "https://i.imgur.com/l2zD218.png",
"3 amarelo": "https://i.imgur.com/Cfu56Rc.png",
"4 amarelo": "https://i.imgur.com/zO3tbxE.png",
"5 amarelo": "https://i.imgur.com/gStfVNu.png",
"6 amarelo": "https://i.imgur.com/zBcPwi9.png",
"7 amarelo": "https://i.imgur.com/0qJkaJ8.png",
"8 amarelo": "https://i.imgur.com/1nI8X5U.png",
"9 amarelo": "https://i.imgur.com/LhEODee.png",
"+2 amarelo": "https://i.imgur.com/fQl0KJz.png",
"block amarelo": "https://i.imgur.com/fkNnfge.png",
"back amarelo": "https://i.imgur.com/ExU4mAU.png",
"0 verde": "https://i.imgur.com/81akFVt.png",
"1 verde": "https://i.imgur.com/AjnfbdQ.png",
"2 verde": "https://i.imgur.com/hNKdjqn.png",
"3 verde": "https://i.imgur.com/TRYW7ws.png",
"4 verde": "https://i.imgur.com/BPMBtSG.png",
"5 verde": "https://i.imgur.com/ejw0Y9E.png",
"6 verde": "https://i.imgur.com/hMWDvou.png",
"7 verde": "https://i.imgur.com/DCT4XZ6.png",
"8 verde": "https://i.imgur.com/xZuRZQa.png",
"9 verde": "https://i.imgur.com/8CbQHFl.png",
"+2 verde": "https://i.imgur.com/zVwWSKF.png",
"block verde": "https://i.imgur.com/Pnxh6rd.png",
"back verde": "https://i.imgur.com/v6FKmjm.png",
"color-change": "https://i.imgur.com/eUxlCWQ.png",
"+4": "https://i.imgur.com/tHK1lEP.png"}

client.once('ready', () => {
	console.log('Ready!');
});

class bot {
    constructor () {
        this.hooks = []
        this.jogadores = []
        this.cartas = cartasOrigin
        this.carta = null
        this.playorder = 'pos'
        this.playerIndex = null
    }

    handler (action, controller) {
        if (action[0] === 'n') {
            this.new(controller)
        } else if (action[0] === 's') {
            if (action[1] === 'e') {
                this.new(controller)
            } else if (action[1] === 'h') {
                this.shuffle(controller)
            }
        } else if (action[0] === 'g') {
            this.get(controller)
        } else if (action[0] === 'p') {
            this.play(controller)
        } else if (action[0] === 'j') {
            if (action[1] === 'o') {
                this.join(controller)
            } else {
                let content = action.slice(action.indexOf(' ') + 1)
                this.jogar(conent, controller, 0)
            }
        }
    }

    new (controller) {
        controller.channel.send('>> **Iniciando nova partida** <<')
        controller.channel.send('>> **Digite `'+prefix+'join` para entrar na partida**')
        this.hooks.push('lobbying')
        this.hooks.push('match')
    }

    join (controller) {
        //message.author.username
        if (this.jogadores.length != 0) {
            this.hooks.push('shuffling')
        }
        if (this.hooks.indexOf('lobbying') !== -1 && this.hooks.indexOf('match') !== -1) {
            if (this.jogadores.length < 8) {
                let user = {
                    username: controller.author.username,
                    cards: []
                }
                this.jogadores.push(user)
                controller.channel.send('>> **'+controller.author.username+' entrou na partida ('+this.jogadores.length+'/8)**')
            } else {
                controller.channel.send('>> **O número máximo de jogadores já foi atingido**')
            }
        } else if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('lobbying') === -1) {
            controller.channel.send('>> **A partida não se encontra nessa fase, aguarde a próxima partida**')
        } else {
            controller.channel.send('>> **Não há partidas no momento, digite `'+prefix+'new` para iniciar uma partida**')
        }
        
    }

    shuffle (controller) {
        if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('shuffling') !== -1) {
            if (this.jogadores.length > 1) {
                for (let a = 0; a < this.jogadores.length; a++) {
                    while(this.jogadores[a].cards.length < 7){
                        var rnum = Math.random() * (this.cartas.length - 0) + 0
                        let n = Math.round(rnum)
                        console.log(n)
                        this.jogadores[a].cards.push(this.cartas[n])
                        this.cartas.splice(this.cartas[n], 1)
                    }
                }
                controller.channel.send('>> **Cartas embaralhadas! Envie `'+prefix+'get` para receber suas cartas**')
                this.hooks.splice(this.hooks.indexOf('lobbying'), 1)
                this.hooks.push('cardsav')
            } else {
                controller.channel.send('>> **É necessário ao mínimo 2 jogadores para inciar uma partida**')
            }
        } else if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('shuffling') === -1) {
            controller.channel.send('>> **O jogo não se encontra nessa fase!**')
        } else {
            controller.channel.send('>> **Não há partidas no momento, digite `'+prefix+'new` para iniciar uma partida**')
        }
    }

    get (controller) {
        if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('cardsav') !== -1) {
            let obj = this.jogadores .find(obj => obj.username === controller.author.username)
            this.sendDeck(controller, obj.cards)
        } else if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('cardsav') === -1) {
            controller.channel.send('As cartas ainda não estão disponiveis')
        } else {
            controller.channel.send('>> **Não há partidas no momento, digite `'+prefix+'new` para iniciar uma partida**')
        }
    }

    play (controller) {
        if  (this.hooks.indexOf('active') !== -1) {
            controller.channel.send('>> **O jogo já foi iniciado!**')
            controller.channel.send('>> **A carta atual é: '+this.carta+'**', {files: [cartasURL[this.carta]]})
            controller.channel.send('>> **É a vez de'+this.jogadores[this.playerIndex].username+' jogar')
        } else {
            if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('cardsav') !== -1) {
                var rnum = Math.random() * (this.cartas.length - 0) + 0
                let n = Math.round(rnum)
                this.jogar(this.cartas[n], controller, 1)
                this.cartas.splice(this.cartas[n], 1)
                controller.channel.send('>> **O primeiro a jogar é: '+this.jogadores[0].username+'**')
                controller.channel.send('>> **A carta incial é: '+this.carta+'**', {files: [cartasURL[this.carta]]})
                this.hooks.push('active')
            } else if (this.hooks.indexOf('match') !== -1 && this.hooks.indexOf('cardsav') === -1) {
                controller.channel.send('>> **Cartas não disponíveis**')
            } else {
                controller.channel.send('>> **Não há partidas no momento, digite `'+prefix+'new` para iniciar uma partida**')
            }
        }
    }

    jogar (content, controller, isFirst) {
        if (this.hooks.indexOf('active') !== -1) {

        } else {
            controller.channel.send('>> **A partida não se encontra nessa fase!**')
        }
    }

    sendDeck (controller, cartas) {
        for (let a = 0; a < cartas.length; a++) {
            controller.author.send(cartas[a], {files: [cartasURL[cartas[a]]]})
        }
    }
}

let instance = new bot

client.on('message', msg => {
    syntax_v(msg)
})

client.login('NTUwNzc2ODQ4NjA3NjA4ODQy.D1nW-w.pyJXrYdgABScCEAibca90jExmeo')

function syntax_v (msg) {
    if (msg.content[0] === prefix) {
        instance.handler(msg.content.slice(1), msg)
    }
}