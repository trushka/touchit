
const data = {
	"el10": ["el17", "el13", "el9", "el21", "el22", "el19", "el23", "el24"],
	"el11": ["el19", "el8", "el18", "el22", "el24", "el0", "el14", "el16", "el21", "el22"],
	"el4": ["el15", "el9", "el13", "el14", "el16", "el17", "el19", "el23"],
	"el14": ["el9", "el4", "el13", "el0", "el17", "el18", "el21", "el6", "el16", "el11", "el24"],
	"el0": ["el10", "el11", "el4", "el14", "el2", "el6", "el8", "el11", "el12", "el14", "el16", "el22", "el23", "el24"],
	"el8": ["el15", "el22", "el23", "el7", "el0", "el11", "el13", "el11", "el17", "el22", "el24"],
	"el3": ["el22", "el8", "el16", "el24", "el15", "el5", "el7", "el16"],
	"el1": ["el8", "el3", "el6", "el9", "el22"],
	"el21": ["el11", "el13", "el22"],
	"el6": ["el19", "el1", "el17", "el7", "el0", "el15", "el22", "el7", "el9", "el14", "el19", "el24"],
	"el24": ["el7", "el13", "el8", "el6", "el14", "el9", "el10", "el0", "el12"],
	"el5": ["el7", "el11", "el3", "el16", "el17", "el18", "el19"],
	"el9": ["el15", "el4", "el12", "el1", "el6", "el2", "el17", "el10", "el14", "el15", "el22", "el23", "el24"],
	"el2": ["el14", "el21", "el6", "el24", "el10", "el0", "el5", "el9", "el9", "el17", "el19", "el20", "el23"],
	"el22": ["el16", "el9", "el0", "el18", "el1", "el20", "el11", "el8", "el23"],
	"el16": ["el3", "el20", "el5", "el4", "el0", "el11", "el24", "el22"],
	"el15": ["el9", "el19", "el23"],
	"el7": ["el11", "el13", "el22", "el14", "el16", "el3", "el8", "el6", "el8", "el12", "el13", "el18", "el24"],
	"el19": ["el5", "el20", "el10", "el2", "el6", "el22", "el15", "el18", "el4"],
	"el17": ["el8", "el24", "el5", "el23", "el13", "el2", "el20", "el4", "el18"],
	"el13": ["el4", "el18", "el7", "el14", "el17", "el21", "el24"],
	"el23": ["el22", "el20", "el10", "el2", "el24", "el4", "el15", "el0", "el9"],
	"el12": ["el24", "el0", "el20", "el7", "el20", "el24"],
	"el18": ["el17", "el5", "el24", "el20", "el7", "el19", "el20", "el22"],
	"el20": ["el2", "el18", "el12", "el23", "el22", "el23"],
}

function newEl(props={}, parent) {
	const el=document.createElement(props.tag||'div');
	if (props.css) for (let prop in props.css) {
		el.style.setProperty(prop, props.css[prop])
	}
	delete props.css, props.tag;
	Object.assign(el, props);
	if (parent) parent.append(el);
	return el;
}
function color(htColor) {
	const text = htColor.replace('#', '');
	const count = 1 + (text.length>4), array=[];
	for (let i=0; i<4; i++) {
		let val = text.substr(i*count, count);
		//console.log(i, val, text, count);
		if (count == 1) val+=val;
		if (val && isNaN('0x'+val)) console.warn(htColor + ' is not a html hex color!');
		array.push(('0x'+(val||'ff'))/255)
	}
	return array;
}
const color0 = color('#6675');
const dark = color('#6671');
const light = color('#ddec');
const light1 = color('#aab6');

const coins = document.getElementById('coins');

const canvas = newEl({tag: 'canvas'}, coins);
//const ctx = canvas.getContext('2d');

const orbits = [];
const connects=[];

const dataArray = Object.entries(data),
	num = dataArray.length; //25;
const maxCards = [8, 20, 30];

const elements = {};

canvas.onclick = e => {
	coins.querySelector('.coin.selected')?.click();
}

