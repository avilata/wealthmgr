Ext.define('wealthmgr.view.Attach.AttachUpload',{
	extend: 'Ext.form.Panel',
	alias: 'widget.AttachUpload',
	title: 'Adjuntar Archivo',
	iconCls: 'icon-attach',
	controller: 'attachUpload',
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
		text: 'Adjuntar',
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
			name:'asunto',
			fieldLabel: 'Asunto',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseFile',
			fieldLabel: 'Archivo',
			name: 'file',
			anchor: '100%'
		},{
			xtype: 'BaseText',
			name:'tipoAdjunto',
			fieldLabel: 'Tipo Adjunto',
			allowBlank: false,
			anchor: '50%'
		}];
	}
});