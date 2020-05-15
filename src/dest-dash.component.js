const Control = require('./control.component.js');

class Dest extends Control{
  constructor(parentNode, className, textContent){
    super(parentNode, 'div', className, textContent);
    this.dropAwait = false;
    this.dropReady = false;
    /*this.node.addEventListener('mouseleave', (e)=>{
      this.dropReady = false;
      this.node.style = 'border-color:#000'
    });

    this.node.addEventListener('mousemove', (e)=>{
      if(this.dropAwait){
        this.dropReady = true;
        this.node.style = 'border-color:#f00'
      } else {
        this.dropReady=false;
      }
    });*/
    document.addEventListener('mousemove', (e)=>{
      let x = e.clientX;
      let y = e.clientY;
      //console.log(e);
      let r = this.node.getBoundingClientRect();
      if (x>r.left && x<r.right && y>r.top && y<r.bottom){
        if(this.dropAwait){
          this.dropReady = true;
          this.node.style = 'border-color:#f00'
        } else {
          this.dropReady=false;
        }  
      } else {
        this.dropReady = false;
        this.node.style = 'border-color:#000'
      }
    });
  }
}

module.exports = Dest;