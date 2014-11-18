	var BASE_URL = "http://10.108.210.135:8080//TestSH/";
	var ALIPAY_URL = "http://58.68.236.168:8080/springmvc/alipay/buyBook";
	var BORROW_LIMIT = 10;
	
	
	
  	function sleep(n) { //n表示的毫秒数
            var start = new Date().getTime();
            while (true) if (new Date().getTime() - start > n) break;
	}  
	
	function showLoader() {
  	    $.mobile.loading( "show", {
            text: "loading",
            textVisible: true,
            theme: "b",
            textonly: false,
            html: ""
    	}); 
    }
    
    function closeLoader(){
    	   $.mobile.loading( "hide" );
    }
    
    function getCurrentDate(){
     	var now = new Date();
    	var year = now.getFullYear();       //年
        var month = now.getMonth()+1;     //月
        var day = now.getDate();   //日
        
        return year+"-"+month+"-"+day;
        
    }
    function PostSubmit(url, money,userId,bookId) {  
	    var postUrl = url;//提交地址  
	    var postMoney = money;//第一个数据  
	    var postUserId= userId;//第二个数据  
	    var postBookId = bookId;
	    var postSubject = "something";
	    var postDescript = "something";
	    alert(postMoney);
	    
	    var ExportForm = document.createElement("FORM");  
	    document.body.appendChild(ExportForm);  
	    ExportForm.method = "POST";  
	    var newElement = document.createElement("input");  //money
	    newElement.setAttribute("name", "total_fee");  
	    newElement.setAttribute("type", "hidden");  
	    var newElement2 = document.createElement("input");  //userId
	    newElement2.setAttribute("name", "user_id");  
	    newElement2.setAttribute("type", "hidden");  
	     var newElement3 = document.createElement("input");  //bookId
	    newElement3.setAttribute("name", "book_id");  
	    newElement3.setAttribute("type", "hidden"); 
	    var newElement4 = document.createElement("input");  //subject
	    newElement4.setAttribute("name", "subject");  
	    newElement4.setAttribute("type", "hidden"); 
	    
	    var newElement5 = document.createElement("input");  //descript
	    newElement5.setAttribute("name", "body");  
	    newElement5.setAttribute("type", "hidden"); 
	    
	    ExportForm.appendChild(newElement);  
	    ExportForm.appendChild(newElement2);  
	    ExportForm.appendChild(newElement3);
	    ExportForm.appendChild(newElement4);
	    ExportForm.appendChild(newElement5);
	    newElement.value = postMoney;  
	    newElement2.value = postUserId;
	    newElement3.value = postBookId;
	    newElement4.value = postSubject;
	    newElement5.value = postDescript;
	    
	    ExportForm.action = postUrl;  
	    ExportForm.submit();  
	}; 
	

    
    