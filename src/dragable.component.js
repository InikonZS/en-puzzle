const Control = require('./control.component.js');

class Dragable extends Control{
  constructor(parentNode, className, textContent){
    super(parentNode, 'div', className, textContent);

    this.parentNode = parentNode;
    this.isDragStarted = false;
    this.posX;
    this.posY;
    this.dragPosX;
    this.dragPosY;
    this.dragStartX;
    this.dragStartY;

    this.node.addEventListener('mousedown', (e)=>{
      if (e.buttons == 1){
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
        
        this.setPosition(this.posX - this.dragStartX + e.pageX, this.posY - this.dragStartY + e.pageY);
        if (this.onDragProcess){
          this.onDragProcess();
        }
      }
    });

    document.addEventListener('mouseup', (e)=>{
      if (this.isDragStarted){
        this.isDragStarted = false;
        if (this.onDragEnd){
          this.onDragEnd();
        } else {
          this.applyPosition();
        }
      }
    });

  }

  setPosition(x, y){
    this.dragPosX = x;
    this.dragPosY = y;
    this.node.style = `
      position: absolute;
      transform: 
        translateX(${this.dragPosX - this.parentNode.offsetLeft}px)
        translateY(${this.dragPosY - this.parentNode.offsetTop}px);
    `;
  }

  animatePosition(x, y){
    this.dragPosX = x;
    this.dragPosY = y;
    this.node.style = `
      position: absolute;
      transform: 
        translateX(${this.dragPosX - this.parentNode.offsetLeft}px)
        translateY(${this.dragPosY - this.parentNode.offsetTop}px);
        transition-duration: 400ms;
    `;  
  }

  applyPosition(){
    this.posX = this.dragPosX;
    this.posY = this.dragPosY;
  }

}

module.exports = Dragable;