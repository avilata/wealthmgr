Ext.define('wealthmgr.view.Attach.AttachGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.AttachGrid',
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
		return Ext.create('wealthmgr.store.Attach');
	},
	border: true,
	multiSelect: true,
	columns: [{
		header: 'Id',
		locked: true,
		dataIndex: 'id',
		width: 75
	},{
		header: 'Asunto',
		dataIndex: 'subject',
		minWidth: 350,
		flex: 1
	},{
		header: 'Ubicación',
		dataIndex: 'attach',
		minWidth: 350,
		flex: 1
	},{
		header: 'Tipo',
		dataIndex: 'attachtype',
		width: 150
	},{
		header: 'Adjuntado',
		dataIndex: 'date',
		renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
		width: 120
	},{
		header: 'Usuario',
		dataIndex: 'user',
		width: 100
	},{
		header: 'Modificado',
		dataIndex: 'ts',
		renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
		width: 120
	}]
});
