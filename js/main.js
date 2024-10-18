$(function () {
	let priceOneStation = 1000;
	let priceTotalStation = 0;
	let priceOneServer = 5000;
	let priceTotalServer = 0;
	let totalPrice = $(".total-price-val span");

	$("input[type=tel]").bind("change keyup input click", function () {
		if (this.value.match(/[^\+0-9]/g)) {
			this.value = this.value.replace(/[^\+0-9]/g, "");
		}
	});

	$("input[type=tel]").on("focus", function () {
		if ($(this).val() == "") $(this).val("+7");
	});

	$("input[type=tel]").on("blur", function () {
		if ($(this).val() == "+7") $(this).val("");
	});

	$(".js-range-slider-server").ionRangeSlider({
		type: "single",
		min: 0,
		max: 30,
		grid: false,
		onChange: function (data) {
			$(".input-col-server").val(data.from_pretty);
			$(".input-servers").val(data.from_pretty);

			priceTotalServer = priceOneServer * data.from;
			totalPrice.text(priceTotalServer + priceTotalStation);

			if (
				$(".input-servers").val() != 0 &&
				$(".input-station").val() != 0
			) {
				$(".form-calc-error-message").removeClass("_active");
			}
		},
	});

	$(".js-range-slider-station").ionRangeSlider({
		type: "single",
		min: 0,
		max: 200,
		grid: false,
		onChange: function (data) {
			$(".input-col-station").val(data.from_pretty);
			$(".input-station").val(data.from_pretty);

			priceTotalStation = priceOneStation * data.from;
			totalPrice.text(priceTotalServer + priceTotalStation);

			if (
				$(".input-servers").val() != 0 &&
				$(".input-station").val() != 0
			) {
				$(".form-calc-error-message").removeClass("_active");
			}
		},
	});

	$(".input-col-server").keyup(function () {
		let inputValue = $(this).val();
		let currentRange = $(".js-range-slider-server").data("ionRangeSlider");
		currentRange.update({
			from: inputValue,
		});
		$(".input-servers").val(inputValue);
		priceTotalServer = priceOneServer * inputValue;
		totalPrice.text(priceTotalServer + priceTotalStation);
	});

	$(".input-col-station").keyup(function () {
		let inputValue = $(this).val();
		let currentRange = $(".js-range-slider-station").data("ionRangeSlider");
		currentRange.update({
			from: inputValue,
		});
		$(".input-station").val(inputValue);
		priceTotalStation = priceOneStation * inputValue;
		totalPrice.text(priceTotalServer + priceTotalStation);
	});

	$("a.scrollto").click(function () {
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$("html:not(:animated),body:not(:animated)").animate(
			{ scrollTop: destination },
			700
		);
		return false;
	});

	$("#hamburger-icon").click(function () {
		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			$(".mobile-menu").addClass("active");
			$("html").addClass("ov-hidden");
		} else {
			$(".mobile-menu").removeClass("active");
			$("html").removeClass("ov-hidden");
		}
	});

	$(".mobile-menu .top-menu a").click(function () {
		$("#hamburger-icon").removeClass("active");
		$(".mobile-menu").removeClass("active");
		$("html").removeClass("ov-hidden");
	});

	$(".style-tab").click(function () {
		$(".style-tabs").find(".active").removeClass("active");
		$(this).addClass("active");
		$(".styles-elems").find(".styles-elem-item").hide();
		$("#" + $(this).data("switch")).show();
	});

	let $mapFrame = $(".map").find("iframe");
	let srcMap = $mapFrame.attr("data-src");
	$mapFrame.attr("src", srcMap);
});

$(".faq-item").click(function () {
	$(this).toggleClass("_active");
	$(this).children(".faq-item-answear").slideToggle("_active");
});

$(".btn-popup-open").click(function (e) {
	e.preventDefault();
	$(".popup").addClass("_active");
	$("html").addClass("_overlay");
});

$(".popup-close").click(function (e) {
	e.preventDefault();
	if ($(this).closest(".form-calc-popup").length) {
		$(".form-calc-popup").removeClass("_active");
		$("html").removeClass("_overlay");
	} else {
		$(".popup").removeClass("_active");
		$("html").removeClass("_overlay");
	}
});

jQuery(document).ready(function () {
	$("#form, #form-popup").submit(function () {
		var str = $(this).serialize();

		$.ajax({
			type: "POST",
			url: "contact.php",
			data: str,
			success: function (msg) {
				if (msg == "OK") {
					$(".form-error-message").removeClass("_active");
					$("html").addClass("_overlay");
					$("#popup_thanks").addClass("popup_active");
					$("#popup_thanks .popup_thanks").addClass("popup_active");
					setTimeout(function () {
						$("#popup_thanks .popup_thanks").removeClass(
							"popup_active"
						);
						$("html").removeClass("_overlay");
					}, 2500);
					$(".input-name").val("");
					$(".input-phone").val("");
				} else {
					$(".form-error-message").addClass("_active");
					setTimeout(function () {
						$(".form-error-message").removeClass("_active");
					}, 2000);
					result = msg;
				}
			},
		});

		return false;
	});

	$("#form-calc").submit(function () {
		var str = $(this).serialize();

		$.ajax({
			type: "POST",
			url: "contact.php",
			data: str,
			success: function (msg) {
				if (msg == "OK") {
					$(".form-error-message").removeClass("_active");
					$("html").addClass("_overlay");
					$("#popup_thanks").addClass("popup_active");
					$("#popup_thanks .popup_thanks").addClass("popup_active");
					setTimeout(function () {
						$("#popup_thanks .popup_thanks").removeClass(
							"popup_active"
						);
						$("html").removeClass("_overlay");
					}, 2500);
					$(".input-name").val("");
					$(".input-phone").val("");
					$(".input-station").val("");
					$(".input-servers").val("");
					$(".js-range-slider-server").data("ionRangeSlider").reset();
					$(".js-range-slider-station")
						.data("ionRangeSlider")
						.reset();
				} else {
					$(".form-error-message").addClass("_active");

					setTimeout(function () {
						$(".form-error-message").removeClass("_active");
					}, 2000);
					result = msg;
				}
			},
		});

		return false;
	});
});

$(".btn-request-calc").click(function (e) {
	e.preventDefault();

	let serversVal = $(".input-servers").val();
	let stationVal = $(".input-station").val();

	if (serversVal != 0 && stationVal != 0) {
		$("html").addClass("_overlay");
		$(".form-calc-popup").addClass("_active");
		$(".form-calc-error-message").removeClass("_active");
	} else {
		$(".form-calc-error-message").addClass("_active");
	}
});

$(".js-top-wrap-adv__item").click(function () {
	$(this).toggleClass("_active");

	if ($(this).hasClass("_active")) {
		$(this).children(".top-wrap-adv-list").slideDown(300);
	} else {
		$(this).children(".top-wrap-adv-list").slideUp(300);
	}
	// $(this).children(".top-wrap-adv-list").slideToggle(300);
});

//# sourceMappingURL=../sourcemaps/main.js.map
