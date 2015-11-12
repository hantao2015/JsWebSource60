/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.view.login.Login', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'RispSenchaHost.view.login.LoginController',
        'RispSenchaHost.view.login.LoginModel',
        'RispSenchaHost.AppData'
    ],
    viewModel:'login' ,
    controller: 'login',
    bodyPadding: 10,
    title:'',
    closable: false,
    cls: 'login',
    items: {
        xtype: 'form',
        reference: 'form',
        items: [
            {
            xtype: 'textfield',
            name: 'user',
            bind: '{username}',
            fieldLabel:'username',
            allowBlank: false,
            enableKeyEvents: true,
                reference:'usernamefield',
            listeners: {
                specialKey: 'onSpecialKey'
            }
        },
            {
            xtype: 'textfield',
            name: 'upass',
            bind:'{userpass}',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false,
            enableKeyEvents: true,
            cls: 'password',
                reference:'userpassfield',
            listeners: {
                specialKey: 'onSpecialKey'
            }
        },
            {
                xtype: 'textfield',
                name: 'clienttype',
                hidden:'true',
                value:'mobile'
            },
            {xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password',
            reference:'hintdisplayfield',
            cls: 'hint'}

        ]
    },

    buttons: [{
        text: 'Login',
        bind:'{confirmLabel}',
        listeners: {
            click: 'onLoginClick'
        }
    }]
});
