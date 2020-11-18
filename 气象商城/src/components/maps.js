 //    var map = new AMap.Map('container',{
 //        zoom:14
 //    });
	// console.log(map)
 //    var mouseTool = new AMap.MouseTool(map); 
    //监听draw事件可获取画好的覆盖物
    var overlays = [];
    mouseTool.on('draw',function(e){
        overlays.push(e.obj);
    }) 
    
    function draw(type){
      switch(type){
        case 'marker':{
            mouseTool.marker({
              //同Marker的Option设置
            });
            break;
        }
        case 'polyline':{
            mouseTool.polyline({
              strokeColor:'#80d8ff'
              //同Polyline的Option设置
            });
            break;
        }
        case 'polygon':{
            mouseTool.polygon({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Polygon的Option设置
            });
            break;
        }
        case 'rectangle':{
            mouseTool.rectangle({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Polygon的Option设置
            });
            break;
        }
        case 'circle':{
            mouseTool.circle({
              fillColor:'#00b0ff',
              strokeColor:'#80d8ff'
              //同Circle的Option设置
            });
            break;
        }
      }
    }
    var radios = document.getElementsByName('func');
    for(var i=0;i<radios.length;i+=1){
        radios[i].onchange = function(e){

          draw(e.target.value)
        }
    }
    draw('marker')

    document.getElementById('clear').onclick = function(){
        map.remove(overlays)
        overlays = [];
    }  
    document.getElementById('close').onclick = function(){
        mouseTool.close(true)//关闭，并清除覆盖物
        for(var i=0;i<radios.length;i+=1){
            radios[i].checked = false;
        }
    }
	export {
		draw
	}