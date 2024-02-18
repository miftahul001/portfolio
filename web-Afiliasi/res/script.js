const m = {
	username:'',
	ct: '',
	product1: (a => {
		
		el({a:'div', b:a, c:'Produk'})
		a = el({a:'div', b:a})
		el({a:'button', b:a, c:'filter'})
		el({a:'input', b:a, d:{type:'text'}})
		el({a:'button', b:a, c:'🔍' })
		
		a = el({a:'div', b:a.parentElement})
		a = el({a:'div', b:a});
		
		['👕', '👖', '👔', '👗', '👘', '👙', '👚', '🥻', '🥼', '🦺', '🧥'].forEach(b => {
			const c = el({a:'div', b:a})
			el({a:'div', b:c, c:b})
			el({a:'div', b:c, c:'Lorem ipsum dolor sit amet'})
		})
		
		a = el({a:'div', b:a.parentElement});
		el({a:'button', b:a, c:'➕ \u00A0\u00A0 Tambah'});
		
		return a.parentElement.parentElement
		
	})(el({a:'div', d:{class:'product1'}})),
	
	product2: (a => {
		
		el({a:'div', b:a, c:'Produk'})
		a = el({a:'div', b:a})
		el({a:'div', b:a, c:'filter'})
		el({a:'input', b:a, d:{type:'text'}})
		el({a:'button', b:a, c:'🔍' })
		
		a = el({a:'div', b:a.parentElement})
		a = el({a:'div', b:a});
		
		['👕', '👔', '👗', '👘', '👚', '🥼', '🧥'].forEach(b => {
			const c = el({a:'div', b:a})
			el({a:'div', b:c, c:b})
			el({a:'div', b:c, c:'Lorem ipsum dolor sit amet'})
		})
		
		a = el({a:'div', b:a.parentElement});
		el({a:'button', b:a, c:'➕ \u00A0\u00A0 Tambah'});
		
		return a.parentElement.parentElement
		
	})(el({a:'div', d:{class:'product1'}})),
	
	show: (a,b) => {
		a = a.target.parentElement.nextElementSibling
		a.innerHTML = ''
		a.appendChild(b)
	}
}

const ge = a => document.getElementById(a)

const login1 = a => {
	a = el({a:'div', b:document.body, d:{id:'login1', class:'popup1'}, e:{click:a => {a.stopPropagation()}} })
	
	a = el({a:'div', b:a})
	a = el({a:'div', b:a})
	el({a:'div', b:a, c:'Login'})
	el({a:'div', b:a, c:'X', e: {click: a => { document.body.removeChild(ge('login1')) } } })
	a = el({a:'div', b:a.parentElement})
	el({a:'div', b:a, c:'Username / Email'})
	el({a:'input', b:a, d:{type:'text'} })
	el({a:'div', b:a, c:'Password'})
	el({a:'input', b:a, d:{type:'password'} })
	el({a:'div', b:a})
	el({a:'button', b:a, c:'login', e:{click: a => {
		m.username = a.target.parentElement.children[1].value
		document.body.removeChild(ge('login1'))
		admin1()
	} }})
	
	setTimeout(()=>{ge('login1').children[0].style.transform = 'scale(1)'},50)
}

const daftar1 = a => {
	a = el({a:'div', b:document.body, d:{id:'daftar1', class:'popup1'}, e:{click:a => {a.stopPropagation()}} })
	
	a = el({a:'div', b:a})
	a = el({a:'div', b:a})
	el({a:'div', b:a, c:'Daftar'})
	el({a:'div', b:a, c:'X', e: {click: a => { document.body.removeChild(ge('daftar1')) } } })
	a = el({a:'div', b:a.parentElement})
	el({a:'div', b:a, c:'Email'})
	el({a:'input', b:a, d:{type:'text'} })
	el({a:'div', b:a, c:'Password'})
	el({a:'input', b:a, d:{type:'password'} })
	el({a:'div', b:a, c:'Ulangi Password'})
	el({a:'input', b:a, d:{type:'password'} })
	el({a:'div', b:a})
	el({a:'button', b:a, c:'daftar', e:{click: a => {
		m.username = a.target.parentElement.children[1].value
		document.body.removeChild(ge('daftar1'))
		page1()
	} }})
	
	setTimeout(()=>{ge('daftar1').children[0].style.transform = 'scale(1)'},50)
}

