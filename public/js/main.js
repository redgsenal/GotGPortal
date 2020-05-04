$(function() {
	$('.draggable').draggable({
		addClasses: false,
		snap: 'td.cell',
		drag: function(event, ui){
			var t = $(this);
			console.log('drag this ', t);
		}
	});

	$('.droppable').droppable({
    	drop: function(event, ui) {    		
    		var t = $(this);    		
    		console.log('drop this ', t);
    	}
    });
});