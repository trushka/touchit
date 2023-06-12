
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
	// "el25": ["el7", "el11", "el3", "el16", "el17", "el18", "el19"],
	// "el26": ["el15", "el4", "el12", "el1", "el6", "el2", "el17", "el10", "el14", "el15", "el22", "el23", "el24"],
	// "el27": ["el14", "el21", "el6", "el24", "el10", "el0", "el5", "el9", "el9", "el17", "el19", "el20", "el23"],
	// "el28": ["el16", "el9", "el0", "el18", "el1", "el20", "el11", "el8", "el23"],
	// "el29": ["el3", "el20", "el5", "el4", "el0", "el11", "el24", "el22"],
	// "el30": ["el9", "el19", "el23"],
	// "el31": ["el11", "el13", "el22", "el14", "el16", "el3", "el8", "el6", "el8", "el12", "el13", "el18", "el24"],
	// "el32": ["el5", "el20", "el10", "el2", "el6", "el22", "el15", "el18", "el4"],
	// "el33": ["el8", "el24", "el5", "el23", "el13", "el2", "el20", "el4", "el18"],
	// "el34": ["el4", "el18", "el7", "el14", "el17", "el21", "el24"],
	// "el35": ["el22", "el20", "el10", "el2", "el24", "el4", "el15", "el0", "el9"],
	// "el36": ["el24", "el0", "el20", "el7", "el20", "el24"],
	// "el37": ["el17", "el5", "el24", "el20", "el7", "el19", "el20", "el22"],
	// "el38": ["el2", "el18", "el12", "el23", "el22", "el23"],
}

function newEl(props={}, parent) {
	el=document.createElement(props.tag||'div');
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
const color0 = color('#7786');
const dark = color('#77777f17');
const light = color('#ddec');

const coins = document.getElementById('coins');

const canvas = newEl({tag: 'canvas'}, coins);
//const ctx = canvas.getContext('2d');

const orbits = [];

let width, height;

const connects=[];

console.log(document.documentElement.clientWidth / 2);

const dataArray = Object.entries(data),
	num = dataArray.length; //25;
const maxCards = [8, 20, 30];

const elements = {};

let max=0;
for(let i=0; i<3; i++) {

	orbits[i] = newEl({
		className: 'orbit orbit'+i,
		onclick: function(e){
			const selected = e.target.classList.contains('selected');

			coins.querySelectorAll('.orbit, .coin').forEach(el=>el.classList.remove('selected', 'active'))
			coins.classList.remove('has-active');
			if (selected) return;

			this.classList.add('selected') ;
			e.target.classList.add('selected', 'active') ;
			coins.classList.add('has-active');
			data[e.target.id].forEach(id => document.getElementById(id).classList.add('active'))
		}
	}, coins);

	if ((max+=maxCards[i])>=num) break;
}

for(let orb=0, start=0; orb<orbits.length; orb++) {

	const count = Math.round(num/max*maxCards[orb]);

	orbits[orb].style.setProperty('--n', count);

	for (let i=0; i<count; i++) {
		const elData = dataArray[i+start], id=elData[0];

		elements[id] = newEl({ id,
			className: 'coin',
			css: {'--i': i}
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

		let effect = [300 + Math.random()*100, 300 + Math.random()*100]; // distances between glare
		effect = effect.concat([Math.random()*effect[0], Math.random()*effect[1]]); // initial glare shift

		connects.push({
			els: [el1, el2],
			color: [.5, .5, .5, 0],
			effect 
		});
		console.log(effect)
	})
})

const gl = canvas.getContext('webgl');//, {premultipliedAlpha: false});
twgl.addExtensionsToContext(gl);
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

		void main() {
			vec2 maxab = max(a, b)+2.;
			vec2 minab = min(a, b)-2.;

		  ab = a - b;
		  ab2 = length(ab)/pRatio;

		  float wHalf = pRatio*12.;
		  vec2 ort = normalize(ab).yx*wHalf;
		  ort.x *= -1.;

		  gl_Position.xy = ((coord.x > 0. ? a : b) + ort * coord.y) / resolution * 2. - 1.;
		  gl_Position.w = 1.;
		  vCoord = coord*vec2(ab2, wHalf); 
		  //vec4(mix(minab, maxab, coord)/resolution*2. - 1.;
		}
	`, `
		#extension GL_OES_standard_derivatives : enable

		precision mediump float;

		uniform vec2 a;
		uniform vec2 b;

		uniform float pRatio;
		uniform vec4 color, effData;

		varying vec2 ab, vCoord;
		varying float ab2;

		float pow2(float val) {return val*val;}

		void main() {
			vec2 p = gl_FragCoord.xy;
			vec2 
				pa = a - p,
				pb = b - p;
			float w = .9*pRatio,
			 h = abs(vCoord.y);
			//if (h > w + 2.8) discard;

			float	delta =  mod(-vCoord.x + effData.z, effData.x),
				effect = exp(-.3-.12*delta)*(sqrt(delta)+.1);

			gl_FragColor = color + vec4(.5 *color.rgb * effect * color.rgb, 0.);
			w += w * .7 * effect;
			gl_FragColor.a *= (w + .4 - h)*cos(fwidth(h)*.5);
			//gl_FragColor.a = max(gl_FragColor.a, .1);
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
	const selected = coins.querySelector('.coin.selected');

	for (let id in elements) {
		const el = elements[id],
			{x, y} = el.getBoundingClientRect();
		el._pos = [(x - left) * devicePixelRatio, (height - y + top) * devicePixelRatio]//, .9]
		el._highlighted = el.classList.contains('active');
	}
	const dc = dt*.006, dShift = dt * .03;
	connects.forEach(({els: [a, b], color, effect}) => {
		
		setUniform.a(a._pos);
		setUniform.b(b._pos);

		const targColor = (a == selected || b == selected) ? light : mainColor;

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
