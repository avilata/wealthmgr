Ext.define('wealthmgr.widget.BaseFilterDate',{
	extend: 'Ext.form.FieldSet',
	alias: 'widget.BaseFilterDate',
	title: 'Fecha',
	layout: 'anchor',
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: me.buildItems()
		});
		me.callParent(arguments);
		// VType para cálculo relativo
		Ext.apply(Ext.form.field.VTypes, {
			daterel: function(val, field) {
				return /^([\+\-][0-9]+[N|H|D|S|M|A]|[\+\-][L|M|X|J|V|S|D|T])+$/.test(val);
			},
			daterelText: 'Not a valid sequence',
			daterelMax: /[\+\-0-9_]/i
		});
	},
	buildItems: function() {
		return [{
			xtype: 'fieldcontainer',
			layout: 'hbox',
			anchor: '100%',
			items: [{
				xtype: 'combobox',
				name: this.initialConfig.name + '_combo',
				enableKeyEvents: true,
				fieldLabel: 'Filtro',
				width: 155,
				labelAlign: 'right',
				labelWidth: 35,
				displayField: 'description',
				valueField: 'id',
				store: Ext.create('Ext.data.Store', {
					fields: [
					    { name: 'id', type: 'string' },
					    { name: 'description', type: 'string' }
					],
					data: [
				        { id: 'A', description: 'ABSOLUTO' },
				        { id: 'R', description: 'RELATIVO' }
					]
				}),
				listConfig: {
					getInnerTpl: function() {
						return '<div>' +
							'<tpl if="id === \'A\'">' +
							'  <img src="img/icon/calendar.png" style="vertical-align:middle">' +
							'<tpl else>' + 
							'  <img src="img/icon/sum.png" style="vertical-align:middle">' +
							'</tpl>&nbsp;&nbsp;{description}' +
							'</div>';
					}
				},
				listeners: {
					change: function(cmp, value) {
						var wg = cmp.up('BaseFilterDate'),
							date_desde = wg.down('datefield[name=' + wg.initialConfig.name + '_date_desde]'),
							date_hasta = wg.down('datefield[name=' + wg.initialConfig.name + '_date_hasta]'),
							text_desde = wg.down('textfield[name=' + wg.initialConfig.name + '_text_desde]'),
							text_hasta = wg.down('textfield[name=' + wg.initialConfig.name + '_text_hasta]');
						
						// Mostrar/ocultar campos
						if (value === 'A') {
							// Filtro Absoluto
							date_desde.setVisible(true);
							date_hasta.setVisible(true);
							text_desde.setVisible(false);
							text_hasta.setVisible(false);
						
						} else if (value === 'R') {
							// Filtro Relativo
							date_desde.setVisible(false);
							date_hasta.setVisible(false);
							text_desde.setVisible(true);
							text_hasta.setVisible(true);
						
						} else {
							// Resto de valores
							date_desde.setVisible(false);
							date_hasta.setVisible(false);
							text_desde.setVisible(false);
							text_hasta.setVisible(false);
							
							// Reset de valores
							date_desde.setValue(null);
							date_hasta.setValue(null);
							text_desde.setValue(null);
							text_hasta.setValue(null);
						}
					},
					keydown: function(obj, event, opts) {
						if (event.getKey() === Ext.EventObject.BACKSPACE) {
							obj.setValue(null);
						}
					}
				}
			},{
				xtype: 'tbspacer',
				width: 5
			},{
				xtype: 'button',
				text: '',
				iconCls: 'icon-help',
				width: 23,
				listeners: {
					click: function(cmp) {
						Ext.MessageBox.show({
							title: 'Información Filtro Fechas',
							msg: 
								'Las fechas se pueden indicar de dos formas:<br><br>' +
								'<b>Valores Absolutos</b><br>' +
								'Las fechas se indican directamente en los campos<br><br>' +
								'<b>Valores Relativos</b><br>' +
								'Las fechas se calculan a partir de la fecha actual<br>' +
								'concatenando los siguientes comandos:<br><br>' +
								'+?N / -?N: Se suma / resta ? minutos<br>' +
								'+?H / -?H: Se suma / resta ? horas<br>' +
								'+?D / -?D: Se suma / resta ? días<br>' +
								'+?S / -?S: Se suma / resta ? semanas (de 7 días)<br>' +
								'+?M / -?M: Se suma / resta ? meses (de 30 días)<br>' +
								'+?A / -?A: Se suma / resta ? años (de 365 días)<br><br>' +
								'+L / -L: Próximo / anterior Lunes<br>' +
								'+M / -M: Próximo / anterior Martes<br>' +
								'+X / -X: Próximo / anterior Miércoles<br>' +
								'+J / -J: Próximo / anterior Jueves<br>' +
								'+V / -V: Próximo / anterior Viernes<br>' +
								'+S / -S: Próximo / anterior Sábado<br>' +
								'+D / -D: Próximo / anterior Domingo<br><br>' +
								'+T / -T: Hora a 23:59:59 / 00:00:00',
							buttons: Ext.MessageBox.OK,
							icon: Ext.MessageBox.INFO
						});
					}
				}
			},{
				xtype: 'tbspacer',
				width: 5
			},{
				xtype: 'button',
				text: '',
				iconCls: 'icon-arrow-refresh',
				width: 23,
				listeners: {
					click: function(cmp) {
						var wg = cmp.up('BaseFilterDate'),
							date_desde = wg.down('datefield[name=' + wg.initialConfig.name + '_date_desde]'),
							date_hasta = wg.down('datefield[name=' + wg.initialConfig.name + '_date_hasta]'),
							text_desde = wg.down('textfield[name=' + wg.initialConfig.name + '_text_desde]'),
							text_hasta = wg.down('textfield[name=' + wg.initialConfig.name + '_text_hasta]');
						if (text_desde.getValue() !== '') date_desde.setValue(wg.calculate(text_desde.getValue()));
						if (text_hasta.getValue() !== '') date_hasta.setValue(wg.calculate(text_hasta.getValue()));
					}
				}
			}]
		},{
			xtype: 'datefield',
			name: this.initialConfig.name + '_date_desde',
			hidden: true,
			enableKeyEvents: true,
			fieldLabel: 'Desde',
			labelAlign: 'right',
			labelWidth: 50,
			anchor: '100%',
			format: 'd/m/Y H:i:s',
			startDay: 1,
			listeners: {
				select: function(field, value, opts) {
					this.setValue(new Date(value.setHours(0,0,0)));
				}
			}
		},{
			xtype: 'datefield',
			name: this.initialConfig.name + '_date_hasta',
			hidden: true,
			enableKeyEvents: true,
			fieldLabel: 'Hasta',
			labelAlign: 'right',
			labelWidth: 50,
			anchor: '100%',
			format: 'd/m/Y H:i:s',
			startDay: 1,
			listeners: {
				select: function(field, value, opts) {
					this.setValue(new Date(value.setHours(23,59,59)));
				}
			}
		},{
			xtype: 'textfield',
			name: this.initialConfig.name + '_text_desde',
			vtype: 'daterel',
			hidden: true,
			enableKeyEvents: true,
			fieldLabel: 'Desde',
			labelAlign: 'right',
			labelWidth: 50,
			anchor: '100%',
			listeners: {
				change: function(cmp, value) {
					var wg = cmp.up('BaseFilterDate'),
						combo = wg.down('combobox[name=' + wg.initialConfig.name + '_combo]'),
						date_desde = wg.down('datefield[name=' + wg.initialConfig.name + '_date_desde]'),
						text_desde = wg.down('textfield[name=' + wg.initialConfig.name + '_text_desde]');
					if (combo.getValue() === 'R') date_desde.setValue(wg.calculate(text_desde.getValue()));
				}
			}
		},{
			xtype: 'textfield',
			name: this.initialConfig.name + '_text_hasta',
			vtype: 'daterel',
			hidden: true,
			enableKeyEvents: true,
			fieldLabel: 'Hasta',
			labelAlign: 'right',
			labelWidth: 50,
			anchor: '100%',
			listeners: {
				change: function(cmp, value) {
					var wg = cmp.up('BaseFilterDate'),
						combo = wg.down('combobox[name=' + wg.initialConfig.name + '_combo]'),
						date_hasta = wg.down('datefield[name=' + wg.initialConfig.name + '_date_hasta]'),
						text_hasta = wg.down('textfield[name=' + wg.initialConfig.name + '_text_hasta]');
					if (combo.getValue() === 'R') date_hasta.setValue(wg.calculate(text_hasta.getValue()));
				}
			}
		}];
	},
	calculate: function(exp) {
		var date = null;
		if (exp !== null && exp !== '') {
			// Asignamos fecha actual
			date = new Date();
			// Añadimos centinela
			exp += '*';
			// Parseamos la expresión
			var chr = '',
				dir = '',
				num = '',
				cmd = '',
				ms_min = 60000,
				ms_hour = 3600000,
				ms_day = 86400000,
				ms_week = 604800000,
				ms_month = 2592000000,
				ms_year = 31536000000;
			while (exp.length > 0) {
				chr = exp.substring(0, 1);
				exp = exp.substring(1);
				// Fin de segmento y dirección del cálculo
				if ('+-*'.indexOf(chr) > -1) {
					// Si cambiamos de segmento actualizamos la fecha
					if (dir !== '' && cmd !== '') {
						// Cálculos relativos
						if (num !== '') {
							var ms = 0;
							// Milisegundos del cálculo
							switch (cmd) {
							case 'N': ms = ms_min; break;
							case 'H': ms = ms_hour; break;
							case 'D': ms = ms_day; break;
							case 'S': ms = ms_week; break;
							case 'M': ms = ms_month; break;
							case 'A': ms = ms_year; break;
							}
							if (dir === '-')
								date = new Date(date.getTime() - parseInt(num) * ms);
							else if (dir === '+')
								date = new Date(date.getTime() + parseInt(num) * ms);
						// Cálculos absolutos
						} else {
							if (cmd === 'T') {
								// Asignación de hora
								if (dir === '-') 
									date = new Date(date.setHours(0,0,0,0));
								else if (dir === '+')
									date = new Date(date.setHours(23,59,59,0));
							} else if ('LMXJVSD'.indexOf(cmd) > -1) {
								var day = null;
								// Cálculo del día de la semana
								switch (cmd) {
								case 'L': day = 1; break;
								case 'M': day = 2; break;
								case 'X': day = 3; break;
								case 'J': day = 4; break;
								case 'V': day = 5; break;
								case 'S': day = 6; break;
								case 'D': day = 0; break;
								}
								if (day !== null)
									while (date.getDay() !== day) {
										if (dir === '+')
											date = new Date(date.getTime() + ms_day);
										else
											date = new Date(date.getTime() - ms_day);
									}
							}
						}
					}
					// No hemos terminado
					if (chr !== '*') {
						dir = chr;
						num = '';
						cmd = '';
					}
				}
				// Valores numéricos
				if ('0123456789'.indexOf(chr) > -1) {
					num += chr;
				}
				// Comandos
				if ('NHDSMALMXJVSDT'.indexOf(chr) > -1) {
					cmd = chr;
				}
			}
		}
		return date;
	}
});