const simulation=()=>{
const m={
	warna: ['rgb(255,255,255)', 'rgb(140,0,255)', 'rgb(32,31,255)', 'rgb(0,192,255)', 'rgb(1,240,0)', 'rgb(241,240,0)', 'rgb(255,192,0)', 'rgb(254,0,0)', '#000000'],
	iwarna: a=>m.warna[a<=1?0:a<=10?1:a<=25?2:a<=40?3:a<=55?4:a<=70?5:a<=93?6:a<=100?7:8],
	dataJson: {},
	area: {},
	nodes: {},
	lines: {},
	data: {a:{},b:{}},
	invalid: {},
	selected: null,
	hovered: null,
	visible: {nodes:{},lines:{}},
	transport2:{},
	loader: a=>{fetch(a.a).then(b=>b.json()).then(b=>{a.b(b,a.c?a.c:'',a.a)}).catch(e=>{a.b({},a.c?a.c:'',a.a)})},
	addNode: a=>{
		m.nodes[a.id]=new mapboxgl.Marker({draggable:true, element:el({a:'div',c:a.id, d:{'data-a':a.name, style:'padding:0 4px;font-size:10px;font-family:"Barlow Condensed";background:rgba(87,136,250,.8);border-radius:50%;color:rgba(255,255,255,.8);'}})}).setLngLat([a.lng, a.lat])
		m.nodes[a.id].on('dragend', a=>{
			const b=a.target.getLngLat()
			const c=a.target.getElement().textContent
			Object.keys(m.lines).filter(b=>m.lines[b].a==c).forEach(a=>{
				const line=m.createLine([b, m.nodes[m.lines[a].b].getLngLat(), m.lines[a].p.getLngLat()])
				m.lines[a].s._data.features[0].geometry.coordinates=line[0]
				m.lines[a].s._data.features[1].geometry.coordinates=line[1]
				m.lines[a].s.setData(m.lines[a].s._data)
				m.lines[a].t.setLngLat({lng:line[1][0][0], lat:line[1][0][1]})
			})
			Object.keys(m.lines).filter(b=>m.lines[b].b==c).forEach(a=>{
				const line=m.createLine([m.nodes[m.lines[a].a].getLngLat(), b, m.lines[a].p.getLngLat()])
				m.lines[a].s._data.features[0].geometry.coordinates=line[0]
				m.lines[a].s._data.features[1].geometry.coordinates=line[1]
				m.lines[a].s.setData(m.lines[a].s._data)
				m.lines[a].t.setLngLat({lng:line[1][0][0], lat:line[1][0][1]})
			})
		})
	},
	addLine: a=>{
		a.id=a.id||(a.n1+'~'+a.n2)
		if (m.lines[a.id]) return
		a.data=a.data||{c1:'#000000',c2:'#000000'}
		a.cp = a.cp || m.controlPoint([m.nodes[a.n1].getLngLat(), m.nodes[a.n2].getLngLat()])
		const line=m.createLine([m.nodes[a.n1].getLngLat(), m.nodes[a.n2].getLngLat(), a.cp])
		m.drawLine({a:a.id, b:0, c:line, c1:a.data.c1, c2:a.data.c2})
		m.lines[a.id]={
			a:a.n1,
			b:a.n2,
			c:m.nodes[a.n1].getElement().getAttribute('data-a'),
			d:m.nodes[a.n2].getElement().getAttribute('data-a'),
			api:a.api,
			data:a.data,
			e: false,
			p:new mapboxgl.Marker({draggable:true, element:el({a:'div',c:' ', d:{'data-a':a.id, style:'padding:8px;background:rgba(87,136,250,1);border-radius:50%;'}})}).setLngLat(a.cp),
			s:m.map.getSource(a.id),
			t:new mapboxgl.Marker({element:el({a:'div'})}).setLngLat({lng:line[1][0][0], lat:line[1][0][1]}),
		}
		m.lines[a.id].t.getElement().appendChild(el({a:'img',d:{style:'width:24px;height:24px;',src:'x.svg'}}))
		m.lines[a.id].p.on('dragend', a=>{
			const b=a.target.getLngLat()
			a=m.lines[a.target.getElement().getAttribute('data-a')]
			const line=m.createLine([m.nodes[a.a].getLngLat(), m.nodes[a.b].getLngLat(), b])
			a.s._data.features[0].geometry.coordinates=line[0]
			a.s._data.features[1].geometry.coordinates=line[1]
			a.s.setData(a.s._data)
			a.t.setLngLat({lng:line[1][0][0], lat:line[1][0][1]})
		})
	},
	controlPoint: a=>{ //input [{lng,lat}, {lng,lat}]
		const deg2rad=(deg)=>deg * (Math.PI/180)
		const getDistanceFromLatLonInKm=(lat1, lon1, lat2, lon2)=>{
			const dLat = deg2rad(lat2-lat1)	// deg2rad below
			const dLon = deg2rad(lon2-lon1)
			const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
			return c
		}
		a[0].lng>a[1].lng&&a.push(a.shift())
		const d=getDistanceFromLatLonInKm(a[0].lat, a[0].lng, a[1].lat, a[1].lng)
		const theta = Math.atan2(a[1].lng - a[0].lng, a[1].lat - a[0].lat) - Math.PI/2
		const bezierX = ((a[0].lat+a[1].lat)*.5) + (Math.ceil(d*20)+d)*Math.cos(theta)
		const bezierY = ((a[0].lng+a[1].lng)*.5) + (Math.ceil(d*20)+d)*Math.sin(theta)
		return {lat:bezierX, lng:bezierY}
	},
	createLine: a=>{
		const xy=[]
		for(var t=0.0; t<=1; t+=0.05) xy.push([(1-t)*(1-t)*a[0].lng + 2*(1-t)*t*a[2].lng + t*t*a[1].lng, (1-t)*(1-t)*a[0].lat + 2*(1-t)*t*a[2].lat + t*t*a[1].lat, .2])
		xy.push([a[1].lng, a[1].lat, .2])
		return [xy.slice(0,Math.ceil(xy.length/2)), xy.slice(-Math.ceil(xy.length/2))]
	},
	drawLine: a=>{
		m.map.addSource(a.a, {type:'geojson', data:{type:"FeatureCollection", features:[
			{type:'Feature', id:1, properties:{a:a.a, b:a.b, color:a.c1}, geometry:{type:'LineString', coordinates:a.c[0]}},
			{type:'Feature', id:2, properties:{a:a.a, b:a.b, color:a.c2}, geometry:{type:'LineString', coordinates:a.c[1]}}
		]}})
		m.map.addLayer({id:a.a, type:'line', source:a.a, paint:{'line-color':['get', 'color'], 'line-width':['case', ['boolean', ['feature-state', 'hover'], false], 10, 6]}})
		m.map.on('mousemove', a.a, b=>{
			if (m.selected!=null) return
			if (b.features.length > 0) {
				if (m.hovered!=null) {
					m.map.setFeatureState({source:m.hovered, id:1}, {hover:false})
					m.map.setFeatureState({source:m.hovered, id:2}, {hover:false})
				}
				m.hovered=b.features[0].properties.a
				m.map.setFeatureState({source:m.hovered, id:1}, {hover:true})
				m.map.setFeatureState({source:m.hovered, id:2}, {hover:true})
				m.popup1.parentElement.children[0].children[0].textContent=m.hovered
				m.div.appendChild(m.popup1.parentElement.parentElement)
				m.showPopup(m.lines[m.hovered])
			}
		})
		m.map.on('mouseleave', a.a, b=> {
			if (m.selected!=null) return
			if (m.hovered!=null) {
				m.map.setFeatureState({source:m.hovered, id:1}, {hover:false})
				m.map.setFeatureState({source:m.hovered, id:2}, {hover:false})
				m.div.removeChild(m.popup1.parentElement.parentElement)
				m.hovered = null
			}
		})
		m.map.on('click', a.a, b=> {
			if (b.originalEvent.defaultPrevented) return
			if (b.features.length > 0) {
				b.originalEvent.preventDefault()
				if (m.selected!=null) {
					m.map.setFeatureState({source:m.selected, id:1}, {hover:false})
					m.map.setFeatureState({source:m.selected, id:2}, {hover:false})
					m.lines[m.selected].p.remove()
				}
				if (m.hovered!=null) {
					m.map.setFeatureState({source:m.hovered, id:1}, {hover:false})
					m.map.setFeatureState({source:m.hovered, id:2}, {hover:false})
					m.hovered=null
				}
				m.selected=b.features[0].properties.a
				m.map.setFeatureState({source:m.selected, id:1}, {hover:true})
				m.map.setFeatureState({source:m.selected, id:2}, {hover:true})
				m.popup1.parentElement.children[0].children[0].textContent=m.selected
				m.div.appendChild(m.popup1.parentElement.parentElement)
				m.map.moveLayer(m.selected)
				m.lines[m.selected].p.addTo(m.map)
				m.showPopup(m.lines[m.selected])
			}
		})
	},
	clearData: ()=>{
		Object.keys(m.lines).forEach(a=>{
			m.lines[a].p.remove()
			m.lines[a].t.remove()
			delete m.lines[a].data
			delete m.lines[a].f
			delete m.lines[a].p
			delete m.lines[a].s
			delete m.lines[a].t
			delete m.lines[a]
			m.map.removeLayer(a)
			m.map.removeSource(a)
		})
		Object.keys(m.nodes).forEach(a=>{m.nodes[a].remove(); delete m.nodes[a]})
	},
	filterArea: a=>{
		if (a=='ALL') {
			Object.keys(m.lines).forEach(a=>{
				m.nodes[m.lines[a].a].addTo(m.map)
				m.nodes[m.lines[a].b].addTo(m.map)
				m.map.setLayoutProperty(a, 'visibility', 'visible')
				//m.lines[a].e = true
				m.lines[a].e&&m.lines[a].t.addTo(m.map)
			})
			m.map.fitBounds([m.area[a].sw.lng, m.area[a].sw.lat, m.area[a].ne.lng, m.area[a].ne.lat])
			return
		}
		Object.keys(m.nodes).forEach(a=>{m.nodes[a].remove()})
		Object.keys(m.lines).forEach(a=>{m.map.setLayoutProperty(a, 'visibility', 'none');m.lines[a].p.remove();m.lines[a].t.remove()})
		m.area[a].a.forEach(a=>{
			if (m.lines[a]) {
				m.nodes[m.lines[a].a].addTo(m.map)
				m.nodes[m.lines[a].b].addTo(m.map)
				m.map.setLayoutProperty(a, 'visibility', 'visible')
				m.lines[a].e&&m.lines[a].t.addTo(m.map)
				//m.lines[a].e = true
			}// else console.log('Missing route ='+a)
		})
		m.map.fitBounds([m.area[a].sw.lng, m.area[a].sw.lat, m.area[a].ne.lng, m.area[a].ne.lat])
		
		m.transport1.parentElement.style.display=m.select1.selectedIndex<11?'block':'none'
	},
	popup1: el({a:'div',b:el({a:'div', b:el({a:'div', b:el({a:'div',b:el({a:'div',b:el({a:'div',d:{style:'position:absolute;bottom:104px;left:16px;display:flex;align-items:end;'}}), d:{style:'background:rgba(255,255,255,.4);border-radius:8px;box-shadow:0 0 6px 2px rgba(0,0,0,.1);padding:8px;'}}), d:{style:'background:rgba(0,0,0,.8);border-radius:8px;color:rgba(255,255,255,.8);font-weight:bold;padding:4px 32px;margin-bottom:8px;position:relative;'}})}).parentElement,c:'x',d:{style:'background:rgba(255,255,255,.8);border-radius:4px;color:#000;cursor:default;font-weight:bold;padding:0 3px;position:absolute;top:3px;right:6px;'},e:{click:a=>{
		m.div.removeChild(m.popup1.parentElement.parentElement);
		m.map.setFeatureState({source:m.selected, id:1}, {hover:false} );
		m.map.setFeatureState({source:m.selected, id:2}, {hover:false} );
		m.lines[m.selected].p.remove();
		m.selected=null
	}}}).parentElement.parentElement,d:{style:'background:rgba(255,255,255,.6);border-radius:8px;display:grid;grid-template-columns: auto auto;gap:4px;padding:12px;'}}),
	initUI: ()=>{
		m.menu=el({a:'div',b:m.div,d:{style:'position:absolute;top:20px;right:16px;display:flex;flex-direction:column;gap:16px;align-items:flex-end;'}})
		const b=el({a:'div',b:m.menu,d:{style:'display:flex;gap:15px;'}})
		m.transport1=el({a:'button',b:el({a:'div',b:el({a:'select',b:el({a:'div',b:el({a:'div',b:b,d:{style:'background:rgba(255,255,255,.5);border-radius:8px;box-shadow:0 0 6px 2px rgba(0,0,0,.1);padding:16px;'}}),c:'TRANSPORT'}).parentElement,d:{style:'padding:4px 8px;'},e:{change:a=>{
			a.target.nextElementSibling.nextElementSibling.textContent = m.transport2[a.target.value]==1?'putus':'sambung'
		}}}).parentElement,d:{style:'height:5px;'}}).parentElement,c:'putus',d:{style:'padding:3px 7px;'},e:{click:a=>{
			if (a.target.textContent=='putus') {
				a.target.textContent='sambung'
				m.transport2[a.target.previousElementSibling.previousElementSibling.value]=2
				m.area[a.target.previousElementSibling.previousElementSibling.value].a.forEach(a=>{
					m.lines[a].e=true
					m.map.getLayoutProperty(a,'visibility')=='visible'&&m.lines[a].t.addTo(m.map)
					m.lines[a].s._data.features[0].properties.color='#000000'
					m.lines[a].s._data.features[1].properties.color='#000000'
					m.lines[a].s.setData(m.lines[a].s._data)
					if (!m.newRoute.a.find(b=>a==b)) m.newRoute.a.push(a)
				})
				m.restoreRoute()
			} else {
				a.target.textContent='putus'
				m.transport2[a.target.previousElementSibling.previousElementSibling.value]=1
				m.area[a.target.previousElementSibling.previousElementSibling.value].a.forEach(a=>{
					m.lines[a].e=false
					m.lines[a].t.remove()
					m.lines[a].s._data.features[0].properties.color=m.lines[a].data.c1
					m.lines[a].s._data.features[1].properties.color=m.lines[a].data.c2
					m.lines[a].s.setData(m.lines[a].s._data)
					const c=m.newRoute.a.findIndex(b=>a==b)
					c>-1&&m.newRoute.a.splice(c,1)
				})
				m.restoreRoute()
			}
		}}}).previousElementSibling.previousElementSibling
		m.select1=el({a:'select',b:el({a:'div',b:el({a:'div',b:b,d:{style:'background:rgba(255,255,255,.5);border-radius:8px;box-shadow:0 0 6px 2px rgba(0,0,0,.1);padding:16px;'}}),c:'AREA'}).parentElement,d:{style:'padding:4px 8px;'},e:{change:a=>{ m.filterArea(a.target.value) }}})
		
		m.legends=el({a:'div',b:m.div,d:{style:'position:absolute;bottom:12px;left:16px;background:rgba(255,255,255,.4);border-radius:8px;box-shadow:0 0 6px 2px rgba(0,0,0,.1);padding:4px;'}})
		el({a:'div',b:m.legends,c:'Traffic Load',d:{style:'background:rgba(255,255,255,.6);border-radius:8px 8px 0 0;font-weight:bold;padding:6px 0 0 16px;'}});
		(()=>{
			const a=el({a:'div',b:m.legends,d:{style:'background:rgba(255,255,255,.6);border-radius:0 0 8px 8px;display:grid;grid-template-columns:repeat(8,48px);gap:4px 6px;padding:0 14px 6px 6px;'}})
			m.warna.slice(0,-1).forEach(b=>{el({a:'div',b:a,d:{style:`background:${b};border:1px solid rgba(0,0,0,.4);border-radius:4px;width:32px;height:16px;justify-self:center;`}})});
			['0-1%','1-10%','10-25%','25-40%','40-55%','55-70%','70-93%','93-100%'].forEach(b=>{el({a:'div',b:a,c:b,d:{style:'justify-self:center;'}})});
		})()
		
		el({a:'div', b:m.popup1, c:'Latency'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Capacity'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Traffic In'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Traffic Out'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Occupancy In'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Occupancy Out'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1, c:'Interface'})
		el({a:'div', b:m.popup1, c:':'})
		el({a:'div', b:m.popup1})
		
		el({a:'button', b:m.popup1, c:'On', e:{click:a=>{
			if (a.target.textContent=='Off') {
				a.target.textContent='On'
				m.lines[m.selected].e=false
				m.lines[m.selected].t.remove()
				m.lines[m.selected].s._data.features[0].properties.color=m.lines[m.selected].data.c1
				m.lines[m.selected].s._data.features[1].properties.color=m.lines[m.selected].data.c2
				m.lines[m.selected].s.setData(m.lines[m.selected].s._data)
				m.deleteNewRoute(m.selected)
			} else {
				a.target.textContent='Off'
				m.lines[m.selected].e=true
				m.lines[m.selected].t.addTo(m.map)
				m.lines[m.selected].s._data.features[0].properties.color='#000000'
				m.lines[m.selected].s._data.features[1].properties.color='#000000'
				m.lines[m.selected].s.setData(m.lines[m.selected].s._data)
				m.addNewRoute(m.selected)
			}
		}}});
		
		//el({a:'img',b:document.body,d:{style:'position:fixed;bottom:10px;right:8px;width:45px;height:55px;',src:'logo.svg'}});
		
		(()=>{
			el({a:'style',b:m.menu,c:'#menu1 > div:nth-child(2){display:none;}#menu1:hover > div:nth-child(2){display:block;}'})
			const a=el({a:'div',b:m.menu,d:{id:'menu1',style:'background:rgba(255,255,255,.5);border-radius:8px;box-shadow:0 0 6px 2px rgba(0,0,0,.1);padding:8px 16px'}})
			el({a:'div',b:a,c:'MENU',d:{style:'background:rgba(0,0,0,.8);border-radius:4px;color:rgba(255,255,255,.8);cursor:default;font-weight:bold;padding:4px 56px;text-align:center;'}})
			const b=el({a:'div',b:el({a:'div',b:a}),d:{style:'display:flex;flex-direction:column;padding:8px 0;'}})
			/*
			el({a:'div',b:b,c:'Filename'})
			el({a:'input',b:b,d:{type:'text',value:'network',size:10,style:'padding:4px;'}})
			el({a:'button',b:b,c:'Save Layout',d:{style:'padding:4px 16px;margin:4px 0 6px 0;'},e:{click:a=>{
				const nodes={}
				const routes={}
				Object.keys(m.nodes).forEach(a=>{nodes[a]={a:m.nodes[a].getElement().getAttribute('data-a'), ...m.nodes[a].getLngLat()}})
				Object.keys(m.lines).forEach(a=>{routes[a]={a:m.lines[a].a, b:m.lines[a].b, ...m.lines[a].p.getLngLat(), c:m.lines[a].data}})
				el({a:'a',b:document.body,d:{download:a.target.parentElement.children[1].value.trim()+'.json',href:URL.createObjectURL(new Blob([JSON.stringify({nodes:nodes,routes:routes,area:m.area})],{type:'application/json'}))},e:{click:a=>{document.body.removeChild(a.target)}}}).click()
			}}})
			el({a:'button',b:b,c:'Load Layout',d:{style:'padding:4px 16px;'},e:{click:m.loadData}})
			*/
			el({a:'button',b:b,c:'Find Path',d:{style:'padding:4px 8px;margin-top:6px;'},e:{click:a=>{
				if (document.getElementById('routes-Finding-Dlg')) return
				const b=el({a:'div', b:dlg({title:'Path Finding', top:80}), d:{style:'display:flex;gap:5px;'}})
				b.parentElement.style.cssText='background:rgba(255, 255, 255, 0.8);border-radius:8px;padding:8px;'
				b.parentElement.parentElement.id = 'routes-Finding-Dlg'
				el({a:'select',b:b,d:{style:'padding:3px 7px;'}})
				el({a:'select',b:b,d:{style:'padding:3px 7px;'}})
				el({a:'button',b:b,c:'find path',d:{style:'padding:3px 7px;'},e:{click:m.routeFinding}})
				if (m.select1.value=='ALL')
				Object.keys(m.nodes).sort().forEach(a=>{
					el({a:'option',b:b.children[0],c:a,d:{value:a}})
					el({a:'option',b:b.children[1],c:a,d:{value:a}})
				}); else
				Object.keys(m.nodes).filter(a=>m.area[m.select1.value].a.findIndex(b=>m.lines[b].a==a||m.lines[b].b==a)>-1).sort().forEach(a=>{
					el({a:'option',b:b.children[0],c:a,d:{value:a}})
					el({a:'option',b:b.children[1],c:a,d:{value:a}})
				})
				b.children[1].selectedIndex=1
				el({a:'div',b:b.parentElement,d:{style:'width:300px;height:200px;padding:0;border-radius:7px;margin-top:15px;min-width:80px;min-height:48px;resize:both;overflow:scroll;'}})
			}}})
			
			el({a:'button',b:b,c:'Alternative Path',d:{style:'padding:4px 8px;margin-top:6px;'},e:{click:m.showAlternativeRoute}})
			el({a:'button',b:b,c:'Recommendation by Alternative',d:{style:'padding:4px 8px;margin-top:6px;'},e:{click:m.rekomendasiAlternative}})
			el({a:'button',b:b,c:'Recommendation by Latency',d:{style:'padding:4px 8px;margin-top:6px;'},e:{click:m.recommendation}})
			
		})();
		/*
		el({a:'div',b:m.div,c:'Failover Simulation',d:{style:'position:absolute;top:0;left:0;right:0;padding:12px;background:rgba(0,0,0,.8);color:rgba(255,255,255,.8);cursor:default;font-size:16px;font-weight:bold;text-align:center;'}})
		el({a:'div',b:m.div,c:'X',d:{style:'position:absolute;top:0;right:0;padding:12px;background:rgba(0,0,0,.8);color:rgba(255,255,255,.8);cursor:default;font-size:16px;font-weight:bold;text-align:center;'},e:{click:a=>{
			document.body.removeChild(a.target.parentElement)
			if (document.getElementById('routes-Finding-Dlg')) document.body.removeChild(document.getElementById('routes-Finding-Dlg'))
			if (document.getElementById('alternative-Path-Dlg')) document.body.removeChild(document.getElementById('alternative-Path-Dlg'))
			if (document.getElementById('rekomendasi-alternative-Dlg')) document.body.removeChild(document.getElementById('rekomendasi-alternative-Dlg'))
		}}})
		el({a:'img',b:m.div,d:{style:'position:absolute;top:2px;left:8px;width:36px;height:44px;',src:'logo1.svg'}})
		*/
	},
	loadData: a=>{
		el({a:'input',d:{type:'file'},e:{change:a=>{
			const b=new FileReader()
			b.onload=()=>{
				m.clearData()
				m.select1.innerHTML=''
				m.initData(JSON.parse(b.result))
			}
			b.readAsText(a.target.files[0])
		}}}).click()
	},
	initData: a=>{
		Object.keys(a.nodes).forEach(b=>{ m.addNode({id:b, name:a.nodes[b].a, lat:a.nodes[b].lat, lng:a.nodes[b].lng}) })
		Object.keys(a.routes).forEach(b=>{
			if (['CKA~KBL', 'JT2~RKT'].indexOf(b)<0) {
				if (a.routes[b].lat) m.addLine({id:b, n1:a.routes[b].a, n2:a.routes[b].b, cp:{lat:a.routes[b].lat, lng:a.routes[b].lng}, data:a.routes[b].c||{}, api:a.routes[b].api});
				else m.addLine({id:b, n1:a.routes[b].a, n2:a.routes[b].b, data:a.routes[b].c||{}, api:a.routes[b].api})
				//m.getData(b)
			}
		})
		Object.keys(a.area).forEach(b=>{a.area[b].a=a.area[b].a.filter(b=>m.lines[b])})
		m.area=a.area
		Object.keys(m.area).forEach(b=>{ el({a:'option',b:m.select1,c:b,d:{value:b,style:'padding:6px;'}}) })
		m.select1.value!=''&&m.filterArea(m.select1.value)
		Object.keys(m.area).slice(11).forEach(b=>{
			el({a:'option',b:m.transport1,c:b,d:{value:b,style:'padding:6px;'}})
			m.transport2[b]=1
		})
	},
	init:()=>{
		m.div=el({a:'div',b:document.body,d:{style:'background:rgba(255,255,255,1);position:fixed;top:0;left:0;width:100vw;height:100vh;'}})
		m.map = new mapboxgl.Map({container:m.div, style: 'mapbox://styles/mapbox/light-v10', center: [117, -2.8], zoom: 4.2 })
		//m.map = new mapboxgl.Map({container:m.div, style:{version:8.0, sources:{}, layers: [{id:'background', type:'background', paint:{'background-color':'rgba(0,0,0,.2)'} }]}, center: [117, -2.8], zoom: 4.2 })
		m.map.on('load', ()=>{
			m.loader({a:'map.json',b:a=>{
				m.map.addSource('map', {type:'geojson', data:a})
				m.map.addLayer({id:'map', type:'line', source:'map', paint:{'line-color':'rgba(255,255,255,.6)', 'line-width':2}})
				m.map.fitBounds([94.50, -9.01, 141.50, 6.91])
			}})
			m.initUI()
			m.loader({a:'data.json', b:a=>{m.dataJson=a; m.initData(a)}})
		})
		document.body.removeChild(m.div)
		return m
	},
	showPopup: a=>{
		m.popup1.children[1].textContent = ' : ' + (a.data.lat || '-')
		m.popup1.children[3].textContent = ' : ' + (a.data.bw || '-') +' Gbit'
		m.popup1.children[5].textContent = ' : ' + ((a.rec || a.data.rec) || '-') +' Gbps'
		m.popup1.children[7].textContent = ' : ' + ((a.sent || a.data.sent) || '-') +' Gbps'
		m.popup1.children[9].textContent = ' : ' + ((a.oi || a.data.oin) || '-') +'%'
		m.popup1.children[11].textContent = ' : ' + ((a.oo || a.data.oout) || '-') +'%'
		m.popup1.children[13].textContent = ' : ' + a.api.iface
		m.popup1.children[15].textContent = a.e?'Off':'On'
	},
	getData1: a=>{
		a={a:a,b:m.lines[a]}
		if (a.b.c=='P-D7-MDO' && a.b.d=='T-D7-JAP')a.b.d='P-D7-JAP'
		if (a.b.c=='T-D7-JAP' && a.b.d=='P-D7-SON')a.b.c='P-D7-JAP'
		if (a.b.c=='P-D7-PTR' && a.b.d=='P-D7-JAP')a.b.d='T-D7-JAP'
		m.loader({a:`http://10.62.175.157/api-rpa/path_hst/${a.b.c}/${a.b.d}`,b:b=>{
			if (!b.data) return
			//a.b.data.time=b.data.timestamp
			a.b.data.lat=b.data.latency
			a.b.data.api={path:`http://10.62.175.157/api-rpa/path_hst/${a.b.c}/${a.b.d}`}
			if (b.data.raw.length<20) return
			const d=b.data.raw.split('\r\n')[2].split(' ')[0].trim()
			const c=(b,d,e)=>{
				if (!b.telemetry) {
					d&&m.loader({a:d,b:c})
					return
				}
				const f=(()=>{
					const d=b.telemetry.host.split('-').pop()
					if (d==a.b.a) return ['bytes_sent', 'bytes_received', 'occu_out', 'occu_in']
					return ['bytes_received', 'bytes_sent', 'occu_in', 'occu_out']
				})();
				a.b.data.c1=b.telemetry[f[2]+'_color']
				a.b.data.c2=b.telemetry[f[3]+'_color']
				a.b.s._data.features[0].properties.color=a.b.data.c1
				a.b.s._data.features[1].properties.color=a.b.data.c2
				a.b.s.setData(a.b.s._data)
				
				a.b.data.api.tele=e
				a.b.data.rec=parseFloat(b.telemetry[f[0]].toFixed(2))
				a.b.data.sent=parseFloat(b.telemetry[f[1]].toFixed(2))
				a.b.data.bw=b.telemetry.bw
				a.b.data.mbw=parseFloat(b.telemetry.bw)*.9||0
				a.b.data.oin=b.telemetry[f[2]]
				a.b.data.oout=b.telemetry[f[3]]
			}
			m.loader({
				a:`http://10.62.175.157/api-rpa/telemetri/${a.b.c}/${d}`,
				b:c,
				c:`http://10.62.175.157/api-rpa/telemetri/${a.b.d}/${d}`
			})
			//m.loader({a:`http://10.62.175.157/api-rpa/telemetri/${a.b.d}/${b.data.raw.split('\r\n')[2].split(' ')[0].trim()}`,b:c})
		}})
	},
	getData: a=>{
		a={a:a,b:m.lines[a]}
		//if (a.b.data.api) return
		//if (a.b.c=='P-D7-MDO' && a.b.d=='T-D7-JAP')a.b.d='P-D7-JAP'
		//if (a.b.c=='T-D7-JAP' && a.b.d=='P-D7-SON')a.b.c='P-D7-JAP'
		//if (a.b.c=='P-D7-PTR' && a.b.d=='P-D7-JAP')a.b.d='T-D7-JAP'
//console.log(`http://10.62.175.157/api-rpa/path_hst/${a.b.api.path}`)
//console.log(`http://10.62.175.157/api-rpa/telemetri_hst/${a.b.c}/${a.b.api.iface[0].replace('BE','Bundle-Ether')}`)
//console.log(`http://10.62.175.157/api-rpa/telemetri_hst/${a.b.d}/${a.b.api.iface[0].replace('BE','Bundle-Ether')}`)
		m.loader({a:`http://10.62.175.157/api-rpa/path_hst/${a.b.api.path}`,b:b=>{
			if (!b.data) {
				m.invalid[a.b.api.path]={}
				return
			}
			a.b.data.lat=b.data.latency
			if (b.data.capacity) {
				a.b.data.bw=parseFloat(b.data.capacity/1000000000)
				a.b.data.mbw=a.b.data.bw*.9
				
				a.b.data.rec=parseFloat((b.data.traffic_in/1000000000).toFixed(2))
//console.log('a.b.data.rec = '+a.b.data.rec)
//if (a.b.data.rec==0)
//console.log(b.data.raw)
				a.b.data.sent=parseFloat((b.data.traffic_out/1000000000).toFixed(2))
				a.b.data.oin=(100*a.b.data.rec/a.b.data.bw).toFixed(2)
				a.b.data.oout=(100*a.b.data.sent/a.b.data.bw).toFixed(2)
				
				a.b.data.c1=m.iwarna(a.b.data.oin)
				a.b.data.c2=m.iwarna(a.b.data.oout)
				
				a.b.s._data.features[0].properties.color=m.iwarna(a.b.data.oin)
				a.b.s._data.features[1].properties.color=m.iwarna(a.b.data.oout)
				a.b.s.setData(a.b.s._data)
				
				m.dataJson.routes[a.a] && (m.dataJson.routes[a.a].c = a.b.data)
			} else {
				m.invalid[a.b.api.path]={}
				const c=(b,d,e)=>{
					if (!b.telemetry) {
						d&&m.loader({a:d,b:c})
						return
					}
					const f=(()=>{
						const d=b.telemetry.host.split('-').pop()
						if (d==a.b.a) return ['bytes_sent', 'bytes_received', 'occu_out', 'occu_in']
						return ['bytes_received', 'bytes_sent', 'occu_in', 'occu_out']
					})();
					//console.log(f)
					a.b.data.c1=b.telemetry[f[2]+'_color']
					a.b.data.c2=b.telemetry[f[3]+'_color']
					a.b.s._data.features[0].properties.color=a.b.data.c1
					a.b.s._data.features[1].properties.color=a.b.data.c2
					a.b.s.setData(a.b.s._data)
					
					a.b.data.rec=parseFloat(b.telemetry[f[0]].toFixed(2))
//if (a.b.data.rec==0)
//console.log(b.telemetry.raw)
					a.b.data.sent=parseFloat(b.telemetry[f[1]].toFixed(2))
					a.b.data.bw=parseFloat(b.telemetry.bw)
					a.b.data.mbw=a.b.data.bw*.9
					a.b.data.oin=b.telemetry[f[2]]
					a.b.data.oout=b.telemetry[f[3]]
					
					m.dataJson.routes[a.a] && (m.dataJson.routes[a.a].c = a.b.data)
				}
				m.loader({
					a:`http://10.62.175.157/api-rpa/telemetri_hst/${a.b.c}/${a.b.api.iface[0].replace('BE','Bundle-Ether')}`,
					b:c,
					c:`http://10.62.175.157/api-rpa/telemetri_hst/${a.b.d}/${a.b.api.iface[0].replace('BE','Bundle-Ether')}`
				})
			}
		}})
	},
	routeSelected: null,
	filterRoute: a=>{
		a.stopPropagation()
		if (m.routeSelected==a.target) {
			m.routeSelected.style.background = 'rgba(255,255,255,.8)'
			m.routeSelected.parentElement.children[1].innerHTML=''
			m.routeSelected.parentElement.children[1].style.padding='0';
			m.unFilterRoute(0)
			m.routeSelected=null
			return
		} else if (m.routeSelected) {
			m.routeSelected.style.background = 'rgba(255,255,255,.8)'
			m.routeSelected.parentElement.children[1].innerHTML=''
			m.routeSelected.parentElement.children[1].style.padding='0';
		}
		m.routeSelected = a.target
		m.routeSelected.style.background = 'rgba(87,136,250,.8)'
		if (m.select1.value=='ALL') {
			Object.keys(m.nodes).forEach(a=>{m.nodes[a].remove()})
			Object.keys(m.lines).forEach(a=>{m.map.setLayoutProperty(a, 'visibility', 'none');m.lines[a].p.remove();m.lines[a].t.remove()})
		} else {
			m.area[m.select1.value].a.forEach(a=>{
				m.nodes[m.lines[a].a].remove()
				m.nodes[m.lines[a].b].remove()
				m.map.setLayoutProperty(a, 'visibility', 'none')
				m.lines[a].p.remove()
				m.lines[a].t.remove()
			})
		}
		JSON.parse(a.target.textContent.split('(')[0].trim()).forEach(a=>{m.nodes[a].addTo(m.map)})
		m.routeSelected.parentElement.children[1].style.padding='5px'
		const c=JSON.parse(a.target.getAttribute('data-b'))
		if (c.l) {
			const b=el({a:'div',b:m.routeSelected.parentElement.children[1],d:{style:'display:grid;grid-template-columns:auto auto;gap:3px;background:rgba(255,255,255,.3);padding:3px;border:1px solid rgba(0,0,0,.1);border-radius:5px;'}})
			el({a:'div',b:el({a:'div',b:b,c:'sent'}).parentElement,c:' : '+c.s1+'/'+c.s2})
			el({a:'div',b:el({a:'div',b:b,c:'rec'}).parentElement,c:' : '+c.r1+'/'+c.r2})
		}
		JSON.parse(a.target.getAttribute('data-a')).forEach(a=>{
			m.map.setLayoutProperty(a.e, 'visibility', 'visible')
			const b=el({a:'div',b:m.routeSelected.parentElement.children[1],d:{style:'display:grid;grid-template-columns:auto auto;gap:3px;background:rgba(255,255,255,.3);padding:3px;border:1px solid rgba(0,0,0,.1);border-radius:5px;'}})
			el({a:'div',b:el({a:'div',b:b,c:a.d}).parentElement})
			el({a:'div',b:el({a:'div',b:b,c:'latency'}).parentElement,c:' : '+JSON.stringify(a.c)})
			el({a:'div',b:el({a:'div',b:b,c:'sum latency'}).parentElement,c:' : '+JSON.stringify(a.b)})
			if (c.l) {
				el({a:'div',b:el({a:'div',b:b,c:'sent'}).parentElement,c:' : '+a.s+'/'+c.s2})
				el({a:'div',b:el({a:'div',b:b,c:'rec'}).parentElement,c:' : '+a.r+'/'+c.r2})
			}
		})
	},
	unFilterRoute: a=>{
		if (m.select1.value=='ALL') {
			Object.keys(m.lines).forEach(a=>{
				m.nodes[m.lines[a].a].addTo(m.map)
				m.nodes[m.lines[a].b].addTo(m.map)
				m.map.setLayoutProperty(a, 'visibility', 'visible')
				m.lines[a].e&&m.lines[a].t.addTo(m.map)
			})
			return
		}
		m.area[m.select1.value].a.forEach(a=>{
			m.nodes[m.lines[a].a].addTo(m.map)
			m.nodes[m.lines[a].b].addTo(m.map)
			m.map.setLayoutProperty(a, 'visibility', 'visible')
			m.lines[a].e&&m.lines[a].t.addTo(m.map)
		})
	},
	tTraffic: (a,d)=>{
		const c=a==d?{rec:0, sent:0}:{rec:m.lines[a].data.rec, sent:m.lines[a].data.sent}
		m.newRoute[a]&&Object.keys(m.newRoute[a]).forEach(b=>{
			if (b!=d) {
				if (m.lines[a].a==m.newRoute[a][b].a) {
					c.rec+=m.newRoute[a][b].rec
					c.sent+=m.newRoute[a][b].sent
				} else {
					c.rec+=m.newRoute[a][b].sent
					c.sent+=m.newRoute[a][b].rec
				}
			}
		})
		return c
	},
	routeFinding: a=>{
		const b=a.target.previousElementSibling.previousElementSibling.value	//from
		const c=a.target.previousElementSibling.value;							//to
		if (b==c) return
		const e=Object.keys(m.lines).find(a=>(m.lines[a].a==b&&m.lines[a].b==c)||(m.lines[a].a==c&&m.lines[a].b==b))
		
		const nodes={}
		const d=m.select1.value=='ALL'?Object.keys(m.lines):m.area[m.select1.value].a
		Object.keys(m.nodes).forEach(a=>{
			nodes[a]={lat:[,,,,,].fill(99999)}
			d.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].data.mbw&&m.lines[b].a==a)).forEach(b=>{
				const c=m.tTraffic(b,e)
				nodes[a][m.lines[b].b]={a:b, b:b, l:m.lines[b].data.lat.split('/').map(a=>parseInt(a)), r:m.lines[b].data.mbw-c.rec, s:m.lines[b].data.mbw-c.sent}
			})
			d.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].data.mbw&&m.lines[b].b==a)).forEach(b=>{
				const c=m.tTraffic(b,e)
				nodes[a][m.lines[b].a]={a:m.lines[b].b+'~'+m.lines[b].a, b:b, l:m.lines[b].data.lat.split('/').map(a=>parseInt(a)), r:m.lines[b].data.mbw-c.sent, s:m.lines[b].data.mbw-c.rec}
			})
		})
		
		const finish=[]
		const walk=n=>{
			if (n.a.length<1) return
			const o=[]
			n.a.forEach(a=>{
				Object.keys(nodes[a.a[0].a]).filter(b=>b!='lat'&&!a.a.find(a=>a.a==b)).forEach(b=>{
					const c=nodes[a.a[0].a][b].l.map((b,c)=>b+a.a[0].b[c])
					const d=e?{r:Math.min(a.a[0].r,nodes[a.a[0].a][b].r), s:Math.min(a.a[0].s,nodes[a.a[0].a][b].s)}:{}
					if (c[1]<=nodes[b].lat[4]) {
						nodes[b].lat.push(c[1])
						nodes[b].lat.sort().pop()
						if (c[1]<=n.lat[4]) {
							if (b==n.dst) {
								n.lat.push(c[1])
								n.lat.sort().pop()
								const f=e?{r1:d.r, s1:d.s, r2:n.rec, s2:n.sent}:{}
								finish.push({a:[{a:b, b:c, c:nodes[a.a[0].a][b].l, d:nodes[a.a[0].a][b].a, e:nodes[a.a[0].a][b].b, ...d},...a.a].reverse(), l:c[1], ...f})
							} else   o.push({a:[{a:b, b:c, c:nodes[a.a[0].a][b].l, d:nodes[a.a[0].a][b].a, e:nodes[a.a[0].a][b].b, ...d},...a.a]})
						}
					}
				})
			})
			walk({a:o, lat:n.lat, dst:n.dst, rec:n.rec, sent:n.sent})
		}
		walk({a:[{a:[{a:b, b:[0,0,0], c:[0,0,0], d:'', r:e?m.lines[e].data.rec:'', s:e?m.lines[e].data.sent:''}]}], lat:[,,,,,].fill(99999), dst:c, rec:e?m.lines[e].data.rec:'', sent:e?m.lines[e].data.sent:''});
		
		(()=>{
			const b=a.target.parentElement.parentElement.children[1]
			b.innerHTML = ''
			el({a:'div',b:b,d:{style:'background:rgba(0,0,0,.3);border-radius:7px;padding:7px;display:flex;flex-direction:column;gap:5px;font-size:11px;'}})
			finish.length>0&&finish.sort((a, b)=>a.l-b.l).forEach(a=>{
				el({a:'div',b:el({a:'div',b:el({a:'div',b:b.children[0]}),c:JSON.stringify(a.a.map(a=>a.a))+' ('+a.l+')',d:{'data-a':JSON.stringify(a.a.slice(1)),'data-b':JSON.stringify(e?{l:a.l, r1:a.r1, s1:a.s1, r2:a.r2, s2:a.s2}:{}),style:'background:rgba(255,255,255,.8);padding:5px;border-radius:5px;'},e:{click:m.filterRoute}}).parentElement,d:{style:'display:flex;flex-direction:column;gap:5px;background:rgba(255,255,255,.3);border-radius:5px;margin:0 5px;'}})
			})
		})()
	},
	calcColor: a=>{
		if (!m.lines[a]) return
		const c={rec:m.lines[a].data.rec, sent:m.lines[a].data.sent}
		Object.keys(m.newRoute[a]).forEach(b=>{
			if (m.lines[a].a==m.newRoute[a][b].a) {
				c.rec+=m.newRoute[a][b].rec
				c.sent+=m.newRoute[a][b].sent
			} else {
				c.rec+=m.newRoute[a][b].sent
				c.sent+=m.newRoute[a][b].rec
			}
		})
		m.lines[a].rec=c.rec.toFixed(2)
		m.lines[a].sent=c.sent.toFixed(2)
		m.lines[a].oi=(100*c.rec/m.lines[a].data.bw).toFixed(2)
		m.lines[a].oo=(100*c.sent/m.lines[a].data.bw).toFixed(2)
		m.lines[a].data.c1=m.iwarna(m.lines[a].oi)
		m.lines[a].data.c2=m.iwarna(m.lines[a].oo)
		m.lines[a].s._data.features[0].properties.color=m.lines[a].data.c1
		m.lines[a].s._data.features[1].properties.color=m.lines[a].data.c2
		m.lines[a].s.setData(m.lines[a].s._data)
	},
	newRoute: {a:[]},
	findNewRoute: a=>{
		if (!m.lines[a].data.rec&&!m.lines[a].data.sent) return
		
		const nodes={}
		const b=m.select1.value=='ALL'?Object.keys(m.lines):m.area[m.select1.value].a
		Object.keys(m.nodes).forEach(a=>{
			nodes[a]={lat:[,,,,,].fill(99999)}
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].data.mbw&&m.lines[b].a==a)).forEach(b=>{
				nodes[a][m.lines[b].b]={a:m.lines[b].a, b:b, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].data.mbw&&m.lines[b].b==a)).forEach(b=>{
				nodes[a][m.lines[b].a]={a:m.lines[b].a, b:b, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
		})
		
		const finish=[]
		const walk=n=>{
			if (n.a.length<1) return
			const o=[]
			n.a.forEach(a=>{
				Object.keys(nodes[a.a[0].a]).filter(b=>b!='lat'&&!a.a.find(a=>a.a==b)).forEach(b=>{
					const c=nodes[a.a[0].a][b].l+a.l
					if (c<=nodes[b].lat[4]) {
						nodes[b].lat.push(c)
						nodes[b].lat.sort().pop()
						if (c<=n.lat[4]) {
							if (b==n.dst) {
								n.lat.push(c)
								n.lat.sort().pop()
								finish.push({a:[{a:b, b:a.a[0].a, c:nodes[a.a[0].a][b].b},...a.a.slice(0,-1)].reverse(), l:c})
							} else   o.push({a:[{a:b, b:a.a[0].a, c:nodes[a.a[0].a][b].b},...a.a], l:c})
						}
					}
				})
			})
			walk({a:o, lat:n.lat, dst:n.dst})
		}
		walk({a:[{a:[{a:m.lines[a].a, b:'', c:''}], l:0}], lat:[,,,,,].fill(99999), dst:m.lines[a].b});
		
		if (finish.length>0) {
			finish.sort((a, b)=>a.l-b.l)
			const b={r:m.lines[a].data.rec||0, s:m.lines[a].data.sent||0}
			while (finish.length>0&&(b.r>0||b.s>0)) {
				const c={r:b.r, s:b.s}
				finish[0].a.forEach(b=>{
					const d=m.tTraffic(b.c)
					d.rec = m.lines[b.c].data.mbw-d.rec
					d.sent = m.lines[b.c].data.mbw-d.sent
					if (m.lines[b.c].a==b.b) {
						c.r = Math.min(c.r, d.rec)
						c.s = Math.min(c.s, d.sent)
					} else {
						c.r = Math.min(c.r, d.sent)
						c.s = Math.min(c.s, d.rec)
					}
				})
				c.r<0&&(c.r=0)
				c.s<0&&(c.s=0)
				if (c.r>0 || c.s>0) {
					if (finish[0].a.length > 0) m.newRoute.b[a].unshift({rec:c.r.toFixed(2), sent:c.s.toFixed(2), lat:finish[0].l, route:[]})
					finish[0].a.forEach(b=>{
						if (!m.newRoute[b.c]) m.newRoute[b.c]={}
						if (m.newRoute[b.c][a]) {
							m.newRoute[b.c][a].rec += c.r
							m.newRoute[b.c][a].sent += c.s
						} else m.newRoute[b.c][a]={a:b.b, rec:c.r, sent:c.s}
						m.newRoute.b[a][0].route.push({a:b.c, r:c.r, s:c.s})
					})
					b.r-=c.r
					b.s-=c.s
				}
				finish.shift()
			}
			Object.keys(m.newRoute).filter(a=>a!='a'||a!='b').forEach(a=>{m.calcColor(a)})
		}
	},
	addNewRoute: a=>{
		if (m.newRoute.a.find(b=>a==b)) return
		m.newRoute.a.push(a)
		m.restoreRoute()
	},
	deleteNewRoute: a=>{
		a=m.newRoute.a.findIndex(b=>a==b)
		a>-1&&m.newRoute.a.splice(a,1)
		m.restoreRoute()
	},
	restoreRoute: ()=>{
		m.newRoute.b && (delete m.newRoute.b)
		Object.keys(m.newRoute).filter(a=>a!='a').forEach(a=>{
			delete m.newRoute[a]
			if (!m.lines[a]) return
			m.lines[a].rec=m.lines[a].data.rec
			m.lines[a].sent=m.lines[a].data.sent
			m.lines[a].oi=m.lines[a].data.oin
			m.lines[a].oo=m.lines[a].data.oout
			m.lines[a].data.c1=m.iwarna(m.lines[a].oi)
			m.lines[a].data.c2=m.iwarna(m.lines[a].oo)
			if (!m.lines[a].e) {
				m.lines[a].s._data.features[0].properties.color=m.lines[a].data.c1
				m.lines[a].s._data.features[1].properties.color=m.lines[a].data.c2
				m.lines[a].s.setData(m.lines[a].s._data)
			}
		})
		m.newRoute.b = {}
		Object.keys(m.lines).filter(b=>(m.lines[b].e)).forEach(a=>{m.newRoute.b[a]=[]})
		m.newRoute.a.forEach(a=>{m.findNewRoute(a)})
		//console.log(m.newRoute)
	},
	showAlternativeRoute: a=>{
		if (document.getElementById('alternative-Path-Dlg')) return
		const b=el({a:'div', b:dlg({title:'Alternative Path', left:48, top:64}), d:{style:'background:rgba(0,0,0,.1); width:80vw; height:70vh; overflow:scroll; resize:both; padding:3vmin; display:flex; flex-direction:column; gap:5vmin; border-radius:7px; font-size:2vmin;'}})
		b.parentElement.style.cssText='background:rgba(255, 255, 255, 0.8);border-radius:8px;padding:8px;'
		//el({a:'pre', b:b}).innerHTML = JSON.stringify(m.newRoute.b, null, 2)
		const c=el({a:'div', b:b, d:{style:'display:grid; grid-template-columns:min-content 1fr min-content; gap:1vmin;'}})
		
		Object.keys(m.lines).filter(b=>(m.lines[b].e)).forEach(a=>{
			const d=el({a:'div', b:c, d:{style:'display:grid; grid-template-columns:min-content min-content 1fr; gap:3px; align-content: start; padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px;'}})
			el({a:'div', b:d, c:a, d:{style:'grid-column: 1/4; margin-top:7px; text-align:center; font-weight:bold;'}})
			el({a:'div', b:d, c:'Latency', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:d, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:d, c:m.lines[a].data.lat, d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:d, c:'Traffic In', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:d, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:d, c:m.lines[a].data.rec || '-', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:d, c:'Traffic Out', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:d, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:d, c:m.lines[a].data.sent || '-', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			
			const e=el({a:'div', b:c, d:{style:'display:grid; grid-template-columns:1fr min-content min-content min-content; gap:3px; padding:3px 7px; background:rgba(255, 255, 255, 0.5); border-radius:7px;'}})
			el({a:'div', b:e, c:'Alternative Path', d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			el({a:'div', b:e, c:'Latency', d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			el({a:'div', b:e, c:'Traffic In', d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
			el({a:'div', b:e, c:'Traffic Out', d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
			
			var tin = 0
			var tout = 0
			m.newRoute.b[a].sort((a,b)=>a.lat-b.lat).forEach(b=>{
				el({a:'div', b:el({a:'div', b:e}), c:JSON.stringify(b.route.map(a=>a.a)), d:{'data-a':JSON.stringify(b.route), style:'font-weight:bold; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px; cursor:default;'}, e:{click:a=>{
					if (a.target.parentElement.children.length>1) {
						a.target.parentElement.removeChild(a.target.parentElement.children[1])
					} else {
						const b = el({a:'div', b:a.target.parentElement, d:{style:'display:grid; grid-template-columns:1fr min-content min-content min-content min-content min-content; gap:3px; padding:3px 7px; margin-top:3px; background:rgba(255, 255, 255, 0.5); border-radius:7px;'}})
						el({a:'div', b:b, c:'Path', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
						el({a:'div', b:b, c:'Latency', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
						el({a:'div', b:b, c:'Traffic In', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
						el({a:'div', b:b, c:'Traffic Out', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
						el({a:'div', b:b, c:'OCC In', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
						el({a:'div', b:b, c:'OCC Out', d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; white-space: nowrap;'}})
						JSON.parse(a.target.getAttribute('data-a')).forEach(a=>{
							el({a:'div', b:b, c:a.a, d:{style:'font-weight:bold; font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							el({a:'div', b:b, c:m.lines[a.a].data.lat, d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							el({a:'div', b:b, c:((m.lines[a.a].rec || m.lines[a.a].data.rec) || '-') +' Gbps', d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							el({a:'div', b:b, c:((m.lines[a.a].sent || m.lines[a.a].data.sent) || '-') +' Gbps', d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							//el({a:'div', b:b, c:a.r.toFixed(2), d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							//el({a:'div', b:b, c:a.s.toFixed(2), d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							
							if (((m.lines[a.a].oi || m.lines[a.a].data.oin) || 0) > 89)
								el({a:'div', b:b, c:((m.lines[a.a].oi || m.lines[a.a].data.oin) || '-') +'%', d:{style:'color:red; font-size:1.4vmin; font-weight:bold; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}});
							else
								el({a:'div', b:b, c:((m.lines[a.a].oi || m.lines[a.a].data.oin) || '-') +'%', d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							
							if (((m.lines[a.a].oo || m.lines[a.a].data.oout) || 0) > 89)
								el({a:'div', b:b, c:((m.lines[a.a].oo || m.lines[a.a].data.oout) || '-') +'%', d:{style:'color:red; font-size:1.4vmin; font-weight:bold; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}});
							else
								el({a:'div', b:b, c:((m.lines[a.a].oo || m.lines[a.a].data.oout) || '-') +'%', d:{style:'font-size:1.4vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px;'}})
							
						})
					}
				}}})
				el({a:'div', b:e, c:b.lat, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
				el({a:'div', b:e, c:b.rec, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
				el({a:'div', b:e, c:b.sent, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
				tin+=parseFloat(b.rec)||0
				tout+=parseFloat(b.sent)||0
			})
			el({a:'div', b:e, c:'Traffic Total', d:{style:'font-weight:bold; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			el({a:'div', b:e, d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px;'}})
			el({a:'div', b:e, c:tin.toFixed(2), d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			el({a:'div', b:e, c:tout.toFixed(2), d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			
			el({a:'div', b:e, c:'Traffic Loss', d:{style:'font-weight:bold; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			el({a:'div', b:e, d:{style:'background:rgba(255, 255, 255, 0.7); border-radius:7px;'}})
			const val1 = el({a:'div', b:e, c:`${Math.max((parseFloat(m.lines[a].data.rec)||0)-tin,0).toFixed(2)}`, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			const val2 = el({a:'div', b:e, c:`${Math.max((parseFloat(m.lines[a].data.sent)||0)-tout,0).toFixed(2)}`, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:7px; padding:3px 7px;'}})
			
			if (Math.round(Math.max((parseFloat(m.lines[a].data.rec)||0)-tin,0)) == 0 && Math.round(Math.max((parseFloat(m.lines[a].data.sent)||0)-tout,0)) == 0)
				el({a:'div', b:c, c:'Complete', d:{style:'padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px; display:flex; align-items:center; justify-content:center;'}});
			else if (tin != 0 || tout != 0) {
				el({a:'div', b:c, c:'Insufficient bandwidth', d:{style:'padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px; display:flex; align-items:center; justify-content:center;'}});
				if (parseFloat(val1.textContent) > 0) {
					val1.style.color = 'red'
					val1.style.fontWeight = 'bold'
				}
				if (parseFloat(val2.textContent) > 0) {
					val2.style.color = 'red'
					val2.style.fontWeight = 'bold'
				}
			} else if (m.checkPath(a)) {
				el({a:'div', b:c, c:'Insufficient bandwidth', d:{style:'padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px; display:flex; align-items:center; justify-content:center;'}});
				if (parseFloat(val1.textContent) > 0) {
					val1.style.color = 'red'
					val1.style.fontWeight = 'bold'
				}
				if (parseFloat(val2.textContent) > 0) {
					val2.style.color = 'red'
					val2.style.fontWeight = 'bold'
				}
			} else {
				el({a:'div', b:c, c:'No Path', d:{style:'padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px; display:flex; align-items:center; justify-content:center;'}});
				if (parseFloat(val1.textContent) > 0) {
					val1.style.color = 'red'
					val1.style.fontWeight = 'bold'
				}
				if (parseFloat(val2.textContent) > 0) {
					val2.style.color = 'red'
					val2.style.fontWeight = 'bold'
				}
			}
			console.log(val1.textContent)
		})
		b.parentElement.parentElement.id = 'alternative-Path-Dlg'
	},
	
	rekomendasiAlternative: ()=>{
		
		if (document.getElementById('rekomendasi-alternative-Dlg')) return
		const a = (a=>{
			if (a) {
				a.children[2].children[0].innerHTML=''
				return el({a:'div', b:a.children[2].children[0], d:{style:'display:grid; grid-template-columns:min-content 1fr min-content; gap:1vmin;'}})
			} else {
				a = el({a:'div', b:dlg({title:'Alternative Recommendation', left:48, top:64}), d:{style:'background:rgba(0,0,0,.1); width:80vw; height:70vh; overflow:scroll; resize:both; padding:1.5vmin; display:flex; flex-direction:column; gap:5vmin; border-radius:7px; font-size:2vmin;'}})
				a.parentElement.style.cssText='background:rgba(255, 255, 255, 0.8);border-radius:8px;padding:8px;'
				a.parentElement.parentElement.id = 'rekomendasi-alternative-Dlg'
				return el({a:'div', b:a, d:{style:'display:grid; grid-template-columns:min-content 1fr min-content; gap:1vmin;'}})
			}
		})(document.getElementById('rekomendasi-alternative-Dlg'))
		
		const st2={style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:3px; cursor:default; padding:3px 7px; text-align:center;'}
		const st1={style:st2.style + ' font-weight:bold; margin-bottom:0.3vmin;'}
		
		const showDetail=a=>{
			a.stopPropagation()
			const b = Math.floor([...a.target.parentElement.children].indexOf(a.target)/10)*10
			const c = a.target.parentElement.children[b+9]
			if (c.children.length < 1) {
				c.style.padding = '3px 7px'
				c.style.marginBottom = '1vmin'
				const st2={style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:3px; padding:3px 7px; text-align:center;'}
				const st1={style:st2.style + ' font-weight:bold;'}
				el({a:'div', b:c})
				el({a:'div', b:c, c:'Path', d:st1})
				el({a:'div', b:c, c:'Traffic In', d:st1})
				el({a:'div', b:c, c:'Traffic Out', d:st1})
				el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
				JSON.parse(a.target.parentElement.children[b].getAttribute('data-a')).forEach(d=>{
					el({a:'div', b:c})
					el({a:'div', b:c, c:d.a, d:st2})
					el({a:'div', b:c, c:d.rec +' Gbps', d:st2})
					el({a:'div', b:c, c:d.sent +' Gbps', d:st2})
					/*
					if (d[e].b) {
						el({a:'div', b:c, c:(m.lines[e].data.rec || '0') +' Gbps', d:st2})
						el({a:'div', b:c, c:(m.lines[e].data.sent || '0') +' Gbps', d:st2})
					} else {
						el({a:'div', b:c, c:(m.lines[e].data.sent || '0') +' Gbps', d:st2})
						el({a:'div', b:c, c:(m.lines[e].data.rec || '0') +' Gbps', d:st2})
					}
					*/
					el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
				})
				
				const d = JSON.parse(a.target.parentElement.children[b].getAttribute('data-b'))
				el({a:'div', b:c})
				el({a:'div', b:c, c:'Total', d:st1})
				el({a:'div', b:c, c:d.r.toFixed(2) +' Gbps', d:st1})
				el({a:'div', b:c, c:d.s.toFixed(2) +' Gbps', d:st1})
				el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
			} else {
				c.innerHTML = ''
				c.style.padding = '0'
				c.style.marginBottom = '0.15vmin'
			}
			
		}
		
		const temp1 = []
		Object.keys(m.newRoute.b).filter(a=>m.newRoute.b[a].length>0).forEach(b=>{
			const c = m.lines[b].data
			const n = m.newRoute.b[b].sort((a,b)=> a.lat - b.lat)[0]
			
			if (parseFloat(n.rec) < c.rec || parseFloat(n.sent) < c.sent) {
				temp1.push({
					a: b,
					//b: {lat: c.lat, rec: c.rec,  sent: c.sent, bw:c.bw, mbw:c.mbw },
					lat: n.lat,
					route : n.route.map(a=>({
						a: a.a,
						lat: m.lines[a.a].data.lat,
						rec: m.lines[a.a].data.rec,
						sent: m.lines[a.a].data.sent,
						oin: m.lines[a.a].data.oin,
						oout: m.lines[a.a].data.oout,
						bw: m.lines[a.a].data.bw,
						mbw: m.lines[a.a].data.mbw,
						r:[{
							a: a.a,
							rec: m.lines[a.a].data.rec,
							sent: m.lines[a.a].data.sent,
						},{
							a: b,
							lat: c.lat,
							rec: c.rec,
							sent: c.sent,
						}]
					}))
				})
			}
		})
		
		temp1.forEach((a,b)=>{
			const c = temp1.filter(b=>b.a!=a.a)
			
			a.route.forEach((a,d)=>{
				c.forEach(e=>{
					if (e.route.find(f=>f.a==a.a)) {
						temp1[b].route[d].r.push({a:e.a, rec:m.lines[e.a].data.rec, sent:m.lines[e.a].data.sent})
					}
				})
				temp1[b].route[d].trec  = temp1[b].route[d].r.reduce((f,g)=>f+g.rec, 0)
				temp1[b].route[d].tsent = temp1[b].route[d].r.reduce((f,g)=>f+g.sent, 0)
			})
		})
		//console.log(temp1)
		
		temp1.forEach(b=>{
			const c=el({a:'div', b:a, d:{style:'display:grid; grid-template-columns:min-content min-content 1fr; gap:3px; align-content: start; padding:3px 7px; background:rgba(255, 255, 255, 0.7); border-radius:7px;'}})
			el({a:'div', b:c, c:b.a, d:{style:'grid-column: 1/4; margin-top:7px; text-align:center; font-weight:bold;'}})
			el({a:'div', b:c, c:'Latency', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:c, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:c, c:b.route[0].r[1].lat, d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:c, c:'Traffic In', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:c, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:c, c:b.route[0].r[1].rec, d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:c, c:'Traffic Out', d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			el({a:'div', b:c, c:':', d:{style:'font-size:1.5vmin;'}})
			el({a:'div', b:c, c:b.route[0].r[1].sent, d:{style:'font-size:1.5vmin; white-space: nowrap;'}})
			
			const d = el({a:'div', b:a, d:{style:'background:rgba(255, 255, 255, 0.3); border-radius:7px; padding:3px 7px; display:grid; grid-template-columns:repeat(9, auto); gap:0 .3vmin;'}})
			el({a:'div', b:a, c:b.lat, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; text-align:center;'}})
			
			el({a:'div', b:d, c:JSON.stringify(b.route.map(a=>a.a)), d:{style:'font-weight:bold; font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; margin-bottom:0.3vmin; padding:3px 7px; text-align:center; grid-column:1/10;'}})
			el({a:'div', b:d, c:'Path', d:st1})
			el({a:'div', b:d, c:'Latency', d:st1})
			el({a:'div', b:d, c:'Traffic In', d:st1})
			el({a:'div', b:d, c:'Traffic Out', d:st1})
			el({a:'div', b:d, c:'OCC In', d:st1})
			el({a:'div', b:d, c:'OCC Out', d:st1})
			el({a:'div', b:d, c:'Capacity', d:st1})
			el({a:'div', b:d, c:'Add Capacity', d:st1})
			el({a:'div', b:d, c:'Total Capacity', d:st1})
			
			b.route.forEach(a=>{
				const f = Math.ceil(Math.max(a.trec, a.tsent)*10/9)
				const g = Math.max(Math.ceil(f-(parseFloat(a.bw)||0)), 0)
				el({a:'div', b:d, c:a.a, d:{style:st2.style, 'data-a':JSON.stringify(a.r.slice(1)), 'data-b':JSON.stringify({r:a.trec, s:a.tsent})}, e:{click:showDetail} })
				el({a:'div', b:d, c:a.lat, d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:a.rec +' Gbps', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:a.sent +' Gbps', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:a.oin +' %', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:a.oout +' %', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:a.bw +' Gbit', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:g + ' Gbit', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, c:Math.max(f, g, parseFloat(a.bw))+' Gbit', d:st2, e:{click:showDetail} })
				el({a:'div', b:d, d:{style:'background:rgba(0,0,0,0.1); border-radius:7px; margin:0.15vmin; grid-column:1/10; display:grid; grid-template-columns:repeat(9, auto); gap:0.3vmin;'}})
			})
		})
		
	},
	
	rekomendasi: a=>{
		const nodes={}
		const b=m.select1.value=='ALL'?Object.keys(m.lines):m.area[m.select1.value].a
		Object.keys(m.nodes).forEach(a=>{
			nodes[a]={lat:99999}
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].a==a)).forEach(b=>{
				nodes[a][m.lines[b].b]={a:m.lines[b].a, b:b, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].b==a)).forEach(b=>{
				nodes[a][m.lines[b].a]={a:m.lines[b].a, b:b, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
		})
		
		const finish=[]
		const walk=n=>{
			if (n.a.length<1) return
			const o=[]
			n.a.forEach(a=>{
				Object.keys(nodes[a.a[0].a]).filter(b=>b!='lat'&&!a.a.find(a=>a.a==b)).forEach(b=>{
					const c=nodes[a.a[0].a][b].l+a.l
					if (c<=nodes[b].lat) {
						nodes[b].lat = c
						if (c<=n.lat) {
							if (b==n.dst) {
								n.lat = c
								finish.push({a:[{a:b, b:a.a[0].a, c:nodes[a.a[0].a][b].b},...a.a.slice(0,-1)].reverse(), l:c})
							} else   o.push({a:[{a:b, b:a.a[0].a, c:nodes[a.a[0].a][b].b},...a.a], l:c})
						}
					}
				})
			})
			walk({a:o, lat:n.lat, dst:n.dst})
		}
		walk({a:[{a:[{a:m.lines[a].a, b:'', c:''}], l:0}], lat:99999, dst:m.lines[a].b});
		
		if (finish.length>0) {
			finish.sort((a, b)=>a.l-b.l)
			return finish.filter(a=>a.l<=finish[0].l).map(b=>({b:a,...b}))
		} else return [{b:a}]
	},
	recommendation: ()=>{
		const a = (a=>{
			if (a) {
				a.children[2].children[0].innerHTML=''
				return el({a:'div', b:a.children[2].children[0], d:{style:'display:grid; grid-template-columns:1fr min-content; gap:1vmin;'}})
			} else {
				a = el({a:'div', b:dlg({title:'Fastest Latency Recommendation', left:48, top:64}), d:{style:'background:rgba(0,0,0,.1); width:80vw; height:70vh; overflow:scroll; resize:both; padding:1.5vmin; display:flex; flex-direction:column; gap:5vmin; border-radius:7px; font-size:2vmin;'}})
				a.parentElement.style.cssText='background:rgba(255, 255, 255, 0.8);border-radius:8px;padding:8px;'
				a.parentElement.parentElement.id = 'recommendation-Dlg'
				return el({a:'div', b:a, d:{style:'display:grid; grid-template-columns:1fr min-content; gap:1vmin;'}})
			}
		})(document.getElementById('recommendation-Dlg'))
		el({a:'div', b:a, c:'Path', d:{style:'font-weight:bold; font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; text-align:center;'}})
		el({a:'div', b:a, c:'Latency', d:{style:'font-weight:bold; font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; text-align:center;'}})
		
		const b = []
		Object.keys(m.lines).filter(a=>m.lines[a].e).forEach(a=>{ const c=m.rekomendasi(a).filter(a=>a.l!=undefined); c.length>0 && b.push(...c) })
		
		const d = {}
		b.forEach(a=>{
			a.a.forEach(c=>{
				!d[c.c] && (d[c.c] = {
					bw: parseFloat(m.lines[c.c].data.bw)||0,
					tr: parseFloat(m.lines[c.c].data.rec)||0,
					ts: parseFloat(m.lines[c.c].data.sent)||0
				})
				if (d[c.c][a.b]) console.log('duplicate = ('+(a.c)+')  ('+(b.b)+')');
				else {
					d[c.c][a.b] = {
						a: a.b,
						b: c.b==m.lines[c.c].a,
					}
					if (c.b==m.lines[c.c].a) {
						d[c.c].tr += parseFloat(m.lines[a.b].data.rec)||0
						d[c.c].ts += parseFloat(m.lines[a.b].data.sent)||0
					} else {
						d[c.c].tr += parseFloat(m.lines[a.b].data.sent)||0
						d[c.c].ts += parseFloat(m.lines[a.b].data.rec)||0
					}
				}
			})
		})
		
		a.setAttribute('data-a', JSON.stringify(b))
		a.setAttribute('data-b', JSON.stringify(d))
		//console.log(b)
		//console.log(d)
		
		const showDetail=a=>{
			a.stopPropagation()
			const b = Math.floor([...a.target.parentElement.children].indexOf(a.target)/10)*10
			const c = a.target.parentElement.children[b+9]
			if (c.children.length < 1) {
				c.style.padding = '3px 7px'
				c.style.marginBottom = '1vmin'
				const st2={style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.7); border-radius:3px; padding:3px 7px; text-align:center;'}
				const st1={style:st2.style + ' font-weight:bold;'}
				el({a:'div', b:c})
				el({a:'div', b:c, c:'Path', d:st1})
				el({a:'div', b:c, c:'Traffic In', d:st1})
				el({a:'div', b:c, c:'Traffic Out', d:st1})
				el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
				const d = JSON.parse(a.target.parentElement.parentElement.getAttribute('data-b'))[a.target.parentElement.children[b].textContent]
				Object.keys(d).filter(a=>a!='bw'&&a!='tr'&&a!='ts').forEach(e=>{
					el({a:'div', b:c})
					el({a:'div', b:c, c:e, d:st2})
					if (d[e].b) {
						el({a:'div', b:c, c:(m.lines[e].data.rec || '0') +' Gbps', d:st2})
						el({a:'div', b:c, c:(m.lines[e].data.sent || '0') +' Gbps', d:st2})
					} else {
						el({a:'div', b:c, c:(m.lines[e].data.sent || '0') +' Gbps', d:st2})
						el({a:'div', b:c, c:(m.lines[e].data.rec || '0') +' Gbps', d:st2})
					}
					el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
				})
				el({a:'div', b:c})
				el({a:'div', b:c, c:'Total', d:st1})
				el({a:'div', b:c, c:d.tr.toFixed(2) +' Gbps', d:st1})
				el({a:'div', b:c, c:d.ts.toFixed(2) +' Gbps', d:st1})
				el({a:'div', b:c, d:{style:'margin:0; padding:0; border-radius:3px; grid-column:5/10;'}})
			} else {
				c.innerHTML = ''
				c.style.padding = '0'
				c.style.marginBottom = '0.15vmin'
			}
		}
		
		const st2={style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:3px; padding:3px 7px; text-align:center;'}
		const st1={style:st2.style + ' font-weight:bold; margin-bottom:0.3vmin;'}
		b.forEach(b=>{
			const c = el({a:'div', b:a, d:{style:'background:rgba(255, 255, 255, 0.3); border-radius:7px; padding:3px 7px; display:grid; grid-template-columns:repeat(9, auto); gap:0 .3vmin;'}})
			el({a:'div', b:a, c:b.l, d:{style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:3px 7px; text-align:center;'}})
			
			el({a:'div', b:c, c:JSON.stringify(b.a.map(a=>a.c)), d:{style:'font-weight:bold; font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:7px; margin-bottom:0.3vmin; padding:3px 7px; text-align:center; grid-column:1/10;'}})
			el({a:'div', b:c, c:'Path', d:st1})
			el({a:'div', b:c, c:'Latency', d:st1})
			el({a:'div', b:c, c:'Traffic In', d:st1})
			el({a:'div', b:c, c:'Traffic Out', d:st1})
			el({a:'div', b:c, c:'OCC In', d:st1})
			el({a:'div', b:c, c:'OCC Out', d:st1})
			el({a:'div', b:c, c:'Capacity', d:st1})
			el({a:'div', b:c, c:'Add Capacity', d:st1})
			el({a:'div', b:c, c:'Total Capacity', d:st1})
			
			b.a.map(a=>a.c).forEach(a=>{
				const b=m.lines[a]
				const f = Math.ceil(Math.max(d[a].tr, d[a].ts)*10/9)
				const g = Math.max(Math.ceil(f-(parseFloat(b.data.bw)||0)), 0)
				el({a:'div', b:c, c:a, d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:b.data.lat, d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:(b.data.rec || '0') +' Gbps', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:(b.data.sent || '0') +' Gbps', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:(b.data.oin || '0') +' %', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:(b.data.oout || '0') +' %', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:(b.data.bw || '0') +' Gbit', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:g+' Gbit', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, c:Math.max(f, g, (parseFloat(b.data.bw)||0))+' Gbit', d:st2, e:{click:showDetail}})
				el({a:'div', b:c, d:{style:'background:rgba(0,0,0,0.1); border-radius:7px; margin:0.15vmin; grid-column:1/10; display:grid; grid-template-columns:repeat(9, auto); gap:0.3vmin;'}})
			})
		})
		//console.log(d)
	},
	checkPath: a=>{
		const nodes={}
		const b=m.select1.value=='ALL'?Object.keys(m.lines):m.area[m.select1.value].a
		Object.keys(m.nodes).forEach(a=>{
			nodes[a]={lat:[,,,].fill(99999)}
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].a==a)).forEach(b=>{
				nodes[a][m.lines[b].b]={a:m.lines[b].a, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
			b.filter(b=>(!m.lines[b].e&&m.lines[b].data.lat&&m.lines[b].data.mbw&&m.lines[b].b==a)).forEach(b=>{
				nodes[a][m.lines[b].a]={a:m.lines[b].a, l:parseInt(m.lines[b].data.lat.split('/')[1])}
			})
		})
		
		var found = false
		const walk=n=>{
			if (n.a.length<1) return
			const o=[]
			!found && n.a.forEach(a=>{
				!found && Object.keys(nodes[a.a[0].a]).filter(b=>b!='lat'&&!a.a.find(a=>a.a==b)).forEach(b=>{
					if (b==n.dst) found = true
					if (!found) {
						const c=nodes[a.a[0].a][b].l+a.l
						if (c<=nodes[b].lat[4]) {
							nodes[b].lat.push(c)
							nodes[b].lat.sort().pop()
							if (c<=n.lat[4]) {
								if (b==n.dst) {
									n.lat.push(c)
									n.lat.sort().pop()
								} else o.push({a:[{a:b},...a.a], l:c})
							}
						}
					}
				})
			})
			!found && walk({a:o, lat:n.lat, dst:n.dst})
		}
		walk({a:[{a:[{a:m.lines[a].a}], l:0}], lat:[,,,].fill(99999), dst:m.lines[a].b});
		return found
	},
	show: ()=>{
		document.body.appendChild(m.div)
		const a = el({a:'div', b:document.body, d:{style:'position:fixed; top:9px; left:9px; padding:11px; background:rgba(0,0,0,0.3); border-radius:7px;'}})
		el({a:'button', b:a, c:'view data', e:{click:a=>{
			console.log(m.dataJson.routes)
			//console.log(m.lines)
		}}})
		el({a:'span', b:a, d:{style:'display:inline-block; padding:1px 7px;'}})
		el({a:'button', b:a, c:'download data', e:{click:a=>{
			el({a:'a', b:document.body, d:{download:'data.json', href:URL.createObjectURL(new Blob([JSON.stringify(m.dataJson)],{type:'application/json'}))}, e:{click:a=>{document.body.removeChild(a.target)}}}).click()
			//console.log(m.dataJson.routes)
		}}})
	},
}
return m
}

addEventListener('load', ()=>{
	//mapboxgl.accessToken = 'pk.eyJ1IjoicmV6YXBsZSIsImEiOiJjam1odmlld20zZmFjM3Bsazlybjk3cGJvIn0.mZTtCP_QNLKTrI-LUYYsrA'
	//mapboxgl.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w'
	mapboxgl.accessToken = 'pk.eyJ1IjoicXVlMzIxNiIsImEiOiJjaWhxZmMxMDUwMDBzdXhsdWh0ZDkyMzVqIn0.sz3lHuX9erctIPE2ya6eCw'
	//mapboxgl.accessToken = 'pk.eyJ1IjoibmFkaiIsImEiOiJjaW43a2hyOXYwMDJrd29semd6bmZha2JuIn0.nE1hjNjGG2rlxm_oMrysyg'
	simulation().init().show()
})