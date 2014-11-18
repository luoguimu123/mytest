if (typeof cordova !== "undefined") {

    function DeleteFile() {
        
    }

    DeleteFile.prototype.deleteFile = function(success,fail,bookName) {//插件的play方法    
        
        return cordova.exec(success,fail, 'Read', "delete", [bookName]);
　　　　
    };
       
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.DeleteFile = new DeleteFile();  //addPlugin方法取消后用这种方式创建插件
    });
};