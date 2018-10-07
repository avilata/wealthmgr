Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxNew',{
	extend: 'Ext.form.Panel',
	alias: 'widget.TablaAuxNew',
	title: 'Nuevo Registro',
	iconCls: 'icon-attach',
	controller: 'TablaAuxListController',
	height: 260,
	width: 750,
	bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 50,
        msgTarget: 'side'
    },
	buttonAlign: 'center',
	buttons: [{
		text: 'Crear Registro',
		iconCls: 'icon-tick',
		action: 'submit'
	},{
		text: 'Cancelar',
		iconCls: 'icon-cross',
		action: 'cancel'
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
			xtype: 'BaseText',
			name:'codTabla',
			fieldLabel: 'codTabla',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			name:'codElemento',
			fieldLabel: 'codElemento',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			fieldLabel: 'Valor',
			name: 'valor1',
			anchor: '100%'
		}];
	}
});
