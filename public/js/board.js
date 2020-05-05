	var game = {
    	board: {
    		players: [{
    			name: 'John'
	    		,side: 'white'
	    		,pieces: 
	    		[
	    			{
		    			location: {
		    				x: 2,
		    				y: 3
		    			}
	    			},
	    			{
	    				location: {
	    					x: 2,
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
    			name: 'Joe'
	    		,side: 'black'
	    		,pieces: 
	    		[
	    			{
		    			location: {
		    				x: 5,
		    				y: 4
		    			}
	    			}
	    			,{
		    			location: {
		    				x: 5,
		    				y: 5
		    			}
	    			}
	    			,{
		    			location: {
		    				x: 5,
		    				y: 6
		    			}
	    			}
	    			,{
	    				location: {
	    					x: 6,
	    					y: 6
	    				}
	    			}
	    			,{
		    			location: {
		    				x: 8,
		    				y: 6
		    			}
	    			}
	    		]
    		}]
	    }
	};

	function isValidDragBox(el){

	}

	function buildpieces(pieces, color) {
    	//console.log(pieces);
    	var board = $('.board');
    	var colorside = color + 'piece';

    	$.each(pieces, function(i, v){
    		var box = "#cell-" + v.location.x + "-" + v.location.y;    		
    		var $box = $(box);
    		// console.log('$box ', $box);
    		if ($box.length){
    			$box.prepend($("<div class='piece draggable " + colorside + "'></div>"));    			 			
    		}
    	});
    }

    function buildplayers(players){
    	//console.log(players);
    	$.each(players, function(i, v){    		
    		var c = $('.player#'+v.side);
    		c.append('<span class="name">' + v.name + '</span>');
    		buildpieces(v.pieces, v.side);
    	});
    }

    function enableDragBoxes(){
    	var containers = [];
    	$('.box').each(function (i, v){    		
    		containers.push(v);
    	});    	
    	dragula(containers,{
    		revertOnSpill: true,
    		accepts: function (el, target, source, sibling){    			
    			var $src = $(source);
    			var $tgt = $(target);
    			var sid = $src.attr('id');
    			var tid = $tgt.attr('id');
    			var scoor = sid.replace('cell-', '').split('-');
    			var x = parseInt(scoor[0]);
				var y = parseInt(scoor[1]);
				var tcoors = [
					'cell-' + x + '-'  + eval(y + 1)
					,'cell-' + x + '-'  + eval(y - 1)
					,'cell-' + eval(x - 1) + '-'  + y
					,'cell-' + eval(x + 1) + '-'  + y
				];    			
    			return tcoors.includes(tid);
    		}
    	});
    }

    function buildgame(game){    	
    	enableDragBoxes();
    	buildplayers(game.board.players);
    };    
