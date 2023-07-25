const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const st2 = {style:'font-size:1.5vmin; white-space: nowrap; background:rgba(255, 255, 255, 0.5); border-radius:3px; padding:3px 7px; text-align:center;'}
const st1 = {style:st2.style + ' font-weight:bold; margin-bottom:0.3vmin;'}
const warna = {IMPROVE:'background:rgba(87, 136, 254, 0.7);', MAINTAIN:'background:rgba(251, 194, 70, 0.7);', DEGRADE:'background:rgba(255, 0, 0, 0.7);'}

alert1 = a => {
	const b = (a=>{
		if (a) {
			a.children[2].children[0].innerHTML=''
			return el({a:'div', b:a.children[2].children[0], d:{style:''}})
		} else {
			
			a = el({a:'div', b:dlg({title:'', left:48, top:64}), d:{style:'background:rgba(0,0,0,.1); width:80vw; height:70vh; overflow:scroll; resize:both; padding:1.5vmin; display:flex; flex-direction:column; gap:5vmin; border-radius:7px; font-size:2vmin;'}})
			a.parentElement.style.cssText='background:rgba(255, 255, 255, 0.5); border-radius:9px; padding:9px;'
			a.parentElement.parentElement.id = 'alert-daily-Dlg'
			a.parentElement.parentElement.style.zIndex = 3
			
			const b = a.parentElement.previousElementSibling.previousElementSibling
			b.textContent = ''
			b.style.cssText = 'background: rgba(0, 0, 0, 0.3); border-radius: 5px; cursor: grab; margin: 0px 0px 7px; padding: 7px 47px 7px 31px; display:flex; flex-direction:column; gap:5px; align-items:center;'
			el({a:'div', b:b, c:'ALERT DAILY', d:{style:'color: rgba(255, 255, 255, 0.7); cursor: grab; font-size:3vmin; font-weight:bold;'}})
			const c = el({a:'div', b:b, d:{style:'display:flex; gap:5px;'}})
			
			const tgl = (a=>{
				a.setDate(a.getDate()-1)
				el({a:'div', b:c, c:`${a.getDate()}  ${bulan[a.getMonth()]}  ${a.getFullYear()}`, d:{style:'color: rgba(255, 255, 255, 0.7); cursor: grab; font-size:2.5vmin; font-weight:bold;'}, e:{click:a=>{a.target.nextElementSibling.showPicker()}}})
				return '2023-07-23'
			})(new Date())
			
			el({a:'input', b:c, d:{type:'date', min:'2023-07-06', max:'2023-07-23', value:'2023-07-23', style:'width:1px; height:1px; border:none; background:rgba(0,0,0,0);'}, e:{change:a=>{
				const tgl = new Date(a.target.value)
				
				a.target.previousElementSibling.textContent = `${tgl.getDate()}  ${bulan[tgl.getMonth()]}  ${tgl.getFullYear()}`
				fetch(`data/${tgl.getFullYear()}-${(tgl.getMonth()<9 ? '0' : '') + (tgl.getMonth()+1)}-${(tgl.getDate() < 10 ? '0' : '') + tgl.getDate()}.json`).then(a=>a.json()).then(a => { alert1(a) })
			}}})
			el({a:'img', b:c, d:{style:'height:18px;', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADcElEQVRoQ+2aW4hNURjHHXcll1xmlNwKD0x4I5NcchmFUkjN1Eh5oTx5orzgxYukXFJGvLg8IeMapYa8kKZ5kTyQhgxNyN3x+097H2vOOWuvtZsznXO0vvq391nft/5rfXut9a3byQxIIdlsdhHmc8Ew8B20ZzKZhykocqZwjeHHclALBoJPoA2+52n4Mj7GFDYWu8tRgflZ7pKwiYI/+nDJBr6tPE6AUXl5svw+DXbC99OHz9eB65A1JBC2UuBanwKp/FLs5LS+uk2Owrfbh8/pAAXWQfTMIOvm/T0YB9QNYqmj0HZXofDdwmalYfeK9x9gMlDXlPwCNfB9cPH5OLAZkgsR0TeetRB3U5HRvHeC4ZFuC+kXXQWS7w02kyK7feQ5qHfS63k8MPIvRtfm4vNxoBGScxFRF6TjY1IKjVtCSU3ozrsKzMuzjTwtkQPTeL408i9Dd9/F9385wNdZgsd7wCwwKPJ+JM8ajxZ4i81n1xdDPx3EAzipBdTVvkZ8ikgd4ACt8sQsI9cCVF5R5BpIapWkLuRR9wKTJAeK8cmRepx4HCtNB56SOM9Ri3I7oOrdwYFcFDMdkHeDq8CBThyIo9i/7kIX0izokkpogV51MFvAx4HfeLgCvIgG4z2e8WB3OV9Mf5bE/UC8G8AxD5I+OeDB3+8mwYF+/8RpAknaMVDuyqt8ry7UQKi6Uay2BKs1pLeCddho4isq2B1BoSXxBOy0ZrLZaf2/HYzATovFAoGrmcQzkSI4EFrA7CN0j9CFej5I3lIiDOJyR6GbNMprS+TT5ns10OZcG3KbLEQxB2ibqTMkm2gvPBu0AK2JislMErXZkniF0YTyyq7ycmA91bxtqao2E1fARqAJzSaHUewCarGuBLvj6JqBjmhsLdWE7lSaFgiDuNyDOLRAaAFj1IfVqBkCq2U/oFuXd5bYPZF03dQ8AjpOtImO5WdEc4WOz20yH8VUcBX8sRhNIX1BmnlAOyPbtK5jFB2pJ9morKFgCPiSUHmpdCegA7UkO+njuwOvmTiE0RBGjX4Xwqg5CKsljIZBXI5BrElJk5SkkueBDk7wtFXtEfNs9CS/dzgmnUpQH8KBvcUc0P8WLoFVlVBLSx30f41GHMhtPQtuJOm7WpvoFKAvNy+l/gb664G6jq5ae4nzorvUNSk131+UFEBeH7VeNQAAAABJRU5ErkJggg=='}, e:{click:a=>{a.target.previousElementSibling.showPicker()}}})
			return el({a:'div', b:a, d:{style:''}})
		}
	})(document.getElementById('alert-daily-Dlg'))
	
	b.parentElement.parentElement.parentElement.children[1].style.cssText = 'background: rgba(255, 255, 255, 0.8); border-radius: 4px; cursor: default; font-weight: bold; padding: 4px; position: absolute; text-align: center; top: 39px; right: 39px;'
	b.parentElement.parentElement.parentElement.style.cssText = 'top: 5vh; left: 10vw; background: rgba(255, 255, 255, 0.3); border-radius: 8px; box-shadow: rgba(240,60,110, 0.1) 0px 0px 6px 2px; position: fixed; padding: 32px;'
	b.parentElement.parentElement.parentElement.children[0].style.background = 'rgba(50, 50, 50,0.3)'
	//b.parentElement.parentElement.parentElement.children[0].style.backgroundImage = 'linear-gradient(to right, rgba(240,60,110,1), rgba(200,29,51,1))'
	
	const sort1 = a => {
		a.stopPropagation()
		const pos =[...a.target.parentElement.children].indexOf(a.target)%9
		const sr = [,,'urutan', 'base', 'latpl', 'total', 'imp', 'mt', 'deg'][pos]
		a = a.target.parentElement
		while (a.children.length > 9) a.removeChild(a.children[9]);
		
		[...a.children].slice(2).forEach(b=>{ b != a.children[pos] && (b.children[1].src = 'icons/a.svg') })
		
		const dt = (b => {
			if (a.children[pos].children[1].src.split('/').slice(-1)[0] != 'b.svg') {
				a.children[pos].children[1].src = 'icons/b.svg'
				return b.sort((a,b)=>parseFloat(a[sr])-parseFloat(b[sr]))
			}
			
			a.children[pos].children[1].src = 'icons/c.svg'
			return b.sort((a,b)=>parseFloat(b[sr])-parseFloat(a[sr]))
		})(JSON.parse(a.getAttribute('data-a')))
		
		a.setAttribute('data-a', JSON.stringify(dt))
		
		dt.forEach((b, c)=>{
			el({a:'div', b:a, c:(c+1), d:st2, e:{click:showDetail}})
			el({a:'div', b:a, c:b.rgn, d:st2, e:{click:showDetail}})
			el({a:'div', b:a, c:b.base, d:st2, e:{click:showDetail}})
			el({a:'div', b:a, c:b.latpl, d:st2, e:{click:showDetail}})
			
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:a, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:b.total, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:a, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:b.imp, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:a, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:b.mt, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:a, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:b.deg, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			
			el({a:'div', b:a, d:{style:'background:rgba(0,0,0,0.1); border-radius:7px; margin:0.15vmin; grid-column:1/9; display:grid; grid-template-columns:repeat(6, auto); gap:0.3vmin;'}})
		})
	}
	
	const sort2 = a => {
		a.stopPropagation()
		const b = [...a.target.parentElement.children].indexOf(a.target)%9
		const c = [,'kab', 'base', 'val', 'gap', 'stat'][b]
		a = a.target.parentElement
		while (a.children.length > 6) a.removeChild(a.children[6]);
		
		[...a.children].slice(1).forEach(c=>{ c != a.children[b] && (c.children[1].src = 'icons/a.svg') })
		
		const d = (d => {
			if (a.children[b].children[1].src.split('/').slice(-1)[0] != 'b.svg') {
				a.children[b].children[1].src = 'icons/b.svg'
				return d.sort((a,b)=>(c=='kab'||c=='stat')?a[c].localeCompare(b[c]):parseFloat(a[c])-parseFloat(b[c]))
			}
			
			a.children[b].children[1].src = 'icons/c.svg'
			return d.sort((a,b)=>(c=='kab'||c=='stat')?b[c].localeCompare(a[c]):parseFloat(b[c])-parseFloat(a[c]))
		})(JSON.parse(a.getAttribute('data-a')))
		
		a.setAttribute('data-a', JSON.stringify(d))
		
		d.forEach((b,c)=>{
			el({a:'div', b:a, c:(c+1), d:st2})
			el({a:'div', b:a, c:b.kab, d:st2})
			el({a:'div', b:a, c:b.base, d:st2})
			el({a:'div', b:a, c:b.val, d:st2})
			el({a:'div', b:a, c:b.gap, d:st2})
			el({a:'div', b:a, c:b.stat, d:{style:st2.style+warna[b.stat]}})
		})
	}
	
	const showDetail = a => {
		a.stopPropagation()
		const b = Math.floor([...a.target.parentElement.children].indexOf(a.target)/9)*9
		const c = a.target.parentElement.children[b+8]
		if (c.children.length < 1) {
			c.style.padding = '3px 7px'
			c.style.marginBottom = '1vmin'
			const stat = [,,,,,'IMPROVE', 'MAINTAIN', 'DEGRADE'][[...a.target.parentElement.children].indexOf(a.target)%9]
			
			const d = a.target.parentElement.children[0].textContent == 'LATENCY' ? ['LATENCY', 'kabupaten', 'baseline_latency', 'avg_latency', 'latStat'] : ['PACKETLOSS', 'kabupaten', 'baseline_packetloss', 'avg_packetloss', 'plStat']
			
			el({a:'div', b:c, c:'No', d:{style:st1.style+' background:rgba(100,100,100,.5); color:white;'}})
			
			el({a:'img', b:el({a:'span', c:'KABUPATEN', b:el({a:'div', b:c, d:{style:st1.style+'display:flex; background:rgba(100,100,100,.5); color:white;'}, e:{click:sort2}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
			el({a:'img', b:el({a:'span', c:'BASELINE', b:el({a:'div', b:c, d:{style:st1.style+'display:flex; background:rgba(100,100,100,.5); color:white;'}, e:{click:sort2}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
			el({a:'img', b:el({a:'span', c:d[0], b:el({a:'div', b:c, d:{style:st1.style+'display:flex; background:rgba(100,100,100,.5); color:white;'}, e:{click:sort2}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
			el({a:'img', b:el({a:'span', c:'GAP', b:el({a:'div', b:c, d:{style:st1.style+'display:flex; background:rgba(100,100,100,.5); color:white;'}, e:{click:sort2}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
			el({a:'img', b:el({a:'span', c:'STATUS', b:el({a:'div', b:c, d:{style:st1.style+'display:flex; background:rgba(100,100,100,.5); color:white;'}, e:{click:sort2}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
			
			const dt = JSON.parse(a.target.parentElement.parentElement.getAttribute('data-a')).filter(c=>c.rgn==a.target.parentElement.children[b+1].textContent).filter(c=>stat?c[[d[4]]]==stat:true).map(a=>({kab:a[d[1]], base:a[d[2]], val:a[d[3]], gap:(parseFloat(a[d[2]])-parseFloat(a[d[3]])).toFixed(2), stat:a[d[4]]}))
			c.setAttribute('data-a', JSON.stringify(dt))
			
			dt.forEach((a,b)=>{
				el({a:'div', b:c, c:(b+1), d:st2})
				el({a:'div', b:c, c:a.kab, d:st2})
				el({a:'div', b:c, c:a.base, d:st2})
				el({a:'div', b:c, c:a.val, d:st2})
				el({a:'div', b:c, c:a.gap, d:st2})
				//el({a:'div', b:c, c:(parseFloat(a[d[2]])-parseFloat(a[d[3]])).toFixed(2), d:st2})
				el({a:'div', b:c, c:a.stat, d:{style:st2.style+warna[a.stat]}})
			})
			
		} else {
			c.innerHTML = ''
			c.style.padding = '0'
			c.style.marginBottom = '0.15vmin'
		}
		
	}
	
	const c = el({a:'div', b:b, d:{style:'background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:7px; display:grid; grid-template-columns:repeat(8, auto); gap:0 .3vmin;'}})
	el({a:'div', b:c, c:'LATENCY', d:{style:'color:white; background-image:linear-gradient(to right, rgba(240,60,110,0.7), rgba(200,29,51,0.7)); margin:0; grid-column:1/9; font-weight:bold; margin-bottom:0.3vmin; font-size:1.9vmin; white-space: nowrap; border-radius:3px; padding:7px 7px; text-align:center;'}})
	el({a:'div', b:c, c:'No', d:{style:st1.style+'background:rgba(100,100,100,.5); color:white;'}})
	
	el({a:'img', b:el({a:'span', c:'REGION', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/b.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'BASELINE', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'LATENCY', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'TOTAL CITY', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'IMPROVE', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(87, 136, 254, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'MAINTAIN', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(251, 194, 70, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'DEGRADE', b:el({a:'div', b:c, d:{style:st1.style+'display:flex;background:rgba(255, 0, 0, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	
	const d = el({a:'div', b:b, d:{style:'margin-top:17px; background:rgba(255, 255, 255, 0.5); border-radius:7px; padding:7px; display:grid; grid-template-columns:repeat(8, auto); gap:0 .3vmin;'}})
	el({a:'div', b:d, c:'PACKETLOSS', d:{style:'color:white; background-image:linear-gradient(to right, rgba(240,60,110,0.7), rgba(200,29,51,0.7)); margin:0; grid-column:1/9; font-weight:bold; margin-bottom:0.3vmin; font-size:1.9vmin; white-space: nowrap; border-radius:3px; padding:7px 7px; text-align:center;'}})
	el({a:'div', b:d, c:'No', d:{style:st1.style+'background:rgba(100,100,100,.5); color:white;'}})
	
	el({a:'img', b:el({a:'span', c:'REGION', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/b.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'BASELINE', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'PACKETLOSS', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'TOTAL CITY', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(100,100,100,.5); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'IMPROVE', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(87, 136, 254, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'MAINTAIN', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(251, 194, 70, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	el({a:'img', b:el({a:'span', c:'DEGRADE', b:el({a:'div', b:d, d:{style:st1.style+'display:flex;background:rgba(255, 0, 0, 0.7); color:white;'}, e:{click:sort1}}), d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}).parentElement, d:{src:'icons/a.svg', style:'height:1.5vmin; pointer-events:none; align-self:center; margin:0;'}})
	
	if (a) {
		c.setAttribute('data-a', JSON.stringify(a.region.map(a=>({urutan:a.urutan, rgn:a.rgn, base:a.blat, latpl:a.lat, total:a.total, imp:a.ImpLat, mt:a.MtLat, deg:a.DegLat}))))
		d.setAttribute('data-a', JSON.stringify(a.region.map(a=>({urutan:a.urutan, rgn:a.rgn, base:a.bpl, latpl:a.pl, total:a.total, imp:a.ImpPl, mt:a.MtPl, deg:a.DegLat}))))
		//b.setAttribute('data-a', JSON.stringify(a.region))
		b.setAttribute('data-a', JSON.stringify(a.kabupaten))
		a.region.forEach((a,b)=>{
			el({a:'div', b:c, c:(b+1), d:st2, e:{click:showDetail}})
			el({a:'div', b:c, c:a.rgn, d:st2, e:{click:showDetail}})
			el({a:'div', b:c, c:a.blat, d:st2, e:{click:showDetail}})
			el({a:'div', b:c, c:a.lat, d:st2, e:{click:showDetail}})
			
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:c, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.total, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:c, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.ImpLat, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:c, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.MtLat, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:c, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.DegLat, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			
			el({a:'div', b:c, d:{style:'background:rgba(0,0,0,0.1); border-radius:7px; margin:0.15vmin; grid-column:1/9; display:grid; grid-template-columns:repeat(6, auto); gap:0.3vmin;'}})
			
			el({a:'div', b:d, c:(b+1), d:st2, e:{click:showDetail}})
			el({a:'div', b:d, c:a.rgn, d:st2, e:{click:showDetail}})
			el({a:'div', b:d, c:a.bpl, d:st2, e:{click:showDetail}})
			el({a:'div', b:d, c:a.pl, d:st2, e:{click:showDetail}})
			
			//(up) u25B4   (down) u25BE u25B8
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:d, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.total, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:d, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.ImpPl, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:d, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.MtPl, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			el({a:'span', b:el({a:'span', c:'\u268F', b:el({a:'div', b:d, d:{style:st2.style+'display:flex;'}, e:{click:showDetail}}), d:{style:'pointer-events:none;'}}).parentElement, c:a.DegPl, d:{style:'flex:1 0 0; pointer-events:none; text-align:center;'}}) 
			
			el({a:'div', b:d, d:{style:'background:rgba(0,0,0,0.1); border-radius:7px; margin:0.15vmin; grid-column:1/9; display:grid; grid-template-columns:repeat(6, auto); gap:0.3vmin;'}})
		})
	} else {
		const tgl = '2023-07-23'
		fetch(`data/${tgl}.json`).then(a=>a.json()).then(a => { alert1(a) })
	}
}

addEventListener('load', ()=>{
	el({a:'img', b:document.body, d:{src:'telkom_night.png', style:'position:fixed, top:0; left:0; width:100vw; height:100vh'}})
	alert1()
})
