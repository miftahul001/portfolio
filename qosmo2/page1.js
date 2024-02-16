const page1 = a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{id:'p1'}})
	
	el({a:'div', b:a})
	el({a:'div', b:a})
	el({a:'div', b:a})
	
	el({a:'div', b:a.children[0], c:'QUALITY PERFORMANCE SLA & CX'})
	const b = el({a:'div', b:a.children[0]});
	
	(a => {
		el({a:'div', b:a, c:'SLA Performance'})
		el({a:'div', b:a})
	})(el({a:'div', b:b, d:{style:'grid-area:1/1 /3/5;'}}));
	
	(a => {
		el({a:'div', b:a, c:'Trend Quality'})
		el({a:'div', b:a})
	})(el({a:'div', b:b, d:{style:'grid-area:3/1 /5/3;'}}));
	
	(a => {
		el({a:'div', b:a, c:'Benchmark CX'})
		el({a:'div', b:a})
	})(el({a:'div', b:b, d:{style:'grid-area:3/3 /4/5;'}}));
	
	(a => {
		el({a:'div', b:a, c:'Benchmark CX'})
		el({a:'div', b:a})
	})(el({a:'div', b:b, d:{style:'grid-area:4/3 /5/4;'} }));
	
	(a => {
		el({a:'div', b:a, c:'Benchmark CX'})
		el({a:'div', b:a})
	})(el({a:'div', b:b, d:{style:'grid-area:4/4 /5/5;'} }));
	
	
	el({a:'div', b:a.children[1], c:'POPULASI TOTAL SITE'})
	const c = el({a:'div', b:a.children[1]});
	
	(a => {
		el({a:'div', b:a, c:'Sebaran Per Region'})
		el({a:'div', b:a})
	})(el({a:'div', b:c, d:{style:'grid-area:1/1 /3/5;'}}));
	
	(a => {
		el({a:'div', b:a, c:'Total Site'})
		el({a:'div', b:a})
	})(el({a:'div', b:c, d:{style:'grid-area:3/1 /5/3;'}}));
	
	(a => {
		el({a:'div', b:a, c:'Sebaran By Transport'})
		el({a:'div', b:a})
	})(el({a:'div', b:c, d:{style:'grid-area:3/3 /5/5;'}}));
	
	el({a:'div', b:a.children[2], c:'CORE PERFORMANCE'})
	el({a:'div', b:a.children[2]})
	el({a:'div', b:a.children[2].children[1], d:{style:'grid-area:1/1 /5/3;'}})
	el({a:'div', b:a.children[2].children[1], d:{style:'grid-area:1/3 /5/5;'}})
	
	el({a:'div', b:a.children[2], c:'PENGELOLAAN ISSUE'})
	el({a:'div', b:a.children[2]})
	el({a:'div', b:a.children[2].children[3], d:{style:'grid-area:1/1 /5/5;'}})
	
	/*
	const c1 = el({a:'div', b:a, d:{class:'c1', style:'grid-area:1/1 /3/5;'}})
	const c2 = el({a:'div', b:a, d:{class:'c1', style:'grid-area:1/5 /3/9;'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/3 /5/5;'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/5 /5/7;'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/7 /5/9;'}})
	
	const map = L.map(el({a:'div',b:c1, d:{style:'background:rgba(0,0,0,0); width:100%; height:100%;'}}),
		{
			center: [120, -2],
			zoom: 6,
			zoomControl:false,
			zoomSnap: 0.001,
			boxZoom: false,
			doubleClickZoom: false,
			dragging: false,
			keyboard: false,
			scrollWheelZoom: false,
			tapHold: false,
			touchZoom: false
	})
	
	const map2 = L.map(el({a:'div',b:c2, d:{style:'background:rgba(0,0,0,0); width:100%; height:100%;'}}),
		{
			center: [120, -2],
			zoom: 6,
			zoomControl:false,
			zoomSnap: 0.001,
			boxZoom: false,
			doubleClickZoom: false,
			dragging: false,
			keyboard: false,
			scrollWheelZoom: false,
			tapHold: false,
			touchZoom: false
	})
	
	map.attributionControl.setPrefix('')
	fetch('tsreg.json').then(a=>a.json()).then(a=>{
		
		const layer = L.geoJSON(a, {
			style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: '#'+Math.floor(Math.random()*16777215).toString(16), fillOpacity: 0.5}),
			bubblingMouseEvents: false,
			onEachFeature: (feature, layer) => {
				layer.on('mouseover', function () { this.setStyle({ opacity: 1 }) })
				layer.on('mouseout', function () { this.setStyle({ opacity: 0.5 }) })
				layer.on('click', function () {
					//window.location = feature.properties.url
				})
			}
		}).addTo(map)
		map.fitBounds(layer.getBounds(), {padding:[3,3]})
		
	})
	
	map2.attributionControl.setPrefix('')
	fetch('witel.json').then(a=>a.json()).then(a=>{
		a.features = a.features.map(a=>({...a,"type":"Feature"}))
		const layer = L.geoJSON(a, {
			style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: '#'+Math.floor(Math.random()*16777215).toString(16), fillOpacity: 0.5}),
			bubblingMouseEvents: false,
			onEachFeature: (feature, layer) => {
				layer.on('mouseover', function () { this.setStyle({ opacity: 1 }) })
				layer.on('mouseout', function () { this.setStyle({ opacity: 0.5 }) })
				layer.on('click', function () {
					window.location = feature.properties.url
				//})
			}
		}).addTo(map2)
		map2.fitBounds(layer.getBounds(), {padding:[3,3]})
		
	})
	*/
	return a
	
}
