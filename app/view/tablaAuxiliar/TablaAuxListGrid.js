Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxListGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.TablaAuxListGrid',
	viewConfig: {
		loadMask: true
	},
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			store: me.buildStore()
		});
		me.callParent(arguments);
	},

	buildStore: function() {
		return Ext.create('wealthmgr.store.TablaAuxiliar');
	},
	border: false,
	multiSelect: false,
	plugins:[
	           {
	               clicksToMoveEditor: 1,
	               autoCancel: false,
	               ptype: 'cellediting',
	               pluginId: 'cellediting',
	               saveBtnText : "Guardar"
	   				
	           }
	       ],  
   selModel: {
        selType: 'cellmodel'
    },	   
	columns: [{
					header: 'Id',
					dataIndex: 'id',
					width: 75
				},{
					header: 'codTabla',
					dataIndex: 'codTabla',
					width: 90,
					editor:'textfield'
				},{
					header: 'codElemento',
					dataIndex: 'codElemento',
					width: 220,
					editor:'textfield'
				},{
					header: 'Valor',
					dataIndex: 'valor1',
					width: 220,
					editor:'textfield'
				}
	]
});