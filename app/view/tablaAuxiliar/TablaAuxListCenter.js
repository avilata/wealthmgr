Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxListCenter',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.TablaAuxListCenter',
	region: 'center',
	title: 'Tabla Auxiliar',
	iconCls: 'icon-table',
	layout: 'fit',
	buttonAlign: 'center',
	buttons: [{
		text: 'Crear Nuevo',
		iconCls: 'icon-add',
		action: 'nuevo'
	},{
		text: 'Borrar',
		iconCls: 'icon-delete',
		action: 'delete'
	},{
		text: 'Refrescar',
		iconCls: 'icon-arrow-refresh',
		action: 'refresh'
	},{
		text: 'Cancelar',
		iconCls: 'icon-cross',
		action: 'cancel'
	}],
	items: [{
		xtype: 'TablaAuxListGrid'
	}]
});