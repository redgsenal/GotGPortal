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

	function isSamePieceDropBox(el, target, source){
		var color = $(el).hasClass('whitepiece') ? '.piece.whitepiece' : '.piece.blackpiece';		
		var $t = $(target);		
		var b = $t.find('.piece.blackpiece').length;
		var w = $t.find('.piece.whitepiece').length;		
		var r = (($t.find('.piece.blackpiece').length > 1) ||
			($t.find('.piece.whitepiece').length > 1));
		return r;
	}

	function isAcceptableDrop(el, target, source, sibling){
		if (isSamePieceDropBox(el, target, source)){
			console.log('fail here');
    		return false;
    	}
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

	function buildPieces(pieces, color) {
    	var board = $('.board');
    	var colorside = color + 'piece';

    	$.each(pieces, function(i, v){
    		var box = "#cell-" + v.location.x + "-" + v.location.y;    		
    		var $box = $(box);
    		if ($box.length){
    			$box.prepend($("<div class='piece draggable " + colorside + "'></div>"));    			 			
    		}
    	});
    }

    function buildPlayers(players){
    	$.each(players, function(i, v){    		
    		var c = $('.player#'+v.side+ ' .name');
    		c.text(v.name);
    		buildPieces(v.pieces, v.side);
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
    			var r = isAcceptableDrop(el, target, source, sibling);    			
    			if (!r){
    				var $src = $(source);
    				var $p = $src.find('.piece');
    				var color = $p.hasClass('whitepiece') ? 'white' : 'black';
    				showError('Invalid move.', color);
    			}
    			return r;
    		}
    	});
    }

    function showError(msg, side) {
    	$('.player#' + side + ' .errmsg').text(msg);
    }

    function buildGame(game) {
    	enableDragBoxes();
    	buildPlayers(game.board.players);
    };