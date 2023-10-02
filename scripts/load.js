const { Item } = require("paper/dist/paper-core");
const paper = require("paper/dist/paper-core");
const $ = require('jquery');

paper.install(window);

showInfoBox = function(){
    var showBox = new Path.Rectangle({
        point: [32, 32],
        size: [700, 300],
        fillColor: 'black',
        strokeColor: 'white'
    });

    var boxText = new PointText({
        point: new Point(64, 64),
        fontFamily: 'More Perfect DOS',
        fontSize: 16,
        fillColor: 'white'
    });

    boxText.content = `
    Lorem ipsum dolor sit amet. Et placeat fugiat sit magni molestias aut 
    provident alias et adipisci consequatur sit quaerat labore. 
    33 corporis nulla in facilis laborum a mollitia suscipit id amet 
    facilis aut consectetur provident et corrupti unde. 
    Id minima reiciendis sit doloribus ullam sit saepe nesciunt est 
    suscipit beatae sed internos iusto qui totam fuga?

    Press ESC to close the box.
    `
}

closeInfoBox = function(){
    //console.log('wow');
    var item = paper.project.activeLayer.children.at(-1);
    var item2 = paper.project.activeLayer.children[paper.project.activeLayer.children.length - 2];
    item.remove();
    item2.remove();
}

window.onload = function() {
    paper.setup('draw');

    var count = 120;
    const characters = '#';
    var sizeY = 16;
    var scaleY = 2;
    const charactersLength = characters.length;

    // Create a symbol, which we will use to place instances of later:
    var text = new PointText({
        point: new Point(0, 0),
        fontFamily: 'More Perfect DOS',
        fontSize: 10,
        fillColor: 'white'
        //strokeColor: 'pink'
    });

    var bootText = new PointText({
        point: new Point(400, 64),
        fontFamily: 'More Perfect DOS',
        fontSize: 16,
        fillColor: 'white'
    });

    var rect = new Path.Rectangle({
        point: [0, 0],
        size: [1600, 32],
        fillColor: 'black',
        clipMask: true
    });

    var cursor = new Path.Rectangle({
        point: [32, 0],
        size: [8, 16],
        fillColor: 'white'
    });

    var symbol = new Symbol(text);

    var defintion = new SymbolDefinition(rect);
    text.content = characters.charAt(Math.floor(Math.random() * charactersLength));

    for (var i = 0; i < count; i++) {

        var theta = i * 0.1;
        var x = (i+theta) * Math.cos(theta) + 200 + Math.random() * (4 - - 4) + -4; 
        var y = (i+theta) * Math.sin(theta) + 200 + Math.random() * (4 - - 4) + -4; 
        // The center position is a random point in the view:
        var center = [x, y];
        var placedSymbol = symbol.place(center);
        placedSymbol.scale(Math.random() * (2.0 - 1.0) + 1.0);                
    
            //var copySymbol = placedSymbol.clone();
        copySymbol = symbol.place([x+(Math.random() * (25 - - 25) + -25), y+Math.random() * (25 - - 25) + -25]);
    }

    bootText.content = `My DOS - Ver 6.0
-------------------------
Memory: 326 KB 
CPU: Intel Pentium II 223 MHz
Disk 0: 1023 cylinders, 64 heads, 63 sectors

List of Commands:
-about (About Page)
-projects (Project Section)


Please wait for loading to finish before
proceeding with input...`

    //console.log(paper.project.activeLayer.children.length);
    var instance = new SymbolItem(defintion);
    instance.clipMask = true;

    view.onFrame = function(event) {
        if(cursor.position.x < 768 && cursor.position.y + cursor.bounds.height < 400) {
            cursor.position.x += 12;
        } else if (cursor.position.x > 756) {
            cursor.position.x = 32;
        }
        if(event.count % 30 == 0) {
            if(instance.bounds.height < 800){
                var temp = 1 + (1/scaleY);
                instance.scale(1, temp);
                sizeY += 32;
                scaleY += 1;
                cursor.position.y += 8;
                //console.log(cursor.position.y);
            }
        }
        if(cursor.position.y == 392) {
            var hidElem = document.getElementById('user-input');
            for(const child of hidElem.children){
                child.setAttribute('style', 'visibility: visible;');
                if(child.tagName == 'input'){
                    setTimeout(() => {child.setAttribute('autofocus', 'true');})
                }
            }
            cursor.remove();
        }
    }
}