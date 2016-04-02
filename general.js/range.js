$(function(){
	$('#range').on("change", function() {
		var price = this.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")


		$('.output').val(price +"  ریال" );
	}).trigger("change");
});