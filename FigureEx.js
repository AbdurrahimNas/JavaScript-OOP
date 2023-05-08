class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.type = "point";
    };
}

class Line{
    constructor(arr){
        this.type = "line";
        this.arr = this.setArr(arr);

    };

    setArr(arr){
        let c = [];
        for(let i in arr){
            c.push(new Point(arr[i][0], arr[i][1]));
        }
        return c;
    }
}

class Figure{
    constructor(){
        this.collection = [];
    }
    addPoint(x, y){
        this.collection.push(new Point(x, y));
    }
    addLine(arr){
        this.collection.push(new Line(arr));
    }
    toJSON(){
        return JSON.stringify(this.collection)
    }
    fromJSON(json, flag){
        if(flag){
            this.collection = new Array();
            return this.collection.push(JSON.parse(json));
        }
        return this.collection.push(JSON.parse(json));
    }
    deleteAll(){
        this.collection = new Array();
    }
};

let f = new Figure();
f.addPoint(10,20);
f.addPoint(10,10);
f.addLine([[10,20], [30,40], [50,60]]);
console.log(f)
let json = f.toJSON();
console.log(json);
f.fromJSON(json, true);
console.log(f)
f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}');
console.log(f);

