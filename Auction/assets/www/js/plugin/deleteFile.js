if (typeof cordova !== "undefined") {

    function DeleteFile() {
        
    }

    DeleteFile.prototype.deleteFile = function(success,fail,bookName) {//�����play����    
        
        return cordova.exec(success,fail, 'Read', "delete", [bookName]);
��������
    };
       
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.DeleteFile = new DeleteFile();  //addPlugin����ȡ���������ַ�ʽ�������
    });
};