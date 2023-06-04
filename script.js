
const connects = {
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

const coins = document.getElementById('coins');

const canvas = newEl({tag: 'canvas'}, coins);
const ctx = canvas.getContext('2d');

const orbits = [];

let width, height;

const elements = {}
let size = 50;
let current = null;
let centerX = Math.round(document.documentElement.clientWidth / 2 - 25);
let centerY = 350;

console.log(document.documentElement.clientWidth / 2);

const connectsArray = Object.entries(connects),
  num = connectsArray.length; //25;
const maxCards = [8, 20, 30];

let max=0;
for(let i=0; i<3; i++) {

  orbits[i] = newEl({
    className: 'orbit orbit'+i,
    onclick: function(e){
      const selected = e.target.classList.contains('selected');

      coins.querySelectorAll('.selected').forEach(el=>el.classList.remove('selected'))
      if (selected) return

      this.classList.add('selected') ;
      e.target.classList.add('selected') ;
    }
  }, coins);

  if ((max+=maxCards[i])>=num) break;
}

for(let orb=0, start=0; orb<orbits.length; orb++) {

  const count = Math.round(num/max*maxCards[orb]);

  orbits[orb].style.setProperty('--n', count);

  for (let i=0; i<count; i++) {
    const elData = connectsArray[i];
    newEl({
      id: elData[0],
      className: 'coin',
      css: {'--i': i}
    }, orbits[orb]);
  }
  start += count
}


/*------------------------------------

const calculateCoordinate = (count, r, cx, cy) => {
  const sectors = [];
  const maxCardFirst = 8;
  const maxCardSecond = 20;
  let startAngle = -90;
  let endXAngle = 0;
  let coefFirst = 2;
  let coefFSecond = 1.2;
  let coefFThird = 1.9;
  let scale = 1;

  if (count > maxCardSecond + maxCardFirst) {
    scale = 0.8;
  }

  if (width < 800 && width >= 520) {
    size = 40;
    coefFirst = 2.8;
    coefFSecond = 0.8;
    coefFThird = 1.2;
  } else if (width < 520) {
    size = 30;
    coefFirst = 3;
    coefFSecond = 0.6;
    coefFThird = 0.9;
  }

  coinsInner.style.transform = "scale(" + scale + ")";

  for (let i = 0; i < count; i++) {
    if (i <= maxCardFirst - 1) {
      const angle = 360 / maxCardFirst;
      endXAngle += angle;
      const rad = Math.PI / 180;
      const x = cx + r * Math.cos(startAngle * rad) / coefFirst;
      const y = cy + r * Math.sin(startAngle * rad) / coefFirst;
      startAngle += angle;
      sectors.push({ x, y });
    } else if (i <= maxCardSecond + maxCardFirst - 1) {
      const angle = count - maxCardFirst > maxCardSecond ? 360 / maxCardSecond : 360 / (count - maxCardFirst);
      endXAngle += angle;
      const rad = Math.PI / 180;
      const x = cx + r * coefFSecond * Math.cos(startAngle * rad);
      const y = cy + r * coefFSecond * Math.sin(startAngle * rad);
      startAngle += angle;
      sectors.push({ x, y });
    } else {
      const angle = 360 / (count - (maxCardFirst + maxCardSecond));
      endXAngle += angle;
      const rad = Math.PI / 180;
      const x = cx + r * coefFThird * Math.cos(startAngle * rad);
      const y = cy + r * coefFThird * Math.sin(startAngle * rad);
      startAngle += angle;
      sectors.push({ x, y });

    }
  }

  return sectors;
};


/*------------------------------------



let sections = calculateCoordinate(num, 200, centerX, centerY);

for (let i = num - 1; i >= 0; i--) {
  // создание dom-элемента
  const element = document.createElement('div')
  const innerElement = document.createElement('div')
  // element.addEventListener('mousedown', onMouseDown)
  element.addEventListener('click', handleOnClick)
  element.addEventListener('mouseover', onMouseOver)
  element.addEventListener('mouseout', onMouseOut)
  const id = 'el' + i
  element.id = id
  element.className = "coin"
  // element.append(innerElement)
  coinsInner.prepend(element)

  // тут будут храниться и изменяться все его координаты
  elements[id] = {
    // x: (width / 2 - size / 2) + i * size,
    x: sections[i].x,
    y: sections[i].y,
    startX: 0,
    startY: 0
  }

  // начальное положение
  translate(element, elements[id].x, elements[id].y)
}

// соединяем линиями
connect(elements)

/*------------------------------------
var isActive = false;
var canSetActive = true;
var activeId = null;
var activeOnMouseId = null;
var x = 0;
var y = 0;

var startX = x;
var startY = y;
var endX = centerX;
var endY = centerY;
var duration = 250; // Время анимации в миллисекундах
var durationTimeout = 350; // Время задержки в миллисекундах
var startTime = null;

var previousX, previousY;

// Клик на элемент
function handleOnClick(e) {
  // Если есть активный элемент и клик произведён на активный элемент
  if (isActive && canSetActive) {
    let changeElem = activeId !== e.target.id;

    x = elements[current.id].x = Math.round(elements[current.id].x);
    y = elements[current.id].y = Math.round(elements[current.id].y);
    startX = x;
    startY = y;
    startTime = null;

    activeId = null
    isActive = false;

    canSetActive = false;

    setTimeout(() => {
      canSetActive = true;
    }, durationTimeout);

    endX = previousX;
    endY = previousY;

    if (x <= endX && y <= endY) {
      requestAnimationFrame(drawPXPY);

    } else if (x <= endX && y >= endY) {
      requestAnimationFrame(drawPXMY);

    } else if (x >= endX && y <= endY) {
      requestAnimationFrame(drawMXPY);

    } else if (x >= endX && y >= endY) {
      requestAnimationFrame(drawMXMY);
    }

    onMouseOut();
    coinsInner.classList.add("no-active");
    coinsInner.classList.remove("has-active");

    if (changeElem) {

      setTimeout(() => {
        current = e.target;
        x = elements[current.id].x = Math.round(elements[current.id].x);
        y = elements[current.id].y = Math.round(elements[current.id].y);
        startX = x;
        startY = y;
        startTime = null;

        activeId = current.id;
        canSetActive = false;

        setTimeout(() => {
          canSetActive = true;
        }, duration);

        endX = centerX;
        endY = centerY;
        previousX = x;
        previousY = y;

        if (x <= endX && y <= endY) {
          requestAnimationFrame(drawPXPY);

        } else if (x <= endX && y >= endY) {
          requestAnimationFrame(drawPXMY);

        } else if (x >= endX && y <= endY) {
          requestAnimationFrame(drawMXPY);

        } else if (x >= endX && y >= endY) {
          requestAnimationFrame(drawMXMY);
        }

        isActive = true;
        coinsInner.classList.add("has-active");
        coinsInner.classList.remove("no-active");
      }, durationTimeout);
    }
  }

  // Если нет активного элемента
  if (activeId == null && canSetActive) {
    current = e.target
    x = elements[current.id].x = Math.round(elements[current.id].x);
    y = elements[current.id].y = Math.round(elements[current.id].y);
    startX = x;
    startY = y;
    startTime = null;

    activeId = current.id;
    canSetActive = false;

    setTimeout(() => {
      canSetActive = true;
    }, duration);


    endX = centerX;
    endY = centerY;
    previousX = x;
    previousY = y;


    if (x <= endX && y <= endY) {
      requestAnimationFrame(drawPXPY);

    } else if (x <= endX && y >= endY) {
      requestAnimationFrame(drawPXMY);

    } else if (x >= endX && y <= endY) {
      requestAnimationFrame(drawMXPY);

    } else if (x >= endX && y >= endY) {
      requestAnimationFrame(drawMXMY);
    }

    isActive = true;
    coinsInner.classList.add("has-active");
    coinsInner.classList.remove("no-active");
  }
}

// Draw --- Plus X | Plus Y
function drawPXPY(timestamp) {
  if (!startTime) startTime = timestamp;
  var progress = timestamp - startTime;

  x = Math.floor((progress / duration) * (endX - startX)) + startX;
  y = Math.floor((progress / duration) * (endY - startY)) + startY;

  if (x < endX || y < endY) {
    requestAnimationFrame(drawPXPY);
  } else {
    x = endX;
    y = endY;
  }

  elements[current.id].x = x;
  elements[current.id].y = y;

  translate(current, x, y, 'pxpy')
  connect(elements)
}

// Draw --- Plus X | Minus Y
function drawPXMY(timestamp) {
  if (!startTime) startTime = timestamp;
  var progress = timestamp - startTime;

  x = Math.floor((progress / duration) * (endX - startX)) + startX;
  y = startY - Math.floor((progress / duration) * (startY - endY));

  if (x < endX || y > endY) {
    requestAnimationFrame(drawPXMY);
  } else {
    x = endX;
    y = endY;
  }

  elements[current.id].x = x;
  elements[current.id].y = y;

  translate(current, x, y, 'pxmy')
  connect(elements)
}

// Draw --- Minus X | Plus Y
function drawMXPY(timestamp) {
  if (!startTime) startTime = timestamp;
  var progress = timestamp - startTime;

  x = startX - Math.floor((progress / duration) * (startX - endX));
  y = Math.floor((progress / duration) * (endY - startY)) + startY;

  if (x > endX || y < endY) {
    requestAnimationFrame(drawMXPY);
  } else {
    x = endX;
    y = endY;
  }

  elements[current.id].x = x;
  elements[current.id].y = y;

  translate(current, x, y, 'mxpy')
  connect(elements)
}

// Draw --- Minus X | Minus Y
function drawMXMY(timestamp) {
  if (!startTime) startTime = timestamp;
  var progress = timestamp - startTime;

  x = startX - Math.floor((progress / duration) * (startX - endX));
  y = startY - Math.floor((progress / duration) * (startY - endY));

  if (x > endX || y > endY) {
    requestAnimationFrame(drawMXMY);
  } else {
    x = endX;
    y = endY;
  }

  elements[current.id].x = x;
  elements[current.id].y = y;

  translate(current, x, y, 'mxmy')
  connect(elements)
}

// При наведении мыши на элемент
function onMouseOver(e) {
  if (!isActive && canSetActive) {
    current = e.target
    activeOnMouseId = current.id;

    connect(elements);

    coinsInner.classList.add("has-active");
    coinsInner.classList.remove("no-active");
  }
}

// При отведении мыши с элемента
function onMouseOut(e) {

  if (!isActive) {
    activeOnMouseId = null;

    connect(elements);


    // Удалить класс .active со всех элементов
    let coins = document.querySelectorAll('.active');
    [].forEach.call(coins, function (el) {
      el.classList.remove("active");
    });

    coinsInner.classList.add("no-active");
    coinsInner.classList.remove("has-active");
  }
}


/*------------------------------------

function translate(el, x, y, func) {
  el.style.transform = `translate(${x}px, ${y}px)`
}

function connect(elements) {
  ctx.clearRect(0, 0, width, height);
  var color = "#aeaeae";

  for (var key in connects) {
    for (let i = 0; i < connects[key].length; i++) {
      if (key == activeOnMouseId || (isActive && key == activeId)) {
        color = "#fff";

        document.getElementById(key).classList.add("active");
        document.getElementById(connects[key][i]).classList.add("active");

      } else if (activeOnMouseId || isActive) {
        color = "transparent";
      } else {
        color = "#464646";
      }

      drawLine(
        elements[key].x,
        elements[connects[key][i]].x,
        elements[key].y,
        elements[connects[key][i]].y,
        color
      )
    }
  }
}

function drawLine(x1, x2, y1, y2, color) {
  ctx.beginPath()
  // из центра квадрата
  ctx.moveTo(x1 + size / 2, y1 + size / 2)
  ctx.strokeStyle = color;

  // var gradient = ctx.createLinearGradient(x2 + size / 2, 0, y2 + size / 2, 0);
  // gradient.addColorStop(0, '#8f8f8f');
  // gradient.addColorStop(.5, '#464646');
  // gradient.addColorStop(1, '#6f6f6f');
  // ctx.strokeStyle = gradient;
  // в центр другого квадрата
  ctx.lineTo(x2 + size / 2, y2 + size / 2)
  ctx.closePath()
  ctx.stroke()
}

/*------------------------------------*/

// onresize = () => {
//   width = canvas.width = 1000;
//   height = canvas.height = 1000;
//   connect(elements)
// }




/*------------------------------------*/

// Mouse Wheel Zoom

// var scale = 1,
//   panning = false,
//   pointX = 0,
//   pointY = 0,
//   start = { x: 0, y: 0 },
//   zoom = document.getElementById("zoom");

// function setTransform() {
//   zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
// }

// zoom.onmousedown = function (e) {
//   e.preventDefault();
//   start = { x: e.clientX - pointX, y: e.clientY - pointY };
//   panning = true;
// }

// zoom.onmouseup = function (e) {
//   panning = false;
// }

// zoom.onmousemove = function (e) {
//   e.preventDefault();
//   if (!panning) {
//     return;
//   }
//   pointX = (e.clientX - start.x);
//   pointY = (e.clientY - start.y);
//   setTransform();
// }

// zoom.onwheel = function (e) {
//   // e.preventDefault();
//   var xs = (e.clientX - pointX) / scale,
//     ys = (e.clientY - pointY) / scale,
//     delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
//   (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
//   pointX = e.clientX - xs * scale;
//   pointY = e.clientY - ys * scale;

//   setTransform();
// }







// function generateRandomConnections(numElements) {
//   var connections = {};

//   // Создаем связи между элементами
//   for (var i = 0; i < numElements; i++) {
//     var randomCount = Math.floor(Math.random() * (numElements / 2)) + 1; // Случайное количество связей
//     var randomConnections = [];

//     for (var j = 0; j < randomCount; j++) {
//       var randomIndex = Math.floor(Math.random() * numElements); // Случайный индекс другого элемента

//       // Убеждаемся, что случайно выбранный элемент не совпадает с текущим элементом и не был добавлен ранее
//       if (randomIndex !== i && randomConnections.indexOf('el' + randomIndex) === -1) {
//         randomConnections.push('el' + randomIndex);

//         // Добавляем обратную связь от случайно выбранного элемента к текущему элементу
//         if (connections['el' + randomIndex]) {
//           connections['el' + randomIndex].push('el' + i);
//         } else {
//           connections['el' + randomIndex] = ['el' + i];
//         }
//       }
//     }

//     connections['el' + i] = randomConnections; // Связываем текущий элемент с сгенерированными случайными связями
//   }

//   return connections;
// }

// var json = JSON.stringify(generateRandomConnections(25));
// console.log(json);