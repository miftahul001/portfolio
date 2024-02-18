const video = el({a:'video'})
const ctx = el({a:'canvas'}).getContext('2d')
var stream
var fnameCnt = 0
var fileName

const startCamera1 = a => {
	
	stopCamera1()
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: JSON.parse(document.querySelector('select').value),
	}).then(a => {
		stream = a
		video.pause()
		video.srcObject = stream
		video.play()
	})
	.catch((err) => {
		console.log(err)
	})
	
}

const stopCamera1 = a => {
	video.pause()
	stream && stream.getTracks().forEach(track => { track.stop() })
	stream = null
}

const counter1 = a => {
	a = (a=>`${a.getFullYear()}${a.getMonth()<9?'0':''}${a.getMonth()+1}${a.getDate()<10?'0':''}${a.getDate()}`.slice(-6))(new Date())
	fileName = a + fnameCnt.toString(36).padStart(3,"0")
	document.getElementById('fName1').textContent = `Filename : ${fileName}`
	fnameCnt++
}

const savePng = a => {
	el({
		a:'a',
		b:document.body,
		d:{download:`${fileName}.png`, href:ctx.canvas.toDataURL()},
		e:{click:a=>{ document.body.removeChild(a.target)}}
	}).click()
	counter1()
}

const saveJpg = a => {
	el({
		a:'a',
		b:document.body,
		d:{download:`${fileName}.jpg`, href:ctx.canvas.toDataURL('image/jpeg')},
		e:{click:a=>{ document.body.removeChild(a.target)}}
	}).click()
	counter1()
}

const page1 = a => {
	
	document.body.innerHTML = ''
	
	a = el({a:'div', b:document.body});
	
	(a => {
		el({a:'div', b:a, d:{id:'fName1'} });
		el({a:'div', b:a, d:{id:'resolution1'} })
		counter1()
	})(el({a:'div', b:a, d:{style:'display:flex; gap:0.5vw;'} }))
	
	a = el({a:'div', b:document.body});
	
	(a=> {
		el({a:'option', b:a, c:'640 × 480', d:{value:'{"width": 640, "height": 480}'} })
		el({a:'option', b:a, c:'800 x 600', d:{value:'{"width": 800, "height": 600}'} })
		el({a:'option', b:a, c:'1280 x 720', d:{value:'{"width": 1280, "height": 720}'} })
	})(el({a:'Select', b:a }))
	
	el({a:'button', b:a, c:'Start Camera', e:{click:startCamera1} })
	el({a:'button', b:a, c:'Stop Camera', e:{click:stopCamera1} })
	el({a:'button', b:a, c:'Save as PNG', e:{click:savePng} })
	el({a:'button', b:a, c:'Save as JPG', e:{click:saveJpg} });
	
	(a => {
		
		a.appendChild(ctx.canvas)
		
		video.onloadedmetadata = () => {
			
			ctx.canvas.width = video.videoWidth
			ctx.canvas.height = video.videoHeight
			document.getElementById('resolution1').textContent = `Resolution : ${video.videoWidth} x ${video.videoHeight}`
			const show1 = a => {
				ctx.drawImage(video, 0, 0)
				!video.paused && requestAnimationFrame(show1)
			}
			requestAnimationFrame(show1)
			
		}
		
	})(el({a:'div', b:a}))
	
	a = el({a:'div', b:document.body, d:{id:'page1'}});
	
}

addEventListener('load', page1)