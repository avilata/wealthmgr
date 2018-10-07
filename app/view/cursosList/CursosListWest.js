Ext.define('wealthmgr.view.cursosList.CursosListWest', {
	extend : 'Ext.form.Panel',
	alias : 'widget.CursosListWest',
	
	region : 'west',
	title : 'Cursos',
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
		fieldLabel : 'Curso',
		name : 'curso',
		anchor : '95%'
	}, {
		xtype : 'BaseComboBox',
		fieldLabel : 'Año',
		name : 'anyo',
		anchor : '95%',
		valueField : "value",
		displayField : "value",
		store : 'Ejercicios'
	},
	{
			xtype: 'BaseDate',
			fieldLabel:'F.Desde',
			name:'fdesde',
			anchor: '95%'
		},{
			xtype: 'BaseDate',
			fieldLabel:'F.Hasta',
			name:'fhasta',
			anchor: '95%'
	}

	]
});