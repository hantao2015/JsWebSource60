/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.LoginManager', {
    requires: [
        'Ext.Ajax',

        'Ext.data.schema.Schema'

    ],

    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    applyModel: function(model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    login: function(options) {
        Ext.Ajax.request({
            url:  RispSenchaHost.AppData.baseServer+"baseservice.asmx/UserLogin",
            method: 'GET',
            params: options.data,
            scope: this,
            callback: this.onLoginReturn,
            original: options
        });
    },

    onLoginReturn: function(options, success, response) {
        options = options.original;
        var session = this.getSession(),
            resultSet;

        if (success) {
            resultSet = this.getModel().getProxy().getReader().read(response, {
                recordCreator: session ? session.recordCreator : null
            });
            var resultRecord;
            resultRecord=resultSet.getRecords()[0];

            if (resultRecord.data.error==0)
            { Ext.callback(options.success, options.scope, [resultSet.getRecords()[0]]);
                return;}
            else
            {
                Ext.Msg.alert('登入失败',resultRecord.data.message);
               // Ext.MessageBox.show("resultRecord.data.message);
            }

        }

        Ext.callback(options.failure, options.scope, [response, resultSet]);
    }
});
