const Control = require('./control.component.js');

class Dragable extends Control{
  constructor(parentNode, className, textContent){
    super(parentNode, 'div', className, '');
    this.textWrapper = new Control(this.node, 'div', '', textContent);
    this.textWrapper.node.style = `
      background-color: #0009;
    `;

    //this.parentNode = parentNode;
    this.isDisabled = false;
    this.isDragStarted = false;
    this.posX;
    this.posY;
    this.dragPosX;
    this.dragPosY;
    this.dragStartX;
    this.dragStartY;

    this.stylePref = '';

    this.node.addEventListener('mousedown', (e)=>{
      if (e.buttons == 1 && !this.isDisabled){
        /*let r = this.node.getBoundingClientRect();
        this.posX =  r.left;
        this.posY = r.top;*/

        this.isDragStarted = true;
        this.dragStartX = e.pageX;
        this.dragStartY = e.pageY;
        if (this.onDragStart){
          this.onDragStart();
        }
      }
    });

    document.addEventListener('mousemove', (e)=>{
      if (this.isDragStarted){
        //this.setPosition(this.posX - this.dragStartX + e.pageX, this.posY);
        this.setPosition(this.posX - this.dragStartX + e.pageX, this.posY - this.dragStartY + e.pageY);
        if (this.onDragProcess){
          this.onDragProcess(this.posX - this.dragStartX + e.pageX, this.posY - this.dragStartY + e.pageY);
        }
      }
    });

    document.addEventListener('mouseup', (e)=>{
      if (this.isDragStarted){
        this.isDragStarted = false;
        if (this.onDragEnd){
          if (Math.abs(e.pageX - this.dragStartX) + Math.abs(e.pageY - this.dragStartY)<3) {
            this.onClick();
          } else {
            this.onDragEnd(this.posX - this.dragStartX + e.pageX, this.posY - this.dragStartY + e.pageY);
          }
        } else {
          this.applyPosition();
        }
      }
    });
  }
  
  setPosition(x, y){
    this.dragPosX = Math.trunc(x);
    this.dragPosY = Math.trunc(y);
    this.node.style = this.stylePref + `
      transform: 
      translateX(${this.dragPosX /*- this.parentNode.offsetLeft*/}px)
      translateY(${this.dragPosY /*- this.parentNode.offsetTop*/}px);
      z-index:10;
    `;
  }

  animatePosition(x, y){
    this.dragPosX = Math.trunc(x);
    this.dragPosY = Math.trunc(y);
    this.node.style = this.stylePref +  `
      transform: 
      translateX(${this.dragPosX /*- this.parentNode.offsetLeft*/}px)
      translateY(${this.dragPosY /*- this.parentNode.offsetTop*/}px);
        transition-duration: 400ms;
    `;  
  }

  applyPosition(){
    this.posX = this.dragPosX;
    this.posY = this.dragPosY;
  }

  disable(){
    this.isDisabled =true;
  }
}

module.exports = Dragable;