let max=0;
for(let i=0; i<3; i++) {

	const orb = orbits[i] = newEl({

		className: 'orbit orbit'+i,
		onclick: e => {
			const el0 = e.target,
			 click = e.type=='click',
			 selected = coins.querySelector('.coin.selected');

			el0.style.transitionDelay='';

			if (click) {
				if (el0==orb) return;

				const els = orb.querySelectorAll('.coin'),
					n = els.length,
					i0 = el0._i,
					opposite = i0 + n/2;
				selected?.parentNode.querySelectorAll('.coin').forEach((el, i)=>{
					el.style.setProperty('--i', i);
				})
				if (el0!=selected) els.forEach((el, i)=>{
					const index = opposite + (i + 1 - (i>i0) - opposite)*n/(n - 1);
					el.style.setProperty('--i', index);
				})

				delete selected?._selected;
				coins.querySelectorAll('.orbit, .coin').forEach(el=>el.classList.remove('selected', 'active'))
				coins.classList.remove('has-active');
			}
			if (el0==selected) return;

			if (click) {
				orb.classList.add('selected');
				el0.classList.add('selected');
			}
			el0.classList.add('active') ;
			el0._selected = true;
			coins.classList.add('has-active');
			coins.querySelectorAll('.coin').forEach(el => {
				if (el==el0) return;
				const delay = Math.random()*.25;
				el.style.transitionDelay=(click? .1+delay*.6 : delay)+'s';
				if (data[el0.id].some(id=> id==el.id)) el.classList.add('active');
			})
			if (selected) selected.style.transitionDelay='';
		},
		onpointerout: e => {
			const el=e.target;

			if (!el._selected || el.classList.contains('selected')) return;
			el._selected = false;
			let isActive = false;

			data[el.id].forEach(id => {
				const el1 = document.getElementById(id);
				isActive = isActive || el1._selected;
				if (el1._selected) return;

				if (data[id].some(id => id!=el.id && document.getElementById(id)._selected)) return;
				el1.style.transitionDelay=Math.random()*.15+'s';
				el1.classList.remove('active')
			})
			if (!coins.querySelector('.coin.selected')) coins.classList.remove('has-active');
			if (!isActive) el.classList.remove('active');
		}
	}, coins);

	orb.onpointerover = orb.onclick;

	if ((max+=maxCards[i])>=num) break;
}

for(let orb=0, start=0; orb<orbits.length; orb++) {

	const count = Math.round(num/max*maxCards[orb]);

	orbits[orb].style.setProperty('--n', count);

	for (let i=0; i<count; i++) {
		const elData = dataArray[i+start], id=elData[0];

		elements[id] = newEl({ id,
			className: 'coin',
			css: {'--i': i},
			_i: i
		}, orbits[orb]);
	}

	start += count
}

dataArray.forEach(([id, links]) => {
	links.forEach(el=>{
		const [el1, el2] = [elements[el], elements[id]];
		if (!el2) {
			console.warn(`elemetn #${el} in the list of #${id} connects not exist!`);
			return;
		}
		if (data[el].indexOf(id)<0) data[el].push(id);

		if (el==id || connects.some(({els: [a, b]}) => (a==el1 && b==el2) || (a==el2 && b==el1) )) return;

		let effect = [380 + Math.random()*100, 380 + Math.random()*100]; // distances between glare
		effect = effect.concat([Math.random()*effect[0], Math.random()*effect[1]]); // initial glare shift

		connects.push({
			els: [el1, el2],
			color: [.5, .5, .5, 0],
			effect 
		});
	})
})

const gl = canvas.getContext('webgl');//, {premultipliedAlpha: false});
//twgl.addExtensionsToContext(gl);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

