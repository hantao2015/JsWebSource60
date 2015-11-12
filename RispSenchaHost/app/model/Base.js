/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.model.Base', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    }],

    schema: {
        namespace: 'RispSenchaHost.model',
        proxy: {
            url: '{prefix}/{entityName:uncapitalize}',
            pageParam: '',
            startParam: '',
            limitParam: ''
        }
    }
});
