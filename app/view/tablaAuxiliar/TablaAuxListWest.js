Ext.define('wealthmgr.view.tablaAuxiliar.TablaAuxListWest', {
	extend : 'Ext.form.Panel',
	alias : 'widget.TablaAuxListWest',
	
	region : 'west',
	title : 'TablaAux',
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
		fieldLabel : 'codTabla',
		name : 'codTabla',
		anchor : '95%'
	}, {
		xtype : 'BaseText',
		fieldLabel : 'codElemento',
		name : 'codElemento',
		anchor : '95%'

	}

	]
});