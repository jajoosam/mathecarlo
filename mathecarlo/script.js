!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

if(!isMobile.any){
	var width = window.innerWidth - 20;
	var height = window.innerHeight - 20;
}

else{
	var width = window.innerWidth;
	var height = window.innerHeight;
}

var total = 0;
var inCircle = 0;

var xz, yz, line;

if(width>height){
	width = height;
}
else{
	height = width;
}

var stage = new Konva.Stage({
	container: 'canvas',
	width: width,
	height: height
});

var layer = new Konva.Layer();
var layer2 = new Konva.Layer();
var rect = new Konva.Rect({
	x: 0,
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: '#57C791',
	stroke: '#57C791',
	strokeWidth: 0
});

var circle = new Konva.Circle({
	x: stage.getWidth() / 2,
	y: stage.getHeight() / 2,
	radius: stage.getHeight() / 2,
	fill: '#FF5858',
	stroke: '#FF5858',
	strokeWidth: 0
});

layer.add(rect);
layer.add(circle);

stage.add(layer);

function newPoint(){
	xz = Math.floor(Math.random() * stage.getWidth()) + 1;
	yz = Math.floor(Math.random() * stage.getHeight()) + 1;
	var circle = new Konva.Circle({
		x: xz,
		y: yz,
		radius: 1,
		fill: '#4F59D0',
		stroke: '#4F59D0',
		strokeWidth: 0
	});

	console.log("z " + xz + " " + yz);

	layer.add(circle);


	stage.add(layer);


	total++;

	line.destroy();

	var base = Math.max(xz, (width/2)) - Math.min(xz, (width/2));
	var height = Math.max(yz, (width/2)) - Math.min(yz, (width/2));
	var hyp = Math.sqrt((Math.pow(base, 2))+(Math.pow(height, 2)));

	console.log(hyp);

	if(hyp < width/2){
		console.log("in");
		newLine(xz, yz, true);
		inCircle++;
		fetch("https://db--jajoosam.repl.co/pi?total="+1+"&in="+1)
	}
	else{
		console.log("out");
		newLine(xz, yz, false);
		fetch("https://db--jajoosam.repl.co/pi?total="+1+"&in="+0);
	}
	updateVal();
}

document.body.onkeydown = function(e){
	
	if(e.keyCode == 32){
		newPoint();
		return !(e.keyCode == 32 && e.target == document.body);
	}
}

document.body.onclick = function(e){
	newPoint();
}

document.querySelector("#canvas").onclick = function(e){
	newPoint();
}

function updateVal(){
	document.querySelector("#percent").innerHTML = +((inCircle/total)*100).toFixed(3) + "%";

	document.querySelector("#pi").innerHTML = +(((inCircle/total)*100) / 25).toFixed(3);

	document.querySelector("#total").innerHTML = total;

	document.querySelector("#inCircle").innerHTML = inCircle;

	document.getElementsByClassName("dec")[0].innerHTML = 	+(inCircle/total).toFixed(2);

	document.getElementsByClassName("dec")[1].innerHTML = 	+(inCircle/total).toFixed(2);
		
	document.getElementsByClassName("dec")[2].innerHTML = 	+(inCircle/total).toFixed(2);
}

function newLine(xz, yz, inLine){
	var color = "#3d3d3d";
	if(inLine){
		color = "#2D96FF";
	}
	line = new Konva.Line({
		points: [xz, yz, width/2, height/2],
		stroke: color,
		tension: 1,
		strokeWidth: 5
	});

	layer.add(line);

	stage.add(layer);
	// line.destroy();
}
newLine(width/2, height/2, true)


