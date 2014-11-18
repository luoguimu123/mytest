if (typeof cordova !== "undefined") {

    function Msg() {
        
    }

    Msg.prototype.mAlert = function(success,fail,title,content) {//�����play����    
        
        return cordova.exec(success,fail, 'Message', "alertLocal", [title,content]);
��������
    };
      Msg.prototype.mConfirm = function(success,fail,title,content) {//�����play����    
        
        return cordova.exec(success,fail, 'Message', "confirmLocal", [title,content]);
��������
    };
      Msg.prototype.writeUser = function(success,fail,userId) {//�����play����    
        
        return cordova.exec(success,fail, 'Message', "writePreference", [userId]);
��������
    };
          Msg.prototype.readUser= function(success,fail,userId) {//�����play����    
        
        return cordova.exec(success,fail, 'Message', "readPreference", [userId]);
��������
    };
    
    cordova.addConstructor(function() {
        if (!window.plugins) {
            window.plugins = {};
        }
        window.plugins.Msg = new Msg();  //addPlugin����ȡ���������ַ�ʽ�������
    });
};