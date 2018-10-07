Ext.define('wealthmgr.view.cursosList.CursosList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CursosList',
	controller:'cursosList',
	title: 'Cursos',
	iconCls: 'icon-rosette',
	closable: true,
	layout: { 
		type: 'border',
		padding: 5
	},
	items: [
		  {
			xtype: 'CursosListWest',
			region:	'west',
			collapsible: true,
			collapsed: false,
			split: 'true',
			width: '275',
			minWidth: 275,
			maxWidth: 500
		},{
			xtype: 'CursosListCenter',
			region:	'center'
		}/*,
		{
			xtype: 'CursosListForm',
			region:'east',
			collapsible:true,
			collapsed:true,
			split: 'true', 
			flex:1, // hay que ponerlo para que el grid no haga cosas raras
			width: '600',
			minWidth: 600,
			maxWidth: 900
		}*/
	]
});