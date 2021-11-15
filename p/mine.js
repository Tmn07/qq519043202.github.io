as = document.getElementsByTagName('a');
for (var i = as.length - 1; i >= 0; i--) {
  a = as[i];
  a.style.color = '#5abfb7';
  a.setAttribute('target', "_blank");
}
