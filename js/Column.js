function Column (id, name) {

	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.$element = createColumn();

	function createColumn() {
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');

		var $columnDelete = $('<button>').addClass('btn-delete').attr({

			'data-toggle' : 'tooltip',
			'data-placement' :'top',
			title: 'Usuń kolumnę' }).text('x');

		$columnDelete.click(function () {
			self.deleteColumn();
			
		});

		var $columnAddCard = $('<button>').addClass('add-card').attr({

			'data-toggle' : 'tooltip',
			'data-placement' :'top',
			title: 'Dodaj kartę' }).text('+');

		
		$columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			activateTooltip();
			$.ajax({
				headers: myHeaders,
			    url: baseUrl + '/card',
			    method: 'POST',
			    data: {
				    name: cardName,
				    bootcamp_kanban_column_id: self.id
    			},
			    success: function(response) {
			        var card = new Card(response.id, cardName);
			        self.addCard(card);
    			}
			});
		});

		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);

		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
		activateTooltip ();
	},

	deleteColumn: function() {
	   		var self = this;
	  	    $.ajax({
			headers: myHeaders,
	      	url: baseUrl + '/column/' + self.id,
	      	method: 'DELETE',
	      	success: function(response){
	        self.$element.remove();
	      }
	    });
 	}
};