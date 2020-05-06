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

	function hasSamePieceInBox(el, target, source){
		var $t = $(target);
		var b = $t.find('.piece.blackpiece').length;
		var w = $t.find('.piece.whitepiece').length;		
		var r = (($t.find('.piece.blackpiece').length > 1) ||
			($t.find('.piece.whitepiece').length > 1));
		return r;
	}

	function isAcceptableDrop(el, target, source, sibling){
		if (hasSamePieceInBox(el, target, source)){			
    		return false;
    	}

    	// restrict 1 box only to the left, right, top, bottom
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

    function resizePieces (container){
    	var $t = $(container);
    	var p = $t.find('.piece');    	
    	p.each(function (i, v){
    		$(v).removeClass('small');
    	});
    	if (p.length > 1) {
    		p.each(function (i, v){
    			$(v).addClass('small');
    		});
    	}
    }

    function refreshGameBoard(){    	
    	var whitepieces = extractColorPiecesFromBoard('.whitepiece');
    	var blackpieces = extractColorPiecesFromBoard('.blackpiece');
    	var whiteplayer = updatePlayerPieces('white', whitepieces);
    	var blackplayer = updatePlayerPieces('black', blackpieces);
    	resizeAllPieces();    	
    }

    function extractCoors(box){
    	var id = $(box).attr('id');
    	if (id) {
    		var coors = id.replace('cell-', '').trim().split('-');    		
    		return { location: { x: coors[0], y: coors[1] } };
    	}
    	return {};
    }

    function updatePlayerPieces(colorside, pieces) {
    	$.each(game.board.players, function (i, player) {    		
    		if (player.side == colorside) {    			
    			player.pieces = pieces;
    		}
    	});
    }

    function extractColorPiecesFromBoard(colorside) {
    	var coors = [];
    	$(colorside).each(function (i, v) {
    		var l = extractCoors($(v).parent());    		
    		coors.push(l);
    	});    	
    	return coors;
    }

    function resizeAllPieces(){
		$('.box').each(function(i, v){
    		resizePieces($(v));	
    	});
    }

    function enableDragBoxes(){
    	var containers = [];
    	$('.box').each(function (i, v){
    		containers.push(v);
    	});
    	dragula(containers,{
    		revertOnSpill: true,
    		removeOnSpill: false,
    		accepts: function (el, target, source, sibling){
    			return isAcceptableDrop(el, target, source, sibling);    			
    		}
    	}).on('drop', function (el, target, source, sibling){
    		refreshGameBoard();
    	}).on('shadow', function (el, container, source){
    		refreshGameBoard();
    	}).on('dragend', function (el){    		
    		refreshGameBoard();
    	});
    }

    function showError(msg, side) {
    	$('.player#' + side + ' .errmsg').text(msg);
    }

    function buildGame(game) {
    	enableDragBoxes();
    	buildPlayers(game.board.players);    	
    };