Ext.define('wealthmgr.view.cursosList.ObservacionesController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ObservacionesSuscritos',

	init: function() {
		this.control({
			'ObservacionesSuscritos [name=id]': {
				render: function (c) {c.setValue(this.getView().idCurso);}
			},
			'ObservacionesSuscritos button[action=submit]': {
				click: this.formSubmit
			},
			'ObservacionesSuscritos button[action=cancel]': {
				click: this.formCancel
			}
		});
	},

	/**
	 *
	 */
	formCancel: function(button, record) {
		button.up('window').close();
	},

	/**
	 *
	 */
	formSubmit: function(button, record) {
		var panel = this.getView(),
			model = Ext.create('wealthmgr.model.Suscritos', {
	            idPersonal: panel.down('[name=idPersonal]').getValue(),
	            idCurso: panel.down('[name=id]').getValue(),
	            observacionesSuscriptor: panel.down('[name=asunto]').getValue(),
	            fechaSuscripcion: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
	        }),
			form = panel.getForm(),
			main = wealthmgr.app.getController('generalController');
		
		if (!form.isValid()) return;

		model.save({
			callback: function(record, operation, success) {
				
				if (!success) return;
				button.up('window').close();
				
				
			}
		});
	}

	
	

});