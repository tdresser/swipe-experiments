import './style.css'

export function fail(): never {
  throw new Error("missing element");
}
let square = document.getElementById("square") ?? fail();
let debug = document.getElementById("debug") ?? fail();

const props = ["sX", "sY", "sDist", "XsizeMultiplier", "YsizeMultiplier"];

function update() {
  window.requestAnimationFrame(update);
  let s = "";
  for (let prop of props) {
    s += prop + " : " + getComputedStyle(square).getPropertyValue("--" + prop) + "</br>";
  }
  debug.innerHTML = s;
}

update();

