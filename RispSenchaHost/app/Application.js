/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('RispSenchaHost.Application', {
    extend: 'Ext.app.Application',

    name: 'RispSenchaHost',

    stores: [
        // TODO: add global / shared stores here


    ],
    requires: [
        'Ext.Ajax',
        'Ext.data.Store',

        'Ext.data.operation.Operation',
        'Ext.data.proxy.Ajax',
        'Ext.dom.Query',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Reader',
        'Ext.data.reader.Xml',
        'RispSenchaHost.Desktop.App',
        'RispSenchaHost.model.User',
        'RispSenchaHost.model.UserTest',
        'RispSenchaHost.AppData'
    ],
    controllers:['Root@RispSenchaHost.controller'],
    launch: function () {

        // TODO - Launch the application
        // alert('launch');http://localhost:1841/rispsenchahost/
    }
});
