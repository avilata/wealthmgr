Ext.define('wealthmgr.view.Attach.AttachEdit',{
	extend: 'Ext.form.Panel',
	alias: 'widget.AttachEdit',
	title: 'Editar Adjunto',
	iconCls: 'icon-pencil',
	controller: 'attachEdit',
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
			name:'id',
			fieldLabel: 'Id',
			allowBlank: false,
			readOnly: true
		},{
			xtype: 'BaseText',
			name:'asunto',
			fieldLabel: 'Asunto',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			name:'tipoAdjunto',
			fieldLabel: 'Tipo Adjunto',
			anchor: '50%'
		}];
	}
});
