var x = [];

window.addEventListener("load", function() {
  init();
}, false);

html = document.querySelector("html");
html.addEventListener("DOMSubtreeModified", function() {
  init();
}, false);

document.addEventListeiner("DOMContentLoaded", $values(), false);

function $Log(arg) {
  var t = new Date();
  var timeArray = [t.getFullYear(), t.getMonth() + 1, t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()];
  console.log("[" + timeArray.join("/") + "] " + arg);
}

function t(string, d) {
  var doc = d;
  replacedTmpl = template(string, $docs);
  d.innerHTML = replacedTmpl;
}

function init() {
  var d = document.querySelectorAll(".lp");
  if(typeof d === "undefined") {
    return(null);
  } else {
    for(i = 0; i<d.length; i++) {
      loadFile(d[i].dataset.raw, t, d[i]);
      d[i].classList.remove("lp");
    }
  }
  for(j = 0; j < x.length; j++) {
    x[j]();
  }
}

function template(tmpl, args) {
  return(tmpl.replace(/\.\.(.*?)\.\./g, function() {return(args[RegExp.$1]);}));
}

function loadFile(filename, callback, d) {
  var xhr = new XMLHttpRequest();
  callback("", d);
  xhr.addEventListener('loadend', function() {
    if(xhr.status === 200) {
      callback(xhr.responseText, d);
    } else {
      callback("", d);
      console.error(xhr.status+' '+xhr.statusText);
    }
  }, false);
  xhr.open('GET', filename+"?"+(new Date()).getTime(), true);
  xhr.send();
}