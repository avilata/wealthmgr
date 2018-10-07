/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('wealthmgr.view.cursosList.SuscritosController', {
    extend: 'Ext.app.ViewController',  
    alias: 'controller.Suscritos',
    
    init: function(){
    	this.control({    	  
    		
		'SuscritosCenter button[action=save]': {
				click: this.doInscribir
		},
   		'SuscritosCenter button[action=excel]': {
				click: this.doExportarExcel
		},
     		
		//Boton BORRAR
		'SuscritosCenter button[action=delete]': {
				click: this.doEliminar
		},
		'SuscritosCenter button[action=refresco]': {
			click: this.cargarSuscripcion 
		},
		'SuscritosGrid': {
			edit: this.doEditGridSuscritos, // no se llama nunca con la edicion de CellEditing, solo con RowEditing
	        selectionchange: function(view, records) {
	        	view.view.up('SuscritosCenter').down('button[action=delete]').setDisabled(!records.length); // deshabilita borrar si esta vacio
	        }
	}
		
		
    	})
     },
     listen: {
    	    controller: {
    	    	'CursosListForm':{
    				cargarSuscritos:function (panel) {
    					 this.doCargar(panel);
    				}
    				}
    			} 	
     },
    	
    doInscribir: function(component) {

		main = wealthmgr.app.getController('generalController');
	
		main.goDialog('ObservacionesSuscritos', {
			lock: main.LOCK_CLI_UPDATE, //tal vez de error
			idCurso: component.up('CursosListForm').idCurso,
			ctrl: this
		});
    	
    },
    
	doEliminar: function(component) { // component será el panel CursosListCenter
		var grid = component.up('SuscritosCenter').down('SuscritosGrid');
        var sm = grid.getSelectionModel();
  		
		for (var i = 0; i < sm.getSelected().length; i++) { // por si seleccionamos más de 1 
			var id = sm.getSelected().getAt(i).get('id');
			
			if (id !== null) {
			       Ext.Msg.confirm("ATENCIÓN","Desea eliminar la suscripción de "+sm.getSelected().getAt(i).get('idPersonal')+"?", 
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
	
	cargarSuscripcion: function(component) {
    	if (component==null) return;
		this.doCargar(component.up('SuscritosCenter')); // el padre de CursosListWest es CursosList
	}, 
	
	doCargar: function(panel) { // se supone que panel siempre va a ser CursosListForm pero al darle a refrescar es SuscritosCenter
		//Si en idCurso: ponemos panel.id crashea, hay que hacer ups&downs para que lo reconozca, no basta con un up a CursosListForm
		var panel=(panel.xtype=='CursosListForm'?panel:panel.up('CursosListForm'));
			params= {idCurso:panel.idCurso}, // hemos definido la vble id en el metodo 
		    grid = panel.down('SuscritosGrid'),
			ctrl = this;
				
		grid.getSelectionModel().deselectAll();
		grid.getStore().load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					 panel.down('SuscritosCenter').setTitle('Suscritos ['+records.length+']');
				}
			}
		});
	},
	 doEditGridSuscritos:function(editor,ctx) {
   		var aprovechamientoColIdx=2 // columna aprovechamiento
	    var rec = ctx.record; // registro actual
 	        if (ctx.grid.columns[aprovechamientoColIdx].getEditor().value==true) {
	        	 Ext.Msg.confirm("ATENCIÓN","La competencia de este curso no está cargada, por ello, No se cargará en la ficha de wealthmgr." );
	        };

	        ctx.grid.store.sync(); // quito el autosync del store
	},
		
	/**
	 *  EXPORTAR excel
	 */
	doExportarExcel: function(component) {
		var idCurso=component.up('CursosListForm').idCurso,
		    main = wealthmgr.app.getController('generalController'),
			sql = "SELECT s.idpersonal ,s.idcurso,p.nombre,s.fechasuscripcion,s.aprovechamiento,s.realizado  FROM suscripcioncurso s,pers_empleados_of p WHERE  " + 
  	        		"  s.idpersonal=p.id and s.idCurso = "+idCurso ;

			main.newPostWindow('php/lib/exportExcel.php/','SQL',sql,'string_con','','suscritosCurso.xls');


	}
		
	
	

});