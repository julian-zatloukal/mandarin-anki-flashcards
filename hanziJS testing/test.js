function loadHanziJS(initializeCallback) {
  var url =
    "https://raw.githubusercontent.com/julian-zatloukal/mandarin-anki-flashcards/master/hanziJS%20testing/bundle.js";
    window.hanziJSinitializeCallback = initializeCallback;
  fetch(url)
    .then((r) => r.text())
    .then((text) => {
      var script = document.createElement("script");
      script.innerHTML = text;
      document.head.appendChild(script);
    });
    
}
window.loadHanziJS = loadHanziJS;

function testHanziJS(){
    console.log('hanzi js loaded and ready to use');
}
window.testHanziJS = testHanziJS;