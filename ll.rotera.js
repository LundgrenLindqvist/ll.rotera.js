// Rotate a number of elements clockwise
(function( $ ) {

  $.fn.llrotatingfour = function(init, callback, clicked) {
    
    var margin = 10;
    var tempo = 600;
    
    if ( init ) {
        clicked = this.find(":nth-child(1)");      
    } else {
        clicked = clicked;
    }
    var clickedPos = parseInt(clicked.attr('data-position'));
        
    var eachWidth = this.find(":nth-child(1)").width();
    var eachHeight = this.find(":nth-child(1)").height();
    
    this.width(eachWidth*2+margin*4).height(eachHeight*2+margin*2);
        
    var length = this.children().length;
    
    function switchPositions(el,position) {
        switch (position) {
            case 1:
                offsetleft = margin;
                offsettop = 0;
                break;
            case 2:
                offsetleft = eachWidth+margin*3;
                offsettop = 0;
                break;
            case 3:
                offsetleft = eachWidth+margin*3;
                offsettop = eachHeight+margin*2;
                break;
            case 4:
                offsetleft = margin;
                offsettop = eachHeight+margin*2;
                break;
        }
        
        if ( init ) {
            el.css({marginTop:offsettop,marginLeft: offsetleft});
        } else {
            el.animate({marginTop:offsettop, marginLeft: offsetleft}, tempo);
        }
    }
    
    var arrowOnTimeOut;
    
    this.children().each(function(stackEmIndex){
        
        var iterations;
        var i = 0;
        
        switch (clickedPos) {
            case 1:
                iterations = 0;
                break;
            case 2:
                iterations = 3;
                break;
            case 3:
                iterations = 2;
                break;
            case 4:
                iterations = 1;
                break;
        }
        
        do {
            var position = parseInt($(this).attr('data-position'));
            if ( !init && clickedPos != 1 ) {
                position++;
                if ( position >= 5 ) position=1;
                $(this).attr('data-position', position);
            }
            if ( init || clickedPos != 1 ) switchPositions($(this),position);
            i++;
            
            // show arrow pointing up when complete
            if ( !init ) {
                if ( i == iterations || clickedPos == 1 ) {
                    clearTimeout(arrowOnTimeOut);
                    arrowOnTimeOut = setTimeout(function() {
                        $('#active-rotate .arrow').show().css({marginTop:15}).animate({marginTop:2}, 200, function(){
                            $('html,body').animate({
        				        scrollTop: 0
        				    }, 400, function(){
        				        $('#rotateWrap').removeClass('rotating');
        				    });
                        });
                        if (typeof callback == "function") callback();
                    }, tempo*iterations);
                }
            }
        } while (i < iterations);
        
    });
    
  };
  
})( jQuery );