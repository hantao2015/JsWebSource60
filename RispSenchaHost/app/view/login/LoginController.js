/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: [
        'Ext.util.Cookies',
        'RispSenchaHost.AppData',
        'RispSenchaHost.LoginManager',
        'RispSenchaHost.model.User',
        'RispSenchaHost.view.login.LoginModel'
    ],

    loginText: 'Logging in...',
    init: function() {
        this.getView().title=RispSenchaHost.AppData.getMsgString('TITLE_MENU_SYS_LOGIN_PAGE');
        this.lookupReference('usernamefield').setFieldLabel(RispSenchaHost.AppData.getMsgString('MUI_271438352130'));
        this.lookupReference('userpassfield').setFieldLabel(RispSenchaHost.AppData.getMsgString('MUI_271438357677'));
        this.lookupReference('hintdisplayfield').setValue(RispSenchaHost.AppData.getMsgString('MUI_329518016609'));
    },
    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onLoginClick: function() {
        //console.log('login:'+Ext.DomQuery.selectValue('MUI_CONFIRM',RispSenchaHost.AppData.xmlData));

       // alert(RispSenchaHost.AppData.getMsgString('TITLE_LOGINUSER'));
        this.doLogin();
    },

    doLogin: function() {
        var form = this.lookupReference('form');
        var userdata= form.getValues();
        Ext.util.Cookies.set("userpass",userdata.upass);
        Ext.util.Cookies.set("username",userdata.user);

        //var mask = new Ext.LoadMask(this, {
        //    msg : 'µÇÂ¼ÑéÖ¤ÖÐ...',
        //    removeMask : true
        //});
        if (form.isValid()) {
           // Ext.getBody().mask(this.loginText);

            form.submit({
                url : RispSenchaHost.AppData.baseServer+"baseservice.asmx/UserLogin",
                success : function(form, action) {
                    if (action.result.success=='true')
                    {
                        Ext.Msg.alert('Success',action.result.msg);
                    }
                    else
                    {
                        Ext.Msg.alert('fail',action.result.msg);
                    }

                },
                failure : function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                    }


                }
            });

        }
    }
});
