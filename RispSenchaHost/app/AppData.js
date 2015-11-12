/**
 * Created by Administrator on 2015/6/9.
 */
Ext.define('RispSenchaHost.AppData', {
    requires: [
        'Ext.Array',
        'Ext.Date',
        'Ext.Object',
        'Ext.String',
        'Ext.util.DelayedTask',
        'Ext.ux.ajax.*'
    ],
    testField:'test',
    singleton: true,
    delayDuration:100,
    dateFormat: 'Y-m-d\\TH:i:s\\Z',
    xmlData:null,
    xmlMsgData:null,
    defaultXmlMsgData:null,
    baseServer:"http://www.realsun.me:8082/rispweb/rispservice/",
    init: function (callback,langcode) {
        var me = this;
        function  setXmlMsgData(doc){
            me.xmlMsgData=doc;
            me.xmlData=doc;
            var task = new Ext.util.DelayedTask(function(){
                if (doc)
                {
                    callback(true);}
                else
                {
                    callback(false);
                }
            });
            task.delay(me.delayDuration);
        };

        //get msg_cn url : '/data/conf/app_msg_cn.xml',
        var xmlUrl = Ext.util.Format.format('/data/conf/app_msg_{0}.xml', langcode);
        Ext.Ajax.request({
                url :xmlUrl,
                success: function(response, opts) {
                    var xmlDoc= Ext.DomQuery.selectNode('/DATA_UI',response.responseXML.documentElement);

                    setXmlMsgData(xmlDoc);
                },
                failure: function(response, opts) {
                    setXmlMsgData(null);
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        },
    getDefaultLang:function (username,callback) {
        callback(true,'cn');

   /*     if ((username==="")||(username===null))
        {
            callback(true,'cn');
            return ;
        }
        Ext.Ajax.request({
            url : '/rispweb/rispservice/ajaxSvrGetUserLangCode.aspx?user='+username,

            success: function(response, opts) {

                callback(true,'cn');

            },
            failure: function(response, opts) {
                callback(false,'');
                console.log('server-side failure with status code ' + response.status);
            }
        });*/

    },
    getMsgString:function (key){
        var me=this;

        if (me.xmlMsgData)
        {
           return  Ext.DomQuery.selectValue(key,this.xmlMsgData);
        }
        else
        {
            me.init(callback,'cn')
        }
        function callback(success)
        {
            if (success)
            {return me.getMsgString(key);}
            else
            {
                return "";
            }

        }
    }

    });