Ext.define('wealthmgr.view.cursosList.CursosListFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.CursosListForm',

    init: function() {
    	this.control({ // aqui definimos los objetos y eventos que vamos a controlar
        		
            	'CursosListEast button[action=save]': {
            			click: this.doSave
				},
             	'CursosListEast textfield': { // en cualquier campo de este formulario si pulsas intro se guarda
            			keypress: this.onKeyPress
            	},
				'CursosListEast': {
					dirtychange: this.doDirty  // detecta cuando se ha modif la ficha
				}
    	})
    },
	/*
	*
	*/
	listen: {
		    controller: {
		    	'generalController':{
					CursosListForm:function (panel) {
						   this.doLoad(panel);
					    }		   
					}
				} 	
   	},	
	/**
	 * 
	 */
	doDirty: function(form, dirty) {
		var panel = form.owner.up('CursosListForm');
		
		if (panel.tab.iconCls !== panel.iconDirty && dirty) 
			panel.tab.setIcon('img/icon/saving.gif');
		else
			panel.tab.setIcon('');
	},
	
	/**
	 * 
	 */
	onKeyPress: function(component, event) {
		if (event.getKey() === Ext.EventObject.ENTER) {
			if (component.up('CursosListEast')!=null) this.doSave(component.up('CursosListEast').down('button[action=save]'));
		}
	},
	/**
   	 * 
   	 */
   	doCancel: function(component) {
		var salir=false;
	    if (component.up('CursosListForm')!=null) 
		   if (component.up('CursosListForm').tab.icon=='img/icon/saving.gif') 
		   	       Ext.Msg.confirm("ATENCIÓN","No ha guardado los cambios. ¿ Desea salir y perder los cambios ?", 
				        function(e){
						  if(e == 'yes'){
							salir=true;
						  }
						}
					)
			else salir=true;
			if (salir) Ext.ComponentMgr.get('mainTabs').remove(component.up('CursosListForm')); // elimina el tab de cursos panel tab
   	},
    
   
	/*
	 * 
	 */
	doLoad: function(panel) { 
		var id = panel.token.split('|')[1],
			main = wealthmgr.app.getController('generalController'),
			ctrl = this;

		 wealthmgr.model.Cursoformacion.load(id, { // para hacer operacion load, save sobre modelo requiere que definamos el proxy en el propio modelo, mismo que store
			callback: function(record, operation, success) {
				var title = 'Curso';
				if (record !== null) title += ' [' + record.get('id')+'-'+record.get('nombre').substr(0,10) + '...]';
				
				wealthmgr.app.getController('generalController').status(success, title, '');
				panel.setTitle(title);
				if (!success) return;
				panel.idCurso=record.get('id'); // guardamos el id en una vble id
				panel.tab.setIconCls(''); // ningun icono
				panel.down('CursosListEast').form.trackResetOnLoad = true; // poner Dirty a false y pondrá dirty a true en la siguiente 
				panel.down('CursosListEast').loadRecord(record); // carga el contenido de record en los fields del panel según su 'name'
				
		       //  cargamos el resto de tabs
				ctrl.fireEvent('cargarSuscritos', panel); 
				panel.tipoAdjunto='P'; // indica el tipo de adjunto
				ctrl.fireEvent('cargarAdjuntos', panel); 
			  }
		 });
	},
	
	/**
	 * 
	 */
	doSave: function(component) { // se llamara desde el boton save
		var form = component.up('CursosListEast'),
			record = form.getForm().getValues(),
			ctrl=this; // la funcion callback necesita vbles locales, no se puede utulizar this
		var model = Ext.create('wealthmgr.model.Cursoformacion', record); // crea un registro del modelo a partir de los campos form
		model.save({ // llamara al controlador del server con PUT o POST segun caso
			callback: function(record, operation, success) {
				var title =  'Cursos [' + record.get('id') + ']';
				
				wealthmgr.app.getController('generalController').status(success, title, '');
				if (!success) return;
				ctrl.doLoad(form.up('CursosListForm'));
			}
		});
		
	}
 

	
	
 
});
