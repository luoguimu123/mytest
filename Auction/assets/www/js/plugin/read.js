if (typeof cordova !== "undefined") {

    function ReadBook() {
        
    }

    ReadBook.prototype.read = function(success,fail,bookName) {//�����play����    
        
        return cordova.exec(success,fail, 'Read', "read", [bookName]);
��������
    };
       
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.ReadBook = new ReadBook();  //addPlugin����ȡ���������ַ�ʽ�������
    });
};