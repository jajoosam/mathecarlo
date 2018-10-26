fetch("https://www.jsonstore.io/bd910a02e3e696d96e1138d188251e34f6ceb29e3bb6f5b76e5b3bae6b6adceb/pi")
.then(res => res.json())
.then((out) => {
	out = out.result;
  console.log(out);
	var total = out.total;
	var inCircle = out.in;

	document.querySelector("#percent").innerHTML = +((inCircle/total)*100).toFixed(10) + "%";

	document.querySelector("#pi").innerHTML = +(((inCircle/total)*100) / 25).toFixed(10);

	document.querySelector("#total").innerHTML = total;

	document.querySelector("#inCircle").innerHTML = inCircle;

	document.getElementsByClassName("dec")[0].innerHTML = 	+(inCircle/total).toFixed(5);

	document.getElementsByClassName("dec")[1].innerHTML = 	+(inCircle/total).toFixed(5);
		
	document.getElementsByClassName("dec")[2].innerHTML = 	+(inCircle/total).toFixed(5);
})