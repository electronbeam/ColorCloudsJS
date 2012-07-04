function generate() {
   
    
    var x_size = (window.innerWidth);
    var y_size = (window.innerHeight);
	    
   
    $('#bgoverlay').css("width", x_size + "px");
    $('#bgoverlay').css("height", y_size + "px");  

    
    var bokeh_num = ((x_size * y_size) / 25600 * 3); /* 160px^2 = average size of circle */
    if(bokeh_num > 100) bokeh_num = 100; //hard cap to help firefox.
    
    //cycle 1, 20% - 25% of x and y plane, population density of 15%
    //cycle 2 80% - 85% of x and y plane, population density of 15%
    //cycle 3 45% - 55% of x and y plane, population density of 20%
    //set densities and bokeh distribution scale
    var c1_density = 0.15;
    var c1_maxbokeh = Math.floor(c1_density * bokeh_num);

    var c2_density = 0.15;
    var c2_maxbokeh = Math.floor(c1_density * bokeh_num);

    var c3_density = 0.20;
    var c3_maxbokeh = Math.floor(c1_density * bokeh_num);

    var c1_minrange = 0.2;
    var c1_maxrange = 0.65;

    var c2_minrange = 0.2;
    var c2_maxrange = 0.85;

    var c3_minrange = 0.45;
    var c3_maxrange = 1.0;

    var remainder = bokeh_num * (c1_density + c2_density + c3_density);
    
    //populate cycle 1
    for(c1tick = 1; c1tick < c1_maxbokeh; c1tick ++) {
        var xrange_min = c1_minrange * x_size;
        var xrange_max = c1_maxrange * x_size;
        var yrange_min = c1_minrange * y_size;
        var yrange_max = c1_minrange * y_size;

        var posx = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        var posy = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        drawBokeh(posx, posy);
    }
    //populate cycle 2
    for(c2tick = 1; c2tick < c2_maxbokeh; c2tick ++) {
        var xrange_min = c2_minrange * x_size;
        var xrange_max = c2_maxrange * x_size;
        var yrange_min = c2_minrange * y_size;
        var yrange_max = c2_minrange * y_size;

        var posx = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        var posy = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        drawBokeh(posx, posy);
    }
    //populate cycle 3
    for(c3tick = 1; c3tick < c3_maxbokeh; c3tick ++) {
        var xrange_min = c3_minrange * x_size;
        var xrange_max = c3_maxrange * x_size;
        var yrange_min = c3_minrange * y_size;
        var yrange_max = c3_minrange * y_size;

        var posx = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        var posy = (Math.floor(Math.random() * xrange_max)) + xrange_min;
        drawBokeh(posx, posy);
    }
    //populate remainder
    for(r_tick = 1; r_tick < remainder; r_tick++) {
        posx = Math.floor(Math.random() * x_size) + 1;
        posy = (Math.floor(Math.random() * y_size)) + 1;
        drawBokeh(posx, posy);
    }

}


function drawBokeh(top, left) {
    //generate the values
    var color = generateColor();
    var size = (Math.floor(Math.random() * 160 )) + 80;
    var size2 = size * 0.8;
            
    //append a circle
    $('body').append(
    "<div class=\"circle\" style=\""+
    //positioning
    "position:fixed; " + "top:"+top+"px;"+"left:"+left+"px;"+
    //shadowing/bluring size
    "box-shadow:0 0 "+ size + "px " + size2 + "px " 
    //color
    + color +
   ";\">&nbsp;</div>"
    );
}


function generateColor() {
    //red - blue
    return "rgba("+ (Math.floor(Math.random() * 120) + 50) + "," + 15 + "," + (Math.floor(Math.random() * 165) + 90) + ", 0.5)";
}

/*events*/
$(document).ready( function(){ generate();});


$(window).resize
(
    function() {
        $('div').remove('.circle');
        setTimeout("generate();", 150);
    }
);
