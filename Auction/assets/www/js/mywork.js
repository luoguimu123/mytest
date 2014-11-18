function myload () {
	document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady () {

	var t = $("#test");
	navigator.notification.alert(t.dataset.category, null);
}












