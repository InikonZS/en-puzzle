const Control = require('./control.component.js');

class Source extends Control{
  constructor(parentNode, className, textContent){
    super(parentNode, 'div', className, textContent);
    this.blocks = [];
    this.stylePref = '';
    this.dropAwait = false;
    this.dropReady = false;
    document.addEventListener('mousemove', (e)=>{
      let x = e.clientX;
      let y = e.clientY;
      let r = this.node.getBoundingClientRect();
      if (x>r.left && x<r.right && y>r.top && y<r.bottom){
        if(this.dropAwait){
          this.dropReady = true;
          this.node.style = this.stylePref + 'border-color:#f00'
        } else {
          this.dropReady=false;
        }  
      } else {
        this.dropReady = false;
        this.node.style = this.stylePref + 'border-color:#000'
      }
    });
  }
}

module.exports = Source;