/* mTable.js
  * https://miftahul001.github.io/portfolio/mTable.js
  * Copyright (c) 2024 Miftahul Munir; Licensed MIT
  */
const mCreateTable = a => {
	const b = {
		a: el({a:'div', d:{style:'display:flex; flex-direction:column; margin:0; padding:0'} }),
		tabel: el({a:'table', d:{class:'table-data'} }),
		select: el({a:'select', d:{style:'min-width:3vw;'}, e:{mousedown:a=>{a.stopPropagation()}, change:a=>{
			b.offset = 0
			b.limit = parseInt(a.target.value)
			b.limit = b.limit < b.count ? b.limit : 0
			b.createPagging()
		}} }),
		pageOf: el({a:'div', c:'Showing - to - of - entries'}),
		pagging: el({a:'tr', b:el({a:'table', b:el({a:'div', d:{class:'paggination'} }) }) }),
		url: a.url,
		urlCount: a.urlC || '',
		pos: [],
		limit: 10,
		offset: 0,
		count: 0,
		order: '',
		filter1: [],
		value1: [],
		id: 0,
		cb: a.cb,
		createHeader: a => {
			b.tabel.innerHTML = ''
			el({a:'tr', b:b.tabel })
			const d = {style:'align-items:center; display:flex; gap:0.5vw;'}
			a.forEach(a => {
				const c = el({a:'div', b:el({a:'th', b:b.tabel.children[0]}), d:d })
				el({a:'div', b:c, c:a.a, d:{style:'flex:1 1 auto;'} })
				
				a.b && el({a:'i', b:c, d:{class:'fa fa-search', 'data-search':a.b}, e:{click:a=>{
					const c = el({a:'div', b:el({a:'div', b:document.body, d:{style:'position:fixed; top:0; left:0; width:100vw; height:100vh;'}, e:{click:a=>{a.target.remove()}} }), d:{style:`position:fixed; background:white; border-radius:1vmin; box-shadow:0 0 3vmin 0.1vmin rgba(17,11,45,0.15); padding:1vh 1vw; display:flex; flex-direction:column; gap:1vmin; left:${a.clientX}px; top:${a.clientY}px;`}, e:{click:a=>{a.stopPropagation()}} })
					el({a:'input', b:c, d:{type:'text'}})
					el({a:'button', b:c, c:'ok', d:{style:'align-self:flex-end;', 'data-search':a.target.getAttribute('data-search')}, e:{click:a=>{
						if (a.target.parentElement.children[0].value.trim()) {
							b.show({filter:a.target.getAttribute('data-search'), value:`'%${a.target.previousElementSibling.value.trim()}%'`})
						}
						a.target.parentElement.parentElement.remove()
					}}  })
					c.style.left = (parseInt(c.style.left) - c.offsetWidth) + 'px'
					c.children[0].focus()
				}} })
				
				a.c && el({a:'i', b:c, d:{'data-sort': a.c, class:'fa fa-sort'}, e:{click:a=>{
					if (a.target.classList.contains('fa-sort-asc')) {
						a.target.classList.remove('fa-sort-asc')
						a.target.classList.add('fa-sort-desc')
						b.order = a.target.getAttribute('data-sort') + ' DESC '
					} else {
						a.target.classList.remove('fa-sort', 'fa-sort-desc')
						a.target.classList.add('fa-sort-asc')
						b.order = a.target.getAttribute('data-sort')
					}
					[...a.target.parentElement.parentElement.parentElement.children].forEach(c=>{
						if (c != a.target.parentElement.parentElement) {
							c = [...c.children[0].children].find(a=>a.getAttribute('data-sort')) || {classList:{add:()=>{},remove:()=>{}}}
							c.classList.remove('fa-sort-asc', 'fa-sort-desc')
							c.classList.add('fa-sort')
						}
					})
					b.show()
				}} })
			})
		},
		_pagging: a => {
			b.pagging.innerHTML = ''
			b.maxOffset = b.limit > 0 ? Math.ceil(b.count/b.limit) : 0
			
			el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				if (b.offset > 0) {
					b.offset = 0
					b.pagging.children[1].children[0].textContent = 1
					b.maxOffset > 1 && (b.pagging.children[2].children[0].textContent = 2)
					b.maxOffset > 2 && (b.pagging.children[3].children[0].textContent = 3)
					b.show()
				}
			}} }), d:{class:'fa fa-angle-double-left', style:'pointer-events:none;'} })
			/*
			el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				if (b.offset > 0) {
					b.pagging.children[2].children[0].textContent = 1
					b.maxOffset > 1 && (b.pagging.children[3].children[0].textContent = 2)
					b.maxOffset > 2 && (b.pagging.children[4].children[0].textContent = 3)
				}
			}} }), d:{class:'fa fa-angle-left', style:'pointer-events:none;'} })
			*/
			el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				const c = parseInt(a.target.textContent)-1
				if (b.offset != c) {
					b.offset = c
					if (c > 0) {
						b.pagging.children[1].children[0].textContent = c
						b.maxOffset > 1 && (b.pagging.children[2].children[0].textContent = c+1)
						b.maxOffset > 2 && (b.pagging.children[3].children[0].textContent = c+2)
					}
					b.show()
				}
			}} }), c:'1', d:{style:'pointer-events:none;'} })
			
			b.maxOffset > 1 && el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				const c = parseInt(a.target.textContent)-1
				if (b.offset != c) {
					b.offset = c
					b.pagging.children[1].children[0].textContent = c
					b.pagging.children[2].children[0].textContent = c+1
					b.maxOffset > 2 && (b.pagging.children[3].children[0].textContent = c+2)
					b.show()
				}
			}} }), c:'2', d:{style:'pointer-events:none;'} })
			
			b.maxOffset > 2 && el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				const c = parseInt(a.target.textContent)-1
				if (b.offset != c) {
					b.offset = c
					if (c+1<b.maxOffset) {
						b.pagging.children[1].children[0].textContent = c
						b.pagging.children[2].children[0].textContent = c+1
						b.pagging.children[3].children[0].textContent = c+2
					}
					b.show()
				}
			}} }), c:'3', d:{style:'pointer-events:none;'} })
			
			
			//el({a:'span', b:el({a:'td', b:b.pagging}), d:{class:'fa fa-angle-right', style:'pointer-events:none;'} })
			el({a:'span', b:el({a:'td', b:b.pagging, e:{click:a=>{
				if (b.offset < b.maxOffset-1) {
					b.offset = b.maxOffset-1
					b.pagging.children[1].children[0].textContent = b.maxOffset > 2 ? b.maxOffset - 2 : 1
					b.maxOffset > 1 && (b.pagging.children[2].children[0].textContent = b.maxOffset > 2 ? b.maxOffset-1 : 2)
					b.maxOffset > 2 && (b.pagging.children[3].children[0].textContent = b.maxOffset)
					b.show()
				}
			}} }), d:{class:'fa fa-angle-double-right', style:'pointer-events:none;'} })
			b.show()
		},
		createPagging: a => {
			if (!b.urlCount) return
			b.id = new Date().getTime()
			a = b.urlCount +
			(b.filter1.length > 0 ? `&f1=${b.filter1.toString()}&v1=${b.value1.toString()}` : '') + '&id=' + b.id
			b.pageOf.textContent = 'Showing - to - of - entries'
			b.pagging.innerHTML = ''
			fetch(a).then(a=>a.json()).then(a => {
				if (a && a.data && a.id==b.id) {
					b.count = parseInt(a.data)
					b._pagging()
				}
			})
		},
		show: a => {
			b.id = new Date().getTime()
			a = b.url +
			(b.limit ? `&b=${b.offset*b.limit}&c=${b.limit}` : '') +
			(b.filter1.length > 0 ? `&f1=${b.filter1.toString()}&v1=${b.value1.toString()}` : '') +
			(a && a.filter ? `&f2=${a.filter}&v2=${a.value}` : '') +
			(b.order ? '&order=' + b.order : '') +
			'&id=' + b.id
			fetch(a).then(a=>a.json()).then(a => { b.cb(a) })
			
			b.pageOf.textContent = `Showing ${b.offset > 0 ? b.offset * b.limit +1 : 1} to ${b.limit>0 ? (b.offset+1)*b.limit < b.count ? (b.offset+1)*b.limit : b.count : b.count} of ${b.count} entries`
		}, init: a => {
			b.select.selectedIndex = 0
			b.limit = 10
			b.offset = 0
			b.order = ''
			b.filter1 = []
			b.value1 = []
			b.createPagging()
		}
	}
	
	a.a1 = el({a:'div', b:b.a, d:{style:'align-items:center; display:flex; height:7vh; gap:0.5vw;'} })
	a.a1.appendChild(b.select)
	el({a:'option', b:b.select, c:'10', d:{value:10} })
	el({a:'option', b:b.select, c:'15', d:{value:15} })
	el({a:'option', b:b.select, c:'20', d:{value:20} })
	el({a:'option', b:b.select, c:'All', d:{value:0} })
	
	el({a:'div', b:a.a1, c:'records', d:{style:'flex: 1 1 auto;'} })
	/*
	a.a1 = el({a:'div', b:a.a1, d:{class:'btn'}, e:{click:a=>{alert('aaa')}} })
	el({a:'span', b:a.a1, d:{class:'fa fa-plus'} })
	el({a:'span', b:a.a1, c:'Tambah Data' })
	*/
	
	el({a:'div', b:b.a, d:{style:'max-height:73vh; max-width:96vw; min-height:21vh; min-width:31vw; overflow:scroll;'}, e:{mousedown:a=>{a.stopPropagation()}} }).appendChild(b.tabel)
	el({a:'tr', b:b.tabel })
	b.createHeader(a.header)
	
	a.a1 = el({a:'div', b:b.a, d:{style:'align-items:center; display:flex; height:7vh; gap:0.5vw;'} })
	a.a1.appendChild(b.pageOf)
	a.a1.appendChild(b.pagging.parentElement.parentElement)
	return b
}
