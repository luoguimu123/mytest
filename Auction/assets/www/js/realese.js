var name;
var price;
var type ;
var detaildesc;

$(function  () {
	
	$("#store").click(store);
	$("#submit").click(mysubmit);
	$("#pics").click(mypic);
	
})

function store () {
	
}

function mysubmit () {
	name = $("#name").val();
	price = $("#price").val();
	type = $("#type").val();
	detaildesc = $("#detaildesc").val();
	window.location.href="realese2.html?name="+name+"&price="+price+"&type="+type+"&detaildesc="+detaildesc;
}

function mypic () {
	
}