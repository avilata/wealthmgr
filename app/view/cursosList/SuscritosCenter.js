Ext.define('wealthmgr.view.cursosList.SuscritosCenter',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.SuscritosCenter',
	controller: 'Suscritos',
	title: 'Suscritos',
	iconCls: 'icon-table',
//	layout: 'fit',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	buttonAlign: 'center',
	buttons: [{
		text: 'Inscribir',
		iconCls: 'icon-add',
		action: 'save'
	},{
		text: 'Exportar Excel',
		iconCls: 'icon-add',
		action: 'excel'
	},{
		text: 'Borrar',
		iconCls: 'icon-add',
		action: 'delete'
	},{
		text: 'Refrescar',
		action: 'refresco'
	}],
	items: [{
		xtype: 'SuscritosGrid',
//		name:'SuscritosGrid',
		flex:1
	}]
});