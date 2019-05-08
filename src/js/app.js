let pieces = document.getElementsByClassName('movil');

let sizeWidh = [134,192,134,163,134,163,134,192,134];
let sizeHeight = [163,134,163,134,192,134,163,134,163];

for(let i=0;i<pieces.length;i++){
	pieces[i].setAttribute("width", sizeWidh[i]);
	pieces[i].setAttribute("height",sizeHeight[i]);
	pieces[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	pieces[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	pieces[i].setAttribute("onmousedown","selectItem(evt)");
}

let elementSelect = 0;  
let currentX = 0;
let currentY = 0;
let currentPosX = 0;
let currentPosY = 0;

const selectItem = (evt) =>{
	elementSelect = reorder(evt);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moveItem(evt)");
}

const moveItem = (evt) =>{
	let dx = evt.clientX - currentX;
	let dy = evt.clientY - currentY;
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deselecItem(evt)");
	elementSelect.setAttribute("onmouseup","deselecItem(evt)");
	magnet();
}

const deselecItem = (evt) =>{
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

let environment = document.getElementById('environment');

const reorder = (evt) =>{
	let parents = evt.target.parentNode;
	let clone = parents.cloneNode(true);
	let id = parents.getAttribute("id");
	
environment.removeChild(document.getElementById(id));
	
environment.appendChild(clone);
	return environment.lastChild.firstChild;
}

let origX = [200,304,466,200,333,437,200,304,466];   
let origY = [100,100,100,233,204,233,337,366,337];

const magnet = () =>{
	for(let i=0;i<pieces.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
let win = document.getElementById("win");

const testing = ()=>{
	let correctLocation = 0;
	let parents = document.getElementsByClassName('parents');
	for(let i=0;i<pieces.length;i++){
		let posx = parseFloat(parents[i].firstChild.getAttribute("x"));    
		let posy = parseFloat(parents[i].firstChild.getAttribute("y"));
		ide = parents[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			correctLocation = correctLocation + 1;
		}
	}
	if(correctLocation == 9){
		win.play();
	}
}

