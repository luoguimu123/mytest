	var OFFSET = 5;
	var page = 1;
	var PAGESIZE = 20;
	var dataSend = "page=" + page + "&pagesize=" + PAGESIZE;

	
	var hasMoreData = false;

	
function listscroll(url,index,datasend){//url为发送服务器的地址，index为几种不同的页面索引（index=1是宣讲会，index=2是资讯，index=3是搜索列表）
										//datasend是除了page和pagesize之外，需要给服务器发送的数据
	//url="http://10.108.208.55:8080/EDF/recruit/job_affair_list.json";
	
	
	
	document.addEventListener('DOMContentLoaded', function() {
		$(document).ready(function() {
			loaded();
		});
	}, false);

	loaded(url,index,datasend);

}



function loaded(urls,index,datasend) {
	

	page = 1;
	
	$.ajax({
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
	//	jsonpCallback:"jsoncallback",
		data: datasend,
		//{"page": page,
		//	"pagesize": PAGESIZE},
		success:function(response, status) {
			if (status == "success") {
			

				if(index == 1){
					getBookContent(response);
				}
			  	
				else if(index == 2){
					userLogin(response);	
				}
				else if(index == 3){
					getBook(response);
				}else if(index == 4){
					getMediaDetail(response);
				}else if(index==5){
					getBorrowStatus(response);
				}else if(index==6){
					getBorrowNum(response);
				}else if(index==7){
					getBorrowedList(response);
				}else if(index==8){
					getBorrowNumHello(response);
				}else if (index==9) {
                    getBoughtList(response);
                }
			

			};
		}
			
		});

}

function refresh(urls,index,datasend) {
	page = 1;
	
	$.ajax({
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
	//	jsonpCallback:"jsoncallback",
		data:dataSend + datasend,
		//{"page": page,
		//	"pagesize": PAGESIZE},
		success:function(response, status) {
			if (status == "success") {
			
				//***********************************
				if(index == 1)
			  		{talklistnode(response);}
			
				
				// $("#thelist").listview("refresh");**********************************
			
			};
		}
	});
	
	
}

