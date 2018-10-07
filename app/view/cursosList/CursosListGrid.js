Ext.define('wealthmgr.view.cursosList.CursosListGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.CursosListGrid',
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
		return Ext.create('wealthmgr.store.Cursoformacion');
	},
	border: false,
	multiSelect: false,
	columns: [{
					header: 'Id',
					dataIndex: 'id',
					width: 75
				},{
					header: 'Año',
					dataIndex: 'anyoPlanFormacion',
					width: 75
				},{
					header: 'Nombre',
					dataIndex: 'nombre',
					width: 220
				},{
					header: 'Fecha Inic.',
					dataIndex: 'fechaInicio',
					renderer: Ext.util.Format.dateRenderer('d/m/Y'),
					width: 100
				},{
					header: 'Fecha Fin',
					dataIndex: 'fechaFin',
					renderer: Ext.util.Format.dateRenderer('d/m/Y'),
					width: 100
				}
	]
});