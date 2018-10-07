Ext.define('wealthmgr.view.cursosList.CursosListEast', {
	extend : 'Ext.form.Panel',
	alias : 'widget.CursosListEast',
	title : 'Curso',
	iconCls : 'icon-funnel',
	autoScroll : true,
	bodyPadding : 5,
	fieldDefaults : {
		labelWidth : 75,
		width:'100%',
		anchor:'95%'
	},
	buttonAlign : 'center',

	
	buttons : [ {
		text : 'Guardar',
		iconCls : 'icon-magnifier',
		action : 'save'
	} ],
	items : [ {
		xtype : 'BaseNumber',
		fieldLabel : 'Id',
		name : 'id'
	}, {
		xtype : 'BaseText',
		fieldLabel : 'Curso',
		name : 'nombre'
	}, {
		xtype : 'BaseComboBox',
		fieldLabel : 'Año',
		name : 'anyoPlanFormacion',
		valueField : "value",
		displayField : "value",
		store : 'Ejercicios'
	},
	{
			xtype: 'BaseDate',
			fieldLabel:'F.Desde',
			name:'fechaInicio'
		},{
			xtype: 'BaseDate',
			fieldLabel:'F.Hasta',
			name:'fechaFin'
	},
	{ xtype:'textarea',
	  labelAlign:'right',	
	  fieldLabel:'Contenido',
	  name:'contenidoCurso',
	  border:true,
	  heigth:100
	}

	] 
});