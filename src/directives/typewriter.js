import Vue from 'vue'

const typewriter = Vue.directive('typewriter', {
  bind(el, binding, vnode) {
    let str = binding.value.txt,
        len = str.length,
        delay = binding.value.delay || 0,
        speed = binding.value.speed || 30,
        current = '',
        currentChars = 0;

    window.requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function (f) { return setTimeout(f, 1000 / 60) } // simulate calling code 60 

    window.cancelAnimationFrame = window.cancelAnimationFrame
      || window.mozCancelAnimationFrame
      || function (requestID) { clearTimeout(requestID) } //fall back

    setTimeout(animate, delay);
    
    function animate() {
     current = el.textContent;
     currentChars = current.length;
     let update = current += str[currentChars];
     el.textContent = update;

     if(update != str) {
       if (speed==60) {
         window.requestAnimationFrame(animate);
       } else {
         setTimeout(() => {
           window.requestAnimationFrame(animate);
         }, 1000 / speed);
       }
     } else {
       // add callback
     }
    }
  }
});

export default typewriter;