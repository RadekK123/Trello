
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '94',
  'X-Auth-Token': '7ccef6f6f2ff1dd4bb1940093ce40ff2'
};

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});


function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);
  	});
}

function activateTooltip () {
	$('[data-toggle="tooltip"]').tooltip();
}
activateTooltip();