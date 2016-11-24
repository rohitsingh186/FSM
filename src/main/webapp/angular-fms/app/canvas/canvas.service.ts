import {Table} from "../table/table";
import {UtilService} from "../util/util.service";
import {Injectable} from "@angular/core";
import {Layout} from "../layout/layout";

declare var fabric:any;
@Injectable()
export class CanvasService{
    private canvas:any;
    panning:boolean = false;

    constructor(private utilService:UtilService){
    }

    renderLayout(layout:Layout):void{
        this.initCanvas();
        this.utilService.calculateGridSize(layout.getFloor());
        for(let table of layout.getTables()) {
            this.drawTable(table);
        }
        for(let chair of layout.getChairs()){
            this.drawChair(chair);
        }
    }
    initCanvas():void{
        this.canvas = new fabric.Canvas('workarea', {selection: false, defaultCursor: "move"});
        this.resizeCanvas();
        this.mouseUpEvent();
        this.mouseDownEvent();
        this.mouseMoveEvent();
        this.setupFloor();
    }
    resizeCanvas():void{
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
    }
    mouseUpEvent():void{
        this.canvas.on('mouse:up', (e)=> this.panning = false);
    }
    mouseDownEvent():void{
        this.canvas.on('mouse:down',(e)=> this.panning = true);
    }
    mouseMoveEvent():void{
    this.canvas.on('mouse:move', (e)=> {if (this.panning && e && e.e) {
        let delta = new fabric.Point(e.e.movementX, e.e.movementY);
        this.canvas.relativePan(delta);
    }
    });
    }
    zoomIn():void{
        this.canvas.setZoom(this.canvas.getZoom()*1.1) ;
    }
    zoomOut():void{
        this.canvas.setZoom(this.canvas.getZoom()/1.1) ;
    }
    zoomReset():void{
        this.canvas.setZoom(1);
    }
    zoom(e):boolean{
        let evt = window.event || e;
        let delta = (evt.detail)?(evt.detail*(-120)):(evt.wheelDelta);
        let curZoom = this.canvas.getZoom();
        let newZoom = curZoom + delta/4000;
        var x = e.offsetX, y = e.offsetY;
        //applying zoom values.
        this.canvas.zoomToPoint({x: x, y: y}, newZoom);
        if(e != null){
            e.preventDefault();
        }
        return false;
    }
    /* Used to add slider functionality
    changeZoomLevel():void{
     this.canvas.setZoom(1);
     var value=(50-this.value)/100;
     if (value < 0)
     {
     canvas.setZoom(canvas.getZoom() * (1 - value ));
     }
     else {
     canvas.setZoom(canvas.getZoom() / (1 + value));
     }
     }*/

    setupFloor():void{
    this.canvas.setBackgroundColor({source: this.utilService.IMG_PATH + this.utilService.FLOOR_PATTERN_FILE, repeat: 'repeat'},
    ()=> this.canvas.renderAll());
    }

    drawTable(table:Table):void{
    fabric.util.loadImage(this.utilService.IMG_PATH + this.utilService.TABLE_PATTERN_FILE, (img)=>{
    this.canvas.add(new fabric.Rect({
        left:table.getLeftTopPoint().getX()*this.utilService.GRID_SIZE ,
        top: table.getLeftTopPoint().getY()*this.utilService.GRID_SIZE ,
        width: table.getWidth()*this.utilService.GRID_SIZE,
        height: table.getLength()*this.utilService.GRID_SIZE,
        originX: 'left',
        originY: 'top',
        rx : this.utilService.TABLE_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE,
        ry: this.utilService.TABLE_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE,
        hasControls: false,
        selectable: false,
        fill: new fabric.Pattern({source:img}),
        hoverCursor: 'move'
        }));
    });
    this.canvas.renderAll();
    }

    drawChair(chair):void{
    //Seat
    var mid = new fabric.Rect({
        left : chair.x + 2*this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE + this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        top :  chair.y + 2*this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE + this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        stroke : 'grey',
        width : chair.width - 4*this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE -2*this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        height : chair.height - 4*this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE -2*this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        rx : this.utilService.CHAIR_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE,
        ry : this.utilService.CHAIR_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE
        });
    //Left Arm
    var leftArm = new fabric.Rect({
        left : chair.x + this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE,
        top :  chair.y + chair.height/4,
        stroke : 'grey',
        width : this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        height : chair.height/2,
        rx : this.utilService.ARM_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE,
        ry : this.utilService.ARM_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE
        });
    //Right Arm
    var rightArm = new fabric.Rect({
        left : chair.x + chair.width - this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE - this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        top :  chair.y + chair.height/4,
        stroke : 'grey',
        width : this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        height : chair.height/2,
        rx : this.utilService.ARM_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE,
        ry : this.utilService.ARM_BORDER_RADIUS_RATIO*this.utilService.GRID_SIZE
        });
    //UpperArm
    var upperArm = new fabric.Rect({
        left : chair.x + chair.width/4,
        top :  chair.y + this.utilService.CHAIR_PADDING*this.utilService.GRID_SIZE,
        stroke : 'grey',
        width : chair.width/2,
        height : this.utilService.MIN_BLOCK_SIZE_RATIO*this.utilService.GRID_SIZE,
        rx : 0,
        ry : 0
        });
    var group = new fabric.Group([leftArm,rightArm,mid,upperArm],{
        left : chair.x + chair.width/2,
        top  : chair.y + chair.height/2,
        originX : 'center',
        originY : 'center',
        selectable : false,
        angle : chair.angle,
        fill: "#cccccc",
        entity : "chair",
        deskid: chair.deskid
        });
    this.canvas.add(group);
    }
}