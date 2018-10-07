Ext.define('wealthmgr.view.Attach.Attach',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.Attach',
	title: 'Adjuntos []',
	iconCls: 'icon-attach',
	controller:'Attach',
	layout: 'fit',
	buttonAlign: 'center',
	buttons: [{
		text: 'Adjuntar',
		iconCls: 'icon-attach',
		action: 'attach'
	},{
		text: 'Descargar',
		iconCls: 'icon-download',
		action: 'download'
	},{
		text: 'Editar',
		iconCls: 'icon-pencil',
		action: 'edit'
	},{
		text: 'Borrar',
		iconCls: 'icon-delete',
		action: 'delete'
	},{
		text: 'Cancelar',
		iconCls: 'icon-cross',
		action: 'cancel'
	},{
		text: 'Refrescar',
		iconCls: 'icon-arrow-refresh',
		action: 'refresh'
	}],
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: me.buildItems()
		});
		me.callParent(arguments);
	},
	buildItems: function() {
		return [{
			xtype: 'AttachGrid'
		}];
	}
});
