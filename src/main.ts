import './style.css'

export function fail(): never {
  throw new Error("missing element");
}
let square = document.getElementById("square") ?? fail();
let debug = document.getElementById("debug") ?? fail();
let scroll_container = document.getElementById("scroll_container") ?? fail();

const props = ["sX", "sY", "sDist",
  "XsizeMultiplier", "YsizeMultiplier",
];

function setProperty(name: string, value: number) {
  if (!props.includes(name)) {
    props.push(name);
  }
  square.style.setProperty('--' + name, value + "");
}

setProperty("viewportWidthPx", window.innerWidth);
setProperty("viewportHeightPx", window.innerHeight);
scroll_container.scrollLeft = window.innerWidth;
scroll_container.scrollTop = window.innerHeight;

function update() {
  window.requestAnimationFrame(update);
  let s = "";
  for (let prop of props) {
    s += prop + " : " + getComputedStyle(square).getPropertyValue("--" + prop) + "</br>";
  }
  debug.innerHTML = s;
}

// Listen for firstPointerMove to exclude touch slop (the distance the pointer moves before we call this a scroll).
function firstPointerMoveListener(e:PointerEvent) {
  scroll_container.removeEventListener("pointermove", firstPointerMoveListener);
  setProperty("pointerDownX", e.clientX);
  setProperty("pointerDownY", e.clientY);
}

scroll_container.addEventListener("pointerdown", (_:Event) => {
  scroll_container.addEventListener("pointermove", firstPointerMoveListener);
});

update();

