m = {}

addEventListener('load', () => {
	
	const a = el({a:'div', b:document.body});
	
	//navbar
	(a => {
		a = el({a:'div', b:a, d:{id:'navbar'}})
		el({a:'div', b:a, c:'Qosmo Dashboard'})
		el({a:'img', b:a, d:{src:'img/Logout2.svg'}})
	})(a)
	
	el({a:'div', b:a, c:'Network Performance', d:{class:'title1'}});
	
	//card1
	(a => {
		a = el({a:'div', b:a, d:{id:'card1'}})
		
		m.map = L.map(el({a:'div',b:a, d:{style:'background:rgba(0,0,0,0); width:100%; height:100%; '}}),
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
		
		m.map.attributionControl.setPrefix('')
		fetch('map.json').then(a=>a.json()).then(a=>{
			
			m.layer = L.geoJSON(a, {
				style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: '#'+Math.floor(Math.random()*16777215).toString(16), fillOpacity: 0.5}),
				bubblingMouseEvents: false,
				onEachFeature: (feature, layer) => {
					layer.on('mouseover', function () { this.setStyle({ opacity: 1 }) })
					layer.on('mouseout', function () { this.setStyle({ opacity: 0.5 }) })
					layer.on('click', function () {
						//window.location = feature.properties.url
					})
				}
			}).addTo(m.map)
			m.map.fitBounds(m.layer.getBounds(), {padding:[0,0]})
			
		})
		
		const b = el({a:'select', b:el({a:'div', b:a, d:{style:'position:absolute; width:43vw; margin-top:-41vh; text-align:right;'}}) })
		el({a:'option', b:b, c:'TREG'})
		el({a:'option', b:b, c:'WITEL'})
	})(a);
	
	//card2
	(a => {
		a = el({a:'div', b:a, d:{id:'card2'}})
		
		el({a:'div', b:a, c:'CTI Vs CDN', d:{class:'title2'}})
		
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:0 0.5vw; width:24vw; height:38.5vh; display:flex; align-items:center; justify-content:center;'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		m.chart1 = new Chart(b, {
			type: 'line',
			data: {
				labels: [],
				datasets: [{
					label: 'Treg1',
					data: [],
					fill: false,
					backgroundColor: '#f00',
					borderColor: '#f00',
				},
				{
					label: 'Treg2',
					data: [],
					fill: false,
					backgroundColor: '#00f',
					borderColor: '#00f',
				},
				{
					label: 'Treg3',
					data: [],
					fill: false,
					backgroundColor: '#0f0',
					borderColor: '#0f0',
				},
				{
					label: 'Treg4',
					data: [],
					fill: false,
					backgroundColor: '#ff0',
					borderColor: '#ff0',
				},
				{
					label: 'Treg5',
					data: [],
					fill: false,
					backgroundColor: '#f0f',
					borderColor: '#f0f',
				},
				{
					label: 'Treg6',
					data: [],
					fill: false,
					backgroundColor: '#0ff',
					borderColor: '#0ff',
				},
				{
					label: 'Treg7',
					data: [],
					fill: false,
					backgroundColor: '#333',
					borderColor: '#333',
				},
				]
			},
			options: {
				plugins: {
					datalabels: {
						color: 'rgba(0,0,0,0)',
						//formatter: function (value) { return Math.round(value) + '%' },
						//font: {
						//	weight: 'bold',
						//	size: 16,
						//}
					},
					legend: {
						position: 'bottom',
						labels: {
							usePointStyle: true,
							color: '#000',
							font: { size: 9, }
						}
					}
				},
				scales: {
					y: {
						ticks: {
							color: "#000",
							font: { size: 9, },
							//stepSize: 1,
							beginAtZero: true
						}
					},
					x: {
						ticks: {
							color: "#000",
							font: { size: 9, },
							//stepSize: 1,
							//beginAtZero: true
						}
					}
				},
			}
		})

		
	})(a);
	
	//card3
	(a => {
		a = el({a:'div', b:a, d:{id:'card3'}})
		
		el({a:'div', b:a, c:'SLA Performance', d:{class:'title2'}});
		
		(a => {
			a = el({a:'table', b:a, d:{class:'sla-tabel'}});
			
			(a => {
				el({a:'td', b:a, c:'4G'})
				
				const b = el({a:'div', b:el({a:'td', b:a}) })
				b.style.background = 'green'
				el({a:'div', b:b, c:'PacketLoss'})
				el({a:'div', b:b, c:'T : 99.5%'})
				el({a:'div', b:b, c:'R : 99.5%'})
				const c = el({a:'div', b:el({a:'td', b:a}) })
				c.style.background = 'green'
				el({a:'div', b:c, c:'Latency'})
				el({a:'div', b:c, c:'T : 99.5%'})
				el({a:'div', b:c, c:'R : 99.5%'})
				const d = el({a:'div', b:el({a:'td', b:a}) })
				d.style.background = 'red'
				el({a:'div', b:d, c:'Jitter'})
				el({a:'div', b:d, c:'T : 99.5%'})
				el({a:'div', b:d, c:'R : 99.5%'})
				
			})(el({a:'tr', b:a}));
			
			(a => {
				el({a:'td', b:a, c:'CTI'})
				
				const b = el({a:'div', b:el({a:'td', b:a}) })
				b.style.background = 'green'
				el({a:'div', b:b, c:'PacketLoss'})
				el({a:'div', b:b, c:'T : 99.5%'})
				el({a:'div', b:b, c:'R : 99.5%'})
				const c = el({a:'div', b:el({a:'td', b:a}) })
				c.style.background = 'green'
				el({a:'div', b:c, c:'Latency'})
				el({a:'div', b:c, c:'T : 99.5%'})
				el({a:'div', b:c, c:'R : 99.5%'})
				const d = el({a:'div', b:el({a:'td', b:a}) })
				d.style.background = 'green'
				el({a:'div', b:d, c:'Jitter'})
				el({a:'div', b:d, c:'T : 99.5%'})
				el({a:'div', b:d, c:'R : 99.5%'})
				
			})(el({a:'tr', b:a}))
			
		})(el({a:'div', b:a, d:{style:'height:11.5vh;'}}));
		
		(a => {
			
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.chart2 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Packetloss',
						data: [],
						fill: false,
						backgroundColor: '#999A9E',
						borderColor: '#999A9E',
					},
					{
						label: 'Latency',
						data: [],
						fill: false,
						backgroundColor: '#D3AF3D',
						borderColor: '#D3AF3D',
					},
					{
						label: 'Jitter',
						data: [],
						fill: false,
						backgroundColor: '#D9D9D9',
						borderColor: '#D9D9D9',
					},
					]
				},
				options: {
					plugins: {
						datalabels: {
							color: 'rgba(0,0,0,0)',
							//formatter: function (value) { return Math.round(value) + '%' },
							//font: {
							//	weight: 'bold',
							//	size: 16,
							//}
						},
						legend: {
							position: 'bottom',
							labels: {
								usePointStyle: true,
								color: '#000',
								font: { size: 9, }
							}
						}
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})

		})(el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:0.5vh 1vw 0.5vh 2vw; width:29vw; height:27vh; display:flex; align-items:center; justify-content:center;'}}))
		//322
		//44
		//88
		
	})(a)
	
	el({a:'div', b:a, c:'CX & Experience', d:{class:'title1'}});
	
	//card4
	(a => {
		a = el({a:'div', b:el({a:'div', b:a, d:{id:'card4'}}) })
		
		const b = ['', 'Packetloss', 'Latency', 'Jitter', 'Game Score', 'Video Score', 'Signal Strength']
		
		b.forEach(b => { el({a:'div', b:a, c:b}) })
		b.shift();
		
		['Telkomsel', '3', 'XL', 'Indosat', 'Smartfren'].forEach(c => {
			el({a:'div', b:a, c:c, d:{style:'justify-content:flex-end;'} })
			b.forEach(b => { el({a:'div', b:a, d:{style:'background:rgba(0,0,0,0.1);'} }) })
		});
		
		el({a:'div', b:a.children[8], c:'Winner'})
		el({a:'div', b:a.children[11], c:'Winner'})
		el({a:'div', b:a.children[12], c:'Winner'})
		el({a:'div', b:a.children[23], c:'Winner'})
		el({a:'div', b:a.children[24], c:'Winner'})
		el({a:'div', b:a.children[34], c:'Winner'})
		
	})(a);
	
	//card5
	(a => {
		a = el({a:'div', b:a, d:{id:'card5'}})
		el({a:'div', b:a, c:'Global Vs CDN Experience', d:{class:'title2'}});
		
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:2vh 0.5vw; width:24vw; height:38.5vh; display:flex; align-items:center; justify-content:center;'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		const ilogo = ['img/yt.svg', 'img/fb.svg', 'img/ml.svg', 'img/tt.svg'].map(a => {
			const image = new Image()
			image.src = a
			return image
		})
		
		m.chart3 = new Chart(b, {
			type: 'bar',
			plugins: [{
				afterDraw: a => {
					const ctx = a.ctx
					const xAxis = a.scales.x
					const yAxis = a.scales.y
					yAxis.ticks.forEach((value, index) => {
						ctx.drawImage(ilogo[index], xAxis.left - (ilogo[index].width + 5), yAxis.getPixelForTick(index) - 9)
					})
				}
			}],
			data: {
				labels: ['Youtube', 'facebook', 'Mobile Legends', 'Titok'],
				datasets: [{
					label: 'Global',
					data: [-100, -90, -80, -70, -60],
					fill: false,
					backgroundColor: '#477F9F',
					borderColor: '#477F9F',
				},{
					data: [-0, -10, -20, -30, -40],
					fill: false,
					backgroundColor: '#D9D9D9',
					borderColor: '#D9D9D9',
				},
				{
					label: 'CDN',
					data: [100, 90, 80, 70, 60],
					fill: false,
					backgroundColor: '#B28E65',
					borderColor: '#B28E65',
				},{
					data: [0, 10, 20, 30, 40],
					fill: false,
					backgroundColor: '#D9D9D9',
					borderColor: '#D9D9D9',
				},
				]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				plugins: {
					datalabels: {
						color: 'rgba(0,0,0,0)',
						//formatter: function (value) { return Math.round(value) + '%' },
						//font: {
						//	weight: 'bold',
						//	size: 16,
						//}
					},
					legend: { display: false, },
				},
				scales: {
					y: {
						stacked: true,
						grid: {
							color: 'rgba(0,0,0,0)',
						},
						ticks: {
							color: 'rgba(0,0,0,0)',
						},
					},
					x: {
						stacked: true,
						ticks: { callback: value => Math.abs(value) }
					}
				},
				/*
				tooltips: {
					callbacks: {
						label: (tooltipItem, data) => {
							console.log('a')
							const ds = data.datasets[tooltipItem.datasetIndex];
							return ds.label + ': ' + Math.abs( ds.data[tooltipItem.index]);
						}
					}
				},*/
			}
		})
		
	})(a);
	
	//card6
	(a => {
		a = el({a:'div', b:a, d:{id:'card6'}})
		el({a:'div', b:a, c:'City Lose Performance', d:{class:'title2'}});
		
		(a => {
			
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; width:33vw; height:33vh; display:flex; align-items:center; justify-content:center;'}})})
			//b.width = parseInt(a.getBoundingClientRect().width)
			//b.height = parseInt(a.getBoundingClientRect().height)
			
			m.chart4 = new Chart(b, {
				type: 'doughnut',
				data: {
					labels: ['Platinum', 'Gold', 'Silver', 'Bronze'],
					datasets: [{
						data: [35,30,20,15],
						borderWidth: 0,
						backgroundColor: [
							'#999A9E',
							'#D3AF3D',
							'#D9D9D9',
							'#B28E65',
						],
						labels: ['Platinum', 'Gold', 'Silver', 'Bronze'],
					}]
				},
				options: {
					responsive: true,
					plugins: {
						datalabels: {
							color: '#000',
							//formatter: (a, b) => `${b.dataset.labels[b.dataIndex]}\n${parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
							//formatter: function (value) { return Math.round(value) + '%' },
							//font: {
							//	weight: 'bold',
							//	size: 16,
							//}
						},
						legend: { position: 'right', },
    				},
 				},
			})
			
		//{style:' width:24vw; height:38.5vh;'}})})
		})(el({a:'div', b:a, d:{style:'margin:0; padding:0; width:28vw; height:21vh; display:flex; align-items:center; justify-content:center;'}}));
		
		(a => {
			const b = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const b1 = el({a:'canvas', b:b})
			
			b1.width = parseInt(b.getBoundingClientRect().width)
			b1.height = parseInt(b.getBoundingClientRect().height)
			
			m.chart5 = new Chart(b1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'packetloss',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
					},]
				},
				options: {
					plugins: {
						title: { text: 'Packetloss' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})
			
			
			const c = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const c1 = el({a:'canvas', b:c})
			
			c1.width = parseInt(c.getBoundingClientRect().width)
			c1.height = parseInt(c.getBoundingClientRect().height)
			
			m.chart6 = new Chart(c1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Latency',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
					},]
				},
				options: {
					plugins: {
						title: { text: 'Latency' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})
			
			
			const d = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const d1 = el({a:'canvas', b:d})
			
			d1.width = parseInt(d.getBoundingClientRect().width)
			d1.height = parseInt(d.getBoundingClientRect().height)
			
			m.chart7 = new Chart(d1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Jitter',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
					},]
				},
				options: {
					plugins: {
						title: { text: 'Jitter' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})
			
			
		})(el({a:'div', b:a, d:{style:'height:17vh; display:flex; gap:0.1vw; align-items:center; justify-content:space-around;'}}));
		//322   133   103
		//      0.4   0.3
		//42.5  21    17
	})(a)
	
	
	
	//isi data
	m.chart1.data.labels = ['Jul', 'Jun', 'Mei', 'Apr', 'Mar', 'Feb', 'Jan']
	m.chart1.data.datasets.forEach((_, a) => {
		m.chart1.data.labels.forEach(_ => { m.chart1.data.datasets[a].data.push(Math.round(Math.random() * 100)) })
	})
	m.chart1.update()
	
	m.chart2.data.labels = ['Jul', 'Jun', 'Mei', 'Apr', 'Mar', 'Feb', 'Jan']
	m.chart2.data.datasets.forEach((_, a) => {
		m.chart2.data.labels.forEach(_ => { m.chart2.data.datasets[a].data.push(Math.round(Math.random() * 100)) })
	})
	m.chart2.update()
	
	m.chart3.data.labels.forEach((_,a) => {
		const b = Math.round(Math.random() * 100)
		m.chart3.data.datasets[0].data[a] = b - 100
		m.chart3.data.datasets[1].data[a] = -1 * b
		m.chart3.data.datasets[2].data[a] = b
		m.chart3.data.datasets[3].data[a] = 100 - b
	})
	m.chart3.update()
	
	m.chart5.data.labels = ['Mei', 'Apr', 'Mar', 'Feb', 'Jan']
	m.chart5.data.labels.forEach(_ => { m.chart5.data.datasets[0].data.push(Math.random().toFixed(2)) })
	m.chart5.update()
	
	m.chart6.data.labels = ['Mei', 'Apr', 'Mar', 'Feb', 'Jan']
	m.chart6.data.labels.forEach(_ => { m.chart6.data.datasets[0].data.push(Math.random().toFixed(2)) })
	m.chart6.update()
	
	m.chart7.data.labels = ['Mei', 'Apr', 'Mar', 'Feb', 'Jan']
	m.chart7.data.labels.forEach(_ => { m.chart7.data.datasets[0].data.push(Math.random().toFixed(2)) })
	m.chart7.update()
	
})