function nextPage(urls,index,datasend) {
	page++;
	
	$.ajax({
		type:"get",
		dataType:"jsonp",
		async:"false",
		url:urls,
		jsonp:"jsoncallback",
	//	jsonpCallback:"jsoncallback",
		data:dataSend + datasend,
	
		success:function(response, status) {
			if (status == "success") {
		

				//***********************************
				if(index == 1)
			  		{
			  			getBookContent(response);
			  		}
			
				
				
				// $("#thelist").listview("refresh");**********************************
		
			};
		}
		
	});
	
	
}


    function getBookContent(response){
    	if(response.length>0){
    		$.each(response,function(index,item){
    			if(item.content != ""){
    				$("#content").html(item.content);
    				var curBookId = window.sessionStorage.getItem("curBookId");
    				var curPage = window.sessionStorage.getItem("curPage");
    				window.sessionStorage.setItem(curBookId+":"+curPage,item.content);
    			}
    		
    		});
    	}
    }
    function userLogin(response){
    	if(response.length>0){
    		$.each(response,function(index,item){
    			if(item.status != 0){
    			var userId= item.status;
    		
    			window.sessionStorage.setItem("userId",userId);
    			window.location.href ="fav.html";
    			return true;
    			}else{
    			
    			//	getAlertLoginFalse();
    			alert("用户名或密码错误")
    			//document.addEventListener("deviceready", getAlertLoginFalse, false);
    			//	window.plugins.Msg.mAlert(msgSuccess,msgFail,"登陆提示","用户名或者密码错误");
    			return false;
    			}		
    		});
    		
    	}else{
    			document.addEventListener("deviceready", getAlertLoginFalse, false);
    	}
    }
    
    function getBook(response){
    	if(response.length>0){
    		$.each(response,function(index,item){
    			$("#imgContainer").attr("src",BASE_URL+"/covers/"+item.cover+".jpg");
    			$("#title").append(item.tiltle);
    			$("#author").append(item.author);
    			$("#size").append(item.size+"MB");
    			$("#price").html(item.price+"￥");
    			$("#brief").append(item.brief);
    			$("#bookDetail").trigger("create");
    		});
    	}
    }
    
    function getMediaDetail(response){
    		if(response.length>0){
    		$.each(response,function(index,item){
    			$("#imgContainer").attr("src",BASE_URL+"/covers/"+item.cover);
    			$("#title").html(item.name);
    			$("#author").html("作者："+item.authors);
    			$("#size").html("大小："+item.size+"MB");
    			$("#price").html("￥"+item.price);
    			$("#brief").html(item.description);
    			$("#bookDetail").trigger("create");
    		});
    	}
    }
    
    function getBorrowStatus(response){
    	if(response.length>0){
    		$.each(response,function(index,item){
    			var hasReturn = item.hasRetrun;
    			var hasOvertime = item.hasOverTime;
    			var borrowNum = item.borrowNum;
    			var hasBorrow = item.hasBorrow;
    			if(hasBorrow){
    				alert("您已经借阅");
    				return false;
    			}else if(hasReturn){
    				alert("您曾经借过");
    				return false;
    			}else if(borrowNum>3){
    				alert("您超过借阅本数");
    				return false;
    			}
    		//	alert("start download");
    			
    			//download book part
    			var date = getCurrentDate();
    			var bookId = window.sessionStorage.getItem("detailBookId");
				var bookName = window.sessionStorage.getItem("detailBookName");	
    			downloadFile(bookId+".pdf","bd_"+date+"_"+bookName+".pdf");
			downloadPic(bookName+".jpg","bd_"+date+"_"+bookName+".jpg");
			downloadKey(bookId+".key","bd_"+date+"_"+bookName+".key");
			alert("借阅成功");
		//	downloadPic(bookId+".jpg",bookName+".jpg");
    		
    		
    		});
    	}
    }
    
     function getBorrowNum(response){
    	if(response.length>0){
    		$.each(response,function(index,item){
    		
    			var borrowNum = item.borrowNum;
    		    var boughtNum = item.boughtNum;
    		  //  alert(boughtNum);
    			$("#borrowNum").html(borrowNum);
    	        $("#buyNum").html(boughtNum);
    	
 			$("#borrowed").listview("refresh");
    		
    		});
    	}
    }
    
    function getBorrowedList(response){
    
    	 if(response.length>0){
    		 $.each(response,function(index,item){
    			 
    			 $("#borrowList").append('<li ><a href="#"><h2 id="n'+item.bookId+'">'+item.title+'</h2><p>作者：'+item.author+'</p><p>借阅时间：<span id="d'+item.bookId+'">'+item.borrowDate+'</span></p></a><a href="#purchase" onclick="returnT('+item.bookId+')" data-rel="dialog" data-position-to="window" >归还</a></li>');
    			 
    	
    			 
    		 });
    		 
    		 $("#borrow").trigger("create");
 			$("#borrowList").listview("refresh");
    	 }
     }
     
     function getBorrowNumHello(response){
     if(response.length>0){
    		 $.each(response,function(index,item){
    			var borrowNum = item.borrowNum;
    		
    				$("#hasBorrowed").html(borrowNum);
    				$("#canBorrow").html(BORROW_LIMIT-borrowNum);
    	
    		 });
    	 }
     }
    
     function getBoughtList(response){
    
         if(response.length>0){
             $.each(response,function(index,item){
                 
                 $("#boughtList").append('<li><a href="#"><h2>'+item.title+'</h2><p>作者：'+item.author+'</p></a> </li>');
                 
        
                 
             });
             
             $("#bought").trigger("create");
            $("#boughtList").listview("refresh");
         }
     }
