//behind cordova.js  and  jquery.js

	$(document).ready(function () {
		window.appRootDirName = "ReadingLib";

    	document.addEventListener("deviceready", onDeviceReady, true);
	});

//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("device is ready");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function fail() {
    console.log("failed to get filesystem");
}

function gotFS(fileSystem) {
    console.log("filesystem got");
    window.fileSystem = fileSystem;
    fileSystem.root.getDirectory("downloads", {//the directionary that contains the files
        create : true,
        exclusive : false
    }, dirReady, fail);
}

function dirReady(entry) {
//alert(entry);
	// alert(entry.fullPath);
    window.appRootDir = entry;
	// alert(entry.fullPath);
    console.log("application dir is ready");
}


downloadFile = function(bookName,desName){
    var fileTransfer = new FileTransfer();

    var url =encodeURI(BASE_URL+ "encriptions/"+bookName);
    var filePath = window.appRootDir.toURL()+"/"+desName;
 	
    fileTransfer.download(
        url,
        filePath,
        function(entry) {
            alert("½èÔÄ³É¹¦");
        },
        function(error) {
            alert("download error" + error.code+ "  " +error.target);
        },
        true
    );
}

downloadPic = function(bookName,desName){
    var fileTransfer = new FileTransfer();

    var url =encodeURI(BASE_URL+ "covers/"+bookName);
    var filePath = window.appRootDir.toURL()+"/images/"+desName;
 	
    fileTransfer.download(
        url,
        filePath,
        function(entry) {
           // alert("download complete: " + entry.fullPath);
        },
        function(error) {
            alert("download error" + error.code+ "  " +error.target);
        },
        true
    );
 }   
    
    downloadKey = function(bookName,desName){
    var fileTransfer = new FileTransfer();

    var url =encodeURI(BASE_URL+ "keys/"+bookName);
    var filePath = window.appRootDir.toURL()+"/keys/"+desName;
 	
    fileTransfer.download(
        url,
        filePath,
        function(entry) {
          //  alert("download complete: " + entry.fullPath);
        },
        function(error) {
            alert("download error" + error.code+ "  " +error.target);
        },
        true
    );
}