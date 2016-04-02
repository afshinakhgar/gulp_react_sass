$(function(){
	$('#range').on("change", function() {
    	$('.output').val(this.value +"  تومان" );
    }).trigger("change");
});