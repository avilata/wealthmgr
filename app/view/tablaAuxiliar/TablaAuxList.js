Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TablaAuxList',
	controller:'TablaAuxListController',
	title: 'Tabla Auxiliar',
	iconCls: 'icon-rosette',
	closable: true,
	layout: { 
		type: 'border',
		padding: 5
	},
	items: [
		  {
			xtype: 'TablaAuxListWest',
			region:	'west',
			collapsible: true,
			collapsed: false,
			split: 'true',
			width: '275',
			minWidth: 275,
			maxWidth: 500
		},{
			xtype: 'TablaAuxListCenter',
			region:	'center'
		}
	]
});