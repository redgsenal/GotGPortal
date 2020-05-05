$(function(){	
	$('.piece').mousedown(function(){		
		var p = this.parentElement;
		var id = p.id;
		var coor = id.replace('cell-', '').split('-');
		var x = parseInt(coor[0]);
		var y = parseInt(coor[1]);		
		var pt = document.querySelector('#cell-' + x + '-'  + eval(y + 1));
		var pb = document.querySelector('#cell-' + x + '-'  + eval(y - 1));
		var pl = document.querySelector('#cell-' + eval(x - 1) + '-'  + y);
		var pr = document.querySelector('#cell-' + eval(x + 1) + '-'  + y);
		var containers = [p, pt, pb, pl, pr];
		console.log('containers ', containers);
		var d = dragula(containers, {
			revertOnSpill: true
		});
		d.on('drop', function(el, target, source, sibling) {
			console.log('target ', target);
		});		
	});
});