const admin1 = a => {
	document.body.innerHTML = '';
	
	a = el({a:'div', b:document.body});
	
	(a => {
		el({a:'div', b:a, c:'Komisi' })
		el({a:'div', b:a, c:'Produk', e:{click: a=> { m.show(a, m.product1) }} })
		el({a:'div', b:a, c:'Member' })
	})(el({a:'div', b:a, d:{class:'nav1'}}))
	
	el({a:'div', b:a, d:{class:'ct1'}});
	
	(a => {
		el({a:'div', b:a, c:'Afiliasi'})
		el({a:'div', b:a})
		el({a:'div', b:a, c:'👤', d:{class:'user1'}, e:{click:a=>{page1()}} })
		//a = el({a:'div', b:a})
		//a = el({a:'div', b:a})
		//el({a:'div', b:a, c:'👤'})
		//el({a:'div', b:a, c:`Selamat Datang, ${m.username}`})
		//el({a:'div', b:a, c:'⎆', e:{click: a => {document.body.removeChild(ge('page1')); login1() } }})
	})(el({a:'div', b:a, d:{class:'header1'}}));
}

const member1 = a => {
	document.body.innerHTML = '';
	
	a = el({a:'div', b:document.body});
	
	(a => {
		el({a:'div', b:a, c:'Komisi' })
		el({a:'div', b:a, c:'Produk', e:{click: a=> { m.show(a, m.product2) }} })
		el({a:'div', b:a, c:'Profile' })
	})(el({a:'div', b:a, d:{class:'nav1'}}))
	
	el({a:'div', b:a, d:{class:'ct1'}});
	
	(a => {
		el({a:'div', b:a, c:'Afiliasi'})
		el({a:'div', b:a})
		el({a:'div', b:a, c:'👤', d:{class:'user1'}, e:{click:a=>{page1()}} })
	})(el({a:'div', b:a, d:{class:'header1'}}));
}

const page1 = a => {
	document.body.innerHTML = ''
	
	a = el({a:'div', b:document.body, d:{id:'page1'}});
	
	(a => {
		el({a:'div', b:a, c:'Raih Sukses sebagai Afiliator!'})
		el({a:'div', b:a, c:'Program Afiliasi'})
		el({a:'div', b:a, c:'Bergabunglah dengan program afiliasi dan dapatkan keuntungan penghasilan melimpah tanpa batas. Cukup daftar, dapatkan link afiliasi unik Anda, dan bagikan!'})
		el({a:'div', b:el({a:'div', b:a}), c:'Mulai Sekarang!', e:{click:daftar1} })
		el({a:'div', b:a, c:'💃'})
	})(el({a:'div', b:a }));
	
	(a => {
		//['👕', '👖', '👔', '👗', '👘', '👙', '👚', '🥻', '🥼', '🦺', '🧥'].forEach(b => {
		['👕', '👖', '👔', '👗', '👘', '👚', '🥻', '🥼', '🦺', '🧥'].forEach(b => {
			const c = el({a:'div', b:a})
			el({a:'div', b:c, c:b})
			el({a:'div', b:c, c:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'})
		})
	})(el({a:'div', b:a}));
	
	(a => {
		el({a:'div', b:a, c:'Afiliasi'});
		
		(a => {
			el({a:'div', b:a, c:'Program'})
			el({a:'div', b:a, c:'Komisi'})
		})(el({a:'div', b:a}));
		
		(a => {
			el({a:'div', b:a, c:'Produk'})
			el({a:'div', b:a, c:'t-shirt'})
			el({a:'div', b:a, c:'kemeja'})
		})(el({a:'div', b:a}));
		
		(a => {
			el({a:'div', b:a, c:'Tentang'})
			el({a:'div', b:a, c:'tentang kami'})
			el({a:'div', b:a, c:'hubungi kami'})
		})(el({a:'div', b:a}));
		
	})(el({a:'div', b:a}));
	
	(a => {
		el({a:'div', b:a, c:'Afiliasi'})
		el({a:'div', b:a})
		el({a:'div', b:a})
		el({a:'div', b:a})
		//el({a:'div', c:'Produk', b:a})
		//el({a:'div', c:'Tentang', b:a})
		el({a:'div', c:'Daftar', b:a, e:{click:daftar1} })
		el({a:'div', c:'Login', b:a, e:{click:login1} })
		//a = el({a:'div', b:a})
		//el({a:'div', b:a, c:'👤'})🔚 ⏚
		//a = el({a:'div', b:a})
		//a = el({a:'div', b:a})
		//el({a:'div', b:a, c:'👤'})
		//el({a:'div', b:a, c:`Selamat Datang, ${m.username}`})
		//el({a:'div', b:a, c:'⎆', e:{click: a => {document.body.removeChild(ge('page1')); login1() } }})
	})(el({a:'div', b:a, d:{class:'header1'}}));
	
}

addEventListener('load', page1)
//addEventListener('load', admin1)
//addEventListener('load', member1)