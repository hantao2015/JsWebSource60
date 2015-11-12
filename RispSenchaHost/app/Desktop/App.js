/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('RispSenchaHost.Desktop.App', {
    extend: 'Ext.ux.desktop.App',
    requires: [
        'Ext.Ajax',
        'Ext.data.Session',
        'Ext.data.Store',
        'Ext.util.Cookies',
        'Ext.ux.desktop.Module',
        'Ext.ux.desktop.ShortcutModel',
        'Ext.ux.desktop.TrayClock',
        'Ext.window.MessageBox',
        'RispSenchaHost.Desktop.AccordionWindow',
        'RispSenchaHost.Desktop.BogusMenuModule',
        'RispSenchaHost.Desktop.BogusModule',
        'RispSenchaHost.Desktop.GridWindow',
        'RispSenchaHost.Desktop.Notepad',
        //      'Desktop.Blockalanche',
        'RispSenchaHost.Desktop.Settings',
        'RispSenchaHost.Desktop.TabWindow',
        'RispSenchaHost.Desktop.VideoWindow'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();


        // now ready...
    },

    getModules : function(){
        return [

            new Ext.create('RispSenchaHost.Desktop.VideoWindow'),
            new Ext.create('RispSenchaHost.Desktop.GridWindow'),

            new Ext.create('RispSenchaHost.Desktop.TabWindow'),
            //new RispSenchaHost.Desktop.AccordionWindow(),
            new Ext.create('RispSenchaHost.Desktop.AccordionWindow'),
            //new RispSenchaHost.Desktop.Notepad(),
            new Ext.create('RispSenchaHost.Desktop.Notepad'),
           //new RispSenchaHost.Desktop.BogusMenuModule(),
         // new RispSenchaHost.Desktop.BogusModule()
            new Ext.create('RispSenchaHost.Desktop.BogusMenuModule'),
            new Ext.create('RispSenchaHost.Desktop.BogusModule')
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' }

                ]
            }),
            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

      //
      var data=this.viewModel.data;
      var username  =Ext.util.Cookies.get('username');
        //var auser=this.user;
        return Ext.apply(ret, {
            title:username,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },


    onLogout: function () {
        var me=this;
        var title=RispSenchaHost.AppData.getMsgString('MUI_EXIT');
        var msgString=RispSenchaHost.AppData.getMsgString('MUI_329518016687');
        Ext.Msg.confirm(title,msgString, function(btn){

            if (btn=='yes')
            {
                Ext.Ajax.request({
                    url: '/rispweb/rispservice/ajaxSvrLogout.aspx',
                    method: 'GET',
                    success: function(response){
                        var text = response.responseText;

                        // process server response here
                        //Ext.util.Cookies.clear('RispSenchaHost');
                        console.log(Ext.util.Cookies.get('RispSenchaHost'));
                        console.log(text);
                        window.location="/rispweb/rispsenchahost/index.html";
                    }

                });
            }
            else
            {


            }
        });


    },



    onSettings: function () {
        var dlg = new RispSenchaHost.Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
