// Tip: Simple judgments may not fully cover
if (/MSIE\s|Trident\//.test(window.navigator.userAgent)) {
  document.body.innerHTML =
    "<strong>Sorry, this browser is currently not supported. We recommend using the latest version of a modern browser. For example, Chrome/Firefox/Edge.</strong>"
}
