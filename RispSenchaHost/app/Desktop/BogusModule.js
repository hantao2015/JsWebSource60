/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

var windowIndex = 0;

Ext.define('RispSenchaHost.Desktop.BogusModule', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.layout.container.Fit',
        'Ext.ux.IFrame'
    ],

    init : function(){
        this.launcher = {
            text: 'Window '+(++windowIndex),
            iconCls:'bogus',
            handler : this.createWindow,
            scope: this,
            windowId:windowIndex
        }
    },

    createWindow : function(src){
       var desktop = this.app.getDesktop();
        //var desktop = this.a
        var win = desktop.getWindow('bogus'+src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: 'bogus'+src.windowId,
                title:src.text,
                width:640,
                height:480,
                iconCls: 'bogus',
                html:"<iframe src='/rispweb/risphost/minidesktop.aspx' style='width: 100%;height: 100%'>"


            });
        }
        win.show();

        return win;
    }
});