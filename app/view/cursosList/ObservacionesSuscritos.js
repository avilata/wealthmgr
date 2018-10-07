Ext.define('wealthmgr.view.cursosList.ObservacionesSuscritos',{
	extend: 'Ext.form.Panel',
	alias: 'widget.ObservacionesSuscritos',
	title: 'Observaciones',
	iconCls: 'icon-pencil',
	controller: 'ObservacionesSuscritos',
	height: 360,
	width: 650,
	bodyPadding: 5,
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 50,
        msgTarget: 'side'
    },
	buttonAlign: 'center',
	buttons: [{
		text: 'Aceptar',
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
			fieldLabel: 'Id',
			name:'id',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			fieldLabel: 'Empleado',
			name:'idPersonal',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			fieldLabel: 'Asunto',
			name:'asunto',
			allowBlank: false,
			anchor: '100%'
		}];
	}
});