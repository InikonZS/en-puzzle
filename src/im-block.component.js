const Control = require('./control.component.js');
const data = require('./data.dev.js');
const Dragable = require('./dragable-m.component.js');
const Source = require('./source-dash.component.js');

class ImBlock extends Control{
  constructor(parentNode, className, textContent){
    super(parentNode, 'div', className, textContent);

    let asp = 1300/813;
    let cw = 700;
    let ch = Math.trunc(cw/asp);
    this.ch =ch;
    this.cw=cw;
    this.asp=asp;
    this.sentCount = 0;

    this.source = new Source(this.node, '');
    this.source.stylePref = `
      width: ${cw}px;
      height: ${cw/asp/10}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
      margin-bottom:20px;
    `;
    this.source.node.style=this.source.stylePref;

    

    this.pict = new Control(this.node,'div','');
    this.pict.node.style = `
      width: ${cw}px;
      height: ${cw/asp * this.sentCount}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;

    this.source1 = new Source(this.node, '');
    this.source1.stylePref = `
      width: ${cw}px;
      height: ${cw/asp/10}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;
    this.source1.node.style=this.source1.stylePref;


    this.dest = new Control(this.node,'div','');
    this.rows=[];
    
    this.dest.stylePref = `
      width: ${cw}px;
      height: ${cw/asp}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
      display:none;
    `;

    this.dest.node.style= this.dest.stylePref;


    let imax = 10;
    for (let i=0; i<imax; i++){
      let row = new Control(this.dest.node, 'div');
      row.blocks = [];
      row.node.style=`
        position: relative;
        display: flex;
        height: ${ch/imax}px;
      `;

      let rnd = rand(data.length);
      let jmax = data[rnd].split(' ').length;
      let sentence = data[rnd];
      row.sentence = sentence;
      sentence.split(' ').forEach((jt, j)=>{
        let bl = new Dragable(row.node, 'bl_style', jt);

        bl.stylePref = `
          display:flex;
          justify-content:center;
          align-items:center;
          position:absolute;
          background-image:url(assets/xaker.jpg);
          background-size: ${cw}px;
          background-position-x:${-cw/ jmax*j}px;
          background-position-y:${-ch/ imax*i}px;
          width:${Math.trunc(cw/jmax)+1}px;
          height:${Math.trunc(ch/imax)+1}px;
          box-sizing:border-box;
          color:#fff;
          user-select:none;
        `; 
        bl.setPosition(cw/ jmax*j, 0);
        bl.applyPosition();

        bl.onDragProcess=(px, py)=>{
          let destRow;
          if (this.source.dropReady){
            destRow = this.source;
          }
          if (this.source1.dropReady){
            destRow = this.source1;
          }
          if (destRow){
            let ic = destRow.blocks.indexOf(bl);
            destRow.blocks.forEach((it, ii)=>{
              if (ii<ic || ic==-1){
                if (it.posX>px){
                  it.animatePosition(cw/ jmax*(ii+1), 0);
                } else {
                  it.animatePosition(cw/ jmax*(ii), 0);
                }
                it.applyPosition();
              }
              if (ii>ic && ic!=-1){
                if (it.posX>px){
                  it.animatePosition(cw/ jmax*(ii), 0);
                } else {
                  it.animatePosition(cw/ jmax*(ii-1), 0);
                }
                it.applyPosition();
              }
            });
          }
        }

        bl.onDragEnd=(px, py)=>{
          let destRow;
          let sourceRow;
          if (this.source.blocks.indexOf(bl)!=-1){
            sourceRow = this.source;
          }
          if (this.source1.blocks.indexOf(bl)!=-1){
            sourceRow = this.source1;
          }

          if (this.source.dropReady){
            destRow = this.source;
          }
          if (this.source1.dropReady){
            destRow = this.source1;
          }
          if( destRow && sourceRow){
            sourceRow.blocks.splice(sourceRow.blocks.indexOf(bl),1);
            destRow.blocks.push(bl);
            //bl.parentNode = destRow.node;
            destRow.node.appendChild(bl.node);

            destRow.blocks.sort((a, b)=>{
              return (a.dragPosX>b.dragPosX)*2-1;
            })
            let ic = destRow.blocks.indexOf(bl);
            bl.animatePosition(cw/ jmax*(ic), 0);
            bl.applyPosition();

            sourceRow.blocks.sort((a, b)=>{
              return (a.dragPosX>b.dragPosX)*2-1;
            });
          }

          if (sourceRow){
            sourceRow.blocks.forEach((it, ii)=>{
              it.animatePosition(cw/ jmax*(ii), 0);
              it.applyPosition();
            });
          } else {
            bl.animatePosition(cw/ jmax*(j), 0);
            bl.applyPosition(); 
          }
          ///
          this.source1.dropAwait=false;
          this.source.dropAwait=false;
          this.source1.dropReady = false;
          this.source.dropReady = false;
          this.source1.node.style = this.source1.stylePref+'border-color:#000';
          this.source.node.style = this.source.stylePref+'border-color:#000';

          onStepEnd(this, this.source1.blocks, i);
        };

        bl.onClick=()=>{
          if (this.source.blocks.indexOf(bl)!=-1){
            this.source.blocks.splice(this.source.blocks.indexOf(bl),1);
            this.source1.blocks.push(bl);
            this.source1.node.appendChild(bl.node);  
            bl.animatePosition(cw/ jmax*(this.source1.blocks.length-1), 0);
            bl.applyPosition();
            this.source.blocks.forEach((it, ii)=>{
              it.animatePosition(cw/ jmax*(ii), 0);
              it.applyPosition();
            });
            onStepEnd(this, this.source1.blocks, i);
          }
          this.source1.dropAwait=false;
          this.source.dropAwait=false;
          this.source1.dropReady = false;
          this.source.dropReady = false;
          this.source1.node.style = this.source1.stylePref+'border-color:#000';
          this.source.node.style = this.source.stylePref+'border-color:#000';
        }

        bl.onDragStart=()=>{
          this.source1.dropAwait=true;
          this.source.dropAwait=true;
        }

        row.blocks.push(bl);

      });
      this.rows.push(row);
    }
  
    this.rows[this.sentCount].blocks.forEach(it=>{
      this.source.node.appendChild(it.node);
      this.source.blocks.push(it);
    });


  }
}

function onStepEnd(game, sb, i){
  let sentence = [];
  sb.forEach((it)=>{
    sentence.push(it.node.textContent);
  });
  console.log(game.rows[i].sentence, sentence.join(' '));
  if (game.rows[i].sentence == sentence.join(' ')){
    console.log('correct');
    let row = new Control(game.pict.node, 'div');
    row.blocks = [];
    row.node.style=`
      display: flex;
      height: ${game.ch/10}px;
    `;
    sb.forEach(it=>{
      it.disable();
      row.node.appendChild(it.node);
    });

    game.source1.blocks=[]; 
    game.sentCount++;
    game.pict.node.style = `
      width: ${game.cw}px;
      height: ${((game.cw/game.asp)/10) * game.sentCount}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;

    if (game.rows[game.sentCount]){
      game.rows[game.sentCount].blocks.forEach(it=>{
        game.source.node.appendChild(it.node);
        game.source.blocks.push(it);
      });
    } else {
      gameWin();  
    }

  }

}

function gameWin(){
  console.log('win');
  //todo
}

function rand(limit){
  return Math.trunc(Math.random()*limit);
}

module.exports = ImBlock;