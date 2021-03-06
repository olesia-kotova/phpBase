'use strict'



$(function() {  // Ограничители jQuery, внутри которых размещается весь код. 

// ========== Появление подсказки по наведению на меню и модальное окно на главной ==========

	$('a.menu').bind({
		'mouseover': function() { 
			let body = $(this).attr('data-body');  // Определяем, с каким элементом работаем
			let color = $(this).attr('data-color');  // Определяем, с каким элементом работаем			
		
			$('#tips').text(body).css('color', color);
		},

		'click': function(event) {
			event.preventDefault(); // Отмена действия по умолчанию 
			let data = $(this).attr('href');
			
			$('<div id="jquery-overlay">').fadeIn('slow').appendTo('body');
			
			$('<div class="modal-win">').appendTo('body');

			var modal = $('<div class="modal-win >').appendTo('body');			

			// ======== Создаем AJAX запрос ========

			var url = $(this).attr('href');
			
			$.ajax({
				url: 'ajax.php', // Обязательный атрибут
				type: 'POST',
				data: 'url=' + url, // Передаем в ajax.php методом POST переменную url
				success: function(data) {
					$('.modal-win').append(data); 
					console.log(data);
				},
				error: function(msg) {
					$('.modal-win').append(data); // Вывод ошибки
				}
			})

			// Проверка ajax запросов - Network


			
			$('<a class="modal-close-btn">').attr('href', '#').html('&times;').click(function(event) {
				event.preventDefault();
				$('.modal-win').remove();
				$('#jquery-overlay').remove();
			}).appendTo('.modal-win');
		}
	});

	$('a.menu').bind({
		'mouseout': function() { // Возвращаем Привет черного цвета 
			$('#tips').text('Привет').css('color', 'black');
		}
	});



// ========== Страница с картинками и ссылкой ==========


	$('a').bind('click', function() {
      let newSrc = $(this).attr('data-src');
    	$('#img').attr('src', newSrc);
	});





}); // Закрывает ограничитель jQuery

