	var game = {
    	board: {
    		players: [{
    			name: 'John'
	    		,side: 'white'
	    		,pieces: 
	    		[
	    			{
	    				rank: 'general',
		    			location: {
		    				x: 2,
		    				y: 3
		    			}
	    			},
	    			{
	    				rank: 'flag',
	    				location: {
	    					x: 2,
	    					y: 2
	    				}
	    			},
	    			{
	    				rank: 'private',
	    				location: {
	    					x: 4,
	    					y: 2
	    				}
	    			},
	    			{
	    				rank: 'spy',
	    				location: {
	    					x: 5,
	    					y: 2
	    				}
	    			},
	    			{
	    				rank: 'sergeant',
	    				location: {
	    					x: 6,
	    					y: 1
	    				}
	    			},
	    			{
	    				rank: 'spy',
	    				location: {
	    					x: 8,
	    					y: 3
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
	    				rank: 'flag',
		    			location: {
		    				x: 5,
		    				y: 4
		    			}
	    			}
	    			,{
	    				rank: 'private',
		    			location: {
		    				x: 5,
		    				y: 5
		    			}
	    			}
	    			,{
	    				rank: 'general',
		    			location: {
		    				x: 5,
		    				y: 6
		    			}
	    			}
	    			,{
	    				rank: 'private',
	    				location: {
	    					x: 6,
	    					y: 6
	    				}
	    			}
	    			,{	
	    				rank: 'spy',
		    			location: {
		    				x: 8,
		    				y: 6
		    			}
	    			}
	    			,{	
	    				rank: 'sergeant',
		    			location: {
		    				x: 2,
		    				y: 7
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
    			$box.prepend($("<div class='piece draggable " + colorside + " " + v.rank + "'></div>"));    			 			
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
    	updatePlayerPieces('white');
    	updatePlayerPieces('black');
    	resizeAllPieces();
    	console.log(game);
    }

    function extractCoors(box){
    	var id = $(box).attr('id');
    	if (id) {
    		var coors = id.replace('cell-', '').trim().split('-');    		
    		return { location: { x: coors[0], y: coors[1] } };
    	}
    	return {};
    }

    function updatePlayerPieces(colorside) {
    	var pieces = extractColorPiecesFromBoard('.' + colorside + 'piece');
    	$.each(game.board.players, function (i, player) {    		
    		if (player.side == colorside) {    			
    			player.pieces = pieces;
    		}
    	});
    }

    function extractColorPiecesFromBoard(colorside) {
    	var coors = [];
    	$(colorside).each(function (i, v) {
    		coors.push(extractCoors($(v).parent()));
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
    		$(el).removeClass('hidden');
    		refreshGameBoard();    		
    	}).on('shadow', function (el, container, source){
    		var $el = $(el);
    		$el.addClass('hidden');
    		if (isAcceptableDrop(el, container, source, [])){
    			$el.removeClass('hidden');
    		};    		
    	}).on('dragend', function (el){
    		$(el).removeClass('hidden');
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