<template>
	<div>
		<div id='container'></div>
	<div class='info'>操作说明：圆和矩形通过拖拽来绘制，其他覆盖物通过点击来绘制</div>
	<div class="input-card" style='width: 24rem;'>
	    <div class="input-item">
	      <input type="radio" name='func' checked="" value='marker'><span class="input-text">画点</span>
	      <input type="radio" name='func' value='polyline'><span class="input-text">画折线</span>
	      <input type="radio" name='func' value='polygon'><span class="input-text" style='width:5rem;'>画多边形</span>
	    </div>
	    <div class="input-item">
	      <input type="radio" name='func' value='rectangle'><span class="input-text">画矩形</span>
	      <input type="radio" name='func' value='circle'><span class="input-text">画圆</span>
	    </div>
	    <div class="input-item">
	        <input id="clear" type="button" class="btn" value="清除" />
	      <input id="close" type="button" class="btn" value="关闭绘图" />
	    </div>
	</div>
	<remote-script src="https://webapi.amap.com/maps?v=1.4.15&key=b76a8629bc4c28402cd84cb7a979246e&plugin=AMap.MouseTool"></remote-script>
	</div>
	
</template>

<script>
	export default {
	  name: 'gdMap',
	  props: {
	    // isActive: {
	    //   type: Boolean,
	    //   default: false
	    // }
	  },
	  data() {
	    return {
	      mouseTool: ''
	    }
	  },
	  methods: {
	    // toggleClick() {
	    //   this.$emit('toggleClick')
	    // }
		show(){
			var map = new AMap.Map('container',{
			    zoom:14
			});
			console.log(map)
			this.mouseTool = new AMap.MouseTool(map); 
			//监听draw事件可获取画好的覆盖物
			var overlays = [];
			this.mouseTool.on('draw',function(e){
			    overlays.push(e.obj);
			}) 
		},
	   draws(type){
	    switch(type){
	      case 'marker':{
	          this.mouseTool.marker({
	            //同Marker的Option设置
	          });
	          break;
	      }
	      case 'polyline':{
	          this.mouseTool.polyline({
	            strokeColor:'#80d8ff'
	            //同Polyline的Option设置
	          });
	          break;
	      }
	      case 'polygon':{
	          this.mouseTool.polygon({
	            fillColor:'#00b0ff',
	            strokeColor:'#80d8ff'
	            //同Polygon的Option设置
	          });
	          break;
	      }
	      case 'rectangle':{
	          this.mouseTool.rectangle({
	            fillColor:'#00b0ff',
	            strokeColor:'#80d8ff'
	            //同Polygon的Option设置
	          });
	          break;
	      }
	      case 'circle':{
	          this.mouseTool.circle({
	            fillColor:'#00b0ff',
	            strokeColor:'#80d8ff'
	            //同Circle的Option设置
	          });
	          break;
	      }
	    }
	  },
	  showtwo(){
		var radios = document.getElementsByName('func');
		for(var i=0;i<radios.length;i+=1){
		    radios[i].onchange = function(e){
				console.log(e.target.value)
				this.draws()
		      // this.draws(e.target.value)
		    }
		}
		this.draws('polyline')
		
		document.getElementById('clear').onclick = function(){
		    map.remove(overlays)
		    overlays = [];
		}  
		document.getElementById('close').onclick = function(){
		    this.mouseTool.close(true)//关闭，并清除覆盖物
		    for(var i=0;i<radios.length;i+=1){
		        radios[i].checked = false;
		    }
		}  
	  }
	  },
	  created() {
	    setTimeout(() => {
	      this.number = 100
	      this.$nextTick(() => {
	       var radios = document.getElementsByName('func');
	       for(var i=0;i<radios.length;i+=1){
	           radios[i].onchange = function(e){
	       		console.log(e.target.value)
	       		this.draws()
	             // this.draws(e.target.value)
	           }
	       }
	       this.draws('polyline')
	       
	       document.getElementById('clear').onclick = function(){
	           map.remove(overlays)
	           overlays = [];
	       }  
	       document.getElementById('close').onclick = function(){
	           this.mouseTool.close(true)//关闭，并清除覆盖物
	           for(var i=0;i<radios.length;i+=1){
	               radios[i].checked = false;
	           }
	       } 
	      })
	    },100)
	  },   
	  mounted() {
		  setTimeout(()=>{
			  this.show()
		  },3000)
		  setTimeout(()=>{
		  	 this.showtwo()
		  },3000)
		  
		  // setTimeout(this.showtwo(),5000)
	 //  	this.show()
		// this.showtwo()
	  }
	}
</script>

<style>
	#container{
		margin-top: 200px;
		height: calc(100vh - 240px);
	}
	.input-item {
		height: 2.2rem;
	}

	.btn {
		width: 6rem;
		margin: 0 1rem 0 2rem;
	}

	.input-text {
		width: 4rem;
		margin-right: 1rem;
	}
</style>
