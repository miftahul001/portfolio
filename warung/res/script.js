const m = {
	username:'',
	ct: ''
}

const ge = a => document.getElementById(a)

const login1 = a => {
	a = el({a:'div', b:document.body, d:{id:'login1'} })
	el({a:'img', b:a, d:{src:'img/Online-Store.svg'} })
	el({a:'div', b:a, c:'KOPERASI ANUGERAH' })
	el({a:'div', b:a, c:'PT. Aster Jaya Mandiri' })
	
	a = el({a:'div', b:a})
	el({a:'div', b:a, c:'Login'})
	
	a = el({a:'div', b:a});
	
	(a => {
		el({a:'img', b:a, d:{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACCElEQVRIS7WVyytEcRTH3XlR8ioLjCZ/gKSGrFhI2ZhpxkJWhIUFKzZKoSQbjwVqViysmOZxZyYWsrBmFlY2iCYkS0Lm5XMXauI+fnMnt273d+85v+/nnN85pyuV/fMliei73W67y+WawHcwn887JUl6yeVyxw6HYycYDL7paRgCPB5Pvc1mO0Kk87cQsGur1dofCoVutSCGAJ/Pd0LEfTpRXhFAO5l8qfnoArxebw8Rngkc43gkEtkrGkD0i0S/ZATgqPaj0eiIGcA6gBkjAHaZDHxFA/x+/xSbtgUAmwBUAzGqQRM1uAFQoQfJZrOdsVjsougMlA3UYZpj2tICcP4bnP+sqTZVZgBxq8ViGUBgjXVtgdAH6xXuABmUk8GjcAa0ZxWiAQSHiVCZ1CkmV6bfe3g6+fbCFJ+l0+kOfHaxO7mVeRkNh8NPhSDVGlDcME7+QkdE73g/ReSZdR3Pbt5bf/kk7XZ7F0OX/fn+B0D0HRT2XKBzVF3IcFiW5QNNANGvYpwzC2BfkJYd0gOcYuwtAXAPoEUPoHRDYwmAskwmUxmPx98VjT81oO/fKGBlKQDatoG2fdYCfAIoLwVA+zYnEokHVQBFvsTQZhZAC78y2TXsz2sBxjAow2PqArAMYEGzyIqBLOZxnOSoqkUp+H/ie5hKpWaTyWRaFyAqKuJn+E8WEdHz+QZ+4MQZun8CHQAAAABJRU5ErkJggg=='}})
		el({a:'input', b:a, d:{type:'text', placeholder:''} })
		el({a:'span', b:a, c:'Username'})
	})(el({a:'div', b:a}));
	
	(a => {
		el({a:'img', b:a, d:{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACu0lEQVRIS7WVS2gTURSGO5mEGIsYQYsu3AhqqxXciQiaIkYJ5IWEakEFwZULFR+g1T58FKmKotu6EFHESJ5W0IVk4aOuRaWuBMWFSKnSajFD4nfD3OE6zZAx1oHL3Dn3nv8759zHaC3/+dGc9CORyFKfz7dP07Qu5iyn/aD/ivf1bDb73m1c9QBaMpk8hUAvLVBHaAbbLiB5N5A/AIlEIojTHSKNSOdqtTrJ9xu+V9LahB3bdKVSWVUoFD43gliAVCqll8vlx4htVcRL9JO5XG4yFArNCwaDNxnvMcdPk8UF14B4PD7s8XiOqw6GYXQWi0URfe2JxWILmDMBxMvnAwApVwAcV+u6LoR01YFSLBLRqzbW5wvfS2gZADtdAaj9NaI6ZNb3BcL9RDrt9XrH0+n0hBQhyw3Yx8x5V4AfcwUgqndMbKd9QrQD0SnpGI1G24EHEF7Lexj7MhOwHcATVwAymMHZT+S3cdqrOjG2m7G7ttK9ZV4ntqpbwBQirQBKOIqDZT0AjjJ22QboYl6pkbgYr21TSvSM1ybRZ38fyOfzI6JPzdch/pS22AYYADCo2tDow9fAd0i11wAIdVPje3KATMYR/c73eprPIdJ+dtFZM0BR1lvmvIvYT0of66BRiquIHq4nBvAj9iOMH+RtlRB7H5mcE/eW3+9/ztgKswqXyOSEVSIpSpo76O+ndeBs8BaXWpFL7z476xc7aj677KENcgbIeXy3YVd31RCZ9Drepg5laXGA3CC7bnzaCOyrXDP6PX8NEGAB4eSPIhSyLz7XywhZloSddd3cFMAJQsSDlGuAi3OhmENZvzUNkBCifUR/i8xEQmbtIqeaN7Kba2KHWOfknzKQ8HA43MozqmbC+mzMZDJjcwIQIBvkJ6Vaw3p8mDOAgLC4Af6KexB/yUF7PeugNap3M+O/ATImLoDpOXN0AAAAAElFTkSuQmCC'}})
		el({a:'input', b:a, d:{type:'password', placeholder:''} })
		el({a:'span', b:a, c:'Password'})
		el({a:'img', b:a, d:{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC'}, e:{click:a=>{
			a.target.parentElement.children[1].type = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'text' : 'password'
			a.target.src = a.target.parentElement.children[1].type.toLowerCase() == 'password' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADWklEQVRIS82VX0jTURTH/elmGpL5lJr2UEp/QCNHf9SHJkQ2UedkolAEVkhQpA/Wg0baQ/RWRD5EWfRU2WT/xCYktKLSIlKKHqxekswicFBi29yfPtfuT9ZwuiKhweWec+4533Pu95zfnZKwzD9lmfET/u8ENTU1B7Ra7T2LxTIVi4l4b6BUV1dnhcPhDEVRArOzs5MA65OSkhwATwWDQbPT6XywUJKYCQwGw6qUlJR6QM2A7iQ4PRIAexi7iA+GQqFtDofjdVwJdDqdNjc3txXnk8RnqEHgzSCPYlvPnhkBds1mszXFRZHJZNqM4x1WIYCfAMsWgchdPp+vXaPRrIaWDuyHpP071edDzxd5Yzt0taC/UhPOUwTHZQTbOEhmNQNaCNBx5O5AINDMWS+6IYqmNrvdfl7YiC/FZxAxQFITlAn515gajcYSgu8jiooMVDDChLzDlkdDc6j8KPLpKBo+eDyeTW6321tbW5tltVon2XdRmIOVDs5ecB6J6cgm8yhGDWu32izo+iHYgd80kg2RYEdkAgAa8O0RNs57uYlZFrsF3+fIfvC2KgC5UPbBnZGMThWEoAnRA5zG2ddFUTMEYIkE13PeQyFrVB8YqU9MTBS9HBAJZgDxMNd5fDCi6rkf9ttsDVG0iIaHCS6BkmFBMX4vML0nYb3qW1dXl0bf3gqqhMMlDk6gXMfpiOok+XyCnhhV/S389ssiDhJ3k1UMXc8iirMgm7FfVhivFXxQTzEUYegk+GyE4xnkeR3ZS2Ub+/r6xqkyVVSJ7QL0XIygthPKOsAahfbSuSkSjebaD8XUoF5kOk4xHQHJ8QD2cglwDrC5aaJHTeLZQL8hdBImk/AKYiPgY+DtgcaP899BZWXlWsbRRVABDkNMyTH6Ms3+hiAt6zPn+fRpWgDq9XqNWgRNLQDwKmYxpiN8lOUul+ur8PvtLaqqqloJSJesQrw1E8g5svrDarWy4lS/318GcCO6SfQe/26v19sK+DeVsgUfOxpfjINIVCQcBZ/0RocYktXeRd4gbyZchrlpS2SjF00gOR6Wr6hIUEYCt7Q7sW9HHmM9RoZq60sVMHqP+VxTaRvB7axBqDHGAljKvugfTkVFRSYJfP39/Z6lgP74Bn8LGDdF/yrBTzNUuzQBSWfcAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAC+klEQVRIS+WVXUiTYRTHfffRhnSxWVT0gYGRJRRERLAilhXhcpsfrYvwJiIoSoi6KCOQCAUvQkgLoroI6sbZ5jY2iKgkUm+iJMpMCuqmD0znTTn22e+MvfK6NvXGKweH8zzn/M//PM8553mnlCzyT1lk/pIllMDhcKwxGo1l6XRaSaVSE5FI5OdCylu0RE6ns1Sv1zdCckxRFBu6LI9wMpPJDGLrIeHjUCj0t1DC/xLY7XaD1WptBnwZWaUGQSYEw0gFCVdryfD9wtYRjUa7+vv7k1rfrARut7sK4ENkB0ET6BUCZt1Naa6YTKZMIpFoxy4H0P4m5Ybg3iJNgUBgRHXOJKivrz+Es5dgM84W1htYn2d9LxaLnTObzfexHcdWqKyd4L4j7Yjc1OP3+59KkizY5XLto95PIPhDvBPnUF1d3SjrSk68nuaeBHatWFOJ+9TX17eFCth0Ol0IXCl9ORwMBl8qtbW16yB4h1EPYbXP53sjRNxoWqpDsuUkG8S3u1gC7NPgSsXf0NCwi3I+A8/ZEtsVgsNsHPgaAflUEuy/cz34hq18DnJxjRM7MxAczoOth5tFJIGUhQGIbmICYpoEQSnXPMSqO0gCt7qpqakx0bMvJLAqZOvGcRa5A+i0CqKeB6lntlEL+B0g9rnmcLc53Bn2txR5UAaD4TWbrchVgG0a4M0CI5mfr5OYC5qYFmJkmkaTyeTO7BRRpo2oARxrudYNmn7J6/WmsEkJW7G3sF6Wxxxn3wb5dXTG4/HoaWoH2Ivsf8BjY7K+zsw0RBU4IgA24xxizE7x/D8IKZNRjs2DyC0zyEfK18vEyQCUUM5txN2VSQMzxhQdYUQ/i2/WoyGJBVsXwCZ0GrAX/WBqauqFdgAkkE+K2WKx7Ad7gq18s3TIo3g83hwOh6PqbQt+7Gh8NQB5WHtzwAR6jITjuZe8knUla0PO/wrdqm30nAlUp1ydUhyFbA9kVejsF5W1fElH0ANsvRC/V2Py9RL6RytWgvnsi16if+tuTCly7ullAAAAAElFTkSuQmCC'
		}}})
	})(el({a:'div', b:a}));
	
	el({a:'button', b:a, c:'login', e:{click: a => {
		m.username = a.target.parentElement.children[1].value
		document.body.removeChild(ge('login1'))
		page1()
	} }})
	
}
const penjualan1 = a => {
	a.innerHTML = ''
	a = el({a:'div', b:a, d:{id:'penjualan1'} })
	
	el({a:'div', b:a, c:'No', d:{style:'background:rgba(0, 0, 0, 0.1);'} })
	el({a:'div', b:a, c:'Nama Barang', d:{style:'background:rgba(0, 0, 0, 0.1); text-align:center;'} })
	el({a:'div', b:a, c:'Harga', d:{style:'background:rgba(0, 0, 0, 0.1); min-width:9vw;'} })
	el({a:'div', b:a, c:'Jumlah', d:{style:'background:rgba(0, 0, 0, 0.1); min-width:9vw;'} })
	el({a:'div', b:a, c:'Total', d:{style:'background:rgba(0, 0, 0, 0.1); min-width:9vw;'} })
	
	el({a:'div', b:a, d:{style:'background:rgba(0, 0, 0, 0.1); grid-column:1/4;'} })
	el({a:'button', b:a, c:'+', d:{style:'color:green; font-family:ubuntuBold; font-size:3vh; padding:0; grid-column:4/6;'}, e:{click: a => {
		cariBarang1(a.target.parentElement, a.target.previousElementSibling)
		/*
		const b = a.target.parentElement
		const c = a.target.previousElementSibling
		b.insertBefore(el({a:'div', c:Math.floor((b.children.length-10)/5)+1 }), c)
		b.insertBefore(el({a:'div'}), c)
		b.insertBefore(el({a:'div'}), c)
		b.insertBefore(el({a:'div'}), c)
		b.insertBefore(el({a:'div'}), c)
		*/
	}} })
	el({a:'div', b:a, c:'Total', d:{style:'background:rgba(0, 0, 0, 0.1); grid-column:1/4; text-align:center;'} })
	el({a:'div', b:a, d:{style:'background:rgba(0, 0, 0, 0.1);'} })
	el({a:'div', b:a, d:{style:'background:rgba(0, 0, 0, 0.1); text-align:right;'} })
	
	setTimeout(()=>{a.style.transform='scale(1)'}, 100)
}

const beranda1 = a => {
	a.innerHTML = ''
}

const dataMaster1 = a => {
	a.innerHTML = ''
	a = el({a:'div', b:a, d:{id:'data-master'} })
	
	el({a:'div', b:a, c:'Barang' })
	el({a:'div', b:a, c:'Kategori' })
	el({a:'div', b:a, c:'User' })
	
	setTimeout(()=>{a.style.transform='scale(1)'}, 100)
}

const cariBarang1 = (a,b) => {
	const c = el({a:'div', b:document.body, d:{style:'background:rgba(0,0,0,0.3);position:fixed; top:0; left:0; width:100vw; height:100vh; padding:9vh;'}, e:{click:a=>{a.stopPropagation()}} })
	const d = el({a:'div', b:c, d:{style:'background:rgba(41, 117, 167, 0.5); box-shadow:0 0 5px 3px; border-radius:9px; padding:3vh; display:grid; grid-template-columns:1fr min-content; gap:1.5px; transform:scale(0);transition:transform 0.5s;'}})
	const tambah = d => {
		a.insertBefore(el({a:'div', c:Math.floor((a.children.length-10)/5)+1 }), b)
		a.insertBefore(el({a:'div', c:d}), b)
		a.insertBefore(el({a:'div', c:'0'}), b)
		a.insertBefore(el({a:'div', c:'1'}), b)
		a.insertBefore(el({a:'div', c:'0'}), b)
		document.body.removeChild(c)
	}
	el({a:'div', b:d, c:'sabun Mandi', d:{style:'padding:1vh; background:white; border-radius:3px;'}})
	el({a:'button', b:d, c:'add', e:{click: a => {tambah(a.target.previousElementSibling.textContent)}}})
	el({a:'div', b:d, c:'sabun Cuci', d:{style:'padding:1vh; background:white; border-radius:3px;'}})
	el({a:'button', b:d, c:'add', e:{click: a => {tambah(a.target.previousElementSibling.textContent)}}})
	el({a:'div', b:d, c:'sabun Wajah', d:{style:'padding:1vh; background:white; border-radius:3px;'}})
	el({a:'button', b:d, c:'add', e:{click: a => {tambah(a.target.previousElementSibling.textContent)}}})
	el({a:'div', b:d, c:'Sikat gigi', d:{style:'padding:1vh; background:white; border-radius:3px;'}})
	el({a:'button', b:d, c:'add', e:{click: a => {tambah(a.target.previousElementSibling.textContent)}}})
	el({a:'div', b:d, c:'sikat baju', d:{style:'padding:1vh; background:white; border-radius:3px;'}})
	el({a:'button', b:d, c:'add', e:{click: a => {tambah(a.target.previousElementSibling.textContent)}}})
	
	setTimeout(()=>{d.style.transform='scale(1)'}, 10)
}

const isMenu1Active = a => {
	if (a.target.className == 'active') return true
	a.target.parentElement.querySelector('.active').classList.remove('active')
	a.target.className = 'active'
	return false
}

const page1 = a => {
	a = el({a:'div', b:document.body, d:{id:'page1'}})
	
	m.ct = el({a:'div', b:a})
	dataMaster1(m.ct);
	
	(a => {
		el({a:'div', b:a, c:'🏪 \u00A0\u00A0 ANUGERAH, \u00A0 PT ASTER JAYA MANDIRI'})
		el({a:'div', b:a})
		a = el({a:'div', b:a})
		el({a:'div', b:a, c:'👤'})
		a = el({a:'div', b:a})
		a = el({a:'div', b:a})
		el({a:'div', b:a, c:'👤'})
		el({a:'div', b:a, c:`Selamat Datang, ${m.username}`})
		el({a:'div', b:a, c:'⎆', e:{click: a => {document.body.removeChild(ge('page1')); login1() } }})
	})(el({a:'div', b:a}));
	
	el({a:'div', b:a});
	
	(a => {
		el({a:'div', b:a, c:'🏛 \u00A0 Beranda', e:{click:a => { !isMenu1Active(a) && beranda1(m.ct) }} })
		el({a:'div', b:a, c:'⛁ \u00A0 Data Master', d:{class:'active'}, e:{click:a => { !isMenu1Active(a) && dataMaster1(m.ct) }} })
		el({a:'div', b:a, c:'📋 \u00A0 Transaksi', e:{click:a => { !isMenu1Active(a) && penjualan1(m.ct) }} })
		el({a:'div', b:a, c:'⚙ \u00A0 Pengaturan', e:{click:a => { !isMenu1Active(a) && beranda1(m.ct) }} })
		
	})(el({a:'div', b:a}));
	
}

addEventListener('load', login1)
//addEventListener('load', page1)