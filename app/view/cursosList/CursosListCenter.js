Ext.define('wealthmgr.view.cursosList.CursosListCenter',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.CursosListCenter',
	region: 'center',
	title: 'Cursos',
	iconCls: 'icon-table',
	layout: 'fit',
	buttonAlign: 'center',
	buttons: [{
		text: 'Crear Nuevo',
		iconCls: 'icon-add',
		action: 'nuevo'
	},{
		text: 'Editar',
		iconCls: 'icon-delete',
		action: 'edit'
	},{
		text: 'Borrar',
		iconCls: 'icon-delete',
		action: 'delete'
	},{
		text: 'Refrescar',
		iconCls: 'icon-arrow-refresh',
		action: 'refresh'
	},{
		text: 'Exportar Excel',
		iconCls: 'icon-cross',
		action: 'exportExcel'
	},{
		text: 'Exportar PDF',
		iconCls: 'icon-cross',
		action: 'exportPDF'
	},{
		text: 'Cancelar',
		iconCls: 'icon-cross',
		action: 'cancel'
	}],
	items: [{
		xtype: 'CursosListGrid'
	}]
});