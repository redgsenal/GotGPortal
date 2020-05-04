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

    function draggable(piece){
		$(piece).draggable({
			addClasses: false,
			snap: 'td.cell',
			drag: function(event, ui){
				var t = $(this);
				console.log('drag this ', t);
			}
		});
    }

    function buildpieces(pieces, color) {
    	console.log(pieces);
    	var board = $('.board');
    	var colorside = color + 'piece';
    	$.each(pieces, function(i, v){    		
    		var loc = board.find('[data-location=' + v.location.x + '-' + v.location.y + ']');
    		// console.log('location ', loc);
    		if (loc.length){
    			var p = loc.find('.piece');
    			console.log('piece ', p);
    			if (p.length) {
    				p.addClass('draggable');
    				p.addClass(colorside);
    				draggable(p);
    			}
    		}
    	});
    }

    function buildplayers(players){
    	console.log(players);
    	$.each(players, function(i, v){    		
    		var c = $('.player#'+v.side);
    		c.append('<span class="name">' + v.name + '</span>');
    		buildpieces(v.pieces, v.side);
    	});
    }

    function buildgame(game){
    	console.log(game);
    	buildplayers(game.board.players);
    };

    var game = {
    	board: {
    		players: [{
    			name: 'John',
	    		side: 'white',
	    		pieces: 
	    		[
	    			{
		    			location: {
		    				x: 2,
		    				y: 3
		    			}
	    			},
	    			{
	    				location: {
	    					x: 3,
	    					y: 2
	    				}
	    			},
	    			{
	    				location: {
	    					x: 4,
	    					y: 2
	    				}
	    			},
	    			{
	    				location: {
	    					x: 5,
	    					y: 2
	    				}
	    			},
	    			{
	    				location: {
	    					x: 6,
	    					y: 1
	    				}
	    			}
	    		]
    		},
    		{
    			name: 'Joe',
	    		side: 'black',
	    		pieces: 
	    		[
	    			{
	    				location: {
	    					x: 2,
	    					y: 6
	    				}
	    			},
	    			{
		    			location: {
		    				x: 6,
		    				y: 6
		    			}
	    			},
	    			{
	    				location: {
	    					x: 7,
	    					y: 6
	    				}
	    			},
	    			{
		    			location: {
		    				x: 8,
		    				y: 6
		    			}
	    			}
	    		]
    		}]
	    }
	};
	buildgame(game);
});