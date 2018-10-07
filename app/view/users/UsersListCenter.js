Ext.define('wealthmgr.view.users.UsersListCenter',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.UsersListCenter',
	region: 'center',
	title: 'Users',
	iconCls: 'icon-table',
	layout: 'fit',
	buttonAlign: 'center',
	buttons: [{
		text: 'Crear Nuevo',
		iconCls: 'icon-add',
		action: 'nuevo'
	},{
		text: 'Cambiar Pwd',
		iconCls: 'icon-delete',
		action: 'cambiarpwd'
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
		xtype: 'UsersListGrid'
	}]
});