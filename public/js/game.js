const ColorPiece = {
	NONE: 'none',
	WHITE: 'white',
	BLACK: 'black'
}
const neutralLocation = {x: 0, y: 0};

class SoldierPiece {	
	constructor(rank, value, clsrank, eliminated, location, colorside) {
		this.rank = rank;		
		this.rValue = value;
		this.clsrank = clsrank;
		this.location = location;
		this.eliminated = eliminated;
		this.colorside = colorside;
	}

	get rankName(){
		return this.rank;
	}

	set rankName(v){
		this.rank = v;
	}

	get rankValue(){
		return this.rValue;
	}

	set rankValue(v){
		this.rValue = v;
	}

	get pieceLocation(){
		return this.location;
	}

	set pieceLocation(v){
		this.location = v;
	}

	get classRank(){
		return this.clsrank;
	}

	set classRank(v){
		this.clsrank = v;
	}

	get pieceColor(){
		return this.colorside;
	}

	set pieceColor(v){
		this.colorside = v;
	}

	id(){
		let x = this.location.x;
		let y = this.location.y;
		return "cell-" + x + "-" + y;
	}
	
	eliminatePiece(){
		this.location = {x: 0, y: 0};
		this.eliminated = true;
	}

	isEliminated(){
		return this.eliminated;
	}
	
	isSameLocation(location2){
		if (!location2)
			return false;
		return (this.location.x == location2.x) && (this.location.y == location2.y);
	}

	isSamePieceLocation(piece){
		return this.isSameLocation(piece.location);
	}

	move(location){
		if ((this.location.x == location.x) && (this.location.y == location.y)){
			throw "Invalid move location";
		}
		if (this.location.x == location.x) {
			if (Math.abs(this.location.y - location.y) > 1) {
				throw "Invalid move location y-axis";
			}
		}
		if (this.location.y == location.y) {
			if (Math.abs(this.location.x - location.x) > 1) {
				throw "Invalid move location x-axis";
			}
		}
		if (this.eliminated){
			throw "Invalid piece is eliminated";
		}
		if (location.x > 9 || location.x < 1){
			throw "Invalid x-axis; out of boundery";
		}
		if (location.y > 8 || location.y < 1){
			throw "Invalid y-axis; out of boundery";
		}
		this.location = location;
	}

	challengePiece(piece) {
		if (this.isSameLocation(piece)){
			throw "Invalid challenge pieces; not same location";
		}
		if (!piece){
			this.location = piece.location;
			piece.eliminatePiece();
			return this;
		}
		// TODO need to confirm
		// the piece that challenges the piece of the same current location wins
		if (piece.rankValue == this.rankValue){
			this.location = piece.location;
			piece.eliminatePiece();
			return this;
		}
		if (piece.rankValue > this.rankValue){
			piece.location = this.location;
			this.eliminatePiece();
			return piece;
		} else {
			this.location = piece.location;
			piece.eliminatePiece();
			return this;
		}
	}
}

class EmptyPiece extends SoldierPiece {
	constructor(location){
		super("No Rank", 0, "norank", false, location, ColorPiece.NONE);
	}
}

class SoldierFlagPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Flag", -1, "flagrank", false, location, colorside);
	}	
}

class SoldierPrivatePiece extends SoldierPiece {
	constructor(location, colorside){
		super("Private", 100, "privaterank", false, location, colorside);
	}

	challengePiece(piece){
		if (piece instanceof SoldierSpyPiece){
			return this;
		}
		return piece;
	}	
}

class SoldierSpyPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Spy", 100000, "spyrank", false, location, colorside);
	}

	challengePiece(piece){
		if (piece instanceof SoldierPrivatePiece){
			piece.location = this.location;
			this.eliminatePiece();
			return piece;
		}
		this.location = piece.location;
		piece.eliminatePiece();
		return this;
	}
}

class SoldierSergeantPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Sergeant", 200, "sergeantrank", false, location, colorside);
	}
}

class SoldierSecondLieutenantPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Second Lieutenant", 300, "secondlieutenantrank", false, location, colorside);
	}
}

class SoldierFirstLieutenantPiece extends SoldierPiece {
	constructor(location, colorside){
		super("First Lieutenant", 400, "firstlieutenantrank", false, location, colorside);
	}
}

class SoldierCaptainPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Captain", 500, "captainrank", false, location, colorside);
	}
}

class SoldierMajorPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Major", 600, "majorrank", false, location, colorside);
	}
}

class SoldierLieutenantColonelPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Lieutenant Colonel", 700, "lieutenantcolonelrank", false, location, colorside);
	}
}

class SoldierColonelPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Colonel", 800, "colonelrank", false, location, colorside);
	}
}

class SoldierBrigadierGeneralPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Brigadier General", 900, "brigadiergeneralrank", false, location, colorside);
	}
}

class SoldierMajorGeneralPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Major General", 1000, "majorgeneralrank", false, location, colorside);
	}
}

class SoldierLieutenantGeneralPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Lieutenant General", 2000, "lieutenantgeneralrank", false, location, colorside);
	}
}

class SoldierGeneralPiece extends SoldierPiece {
	constructor(location, colorside){
		super("Lieutenant General", 5000, "generalrank", false, location, colorside);
	}
}

class Soldier5StarGeneralPiece extends SoldierPiece {
	constructor(location, colorside){
		super("5 Star General", 10000, "fivestargeneralrank", false, location, colorside);
	}
}

class Board {	
	constructor(){
		this.MAX_X = 9;
		this.MAX_Y = 8;
		this.MIN_X = 1;
		this.MIN_Y = 1;
		this.enableDragBoxes();
		this.whitePieces = this.generatePieces(ColorPiece.WHITE);
		this.blackPieces = this.generatePieces(ColorPiece.BLACK);
		this.buildBoardLayout();
	}

	get boardPieces(){
		return this.whitePieces.concat(this.blackPieces);
	}

	get whiteSoldierPieces(){
		return this.whitePieces;
	}

	get blackSoldierPieces(){
		return this.blackPieces;
	}

	buildBoardLayout(){
		const pieces = this.whitePieces.concat(this.blackPieces);		
		pieces.forEach(function(v, i){
			const $box = $("#" + v.id());			
    		if ($box.length == 1){
    			$box.prepend($("<div class='piece draggable " + v.colorside + "piece " + v.clsrank + "'></div>"));
    		}
		});
	}

	refreshGameBoard(){
		this.resizeAllPieces();
		this.boardPieces.forEach(function (v, i){
			//console.log(v.pieceLocation);
		});
	}

	hasSamePieceInBox(el, target, source){
		const $t = $(target);
		const b = $t.find('.piece.blackpiece').length;
		const w = $t.find('.piece.whitepiece').length;		
		const r = (($t.find('.piece.blackpiece').length > 1) ||
			($t.find('.piece.whitepiece').length > 1));
		return r;
	}

	resizeAllPieces(){
		const $this = this;
		$('.box').each(function(i, v){
    		$this.resizePieces($(v));	
    	});
    }

	resizePieces (container){
    	const $t = $(container);
    	const p = $t.find('.piece');    	
    	p.each(function (i, v){
    		$(v).removeClass('small');
    	});
    	if (p.length > 1) {
    		p.each(function (i, v){
    			$(v).addClass('small');
    		});
    	}
    }

	isAcceptableDrop(el, target, source, sibling){		
		if (this.hasSamePieceInBox(el, target, source)){			
    		return false;
    	}

    	// restrict 1 box only to the left, right, top, bottom
    	const $src = $(source);
    	const $tgt = $(target);
    	const sid = $src.attr('id');
    	const tid = $tgt.attr('id');
    	const scoor = sid.replace('cell-', '').split('-');
    	const x = parseInt(scoor[0]);
		const y = parseInt(scoor[1]);
		const tcoors = [
			'cell-' + x + '-'  + eval(y + 1)
			,'cell-' + x + '-'  + eval(y - 1)
			,'cell-' + eval(x - 1) + '-'  + y
			,'cell-' + eval(x + 1) + '-'  + y
		];    			
    	return tcoors.includes(tid);
	}

	pieceAtLocation(location){
		let piece = new EmptyPiece(location, ColorPiece.NONE); 
		this.boardPieces.forEach(function(v, i){
			if (v.location.x == location.x && v.location.y == location.y){				
				piece = v;
			}
		});
		return piece;
	}

	movePiece(el, target, source){
		const $t = $(target);
		const $s = $(source);
		const $p = $(el);
		const sx = $s.data('x');
		const sy = $s.data('y');
		const tx = $t.data('x');
		const ty = $t.data('y');
		const piece = this.pieceAtLocation({x: sx, y: sy});
		if (!(piece instanceof EmptyPiece)){			
			piece.pieceLocation = {x: tx, y: ty};
		}
	}

