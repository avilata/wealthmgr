Ext.define('wealthmgr.view.users.UsersList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.UsersList',
	controller:'UsersListController',
	title: 'Cursos',
	iconCls: 'icon-rosette',
	closable: true,
	layout: { 
		type: 'border',
		padding: 5
	},
	items: [
		  {
			xtype: 'UsersListWest',
			region:	'west',
			collapsible: true,
			collapsed: false,
			split: 'true',
			width: '275',
			minWidth: 275,
			maxWidth: 500
		},{
			xtype: 'UsersListCenter',
			region:	'center'
		}
	]
});