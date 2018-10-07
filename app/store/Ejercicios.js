generatedataEjer=function() {
					var data = [],
					d = new Date();
					for (i=-10;i<2;i++) { // carga 10 años anteriores y 2 posteriores
						data.push({value: d.getFullYear()+i});
					}
				    return data;
				 }
				 
Ext.define('wealthmgr.store.Ejercicios',{
	extend: 'Ext.data.Store',
	fields : [ "value" ],
	data : this.generatedataEjer()

	});