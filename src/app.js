const Control = require('./control.component.js');
const Dragable = require('./dragable.component.js');
const Source = require('./source-dash.component.js');
const Dest = require('./dest-dash.component.js');
const ImBlock = require('./im-block.component.js');
const data = require('./data.dev.js');

class App {
  constructor(parentNode) {
  //  this.source = new Dest(parentNode, 'source_dash', '');
  //  this.dest = new Dest(parentNode, 'dest_dash', '');
    this.bl = new ImBlock(parentNode, '');
 /*
    this.wordList = [];
    data[rand(data.length)].split(' ').forEach(it=>{
      let el = new Dragable(this.source.node, 'dragable', it);
      let px = rand(this.source.node.clientWidth-el.node.clientWidth);
      let py = rand(this.source.node.clientHeight-el.node.clientHeight);
      el.setPosition(px, py);
      el.applyPosition();

      el.onDragEnd=()=>{
        if (this.dest.dropReady){
          this.dest.node.appendChild(el.node);
          el.parentNode = this.dest.node;
          el.setPosition(el.dragPosX, el.dragPosY);
          el.applyPosition();
          this.dest.dropAwait = false;
          this.dest.dropReady = false;
        }
        if (this.source.dropReady){
          this.source.node.appendChild(el.node);
          el.parentNode = this.source.node;
          el.setPosition(el.dragPosX, el.dragPosY);
          el.applyPosition();
          this.source.dropAwait = false;
          this.source.dropReady = false;
        }
        el.animatePosition(el.posX, el.posY);
        el.applyPosition();
        this.dest.dropAwait=false;
        this.source.dropAwait=false;
        this.dest.dropReady = false;
        this.source.dropReady = false;
        this.dest.node.style = 'border-color:#000';
        this.source.node.style = 'border-color:#000';
      }

      el.onDragStart=()=>{
        this.dest.dropAwait=true;
        this.source.dropAwait=true;
      }
      this.wordList.push(el);
    });
    */
  }
}

function rand(limit){
  return Math.trunc(Math.random()*limit);
}

module.exports = App;
