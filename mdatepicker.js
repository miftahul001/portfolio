/* mdatepicker.js
  * https://miftahul001.github.io/portfolio/mdatepicker.js
  * Copyright (c) 2024 Miftahul Munir; Licensed MIT
  */

const mShowPicker = a => {
	//mShowPicker({x:a.clientX, y:a.clientY, max:'2024-07-31', min:'2023-06-01', value:Date().now, cb:a=>{console.log(a)} })
	if (document.getElementById('m-date-picker')) return
	
	const b = el({a:'div', b:el({a:'div', b:document.body, d:{id:'m-date-picker', style:'position:fixed; top:0; left:0; width:100vw; height:100vh;'}, e:{click: a => { a.target.remove() }} }),
		d:{style:`position:fixed; top:${a.y}px; left:${a.x}px; background:white; border-radius:1vmin; box-shadow:0 0 17px 3px rgba(0,0,0,0.1); display:grid; gap:0.5vmin 0.5vmin; grid-template-columns:repeat(7,1fr); padding:1vmin;`}, e:{click:a=>{a.stopPropagation()}} })
	const c = (b =>({min:b[0], value:new Date((a=>a.value || new Date())(a||{})), max:b[2]}))([new Date((a=>a.min || new Date())(a||{})), new Date((a=>a.value || new Date())(a||{})), new Date((a=>a.max || new Date())(a||{}))].sort((a,b)=>a-b))
	c.min.setHours(0,0,0,0)
	c.max.setHours(0,0,0,0)
	c.value.setHours(0,0,0,0)
	
	const showDate = (y, m) => {
		[...b.children].slice(1,-1).forEach(a => { a.remove() })
		const a = el({a:'div'})
		a.appendChild(b.children[1]);
		(a => { while (a > 0) { el({a:'div', b:b}); a-- } })(new Date(y, m, 1).getDay());
		((a,d) => {
			a.setHours(0,0,0,0)
			d.setHours(0,0,0,0)
			const st1 = {style:'border-radius:0.3vmin; cursor:pointer; text-align:center;'}
			const st2 = {style:'border-radius:0.3vmin; background:#bbb; cursor:default; text-align:center;'}
			const st3 = {class:'value', style:'border-radius:0.3vmin; cursor:pointer; outline:0.1vmin solid red; text-align:center;'}
			const click1 = { click:a => {
				[...a.target.parentElement.querySelectorAll('.value')].forEach(a => { a.classList.remove('value'); a.style.outline = 'none' })
				a.target.classList.add('value')
				a.target.style.outline = '0.1vmin solid red'
				c.value = new Date(a.target.parentElement.children[0].children[1].value, a.target.parentElement.children[0].children[0].selectedIndex, a.target.textContent)
				c.value.setHours(0,0,0,0)
			}}
			while (a<=d) {
				(a<c.min || a>c.max) ? el({a:'div', b:b, c:a.getDate(), d:st2 }) : a.getTime()==c.value.getTime() ? el({a:'div', b:b, c:a.getDate(), d:st3, e:click1 }) : el({a:'div', b:b, c:a.getDate(), d:st1, e:click1 })
				a.setDate(a.getDate()+1)
			}
		})(new Date(y, m, 1), new Date(y, m+1, 0));
		b.appendChild(a.children[0])
	}
	
	(b => {
		b = el({a:'select', b:b, e:{change:a => { showDate(a.target.nextElementSibling.value, a.target.selectedIndex) }} });
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].forEach(c => { el({a:'option', b:b, c:c, d:{value:c} }) })
		b.selectedIndex = c.value.getMonth();
		((a,b,c,d) => {
			while (b<=c) {
				el({a:'option', b:a, c:b, d:{value:b}})
				b++
			}
			a.value = d
		})(el({a:'select', b:b.parentElement, e:{change:a => { showDate(a.target.value, a.target.previousElementSibling.selectedIndex) }} }), c.min.getFullYear(), c.max.getFullYear(), c.value.getFullYear())
	})(el({a:'div', b:b, d:{style:'grid-column:1/8; display:flex; justify-content:space-between; padding-bottom:1vmin;'} }))
	
	el({a:'button', b:el({a:'div', b:b, d:{style:'grid-column:1/8; display:flex; justify-content:flex-end; padding-top:0.5vmin;'} }), c:'Ok', e:{click: b => { a.cb(c.value); b.target.parentElement.parentElement.parentElement.remove() }} })
	showDate(c.value.getFullYear(), c.value.getMonth())
}
