Ext.define('wealthmgr.view.users.UsersListWest', {
	extend : 'Ext.form.Panel',
	alias : 'widget.UsersListWest',
	
	region : 'west',
	title : 'Usuarios',
	iconCls : 'icon-funnel',
	autoScroll : true,
	bodyPadding : 5,
	fieldDefaults : {
		labelWidth : 75
	},
	buttonAlign : 'center',

	dockedItems : [ {
		xtype : 'toolbar',
		dock : 'bottom',
		weight : 10,
		items : [ {
			xtype : 'FilterMaxRec'
		} ]
	} ],

	buttons : [ {
		text : 'Buscar',
		iconCls : 'icon-magnifier',
		action : 'buscar'
	} ],

	items : [ {
		xtype : 'BaseNumber',
		fieldLabel : 'Id',
		name : 'id',
		anchor : '95%'
	}, {
		xtype : 'BaseText',
		fieldLabel : 'Email',
		name : 'email',
		anchor : '95%'
	}, {
		xtype : 'BaseText',
		fieldLabel : 'User Name',
		name : 'username',
		anchor : '95%'

	}

	]
});