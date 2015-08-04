 $(".dropdown-button-container").click(function() {
 	var $button, $menu;
 	$button = $(this).children(".dropdown-filter");
 	$menu = $(this).siblings(".dropdown-menu");
 	$menu.toggleClass("show-menu");
 	$menu.children("li").click(function() {
 		$menu.removeClass("show-menu");
 		$button.html($(this).html());
 	});
 });
