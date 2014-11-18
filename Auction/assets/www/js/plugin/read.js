if (typeof cordova !== "undefined") {

    function ReadBook() {
        
    }

    ReadBook.prototype.read = function(success,fail,bookName) {//插件的play方法    
        
        return cordova.exec(success,fail, 'Read', "read", [bookName]);
　　　　
    };
       
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.ReadBook = new ReadBook();  //addPlugin方法取消后用这种方式创建插件
    });
};