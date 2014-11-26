var name = requestpara("name");
var type = requestpara("type");
var price = requestpara("price");
var detaildesc = requestpara("detaildesc");

$(function () {
	
	$("#preview").click(preview);
	$("#submit".click(mysubmit);
	
	
});


function preview () {
	window.location.href="preview.html?name="+name+"&detaildesc="+detaildesc+"&type="+type+"&price="+price;
}

function mysubmit () {
	
	var contactname = $("#contactname").val();
	var contactphone = $("#contactphone").val();
	var city = $("#city");
	var religion = $("#religion");
	
	var datatosend = {
	 	
	 	"name": name,
	 	"price": price,
	 	"type": type,
	 	"detaildesc": detaildesc,
	 	"contactname": contactname,
	 	"contactphone": contactphone,
	 	"city": city,
	 	"religion": religion
	 };
	 var urls = "http://192.168.1.109:8080/pcncadweixinnew/detailServlet"

	$.ajax({
		type:"get",
		dataType:"json",
		async:"false",
		url:urls,
		data: datatosend,
		crossDomain: true,
		success:mysuccess,
		error: myerror
	});
}

function mysuccess () {
	
}

function myerror () {
	
}


function requestpara(paras){
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
}