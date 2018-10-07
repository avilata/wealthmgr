Ext.define('wealthmgr.view.Attach.AttachController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Attach',

	init: function() {
		this.control({
			'button[action=attach]': {
    			click: this.doAttachUpload
    		},
    		'button[action=download]': {
    			click: this.doAttachDownload
    		},
    		'button[action=edit]': {
    			click: this.doAttachEdit
    		},
    		'button[action=delete]': {
    			click: this.doAttachDelete
    		},
			'button[action=cancel]': {
				click: this.doCancel
			},
			'button[action=refresh]': {
				click: this.doAttachRefresh
			}
		});
	},
	/*
	*
	*/
	listen: {
		    controller: {
		    	'CursosListForm':{
					cargarAdjuntos:function (panel) {
						   this.doAttachLoad(panel);
					    }		   
					}
				} 	
   	},	
	/**
	 * 
	 */
	doAttachDelete: function(component) {
		var selected = component.up('Attach').down('AttachGrid').getSelectionModel().selected,
			ctrl = this;
		
		if (selected.length === 0) {
			Ext.MessageBox.show({
				title: 'Borrar Adjuntos',
				msg: 'Debes seleccionar al menos un adjunto',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;
		}
		
		Ext.MessageBox.defaultButton = 2;
		Ext.MessageBox.show({
			title: 'Borrar Adjuntos', 
			msg: 'Seguro que quieres borrar ' + selected.length + ' adjunto(s) ?', 
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.QUESTION,
			fn:	function(button) {
				if (button === 'yes') {
					for (var i = 0; i < selected.length; i++) {
						var id = selected.items[i].get('id');
						
						if (id !== null) {
							var fn = function() {};
							
							if (i === selected.length-1)
								fn = Ext.Function.defer(function(){ ctrl.doAttachRefresh(component); }, 100);
							
							Ext.Ajax.request({
								method: 'DELETE',
								url: 'php/attach/bd_attach.php/attachments/' + id,
								success: fn
							});
						}
					}
				}
			}
		});
	},
	
	/**
	 * 
	 */
	doAttachDownload: function(component) {
		var selected = component.up('Attach').down('AttachGrid').getSelectionModel().selected;
		
		if (selected.length === 0) {
			Ext.MessageBox.show({
				title: 'Descargar Adjuntos',
				msg: 'Debes seleccionar al menos un adjunto',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;
		}
		
		for (var i = 0; i < selected.length; i++) {
			var id = selected.items[i].get('id');

			if (id !== null) wealthmgr.app.getController('generalController').goUrl('php/attach/bd_attach.php/attachDownload/' + id);
		}
	},
	
	/**
	 * 
	 */
	doAttachEdit: function(component) {
		var selected = component.up('Attach').down('AttachGrid').getSelectionModel().selected,
			main = wealthmgr.app.getController('generalController');

		if (selected.length === 0) {
			Ext.MessageBox.show({
				title: 'Editar Adjunto',
				msg: 'Debes seleccionar un adjunto',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
			return;
		}
		
    	main.goDialog('AttachEdit', {
    		lock: main.LOCK_CLI_UPDATE,
    		model: Ext.create('wealthmgr.model.Attach', selected.items[0].data),
    		ctrl: this,
    		bttn: component.up('Attach').down('button[action=refresh]') 
    	});
	},
	
	/**
	 * 
	 */
	doAttachLoad: function(panel) {
		var id = panel.token.split('|')[1],
			tab = panel.down('Attach'),
			grid = panel.down('AttachGrid'),
			store = grid.getStore();
		
		grid.getSelectionModel().deselectAll();
		store.load({
			params: { 
				code: id,
				type: panel.tipoAdjunto
			},
			callback: function(records, operation, success) {
				if (success) tab.setTitle('Adjuntos [' + records.length + ']');
			}
		});
	},
	
	/**
	 * 
	 */
	doAttachRefresh: function(component) {
		this.doAttachLoad(component.up('panel').up('panel')); // listform
	},
	
	/**
	 * 
	 */
	doAttachUpload: function(component) {
		var panel = component.up('panel').up('panel'),//listform
			id = panel.token.split('|')[1],
			main = wealthmgr.app.getController('generalController');
		
    	main.goDialog('AttachUpload', { 
    		code: id,
    		type: panel.tipoAdjunto,
    		lock: main.LOCK_CLI_UPDATE,
    		ctrl: this,
    		bttn: component.up('Attach').down('button[action=refresh]')
    	});
	}

});
