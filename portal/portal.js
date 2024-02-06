const m = {

user: '',

login1: () => {
	const a = el({a:'div', b:document.body, d:{style:'position:fixed; top:-10px; left:-10px; width:calc(100vw + 20px); height:calc(100vh + 20px); display:flex; align-items:center; justify-content:center;  background-image:linear-gradient(to right, rgba(190,30,60,1), rgba(150,29,51,1));'}})
	
	const b = el({a:'div', b:a, d:{style:'background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:flex; flex-direction:column; align-items:center; padding:0; margin:-10vh 0 0 -5vw;'}})
	
	el({a:'img', b:b, d:{style:'background:white; border-radius:50%; box-shadow:0 0 5px 3px rgba(0,0,0,0.1); padding:15px; width:95px; height:95px; object-fit:scale-down; margin-top:-49px;', src:'favicon.svg'}})
	
	const c = el({a:'div', b:b, d:{style:'display: flex; flex-direction: column; gap: 5px; padding:3px 57px 29px 57px;'}})
	
	const d = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:d, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACCElEQVRIS7WVyytEcRTH3XlR8ioLjCZ/gKSGrFhI2ZhpxkJWhIUFKzZKoSQbjwVqViysmOZxZyYWsrBmFlY2iCYkS0Lm5XMXauI+fnMnt273d+85v+/nnN85pyuV/fMliei73W67y+WawHcwn887JUl6yeVyxw6HYycYDL7paRgCPB5Pvc1mO0Kk87cQsGur1dofCoVutSCGAJ/Pd0LEfTpRXhFAO5l8qfnoArxebw8Rngkc43gkEtkrGkD0i0S/ZATgqPaj0eiIGcA6gBkjAHaZDHxFA/x+/xSbtgUAmwBUAzGqQRM1uAFQoQfJZrOdsVjsougMlA3UYZpj2tICcP4bnP+sqTZVZgBxq8ViGUBgjXVtgdAH6xXuABmUk8GjcAa0ZxWiAQSHiVCZ1CkmV6bfe3g6+fbCFJ+l0+kOfHaxO7mVeRkNh8NPhSDVGlDcME7+QkdE73g/ReSZdR3Pbt5bf/kk7XZ7F0OX/fn+B0D0HRT2XKBzVF3IcFiW5QNNANGvYpwzC2BfkJYd0gOcYuwtAXAPoEUPoHRDYwmAskwmUxmPx98VjT81oO/fKGBlKQDatoG2fdYCfAIoLwVA+zYnEokHVQBFvsTQZhZAC78y2TXsz2sBxjAow2PqArAMYEGzyIqBLOZxnOSoqkUp+H/ie5hKpWaTyWRaFyAqKuJn+E8WEdHz+QZ+4MQZun8CHQAAAABJRU5ErkJggg=='}})
	el({a:'input', b:d, d:{type:'text', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:d, c:'Username'})
	
	const e = el({a:'div', b:c, d:{style:'position: relative; padding-top: 20px;'}})
	
	el({a:'img', b:e, d:{style:'position: absolute; left:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACu0lEQVRIS7WVS2gTURSGO5mEGIsYQYsu3AhqqxXciQiaIkYJ5IWEakEFwZULFR+g1T58FKmKotu6EFHESJ5W0IVk4aOuRaWuBMWFSKnSajFD4nfD3OE6zZAx1oHL3Dn3nv8759zHaC3/+dGc9CORyFKfz7dP07Qu5iyn/aD/ivf1bDb73m1c9QBaMpk8hUAvLVBHaAbbLiB5N5A/AIlEIojTHSKNSOdqtTrJ9xu+V9LahB3bdKVSWVUoFD43gliAVCqll8vlx4htVcRL9JO5XG4yFArNCwaDNxnvMcdPk8UF14B4PD7s8XiOqw6GYXQWi0URfe2JxWILmDMBxMvnAwApVwAcV+u6LoR01YFSLBLRqzbW5wvfS2gZADtdAaj9NaI6ZNb3BcL9RDrt9XrH0+n0hBQhyw3Yx8x5V4AfcwUgqndMbKd9QrQD0SnpGI1G24EHEF7Lexj7MhOwHcATVwAymMHZT+S3cdqrOjG2m7G7ttK9ZV4ntqpbwBQirQBKOIqDZT0AjjJ22QboYl6pkbgYr21TSvSM1ybRZ38fyOfzI6JPzdch/pS22AYYADCo2tDow9fAd0i11wAIdVPje3KATMYR/c73eprPIdJ+dtFZM0BR1lvmvIvYT0of66BRiquIHq4nBvAj9iOMH+RtlRB7H5mcE/eW3+9/ztgKswqXyOSEVSIpSpo76O+ndeBs8BaXWpFL7z476xc7aj677KENcgbIeXy3YVd31RCZ9Drepg5laXGA3CC7bnzaCOyrXDP6PX8NEGAB4eSPIhSyLz7XywhZloSddd3cFMAJQsSDlGuAi3OhmENZvzUNkBCifUR/i8xEQmbtIqeaN7Kba2KHWOfknzKQ8HA43MozqmbC+mzMZDJjcwIQIBvkJ6Vaw3p8mDOAgLC4Af6KexB/yUF7PeugNap3M+O/ATImLoDpOXN0AAAAAElFTkSuQmCC'}})
	el({a:'input', b:e, d:{type:'password', placeholder:' ', class:'LoginInput'}})
	el({a:'span', b:e, c:'Password'})
	el({a:'img', b:e, d:{style:'position: absolute; right:7px; top: 31px; width: 14px; height: 14px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC'}, e:{click:a=>{
		a.target.parentElement.children[1].type = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'text' : 'password'
		a.target.src = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC+klEQVRIS+WVXUiTYRTHfffRhnSxWVT0gYGRJRRERLAilhXhcpsfrYvwJiIoSoi6KCOQCAUvQkgLoroI6sbZ5jY2iKgkUm+iJMpMCuqmD0znTTn22e+MvfK6NvXGKweH8zzn/M//PM8553mnlCzyT1lk/pIllMDhcKwxGo1l6XRaSaVSE5FI5OdCylu0RE6ns1Sv1zdCckxRFBu6LI9wMpPJDGLrIeHjUCj0t1DC/xLY7XaD1WptBnwZWaUGQSYEw0gFCVdryfD9wtYRjUa7+vv7k1rfrARut7sK4ENkB0ET6BUCZt1Naa6YTKZMIpFoxy4H0P4m5Ybg3iJNgUBgRHXOJKivrz+Es5dgM84W1htYn2d9LxaLnTObzfexHcdWqKyd4L4j7Yjc1OP3+59KkizY5XLto95PIPhDvBPnUF1d3SjrSk68nuaeBHatWFOJ+9TX17eFCth0Ol0IXCl9ORwMBl8qtbW16yB4h1EPYbXP53sjRNxoWqpDsuUkG8S3u1gC7NPgSsXf0NCwi3I+A8/ZEtsVgsNsHPgaAflUEuy/cz34hq18DnJxjRM7MxAczoOth5tFJIGUhQGIbmICYpoEQSnXPMSqO0gCt7qpqakx0bMvJLAqZOvGcRa5A+i0CqKeB6lntlEL+B0g9rnmcLc53Bn2txR5UAaD4TWbrchVgG0a4M0CI5mfr5OYC5qYFmJkmkaTyeTO7BRRpo2oARxrudYNmn7J6/WmsEkJW7G3sF6Wxxxn3wb5dXTG4/HoaWoH2Ivsf8BjY7K+zsw0RBU4IgA24xxizE7x/D8IKZNRjs2DyC0zyEfK18vEyQCUUM5txN2VSQMzxhQdYUQ/i2/WoyGJBVsXwCZ0GrAX/WBqauqFdgAkkE+K2WKx7Ad7gq18s3TIo3g83hwOh6PqbQt+7Gh8NQB5WHtzwAR6jITjuZe8knUla0PO/wrdqm30nAlUp1ydUhyFbA9kVejsF5W1fElH0ANsvRC/V2Py9RL6RytWgvnsi16if+tuTCly7ullAAAAAElFTkSuQmCC'
	}}})
	
	el({a:'div', b:c, c:'Login', d:{style:'background:rgba(255,0,0,0.7); border-radius:3px; border-bottom:1px solid #505050; cursor:pointer; color:rgba(255,255,255,0.9); padding:7px; text-align:center; margin-top:9px'}, e:{click:a=>{
		m.user = document.querySelector('.LoginInput').value.trim()
		document.body.removeChild(a.target.parentElement.parentElement.parentElement)
	}}})
},

edit1: a => {
	a.stopPropagation()
	a = a.target.parentElement.parentElement
	const b = a.getBoundingClientRect()
	const c = el({a:'div', b:document.body, d:{style:'position:fixed; top:0px; left:0px; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center;  background: linear-gradient(140deg, rgba(0,0,0,0.1) 30%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 90%); background-size: 400% 400%; background-position: 100% 100%; background-color: rgba(0,0,0,0.1); animation: bgEdit 3s linear infinite;'}, e:{click:a=>{a.stopPropagation()}}})
	
	//const c = el({a:'div', b:b, d:{style:'background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:grid; grid-template-columns:auto auto; gap:5px; transform:scale(0); transition:transform 0.5s; padding:37px 47px;'}, e:{click:a=>{a.stopPropagation()}}})
	const d = el({a:'div', b:c, d:{style:`position:fixed; top:${b.y}px; left:${b.x}px; background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:grid; grid-template-columns:auto auto; gap:7px 17px; padding:47px 57px;`}, e:{click:a=>{a.stopPropagation()}}})
	//const c = el({a:'div', b:b, d:{style:`position:fixed; top:${d.y}px; left:${d.x}px; background:rgba(30,30,30,0.7); box-shadow:0 0 5px 3px rgba(255,255,255,0.3); border-radius:5px; color:white; display:grid; grid-template-columns:auto auto; gap:5px; transform:scale(0); transition:transform 0.5s; padding:37px 47px;`}, e:{click:a=>{a.stopPropagation()}}})
	
	a = a.getAttribute('data-a')
	const e = m.data[a]
	el({a:'button', b:el({a:'div', b:d, d:{style:'grid-column:1/3;'}}), c:'X', d:{style:'position:absolute; top:7px; right:9px; padding:1px 3px;'}, e:{click:a=>{document.body.removeChild(a.target.parentElement.parentElement.parentElement)}}})
	el({a:'div', b:d, c:'Nama'})
	el({a:'input', b:d, d:{type:'text', style:'width:300px;', value:e.nama}})
	el({a:'div', b:d, c:'Icon'})
	el({a:'input', b:d, d:{type:'text', value:e.icon}})
	el({a:'div', b:d, c:'Background'})
	el({a:'input', b:d, d:{type:'color', style:'height:23px;', value:e.bg}})
	el({a:'div', b:d, c:'Link'})
	el({a:'input', b:d, d:{type:'text', value:e.link}})
	el({a:'div', b:d, c:'users'})
	el({a:'input', b:d, d:{type:'text'}})
	el({a:'div', b:d})
	
	const f = el({a:'div', b:d})
	el({a:'button', b:f, c:'Ok', d:{'data-a':a, style:'padding:3px 11px;'}, e:{click:a=>{
		a.stopPropagation()
		
		const b = a.target.getAttribute('data-a')
		const c = a.target.parentElement.parentElement
		m.data[b].nama = c.children[2].value
		m.data[b].icon = c.children[4].value
		m.data[b].bg = c.children[6].value
		m.data[b].link = c.children[8].value
		
		const d = [...document.querySelectorAll('.app1')].find(a=>a.getAttribute('data-a')==b)
		d.innerHTML = ''
		d.style.cssText = m.data[0].style + 'background:' + m.data[b].bg
		
		el({a:'img', b:el({a:'div', b:d, d:{style:'align-self: flex-end; display:flex; gap:7px;'}}), d:{src:m.data[0].trashImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.delete1}})
		el({a:'img', b:d.children[0], d:{src:m.data[0].iconImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.edit1}})
		
		//const e = el({a:'div', b:d})
		const e = el({a:'a', b:d, d:{href:m.data[b].link, style:'flex:1 0 0; display:flex; gap:5px; align-items:center; justify-content:center;'}})
		el({a:'img', b:e, d:{src:m.data[b].icon, style:m.data[0].iconStyle}})
		el({a:'span', b:e, c:m.data[b].nama})
		//el({a:'div', b:d, c:m.data[b].link})
		
		document.body.removeChild(a.target.parentElement.parentElement.parentElement)
		console.log(m.data)
	}}})
	
	setTimeout(a=>{a.style.transition = 'transform 0.5s, top 0.5s, left 0.5s'}, 50, d)
	setTimeout(a=>{a[0].style.top = a[1].t; a[0].style.left = a[1].l; a[0].style.transform = 'scale(1)'}, 200, [d, (a=>({l:((a[0].width/2)-(a[1].width/2))+'px',t:((a[0].height/3)-(a[1].height/2))+'px'}))([c.getBoundingClientRect(), d.getBoundingClientRect()])])
	d.style.transform = 'scale(0)'
},

add1: a => {
	a = a.target.parentElement.getBoundingClientRect()
	const b = el({a:'div', b:document.body, d:{style:'position:fixed; top:0px; left:0px; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center;  background: linear-gradient(140deg, rgba(0,0,0,0.1) 30%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.1) 90%); background-size: 400% 400%; background-position: 100% 100%; background-color: rgba(0,0,0,0.1); animation: bgEdit 3s linear infinite;'}, e:{click:a=>{a.stopPropagation()}}})
	const c = el({a:'div', b:b, d:{style:`position:fixed; top:${a.y}px; left:${a.x}px; background:rgba(255,255,255,0.9); box-shadow:0 0 5px 3px rgba(150,29,51,0.5), 0 0 7px 5px rgba(255,255,255,0.3); border-radius:11px; display:grid; grid-template-columns:auto auto; gap:7px 17px; padding:47px 57px;`}, e:{click:a=>{a.stopPropagation()}}})
	
	el({a:'button', b:el({a:'div', b:c, d:{style:'grid-column:1/3;'}}), c:'X', d:{style:'position:absolute; top:7px; right:9px; padding:1px 3px;'}, e:{click:a=>{document.body.removeChild(a.target.parentElement.parentElement.parentElement)}}})
	el({a:'div', b:c, c:'Nama'})
	el({a:'input', b:c, d:{type:'text', style:'width:300px;', value:'app1'}})
	el({a:'div', b:c, c:'Icon'})
	el({a:'input', b:c, d:{type:'text', value:'favicon.svg'}})
	el({a:'div', b:c, c:'Background'})
	el({a:'input', b:c, d:{type:'color', style:'height:23px;', value:'#ff0000'}})
	el({a:'div', b:c, c:'Link'})
	el({a:'input', b:c, d:{type:'text', value:'link1'}})
	el({a:'div', b:c, c:'users'})
	el({a:'input', b:c, d:{type:'text', value:'user1'}})
	el({a:'div', b:c})
	
	const d = el({a:'div', b:c})
	el({a:'button', b:d, c:'Ok', d:{style:'padding:3px 11px;'}, e:{click:a=>{
		a.stopPropagation()
		
		a = a.target.parentElement.parentElement
		console.log(a.children[2].value+'  '+a.children[4].value+'   '+a.children[6].value+'   '+a.children[8].value)
		m.data.push({
			nama: a.children[2].value,
			icon: a.children[4].value,
			bg: a.children[6].value,
			link: a.children[8].value,
		})
		
		const b = (b=>{
			if (b.children.length >= m.data[0].appCount) {
				el({a:'div', b:m.page1, d:{style:'width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}}).appendChild(b.children[b.children.length-1])
				return el({a:'a', b:b, d:{'data-a':`${m.data.length-1}`, class:'hover1 app1', style:m.data[0].style+'background:'+a.children[6].value}})
			}
			return b.insertBefore(el({a:'a', d:{'data-a':`${m.data.length-1}`, class:'hover1 app1', style:m.data[0].style+'background:'+a.children[6].value}}), b.children[b.children.length-1])
		})(m.page1.children[m.page1.children.length-1])
		
		el({a:'img', b:el({a:'div', b:b, d:{style:'align-self: flex-end; display:flex; gap:7px;'}}), d:{src:m.data[0].trashImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.delete1}})
		el({a:'img', b:b.children[0], d:{src:m.data[0].iconImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.edit1}})
		
		//el({a:'img', b:b, d:{src:m.data[0].iconImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;align-self: flex-end'}, e:{click:m.edit1}})
		
		const c = el({a:'a', b:b, d:{href:m.data[m.data.length-1].link, style:'flex:1 0 0; display:flex; gap:5px; align-items:center; justify-content:center;'}})
		//const c = el({a:'div', b:b})
		el({a:'img', b:c, d:{src:a.children[4].value, style:m.data[0].iconStyle}})
		el({a:'span', b:c, c:a.children[2].value})
		//el({a:'div', b:b, c:a.children[8].value})
		
		/*
		fetch('http://localhost/project/enam/index.php', {
			method: "POST",
			headers: { "Content-Type": "application/json", },
			body: JSON.stringify(m.data[0].id ? {method: 'setData', id:m.data[0].id, data: m.data.slice(1)} : {method: 'newData', data: m.data.slice(1)})
		}).then(a=>a.json()).then(a=>{
			console.log(a)
		}).catch(err =>{
			console.log(err)
		})
		*/
		document.body.removeChild(a.parentElement)
	}}})
	
	setTimeout(a=>{a.style.transition = 'transform 0.5s, top 0.5s, left 0.5s'}, 50, c)
	setTimeout(a=>{a[0].style.top = a[1].t; a[0].style.left = a[1].l; a[0].style.transform = 'scale(1)'}, 200, [c, (a=>({l:((a[0].width/2)-(a[1].width/2))+'px',t:((a[0].height/3)-(a[1].height/2))+'px'}))([b.getBoundingClientRect(), c.getBoundingClientRect()])])
	c.style.transform = 'scale(0)'
},

delete1: a =>{
	a.stopPropagation()
	const reIndex = (a, b) => {
		a.nextElementSibling && a.appendChild(a.nextElementSibling.children[0]);
		[...a.children].forEach(a=>{
			a.setAttribute('data-a', b)
			b++
		})
		a.nextElementSibling && reIndex(a.nextElementSibling, b)
	}
	(a=>{
		const b = a.parentElement
		const c = parseInt(b.children[0].getAttribute('data-a'))
		m.data.splice(a.getAttribute('data-a'), 1)
		b.removeChild(a)
		reIndex(b, c)
		a = b.parentElement.children[b.parentElement.children.length-1]
		a.children.length < 1 && a.parentElement.removeChild(a)
	})(a.target.parentElement.parentElement)
},

data : [
	{
		start: 1,
		style: 'height:24vh; border-radius:9px; box-shadow:0 0 5px 3px rgba(255,255,255,0.3); display:flex; flex-direction:column; padding:5px; transition:transform 0.2s;',
		iconStyle: 'width:19px; height:19px;',
		iconImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEiklEQVRoQ+2ZV4gUQRCGXcSIAXME8VDPBL6YxfTgISYEI4oogvogKiIqPghGMGJGPFTEnBD1XsyCGfOTCcMJigEEA+Zwfv8xyjI3O9VzjrseWPAzOz3VVfVP9XRX9yZKlXBJlPD4S/0n4M9gQUFBVdpqBWT2bSKReBl3xmPNAMHXIMB8UCkg0ALaukHiXJwk4ibQj+DyQgKcAYGl/zKBGQS3OCTAjRAYlzECDJG6OJ8FDhPIyYDxn0tbWIBn6Nc9oF9z2iaCzTy/EYWg8xAi+FYYPgoagB9gPpiHQ/0uFHSOcekVEsBz9OslP6fPCO43AH0370A/dM64knAigJM2GNQb10eaLEe4GQneg2FgBahuOJ/J801en1Vcx/v0P3LfPyjDQXZNAgSv9J4FNVME9oT2ciBo6kzF5RMPnoHGKRREordLJkIJELyCvgoauaY0Rr032OoAibthNi0Ck+msNGdKlkFg+p8QqE3na6BhBhh8wGdbCNwuNgF1ZBi1874BjfN0ykiC32k5ND9ij4RmCk116ZKVBD/VxZkTAY+E1oAcF6N/qJNP/2YQ+Opix4kAw6g8xh4BrcSW3ERB68Fp8AKoOu0ItEL3tzrzXAtjNgTuO+i67QcgMBxjuxwMLkRnNs5VeRYR7AylcQuoYNhagg0teKYUyQBOsumleqUZaOpds7iWNawtxamKuVDB/mAU9hlqWuhUE2kN+IXr2H/s7xdE4BVKVjngt/OQhuau4xYS+9EfZJH1Pf/GfRM/iSACgek3nM3C8CLXgCDQE91TrvpJep3wcym5X1wEukbZaUFAw1HDxGkSSQeBltaK6X/bkHhLW+WIWfhrGegCgQuuwRB8GXQ//0sZmA6BZREIdEXXedMSdQhp8VERF0U01bWCxHeXTmRgB3raiUWVFvi4Y33E9VHoDLQO/FoLWvO7iuFtLsbnWBERfF90dHJhfcCazu8l4TL2T/jtW0YK9XGqbeN2IzhNv5pOU55KYKcPOntA0LlRsvnV2JlivQw9dyVQEd184LJtPI/ecnCaIF4TtMqG9mACUEli+dSLaE3fW7ER8LKwl+sQF6NJOl/4bZUgfpPaK2dBQOuEKdbbKDTAWxzI5YDD2zMdOirkQkAZM8UkQPAq6K4AlcXplNGQ2Go5tDb1Gr+XNSYtQ3/huYaQFsjrYbYtAqoYVTlmSvZBQHuIlGIR0LDR8NEwSreo1OgJgYvFJqCOfAM6PdPJnM5Eg+Q1jaVBlMJMtf1TkOrATCv6cII3s29+xB4JZUD1u/98SNlRirVqjgILQDUjVdo3rPX6rOM61qevPfEYgt/mknInAkmZ0OlzE8+wgpiGI831hUK2DnMJ27h/RF+L4m+hjzb7a4DOnWRLs89ul+Cl40zAC7AOV73BQzg56HdCMKpIp4U4v02/lgH92tI2Caz377gsIpEIWMYgYB2A5RHgAMtOlOdxE+iBc50HpZJFENA/PLFJ3AR0mqH/C1Kd++RA4Hhs0Uf9BlwcM4y0GdKewi/vCP6Bi40oOrFmIIrjuHT/E4jrTRbXTonPwE9C/GpALYuOYgAAAABJRU5ErkJggg==',
		trashImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC0klEQVRoQ+2ZPWgUQRTHs0oCioZEtJCIKBoUrlCvsLJQUyiIiJVgJYISMRYKARE7NQFBsJAoWkgEq0AKwY/Gr8JOiJBgIYkYiAeSShMEIef5ezIX5vR25+3HbTyZhWFm5339//tmZ2dmg5Ymv4Imx9/iCdgZrFQqHdyvdWT1axAEs1llPpMMAHw7gG5T9iqBvUOvDyJvlPqhaqkJAL4L7+OUzphgfqC/BxJvY9rVqGdB4C4eTyUE8QICPQltf5ulImDG/Gf8rDQgHlBfcQA6hvyqpVOAxPukJNISuEDgGyZ4hXorYD5GgYH0CuQzlDVGbwibs7kTAIiQ/yCgTfAnADmkAYKtkBbycs1RurCVOvYVmgGCyLjeEeFRXtrjlvw17Qklgg3oHbF0H9P+FGFbguBAPXkUgTIGy5SA8lDbDIm/SEYRkDH9L13yfk39CSiKgMwmu4zBbup1ObP5TryXJmaJuhcCP9UEbEXeh2fcH8iZwBSAqxNEaGjVNOoJJEtdLhmYB9s2Ul0iS+tpy3dhlcF7j/oMsjKyi7QHLR5F+sfob6dP1kLddTjmQqAmCIAmAbLFgDkHyFvSpv8g1dMqSPoXh27E8PQEFrOqfUo+A7Uvgh9Cfgj5WSiHpYT/Dmin6LDVSNrFnM+Az4Bmpat9Sn4p4ZcSIePpfx5C0ywXNlV5Q3Sa9kZzfx7ZTbOhOUz9yHo+rcgWjOw59f6l2pFJ3DuULxTZUp62gMgZ6UOKHIXIKdxOSzZCWw50ZUsp56JtS0lAM5El0ZkkS/X2yjW+tF/iUayOJkGRwmYMAkWXvZbANRxdcjnLWD4MgRMun1oCBRzJbySVviuoUr4PAq9cumpAzDDXcdbvcpiR/D7gT2p8xSEgunJAJT8mXL9SNbHr6chPjiHK5eo063KkJmA7IhuruV/uch5TLsf53wAe61g/EYGYwBqq7gk09PEqnDd9Bn4B1rv8QFHjZlQAAAAASUVORK5CYII=',
		appCount: 6,
	},
	{
		nama: 'Mobile Alert',
		icon: 'favicon.svg',
		bg: '#00ff00',
		link: 'http://10.62.175.157:3000/',
		user: [],
	},
	{
		nama: 'Always on',
		icon: 'favicon.svg',
		bg: '#ff0000',
		link: 'http://10.62.175.157/tera-dev/',
		user: [],
	},
	{
		nama: 'App3',
		icon: 'favicon.svg',
		bg: '#00ffff',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App4',
		icon: 'favicon.svg',
		bg: '#ff00ff',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App5',
		icon: 'favicon.svg',
		bg: '#ffff00',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App6',
		icon: 'favicon.svg',
		bg: '#ff0000',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App7',
		icon: 'favicon.svg',
		bg: '#00ff00',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App8',
		icon: 'favicon.svg',
		bg: '#0000ff',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App9',
		icon: 'favicon.svg',
		bg: '#00ffff',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App10',
		icon: 'favicon.svg',
		bg: '#ff00ff',
		link: 'App1',
		user: [],
	},
	{
		nama: 'App1',
		icon: 'favicon.svg',
		bg: '#ffff00',
		link: 'App1',
		user: [],
	},
],

page1: (a => {
	el({a:'img', b:a, d:{class:'hover1', style:'position:fixed; top:17px; right:17px; border-radius:50%; background:rgba(0,0,0,0.1); box-shadow:0 0 5px 3px rgba(255,255,255,0.1); width:35px; height:35px; padding:3px; transition:transform 0.2s;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADpklEQVRoQ+2ZW4hOURTH53MLEYlcBrmEzCA1Li/ISLmMW8MDEkre1Ty41HhQmJGUV4WGTAYld/FALlGEeXCXGgwGUwjjEp/f4oy+xne+vc/a+3zT1OxafWfO3uu/1m+vfc7Z50wip4W3RAvPP6cVoLkrGFsFkslkV+C6Y/WJROJLXKDeAEhYtIqxJdh0rFtK0nUcn8UqgLngE8YLAMmPIqk92HiL5M4wZhUgryzGGoc4A5D8LKJUYbJkbFstA4uAqLZ1CBvnBEDy4xC+hHVSJPJaKgbEC4XvPxc1AMlL0g+wgQ4JXAFgsoO//jkAwFoCl7kED3yLgTiq1XGpwFOCDtYGTvE7B8AMrY4KgNkfScB72qBN/L7xdw/ts0ILsICg6rKnAc8HQDUhWoDVJLHLUwVEphCAixo9LcBSgh3QBAzxmQDADY2eFmAqwXxuCXIBeJlNAHkG1GOaB1jTPB+T/HBN8uKjqoA4cic6ws9CbeAUv60AbNDquACMJugdrI02OH4fsKEASDVVTQ0QVGELv+tVkf86rST5Cgd//RIKAGT2D2PyHhC1lZG8C/yfeKoKsP474DsA+4k9x7ZjaywJxKeE5HeiM4LjBqyWv+V85BYJgID9iSAX3DJM9v9fMXk5qaRPdpWypCaFZPGL8yfFn/F3Gb+O482YVPENthuTqnyMQmENQMBChA9hPdMEkHW8keDPGCeVkVdK2WbLa6VcoLLxO0//O/rHcFyOzUyj84Rz86NsK6wACJqP8LVg1sMmSDZlsj+SWb6K1ZFIA75dOO6HyQTMCxLPdOeqYYw8maUqxmYLcB2liUa1/wd855RcL1HbPgBW2DgZAZjBuQgdtxHzOEaulzwgHpo0bQCOBaU3afnuLwdALvSMLSNA8HFKLsL2JqEY+msAGGTSNQHMRuCUSSTGftlmyB0stJkANuFZGmOCJunlAOx3AfC14zQlGtZv3G6YKnAT5QJtdA9+B6mAfGtVL6FHeA7zkIhW4jQARS4A8vmvtza6Bz/jlzvTEvpMEp09JKKVqKYCY10q8APndtroHvzuA5DnAiDf8Pt4SEQrcRmAKS4AJ3Ceo43uwW8HACUuAHILq/SQiFaiAIBbLgCy/mUr3RzPgiqSX2wit9mNDkFE/guTaxLz2H8brWkAvDdpGgFEgF1pX362YYuwjiZRh375TrQXKyX5TzY6VgCNQoC05bgXFsetVd7e3pJ40ibxxjGRAKIIZ2tsK0C2Zjoszm+QgwpAvaaUawAAAABJRU5ErkJggg=='}, e:{click:a=>{
		a = el({a:'div', b:document.body, d:{style:'position:fixed; top:17px; right:17px; display:flex; flex-direction:column; gap:7px; padding:11px 17px; background:rgba(0,0,0,0.7); box-shadow:0 0 5px 3px rgba(255,255,255,0.1); color:rgba(255,255,255,0.7); cursor:default; font-weight:bold;'}, e:{mouseleave:a=>{document.body.removeChild(a.target)}}})
		el({a:'div', b:a, c:'Welcome..', d:{style:'padding:3px 11px;'}})
		el({a:'div', b:a, c:'Log Out', d:{style:'background:rgba(200,29,31,0.7); padding:3px 11px;'}, e:{click:a=>{
			document.body.removeChild(a.target.parentElement)
			m.login1()
		}}})
	}}})
	
	el({a:'div', b:a, d:{style:'height:30vh;'}})
	
	a = el({a:'div', b:a, d:{style:'display:flex; justify-content:center; padding:0; margin:0;'}})
	a = el({a:'div', b:a, d:{style:'background:rgba(0,0,0,0.1); border-radius:15px; display:flex; gap:0.5vw; align-items:center; justify-content: space-between; padding:1vh 1vw; width:94vw; height:calc(53vh + 33px); overflow:hidden;'}})
	el({a:'div', b:a, d:{class:'hover1', style:'width:0; height:0; border-top:25px solid rgba(0,0,0,0); border-right:30px solid rgba(255,255,255,0.5); border-bottom:25px solid rgba(0,0,0,0); transition:transform 0.2s;'}, e:{click:a=>{
		a.target.nextElementSibling.scrollLeft -= a.target.nextElementSibling.offsetWidth
	}}})
	a = el({a:'div', b:el({a:'div', b:a, d:{style:'display:flex; width:calc(91vw - 60px); justify-content:flex-start; margin: 0; padding:2vw; gap:2vw; overflow-x:scroll; overflow-y:hidden; scroll-behavior:smooth; scroll-snap-type:x mandatory; scroll-snap-align:center;'}}), d:{style:'width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 0; padding:2vw 0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}}).parentElement
	a = el({a:'div', b:a, d:{style:'background:yellow; width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}}).parentElement
	a = el({a:'div', b:a, d:{style:'background:red; width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}}).parentElement.parentElement
	return el({a:'div', b:a, d:{class:'hover1', style:'width:0; height:0; border-top:25px solid rgba(0,0,0,0); border-left:30px solid rgba(255,255,255,0.5); border-bottom:25px solid rgba(0,0,0,0); transition:transform 0.2s;'}, e:{click:a=>{
		a.target.previousElementSibling.scrollLeft += a.target.previousElementSibling.offsetWidth
	}}}).previousElementSibling
})(el({a:'div', d:{style:'min-height:100vh; display:flex; flex-direction:column; gap:9px; padding:9px; background-image:linear-gradient(to right, rgba(190,30,60,1), rgba(150,29,51,1));'}})),

showData: () =>{
	m.page1.innerHTML = ''
	
	var a = el({a:'div', b:m.page1, d:{style:'width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}})
	m.data.slice(1).forEach((b,c)=>{
		if (a.children.length >= m.data[0].appCount) {
			a = el({a:'div', b:m.page1, d:{style:'width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}})
		}
		
		const d = el({a:'div', b:a, d:{'data-a':`${c+1}`, class:'hover1 app1', style:m.data[0].style+'background:'+b.bg}})
		
		el({a:'img', b:el({a:'div', b:d, d:{style:'align-self: flex-end; display:flex; gap:7px;'}}), d:{src:m.data[0].trashImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.delete1}})
		el({a:'img', b:d.children[0], d:{src:m.data[0].iconImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px;'}, e:{click:m.edit1}})
		
		const e = el({a:'a', b:d, d:{href:b.link, style:'flex:1 0 0; display:flex; gap:5px; align-items:center; justify-content:center;'}})
		el({a:'img', b:e, d:{src:b.icon, style:m.data[0].iconStyle}})
		el({a:'span', b:e, c:b.nama})
		//el({a:'div', b:d, c:b.link})
	})
	if (a.children.length >= m.data[0].appCount) {
		a = el({a:'div', b:m.page1, d:{style:'width:calc(88vw - 60px); flex: 0 0 calc(88vw - 60px); display:grid; grid-template-columns:repeat(3, 25vw); gap:33px 1vw; padding:0; align-items:start; justify-content: space-around; scroll-snap-align:center;'}})
	}
	a.appendChild(m.data[0].add)
},
init: () => {
	m.data[0].add = el({a:'div', b:el({a:'div', d:{style:'height:24vh; display:flex; align-items:center; justify-content:center;'}}), c:'+', d:{style:'border-radius:9px; box-shadow:0 0 5px 3px rgba(255,255,255,0.1); color:rgba(255,255,255,0.7); cursor:pointer; font-size:5vh; font-weight:bold; padding:5px 27px 9px 27px;'}, e:{click:m.add1}}).parentElement,
	/*
	fetch('http://localhost/project/enam/index.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({method: 'getData'})
	}).then(a=>a.json()).then(a=>{
		//m.data = [m.data.slice(0,1)[0], ...JSON.parse(a[0].dt), ...JSON.parse(a[0].dt)]
		m.showData()
	})
	*/
	document.body.appendChild(m.page1.parentElement.parentElement.parentElement)
	el({a:'img', b:el({a:'div', b:m.page1.parentElement.parentElement, d:{style:'width:0;height:0;'}}), d:{src:m.data[0].iconImg, style:'background:rgba(0,0,0,0.3);border-radius:7px;box-shadow:0 0 5px 3px rgba(255,255,255,0.1);width:15px;height:15px; margin:7px 0 0 -23px;'}, e:{click:a=>{}}})	
	m.showData()
	m.login1()
},


}

addEventListener('load', m.init)