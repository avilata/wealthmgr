Ext.define('wealthmgr.view.cursosList.CursosListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.cursosList',

    init: function() {
    	this.control({ // aqui definimos los objetos y eventos que vamos a controlar
        		
            	'CursosListWest button[action=buscar]': {
            			click: this.cargarPlanFormacion // llama a este metodo definido mas abajo
            	},
             	'CursosListWest textfield': { // en cualquier campo de este formulario si pulsas intro busca
            			keypress: this.onKeyPress
            	},
            	'CursosListCenter button[action=edit]': {
            			click: this.doEdit
            	},
            	'CursosListCenter button[action=nuevo]': {
            			click: this.doNew
            	},
            	'CursosListCenter button[action=delete]': {
            			click: this.doDelete
            	},
            	'CursosListCenter button[action=refresh]': {
            			click: this.cargarPlanFormacion
            	},
            	'CursosListCenter button[action=exportExcel]': {
            			click: this.doExportarExcel
            	},
            	'CursosListCenter button[action=exportPDF]': {
            			click: this.doExportarPDF
            	},
            	'CursosListCenter button[action=cancel]': {
            			click: this.doCancel
            	},
            	'CursosListGrid': {
            		itemdblclick: this.doEdit
            	}
    	})
    },
	
	
	
	/**
	 * 
	 */
	onKeyPress: function(component, event) {
		if (event.getKey() === Ext.EventObject.ENTER) {
			if (component.up('CursosListWest')!=null) this.cargarPlanFormacion(component);
		}
	},
	/**
   	 * 
   	 */
   	doCancel: function(component) {
		Ext.ComponentMgr.get('mainTabs').remove(component.up('CursosList')); // elimina el tab de cursos panel tab
   	},
    
   /*
    * 
    */
     cargarPlanFormacion: function(component) {
    	if (component==null) return;
		this.doLoad(component.up('CursosList')); // el padre de CursosListWest es CursosList
	},
	
	/*
	 * 
	 */
	doLoad: function(panel) { // se supone que panel siempre va a ser CursosList
		var form = panel.down('CursosListWest'),
			maxrec = form.down('FilterMaxRec');
	
		if (maxrec.getValue() === null || maxrec.getValue() === 0) maxrec.setValue(1000); // carga maxima de registros por defecto 1000
		
		var grid = panel.down('CursosListGrid'),
			record = form.getForm().getValues(), // en record tendremos los campos del formulario filtro y sus valores
			params = wealthmgr.app.getController('generalController').params(record), // copia record a params
			ctrl = this;
		


		params.sort = Ext.encode(grid.getStore().sorters.items);
		
		grid.getSelectionModel().deselectAll();
		grid.getStore().load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					panel.setTitle('Cursos [' + records.length + '] ' );
					panel.tab.setIcon(''); // resetea icono por si esta el de grabar todavía
				}
			}
		});
	},
	
	/*
	 * 
	 */
	doEdit: function(component) { // component será el panel CursosListCenter
		var main = wealthmgr.app.getController('generalController'),
		    selected = component.up('CursosList').down('CursosListGrid').getSelectionModel().selected;
	 
		if (selected.length === 0) {
			Ext.MessageBox.show({
				title: 'Editar ',
				msg: 'Debes seleccionar al menos un registro',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;
		}
		
		for (var i = 0; i < selected.length; i++) { // por si seleccionamos más de 1 aunque no tiene sentido
			var id = selected.items[i].get('id');
			
			if (id !== null) main.goTab('CursosListForm','curso|' + id,true); // edita con todo
		}
	},
	
 
	/*
	 * 
	 */
	doNew: function(component) {
		var ctrl=this,
			grid = component.up('CursosList').down('CursosListGrid'),
		    main = wealthmgr.app.getController('generalController'),
		    p = Ext.create('wealthmgr.model.Cursoformacion',{
           	 		nombre:'Nuevo curso',
					anyoPlanFormacion:(new Date()).getFullYear()
				});
		grid.getStore().on({
        			write:  function ( aStore, aOperation ){
				        		var iRecord = Ext.decode(aOperation._response.responseText);
								main.goTab('CursosListForm','curso|' + iRecord.id,true); // edita con todo
        			}
				});
		grid.getStore().insert(0,p);
		grid.getStore().sync();// si al store se le pone autosync nos evitamos esto
				
	},
	
	/*
	 * 
	 */
	doDelete: function(component) { // component será el panel CursosListCenter
		var grid = component.up('CursosList').down('CursosListGrid');
        var sm = grid.getSelectionModel();
  		
		for (var i = 0; i < sm.getSelected().length; i++) { // por si seleccionamos más de 1 
			var id = sm.getSelected().getAt(i).get('id');
			
			if (id !== null) {
			       Ext.Msg.confirm("ATENCIÓN","Desea borrar registro curso de "+sm.getSelected().getAt(i).get('nombre')+"?", 
				        function(e){
						  if(e == 'yes'){
							grid.getStore().remove(sm.getSelection());
							grid.getStore().sync();// si al store se le pone autosync nos evitamos esto
							if (grid.getStore().getCount() > 0) {sm.select(0); }
						  }
						}
					)
			}
		}
	},
	
	/**
	 *  EXPORTAR PDF
	 */
	doExportarPDF: function(component) {
		var 
		    main = wealthmgr.app.getController('generalController'),
			sql = "SELECT id, anyoplanformacion as `Año`,Nombre, FechaInicio as `Fecha Inicio`,FechaFin as `Fecha Fin` from cursoformacion";

			main.newPostWindow('php/lib/exportPDF.php/','SQL',sql,'string_con','','cursos.pdf');


	},
	/**
	 *  EXPORTAR excel
	 */
	doExportarExcel: function(component) {
		var 
		    main = wealthmgr.app.getController('generalController'),
			sql = "SELECT id, anyoplanformacion as `Año`,Nombre, FechaInicio as `Fecha Inicio`,FechaFin as `Fecha Fin` from cursoformacion";

			main.newPostWindow('php/lib/exportExcel.php/','SQL',sql,'string_con','','Cursos.xls');


	}
	
	
 
});