	enableDragBoxes(){
    	const containers = [];
    	const $this = this;
    	$('.box').each(function (i, v){
    		containers.push(v);
    	});
    	dragula(containers,{
    		revertOnSpill: true,
    		removeOnSpill: false,
    		accepts: function (el, target, source, sibling){
    			return $this.isAcceptableDrop(el, target, source, sibling);    			
    		}
    	}).on('drop', function (el, target, source, sibling){
    		$(el).removeClass('hidden');
    		$this.movePiece(el, target, source);
    		$this.refreshGameBoard();
    	}).on('shadow', function (el, container, source){
    		let $el = $(el);
    		$el.addClass('hidden');
    		if ($this.isAcceptableDrop(el, container, source, [])){
    			$el.removeClass('hidden');
    		};    		
    	}).on('dragend', function (el){
    		$(el).removeClass('hidden');
    		$this.refreshGameBoard();
    	});
    }

	randomNumberMinMax(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomInitialLocation(colorside){
		let rx = this.randomNumberMinMax(1, this.MAX_X);
		let miny = 1;
		let maxy = 3;
		if (colorside == ColorPiece.BLACK) {
			miny = 6;
			maxy = this.MAX_Y;
		}
		let ry = this.randomNumberMinMax(miny, maxy);
		return {x: rx, y: ry};
	}


	isNewLocationValid(pieces, location){
		let rv = true;
		pieces.forEach(function (v, i){
			if (v.pieceLocation.x == location.x && v.pieceLocation.y == location.y) {
				rv = false;
			}
		});
		return rv;
	}

	generateInitialPiecesLocation(pieces, colorside) {		
		const $this = this;
		pieces.forEach(function (v, i){			
			let vl = false;
			while(!vl) {
				const location = $this.randomInitialLocation(colorside);
				vl = $this.isNewLocationValid(pieces, location);
				if (vl){
					v.pieceLocation = location;
				}				
			}
		});
	}

	generatePieces(colorside) {
		let pieces = [];
		const privatePieces = [];
		const spyPieces = [];
		// 6 privates
		while (privatePieces.length < 6) {
			privatePieces.push(new SoldierPrivatePiece(neutralLocation, colorside));
		}
		pieces = pieces.concat(privatePieces);
		// 6 privates
		while (spyPieces.length < 2) {				
			spyPieces.push(new SoldierSpyPiece(neutralLocation, colorside));
		}
		pieces = pieces.concat(spyPieces);
		pieces.push(new SoldierFlagPiece(neutralLocation, colorside));
		pieces.push(new SoldierSergeantPiece(neutralLocation, colorside));
		pieces.push(new SoldierSecondLieutenantPiece(neutralLocation, colorside));
		pieces.push(new SoldierFirstLieutenantPiece(neutralLocation, colorside));
		pieces.push(new SoldierCaptainPiece(neutralLocation, colorside));
		pieces.push(new SoldierMajorPiece(neutralLocation, colorside));
		pieces.push(new SoldierColonelPiece(neutralLocation, colorside));
		pieces.push(new SoldierLieutenantColonelPiece(neutralLocation, colorside));
		pieces.push(new SoldierBrigadierGeneralPiece(neutralLocation, colorside));
		pieces.push(new SoldierMajorGeneralPiece(neutralLocation, colorside));
		pieces.push(new SoldierLieutenantGeneralPiece(neutralLocation, colorside));
		pieces.push(new SoldierGeneralPiece(neutralLocation, colorside));
		pieces.push(new Soldier5StarGeneralPiece(neutralLocation, colorside));
		this.generateInitialPiecesLocation(pieces, colorside);
		return pieces;
	}
}

class GotG {
	constructor(){
		let board = new Board(); 
	}
}

/*let emptyPiece = new EmptyPiece({x: 10, y: 10}, ColorPiece.WHITE);
let privateSoldier = new SoldierPrivatePiece({x: 1, y: 5}, ColorPiece.BLACK);
let privateSoldier2 = new SoldierPrivatePiece({x: 1, y: 5}, ColorPiece.BLACK);
let spySoldier = new SoldierSpyPiece({x: 1, y: 5}, ColorPiece.WHITE);
privateSoldier.eliminatePiece();
console.log(emptyPiece);
console.log(privateSoldier);
console.log(spySoldier);
console.log(spySoldier instanceof SoldierSpyPiece);
console.log(spySoldier instanceof SoldierCaptainPiece);
console.log(spySoldier instanceof SoldierPiece);
console.log(spySoldier instanceof EmptyPiece);
//privateSoldier.move({x: 10, y: 9});
privateSoldier2.move({x: 2, y: 8});
console.log(privateSoldier2);*/

//console.log(privateSoldier2.isSameLocation({x: 1, y: 5}));
//console.log(privateSoldier2.isSamePieceLocation(spySoldier));
