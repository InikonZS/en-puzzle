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

    this.source = new Source(this.node, '');
    this.source.stylePref = `
      width: ${cw}px;
      height: ${cw/asp/10}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;
    this.source.node.style=this.source.stylePref;

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

 /*   this.pict = new Source(this.node,'div','');
    this.pict.stylePref = `
      width: ${cw}px;
      height: ${cw/asp}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;*/

    this.dest = new Control(this.node,'div','');
    this.rows=[];
    
    this.dest.stylePref = `
      width: ${cw}px;
      height: ${cw/asp}px;
      font-size:9pt;
      font-family:impact;
      position:relative;
      border-style:solid;
    `;

    this.dest.node.style= this.dest.stylePref;


    let imax = 10;
    for (let i=0; i<imax; i++){
      let row = new Control(this.dest.node, 'div');
      row.blocks = [];
      row.node.style=`
        display: flex;
        height: ${ch/imax}px;
      `;

      let rnd = rand(data.length);
      let jmax = data[rnd].split(' ').length;
      data[rnd].split(' ').forEach((jt, j)=>{
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
        bl.setPosition(cw/ jmax*j, ch/ imax*i);
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
                  it.animatePosition(cw/ jmax*(ii+1), ch/ imax*i);
                } else {
                  it.animatePosition(cw/ jmax*(ii), ch/ imax*i);
                }
                it.applyPosition();
              }
              if (ii>ic && ic!=-1){
                if (it.posX>px){
                  it.animatePosition(cw/ jmax*(ii), ch/ imax*i);
                } else {
                  it.animatePosition(cw/ jmax*(ii-1), ch/ imax*i);
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
            bl.animatePosition(cw/ jmax*(ic), ch/ imax*i);
            bl.applyPosition();

            sourceRow.blocks.sort((a, b)=>{
              return (a.dragPosX>b.dragPosX)*2-1;
            });
          }

          if (sourceRow){
            sourceRow.blocks.forEach((it, ii)=>{
              it.animatePosition(cw/ jmax*(ii), ch/ imax*i);
              it.applyPosition();
            });
          } else {
            bl.animatePosition(cw/ jmax*(j), ch/ imax*i);
            bl.applyPosition(); 
          }
          ///
          this.source1.dropAwait=false;
          this.source.dropAwait=false;
          this.source1.dropReady = false;
          this.source.dropReady = false;
          this.source1.node.style = this.source1.stylePref+'border-color:#000';
          this.source.node.style = this.source.stylePref+'border-color:#000';
          
        };

        bl.onDragStart=()=>{
          this.source1.dropAwait=true;
          this.source.dropAwait=true;
        }

        row.blocks.push(bl);

       /* if (i==4){
          this.source.node.appendChild(bl.node);
          this.source.blocks.push(bl);
        }*/
        //bl.node.style = bl.stylePref;
      });
      this.rows.push(row);
    }
  }
}

function rand(limit){
  return Math.trunc(Math.random()*limit);
}

module.exports = ImBlock;