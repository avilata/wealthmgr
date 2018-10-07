Ext.define('wealthmgr.view.users.UsersNew',{
	extend: 'Ext.form.Panel',
	alias: 'widget.UsersNew',
	title: 'Nuevo Usuario',
	iconCls: 'icon-attach',
	controller: 'UsersListController',
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
		text: 'Crear Usuario',
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
			name:'email',
			fieldLabel: 'Email',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			name:'password',
			fieldLabel: 'Password',
			allowBlank: false,
			anchor: '100%'
		},{
			xtype: 'BaseText',
			fieldLabel: 'User Name',
			name: 'username',
			anchor: '100%'
		}];
	}
});
