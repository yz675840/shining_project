			var ary=["img3/室外1021更新-0017.jpg","img3/室外1021更新-0009.jpg","img3/室外1021更新-0004.jpg","img3/室外1021更新-0015.jpg","img3/室外1021更新-0019.jpg","img3/室外1021更新-0022.jpg","img3/室外1021更新-0008.jpg","img3/室外1021更新-0018.jpg",
"img3/室外1021更新-0006.jpg","img3/室外1021更新-0016.jpg","img3/室外1021更新-0007.jpg","img3/室外1021更新-0020.jpg","img3/室外1021更新-0013.jpg","img3/室外1021更新-0014.jpg","img3/室外1021更新-0002.jpg","img3/室外1021更新-0012.jpg","img3/室外1021更新-0023.jpg",
"img3/室外1021更新-0001.jpg","img3/室外1021更新-0005.jpg","img3/室外1021更新-0011.jpg","img3/室外1021更新-0010.jpg","img3/1-150Z1102423343.jpg","img3/1-150Z11026024A.jpg","img3/1-150Z1102T4604.jpg","img3/1-150Z1103519419.jpg",
"img3/1-150Z1103U3K8.jpg","img3/1-150Z110411A47.jpg","img3/1-150Z1133KGa.jpg","img3/1-150Z1134115M3.jpg","img3/1-150Z113440VO.jpg","img3/1-150Z1134910156.jpg","img3/1-150Z1135111K4.jpg","img3/1-150Z113531G44.jpg",
"img3/1-150Z1135R1917.jpg","img3/1-150Z1140351E6.jpg","img3/1-150Z1140H2192.jpg","img3/1-150Z11405341K.jpg","img3/1-150Z1141032422.jpg"];
			
			
			//获取元素
			var oWrap=document.getElementById("wrap");
			var oLis=oWrap.getElementsByTagName("li");
			//li的宽度
			var liW=0;
			//li的外边距
			var margin=5
			//保存每列高度的数组
			var colH=[]
			
			//加载图片函数
			function loadimg(){
				//记录完成加载的图片数量
			var count=0;
			//加载图片
			for(var i in ary){
				var newli=document.createElement("li")
				//创建图片对象，专用格式
				var newImg=new Image();
				//设置图片的路径
				newImg.src=ary[i];
				//当图片加载完毕时触发
				newImg.onload=function(){
					count++;
					//判断是否全部加载完成
					if(count==ary.length){
						//当所有图片加载完毕调用瀑布流函数
						createfall()
					}
				}
				
				//将图片插入到li中
				newli.appendChild(newImg);
				//将li插入到ul中
				oWrap.appendChild(newli);
			}
			}
			
			
			//生成瀑布流函数
			function createfall(){
				//获取列数
				var cols=4
				if(window.innerWidth<=500){
					cols=2;
				}
				//初始化每列的高度
				colH=[]
				for(var i=0;i<cols;i++){
					colH[i]=0;
				}
				for(var i=0;i<oLis.length;i++){
					//获取最短列的下标
					var minIndex=getMinIndex()
					//设置位置
					liW=oLis[i].offsetWidth+margin;
					oLis[i].style.top=colH[minIndex]+"px";
					oLis[i].style.left=minIndex*liW+"px";
					oLis[i].style.opacity=1
					if(window.innerWidth<=460){
						oLis.style.width=45+"%"
					}
					//更新列高
					colH[minIndex]+=oLis[i].offsetHeight+margin;
					oWrap.style.height=colH[minIndex]+"px";
					}
			}
			
			
			//获取最短列函数
			function getMinIndex(){
				var minIndex=0;
				var minH=colH[0];
				for(var i in colH){
					if(minH>colH[i]){
						minH=colH[i];
						minIndex=i;
					}
				}
				return minIndex
			}
			
			
			//计算列数函数
//			function getColumns(){
//				//获取浏览器窗口的可见宽度
//				var winW=document.documentElement.clientWidth;
//				//获取li的宽度
//				liW=oLis[0].offsetWidth+margin
//				//计算列数
//				var cols=Math.floor(winW/liW)
//				//设置ul的宽度
//				oWrap.style.width=cols*liW-margin+"px"
//				return cols
//				}
				//滚动条事件
//				document.body.onscroll=function(){
//					//获取滚动偏移高度
//					var sTop=document.body.scrollTop||document.documentElement.scrollTop;
//					//窗口的可见高度
//					var winH=document.documentElement.clientHeight;
//					//页面可见高度
//					var pageH=document.documentElement.scrollHeight;
//					//判断是否滚动到了页面底部
//					if(sTop+winH==pageH){
//						loadimg();
//					}
//				}
				
			window.onresize=function(){
				createfall();
			}