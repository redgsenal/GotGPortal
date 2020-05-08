const ColorPiece = {
	NONE: 'none',
	WHITE: 'white',
	BLACK: 'black'
}

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

let emptyPiece = new EmptyPiece({x: 10, y: 10}, ColorPiece.WHITE);
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
console.log(privateSoldier2);

//console.log(privateSoldier2.isSameLocation({x: 1, y: 5}));
//console.log(privateSoldier2.isSamePieceLocation(spySoldier));
