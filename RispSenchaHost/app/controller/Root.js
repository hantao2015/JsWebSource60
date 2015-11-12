/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.controller.Root', {
    extend: 'Ext.app.Controller',
    remoteLogin:  null,
    requires: [

        'Ext.data.Session',
        'RispSenchaHost.AppData',
        'RispSenchaHost.LoginManager',
        'RispSenchaHost.view.login.Login'
    ],
    loadingText: 'Loading...',
    isLoaded:false,
    isLangGot:false,
    userName:"",
    userPass:"",
    userLang:"",
    onLaunch: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Not Supported', 'This App is not supported on Internet Explorer 8. Please use a different browser.');

            //Ext.Msg.alert('不支持', '该应用不支持IE8.0.请用其他浏览器。');
            return;
        }
        var me=this;
        me.session = new Ext.data.Session({autoDestroy: false});
        //choose lang
        //get default username
        //get default userpass
        /**
         * get userName,userPass,userlang from Cookies,
         * when isnull then set value =''
         *
         * .
         */
        this.userName=Ext.util.Cookies.get('username');
        this.userPass=Ext.util.Cookies.get('userpass');
        this.userLang=Ext.util.Cookies.get('langcode');
        if (this.userPass===null)
        {
            this.userPass="";
        }
        if (this.userName===null)
        {

            this.userName="";
        }
        /**
         * after userlang got then
         * init RispSenchaHost.appData
         * */
        if (( this.userLang===null)||( this.userLang===""))
        {
            RispSenchaHost.AppData.getDefaultLang(this.userName,getLangCallback);
        }

        function getLangCallback(success,langcode){
            this.userLang=langcode;
            this.isLangGot=success;
            if (success)
            {
                // this.userLang='ss';
                //load locale files
                if (langcode==='cn')
                {
                    var locallangcode='zh_CN'
                }
                var jsurl = Ext.util.Format.format("../../packages/ext-locale/build/ext-locale-{0}.js", locallangcode);

                Ext.Loader.loadScript({
                        url: jsurl
                    }
                );
                RispSenchaHost.AppData.init(callback, this.userLang);
            }

        };
        function callback(success) {
            console.log(Ext.DomQuery.selectValue('MUI_CONFIRM', RispSenchaHost.AppData.xmlData));
            console.log(success);
            if (success===true)
            {

                this.isLoaded=true;

            }
        }
        this.onLoginProgress(this);
    },
    onLoginProgress: function(btn) {
        var me = this,
            i = 0,
            fn;
        Ext.MessageBox.show({
            title: 'Please wait',
            msg: 'Loading...',
            progressText: 'Initializing...',
            width:300,
            progress:true,
            closable:false,
            animateTarget: btn
        });
        // Fake progress fn
        fn = function()
        {
            ++i;
            if (i === 20)
            {
                Ext.MessageBox.hide();
                me.showToast('Load timeout','Failure');
                setTimeout(500,function(){window.location="RispSenchaHost/index.html";})
            }
            else
            {
                if ((this.isLoaded===true))
                {
                    Ext.MessageBox.hide();

                    me.login = new RispSenchaHost.view.login.Login({
                        session: me.session,
                        autoShow: true,
                        viewModel:{data:{username:me.userName,userpass:me.userPass,confirmLabel: RispSenchaHost.AppData.getMsgString('MUI_CONFIRM')}},
                        listeners: {
                            scope: me,
                            login: 'onLogin'}});
                    return ;
                }
                var val = i / 20;
                Ext.MessageBox.updateProgress(val,this.loadingText);
                setTimeout(fn, 500);
            }
        };
        setTimeout(fn, 500);
    },
    /**
     * Called when the login controller fires the "login" event.
     *
     * @param loginController
     * @param user
     * @param organization
     * @param loginManager
     */
    onLogin: function (loginController, user,loginManager) {

        this.login.destroy();
        this.user = user;
        this.showUI(this.user);
    },

    showUI: function(user) {
        var app;
        app=new RispSenchaHost.Desktop.App(
            {
                session:this.session,
                viewModel: {data: user.data}
            });
    },
    getSession: function() {
        return this.session;
    },
    showToast: function(s, title) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    },
});
