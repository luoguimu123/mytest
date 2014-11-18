	var OFFSET = 5;
	var page = 1;
	var PAGESIZE = 20;
	var dataSend = "page=" + page + "&page_size=" + PAGESIZE;
	
	var myScroll,
		pullDownEl, pullDownOffset,
		pullUpEl, pullUpOffset,
		generatedCount = 0;
	var maxScrollY = 0;
	
	var hasMoreData = false;

	
function listscroll(url,index,datasend){//url为发送服务器的地址，index为几种不同的页面索引（index=1是宣讲会，index=2是资讯，index=3是搜索列表）
										//datasend是除了page和pagesize之外，需要给服务器发送的数据
	//url="http://lib.youionline.com:9088/EDF/recruit/job_affair_list.json";
	
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	
	document.addEventListener('DOMContentLoaded', function() {
		$(document).ready(function() {
			loaded();
		});
	}, false);

	loaded(url,index,datasend);

}



function loaded(urls,index,datasend) {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;

	hasMoreData = false;
	// $("#thelist").hide();
	$("#pullUp").hide();

	pullDownEl.className = 'loading';
	pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';

	page = 1;
	
	$.ajax({
		cache: false,
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
		jsonpCallback:"jsoncallback",
		data:dataSend + datasend,
		//{"page": page,
		//	"pagesize": PAGESIZE},
		success:function(response, status) {
			if (status == "success") {
				$("#list").show();

				if (response.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}

				// document.getElementById('content-list').style.left = '0';

				myScroll = new iScroll('content-list', {
					useTransition: true,
					topOffset: pullDownOffset,
					onRefresh: function() {//调整刷新后的界面结构
						if (pullDownEl.className.match('loading')) {
							pullDownEl.className = 'idle';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
							this.minScrollY = -pullDownOffset;
						}
						if (pullUpEl.className.match('loading')) {
							pullUpEl.className = 'idle';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
						}
					},
					
					onScrollMove: function() {//判断当前滚动是到顶端还是底端；
						if (this.y > OFFSET && !pullDownEl.className.match('flip')) {
							pullDownEl.className = 'flip';//当class为flip时刷新，为idle时不刷新
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
							this.minScrollY = 0;
						} else if (this.y < OFFSET && pullDownEl.className.match('flip')) {
							pullDownEl.className = 'idle';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
							this.minScrollY = -pullDownOffset;
						} 
						if (this.y < (maxScrollY - pullUpOffset - OFFSET) && !pullUpEl.className.match('flip')) {
							if (hasMoreData) {
								this.maxScrollY = this.maxScrollY - pullUpOffset;
								pullUpEl.className = 'flip';
								pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新...';
							}
						} else if (this.y > (maxScrollY - pullUpOffset - OFFSET) && pullUpEl.className.match('flip')) {
							if (hasMoreData) {
								this.maxScrollY = maxScrollY;
								pullUpEl.className = 'idle';
								pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
							}
						}
					},
					onScrollEnd: function() {//触发加载新数据，再通过 refresh 方法重新渲染界面；
						if (pullDownEl.className.match('flip')) {//下拉刷新判断。改classname为loading
							pullDownEl.className = 'loading';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
							// pullDownAction(); // Execute custom function (ajax call?)
							refresh(urls,index,datasend);
						}
						if (hasMoreData && pullUpEl.className.match('flip')) {//上拉加载更多数据，前提是有更多数据存在
							pullUpEl.className = 'loading';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
							// pullUpAction(); // Execute custom function (ajax call?)
						
							nextPage(urls,index,datasend);
						}
					}
				});

				$("#list").empty();
				//$.each(response, function(key, value) {
					//$("#list").append('<li>' + value.name + '\t' + value.time + '</li>');	
				//});
				//***********************************
				if(index == 1)
			  		{talklistnode(response);}
				else if(index == 2)
					{getMediaList(response);}
				else if(index == 3)
					{searchlistnode(response);}
				else if(index == 4)
					{departSeachlist(response);}
				else if(index==5)
					{getAttention(response);}
				else if(index==6){
					
				}
				else if(index==7){
					getCollection(response);
				}else if(index==8){
					judgeUser(response);//登录
				}
				// $("#thelist").listview("refresh");**********************************
				
				
				// $("#list").listview("refresh");
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				// pullDownEl.className = 'idle';
				// pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				// this.minScrollY = -pullDownOffset;

				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		}
			
		});

}

function refresh(urls,index,datasend) {
	page = 1;
	
	$.ajax({
		cache: false,
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
		jsonpCallback:"jsoncallback",
		data:dataSend + datasend,
		//{"page": page,
		//	"pagesize": PAGESIZE},
		success:function(response, status) {
			if (status == "success") {
				$("#list").empty();

				myScroll.refresh();

				if (response.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}
				//***********************************
				if(index == 1)
			  		{talklistnode(response);}
				else if(index == 2)
					{getMediaList(response);}
				else if(index == 3)
					{searchlistnode(response);}
				else if(index == 4)
					{departSeachlist(response);}
				else if(index==5)
					{getAttention(response);}
				else if(index==6)
					{alert("删除成功");}
				else if(index==7){
					getCollection(response);
				}else if(index==8){
					judgeUser(response);//登录
				}
				
				// $("#thelist").listview("refresh");**********************************
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)

				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		}
	});
	
	
}

function nextPage(urls,index,datasend) {

	page++;
	var dataSend3 = "page=" + page + "&page_size=" + PAGESIZE;

	
	$.ajax({
		cache: false,
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
		jsonpCallback:"jsoncallback",
		data:dataSend3 + datasend,
		//{"page": page,
		//	"pagesize": PAGESIZE},
		success:function(response, status) {
			if (status == "success") {
				if (response.length < PAGESIZE) {
					hasMoreData = false;
					$("#pullUp").hide();
				} else {
					hasMoreData = true;
					$("#pullUp").show();
				}

				//***********************************
				if(index == 1)
			  		{talklistnode(response);}
				else if(index == 2)
					{getMediaList(response);}
				else if(index == 3)
					{searchlistnode(response);}
				else if(index == 4)
					{departSeachlist(response);}
				else if(index==5){
					getAttention(response);
				}else if(index==6){
					
				}
				else if(index==7){
					getCollection(response);
				}else if(index==8){
					judgeUser(response);//登录
				}
				// $("#thelist").listview("refresh");**********************************
				myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)
				if (hasMoreData) {
					myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
				} else {
					myScroll.maxScrollY = myScroll.maxScrollY;
				}
				maxScrollY = myScroll.maxScrollY;
			};
		}
		
	});
	
	
}

	function talklistnode(response){//宣讲会
		if(response.length >= 1){//如果返回结果不为空
			$.each(response,function(index,item){
		
			
				var listdata="<li>";
				listdata += "<a href=\"bookDetail.html\" data-ajax=\"false\"  id=\""+item.bookId+"\"onclick=\"getDetail("+item.bookId+","+"'"+item.title+"')\">";
				listdata +="<img src='"+BASE_URL+"covers/"+item.bookId+".jpg"+"' style='margin-top:10px;margin-left:10px;'>";	
				listdata += "<h2>"+item.title+"</h2>";
				listdata += "<p>简介："+item.describe+"</p>";
				listdata += "<p>价格￥<span style='color:red;'>"+item.price+"</span></p></a></li>";
						
				$("#list").append(listdata);
			});
			$("#talklist-page").trigger("create");
			$(".talk-list").listview("refresh");
		
		}
		
	} 
	
	function getMediaList(response){
			if(response.length >= 1){//如果返回结果不为空
			$.each(response,function(index,item){
		
			//alert(item.type);
				var listdata="<li >";
				listdata += "<a href=\"mediaDetail.html\" data-ajax=\"false\"  id=\""+item.id+"\"onclick=\"getDetail("+item.id+","+item.type+",'"+item.cover+"')\">";
				listdata +="<img src='img/test4.jpg' style='margin-top:10px;margin-left:10px;'>";	
				listdata += "<h2>"+item.name+"</h2>";
				listdata += "<p>简介："+item.description+"</p>";
				listdata += "<p>价格￥<span style='color:red;'>"+item.price+"</span></p></a></li>";
						
				$("#list").append(listdata);
			});
			$("#talklist-page").trigger("create");
			$(".talk-list").listview("refresh");
		
		}
	
	}

	
	

	
	
	function searchlistnode(response){//搜索结果
		if(response.length >= 1){//如果返回结果不为空
			$.each(response,function(index,item){
			if(item.status==0){
				return false;
			}
				var search_id = item.id;
				var listdata="<li><a href=\"jobDetail.html\" data-ajax=\"false\" id="+search_id + ">";
			
				listdata += "<h4>"+item.job_name+"</h4>";
				listdata += "<p>"+item.company_name+"</p>";
				listdata += "<P>"+item.job_place+"/"+item.education+"/"+item.company_property+"</p>";
				listdata += "<p>来源:"+item.source+"</p>";
				listdata += "<p class=\"ui-li-aside\">"+item.time+"</p></a></li>";
				
				$("#list").append(listdata);
			});
		
			$("#searchlist_page").trigger("create");
			$(".talk-list").listview("refresh");
		}
		else{//返回结果为空
			$("#content-list").append("<center>没有数据</center>")
		}
	}
	
	

     function departSeachlist(response){//科系搜索结果列表
    //alert("come in !!")
     	$.each(response,function(index,item){
     		var listdata = "<li data-theme=\"c\" ><a href=\"jobDetail.html\" data-ajax=\"false\" data-transition=\"slide\" id="+item.id+">";
     		listdata += "<h3>"+item.job_name+"</h3>";
     		listdata += "<p>"+item.company_name+"</p>";
     		listdata += "<p>"+item.experience+"|"+item.education+"|"+item.company_property+"</p>";
     		listdata += "<p class=\"ui-li-aside\">"+item.time+"</p></a></li>";
     		
     		$("#list").append(listdata);
     	});
     
     	$("#infor-result_page").trigger("create");
		$(".talk-list").listview("refresh");
     }
    