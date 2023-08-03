$(document).ready(function(){
	var canvas = $('#canvas')[0];
	var context = canvas.getContext('2d');
	var width = $('#canvas').width();
	var height = $('#canvas').height();	
	var cell_width = 10;
	var run;
	var snake_food;
	var score;
	var snake_array;
	
	start();
	
	function start(){
		run = "left";
		create_snake();
		create_food();
		score = 0;
		
		if(typeof game_start != "undefined")clearInterval(game_start);
		game_start = setInterval(config, 60);
	}
	
	function create_snake(){
		var snake_size = 3;
		snake_array = [];
		for(var m = 0; m < snake_size; m++){
			snake_array.push({x: 45, y: 14});
		}
	}
	
	function create_food(){
		snake_food = {
			x: Math.round(Math.random() * (width - cell_width) / cell_width),
			y: Math.round(Math.random() * (height - cell_width) / cell_width)
		};
	}
	
	function config(){
		
		stage_color();
		
		var pop_x = snake_array[0].x;
		var pop_y = snake_array[0].y;
		
		switch(run){
			case "right":
				pop_x++;
				break;
			case "left":
				pop_x--;
				break;
			case "down":
				pop_y++;
				break;
			case "up":
				pop_y--;
				break;
		}
		
		
		if(pop_x == -1 || pop_x == width / cell_width || pop_y == -1 || pop_y == height / cell_width || collision(pop_x, pop_y, snake_array)){
			start();
			return;
		}
		
		if(pop_x == snake_food.x && pop_y == snake_food.y){
			var snake_tail = {x: pop_x, y: pop_y};
			score += 3;
			create_food();
		}else{
			var snake_tail = snake_array.pop();
			snake_tail.x = pop_x;
			snake_tail.y = pop_y;
			
		}
		
		snake_array.unshift(snake_tail);
		
		for (var i = 0; i < snake_array.length; i++){
			var c = snake_array[i];
			snake_body(c.x, c.y);
		}
		
		snake_body(snake_food.x, snake_food.y);
		
		var score_text = "Score: " + score;
		var title = "Sourcecodester"
		context.fillText(score_text, 5, 10);
		context.fillText(title, 0, height-2);
	}
	
	function stage_color(){
		context.fillStyle = "orange";
		context.fillRect(0, 0, width, height);
		context.strokeStyle = "#000000";
		context.strokeRect(0, 0, width, height);
		
	}
	
	function snake_body(x, y){
		context.fillStyle = "#ffffff";
		context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
		context.strokeStyle = "#000000";	
		context.strokeRect(x * cell_width, y * cell_width, cell_width, cell_width);
	}
	
	function collision(x, y, array){
		for(var i = 0; i < array.length; i++){
			if(array[i].x == x && array[i].y == y){
				return true;
			}
		}
		return false;
	}
	
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "40" && run != "up"){
			run = "down";
		}
		else if(key == "39" && run != "left"){
			run = "right";
		}
		else if(key == "38" && run != "down"){
			run = "up";
		}
		else if(key == "37" && run != "right"){
			run = "left";
		}
	});
	
});