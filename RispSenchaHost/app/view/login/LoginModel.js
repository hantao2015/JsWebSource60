/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',

    requires: [
        'Ext.util.Cookies',
        'Ext.DomQuery',
        'RispSenchaHost.AppData'
    ],

    // Just some data to seed the process. This might be pulled from a cookie or other
    // in a real app.
    data: {
        defaultOrg: 1,
        username: 'Don',
        confirmLabel:''
    },

    stores: {
        /**
         * @property {Ext.data.Store} organizations
         * This store definition populates the Organization combobox.
         */

    }


});