const coord = [
	0, 1,  1, 1,
	0,-1,  1,-1
],
	bufferInfo = twgl.createBufferInfoFromArrays(gl, {coord}),
	programInfo = twgl.createProgramInfo(gl, [`
		precision mediump float;

		attribute vec2 coord;

		uniform vec2 a;
		uniform vec2 b;
		uniform vec2 resolution;
		uniform float pRatio;

		varying vec2 ab, vCoord;
		varying float ab2;

		const float wHalf = 25.;

		void main() {
			vec2 maxab = max(a, b)+2.;
			vec2 minab = min(a, b)-2.;

		  ab = a - b;
		  ab2 = length(ab)/pRatio;

		  vec2 ort = normalize(ab).yx*wHalf*pRatio;
		  ort.x *= -1.;

		  gl_Position.xy = ((coord.x > 0. ? a : b) + ort * coord.y) / resolution * 2. - 1.;
		  gl_Position.w = 1.;
		  vCoord = coord*vec2(ab2, wHalf); 
		  //vec4(mix(minab, maxab, coord)/resolution*2. - 1.;
		}
	`, `
		precision mediump float;

		uniform vec2 a;
		uniform vec2 b;

		uniform float pRatio;
		uniform vec4 color, effData;

		varying vec2 ab, vCoord;
		varying float ab2;

		float pow2(float val) {
			return val*val;
		}
		vec2 glare(vec2 delta) {
			return exp(-.3-.15*delta)*(sqrt(delta)+.2);
		}
		vec2 d12(float shift) {
			return vec2(
				mod(-vCoord.x + effData.z+shift, effData.x),
				mod(vCoord.x - ab2 + effData.w+shift, effData.y)
			);
		}
		void main() {
			vec2 p = gl_FragCoord.xy;
			vec2 
				pa = a - p,
				pb = b - p;
			float w = .8 +.6/pRatio,
			 h = abs(vCoord.y);
			//if (h > w + 2.8) discard;

			vec2 d=d12(50.)-55.;
			//d*=d;
			float
				effect = length(glare(d12(.0) )),
				ef1 = length(exp(-d*d*.003));

			w += w * .6 * effect;
			float a = clamp((w - h)*pRatio, 0., 2.);
			gl_FragColor = color;
			gl_FragColor.xyz += .15 *color.rgb * effect * color.rgb*a;
			gl_FragColor.a *= a;
			gl_FragColor.a += .07*exp(-pow(h, 1.5)*.03+ef1*.8)*color.a*dot(color.rgb, color.rgb);
			//if (gl_FragColor.a < .02) discard;
		}
	`]),
	setUniform = programInfo.uniformSetters;

gl.useProgram(programInfo.program);
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

let effectScale;
function resize() {
	let {width, height} = coins.getBoundingClientRect();
	width *= devicePixelRatio;
	height *= devicePixelRatio;
	Object.assign(canvas, {width, height});
	gl.viewport(0, 0, width, height);
	setUniform.resolution([width, height]);
	const elPixelRatio = parseInt(getComputedStyle(document.querySelector('.orbit')).fontSize) / 50;

	effectScale = devicePixelRatio*elPixelRatio;
	setUniform.pRatio(effectScale);
}
window.addEventListener('resize', resize);
//resize();

let t0=0;
const dt0 = 100;
requestAnimationFrame(function render(t) {
	requestAnimationFrame(render);

	if (!effectScale) { //check css loading
		if (!getComputedStyle(document.querySelector('.coin')).getPropertyValue('--ro')) return;
		resize()
	}

	const dt = Math.min(dt0, t-t0);
	t0 = t;

	gl.clear(gl.COLOR_BUFFER_BIT);

	const {left, top, width, height} = canvas.getBoundingClientRect();
	const mainColor = coins.classList.contains('has-active') ? dark : color0;
	const selected = coins.querySelector('.coin.selected')
	//const lightColor = selected ? color0 : light;

	for (let id in elements) {
		const el = elements[id],
			{x, y} = el.getBoundingClientRect();
		el._pos = [(x - left) * devicePixelRatio, (height - y + top) * devicePixelRatio]//, .9]
		el._highlighted = el.classList.contains('active');
	}
	const dc = dt*.004, dShift = dt * .045;
	connects.forEach(({els: [a, b], color, effect}) => {
		
		setUniform.a(a._pos);
		setUniform.b(b._pos);

		let targColor = (a._selected || b._selected) ? light1 : mainColor;
		if (a==selected || b==selected) targColor = light

		color.forEach((val, i) => {
			color[i] += (targColor[i]-val)*dc
		})

		setUniform.color(color);

		effect[2] = (effect[2] + dShift) % effect[0];
		effect[3] = (effect[3] + dShift) % effect[1];
		setUniform.effData(effect);

		twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLE_STRIP);
	})
})
