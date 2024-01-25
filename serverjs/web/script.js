const m = {

connect: () => {
	if (m.ws !== undefined && m.ws.readyState !== WebSocket.CLOSED) return
	
	el({a:'p', b:m.log}).innerHTML = `Trying to establish a WebSocket connection to <code> ${m.host} </code>`
	
	m.ws = new WebSocket(m.host)
	
	m.ws.onopen = a => {
		el({a:'p', b:m.log, c:'Connected!'})
		m.chat.children[5].children[0].disabled = true
		m.chat.children[5].children[1].disabled = false
		m.chat.children[8].children[0].disabled = false
	}
	
	m.ws.onmessage = a => { el({a:'p', b:m.log, c:a.data}) }
	m.ws.onerror = a => { console.log(a) }
	
	m.ws.onclose = a => {
		el({a:'p', b:m.log, c:'Connection Closed!'})
		m.chat.children[5].children[0].disabled = false
		m.chat.children[5].children[1].disabled = true
		m.chat.children[8].children[0].disabled = true
	}
}

}

addEventListener('load', () => {
	
	(a => {
		el({a:'p', b:a, c:'click dialog -> bringtofront'})
		el({a:'p', b:a, c:'click and drag title -> move dialog'})
	})(el({a:'div', b:document.body, d:{id:'info'} }))
	
	const a = dlg({title:'menu', top:30, left:30})
	a.parentElement.removeChild(a.previousElementSibling)
	a.style.cssText = 'background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 7px; padding: 7px; display:flex; flex-direction:column; gap:5px;'
	el({a:'button', b:a, c:'chat', e:{click: a => { document.body.appendChild(m.chat.parentElement) } }})
	el({a:'button', b:a, c:'test post', e:{click: a => { document.body.appendChild(m.post.parentElement) } }})
	
	
	m.log = dlg({title:'data received', top:50, left:210})
	m.log.parentElement.removeChild(m.log.previousElementSibling)
	el({a:'button', b:m.log.parentElement, c:'clear data', e:{click: a => { a.target.nextElementSibling.innerHTML = '' }} })
	m.log.parentElement.appendChild(m.log)
	m.log.style.cssText = 'background: rgba(0,0,0,0.1); border-radius: 7px; padding: 7px; display:flex; flex-direction:column; gap:5px; resize:both; overflow:scroll; width:500px; height:300px;'
	
	
	m.chat = dlg({title:'websocket - chat', top:70, left:270})
	document.body.removeChild(m.chat.parentElement)
	m.chat.style.cssText = 'background:rgba(255,255,255,0.7);'
	m.chat.classList.add('grid1')
	el({a:'div', b:m.chat, c:'Host'})
	m.host = (location.protocol == 'https:' ? 'wss://' : 'ws://') + location.hostname + (location.port ? ':' + location.port : '')
	el({a:'input', b:m.chat, d:{type:'text', value:(location.protocol == 'https:' ? 'wss://' : 'ws://') + location.hostname, disabled:true}})
	el({a:'div', b:m.chat, c:'Port'})
	el({a:'input', b:m.chat, d:{type:'text', value:location.port || '', disabled:true}})
	el({a:'div', b:m.chat})
	m.connect = el({a:'button', b:el({a:'div', b:m.chat}), c:'Connect', d:{style:'margin:0 3vmin 3vmin 0'}, e:{click: m.connect} })
	m.disconnect = el({a:'button', b:m.connect.parentElement, c:'Disconnect', d:{disabled:true}, e:{click: a => { m.ws.close() } } })
	el({a:'textarea', b:m.chat, c:'hello world!', d:{style:'grid-column:1/3'}})
	el({a:'div', b:m.chat})
	m.send = el({a:'button', b:el({a:'div', b:m.chat, d:{style:'text-align:right;'} }), c:'Send', d:{disabled:true}, e:{click: a => { m.ws.send(JSON.stringify({data:a.target.parentElement.previousElementSibling.previousElementSibling.value})) } } })
	
	m.post = dlg({title:'test post', top:70, left:270})
	document.body.removeChild(m.post.parentElement)
	m.post.style.cssText = 'background:rgba(255,255,255,0.7); border-radius:7px; padding:3px;'
	
	el({a:'div', b:m.post, d:{class:'grid1', style:'margin:7px;'}})
	el({a:'div', b:m.post.children[0], c:'Message'})
	el({a:'input', b:m.post.children[0], d:{type:'text', size:33, value:'message'} })
	el({a:'div', b:m.post.children[0]})
	el({a:'button', b:el({a:'div', b:m.post.children[0]}), c:'test post-1', e:{click: a => {
		
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({cmd: 'cmd1', data: a.target.parentElement.previousElementSibling.previousElementSibling.value})
		}).then(a=>a.json()).then(a=>{ el({a:'p', b:m.log, c:JSON.stringify(a)}) }).catch(a => { console.log(a) })
		
	}} })
	
	el({a:'div', b:m.post, d:{class:'grid1', style:'margin:7px;'}})
	el({a:'div', b:m.post.children[1], c:'Message-1'})
	el({a:'input', b:m.post.children[1], d:{type:'text', value:'message-1'} })
	el({a:'div', b:m.post.children[1], c:'Message-2'})
	el({a:'input', b:m.post.children[1], d:{type:'text', value:'message-2'} })
	el({a:'div', b:m.post.children[1]})
	el({a:'button', b:el({a:'div', b:m.post.children[1]}), c:'test post-2', e:{click: a => {
		
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cmd: 'cmd1',
				data: {
					message1: a.target.parentElement.parentElement.children[1].value,
					message2: a.target.parentElement.parentElement.children[3].value,
				}
			})
		}).then(a=>a.json()).then(a=>{ el({a:'p', b:m.log, c:JSON.stringify(a)}) }).catch(a => { console.log(a) })
		
	}} })
	
})