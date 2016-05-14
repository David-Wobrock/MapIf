SETTINGS = {
	'MAPBOXTOKEN':'pk.eyJ1IjoibHRvdXphcmQiLCJhIjoiY2lvMGV5OTJhMDB2Y3dka2xrZHpycGlrZiJ9.70MUkG_bCx7MPyIOhwfcKA',
	'GEOPOSITIONS':{
		'INSALYON':[45.7832543, 4.8780048]
	},
	'SERVER_ADDR':"http://localhost:5000"
}

$(function(){
	// Material Init
	$.material.init();

	// generate the promotions year
	(function(){
		var startYear = 1969;
		var currentYear = new Date().getFullYear();
		var lastYear = currentYear+4;
		var $select = $("#form-inscription-input-promotion");
		for (var i = startYear; i < lastYear; i++) {
			var $option = $('<option value="'+i+'">'+i+'</option>');
			if(i == currentYear){
				$option.attr("selected", "selected");
			}
			$select.append($option);
		};
	})()


	/********* MAP *********/

	var mymap = L.map('mapid').setView(SETTINGS.GEOPOSITIONS.INSALYON, 13);

	// different maps providers
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'ltouzard.0390bjno',
		accessToken: SETTINGS.MAPBOXTOKEN
	}).addTo(mymap);

	// add marker to insa
	L.marker(SETTINGS.GEOPOSITIONS.INSALYON).addTo(mymap)
	    .bindPopup('Bienvenu(e) à l\'INSA.')
	    .openPopup();
	   /*
	for (var i = users.length - 1; i >= 0; i--) {
		L.marker([users[i].lat, users[i].lng]).addTo(mymap)
		    .bindPopup(users[i].firstname + " " + users[i].lastname);

		// ajouter des binds ?
	};
		*/



	/********* FORM VALIDATION *********/
	var p3_trolled = false;
	var p3_open = false;
	var $p3_block = $("#p3-block").hide();
	var $p3_msg = $("#p3-msg").hide();

	var addFieldError = function($el){
		console.log("add error to :", $el);
		$el.addClass("has-warning");
	}
	var removeFieldError = function($el){
		console.log("remove error to :", $el);
		$el.removeClass("has-warning");
	}

	var checkPasswords = function(){
		$p1 = $("#form-inscription-input-password1");
		p1 = $p1.val();
		$p2 = $("#form-inscription-input-password2");
		p2 = $p2.val();
		$p3 = $("#form-inscription-input-password3");
		p3 = $p3.val();
		if($p2.val() != ""){
			// check similarity with p1
			if(p1 != p2){
				addFieldError($p2.closest(".form-group"));
			}
			else{
				removeFieldError($p2.closest(".form-group"));
				if(!p3_open && !p3_trolled){
					//activate the troll not finished
					$p3_block.show(500);
					p3_open = true;
				}
			}
		}
		else{
			//addFieldError($p2.closest(".form-group"));
		}
		if(p3_open){
			if(p3 != ""){
				// check similarity with p1
				if(p1 != p3){
					addFieldError($p3.closest(".form-group"));
				}
				else{
					removeFieldError($p3.closest(".form-group"));
				}
			}
			else{
				// addFieldError($p3.closest(".form-group"));
			}
		}
		if(p1 != "" && p1 == p2 && p1 == p3){
			//validé !
			if(!p3_trolled){
				//activate the troll not finished
				$p3_block.hide(500);
				$p3_msg.show(500);
				p3_open = false;
				p3_trolled = true;
			}
		}
	}

	$("#form-inscription-input-password1, #form-inscription-input-password2, #form-inscription-input-password3").keyup(function(){
		checkPasswords();
	});

	
	/********* AJAX *********/
	
	$('#form-connexion').on('submit', function(e) {
        e.preventDefault();
        $this = $(this);

        // ajouter form verification

 		$.ajax({
	        method: "POST",
	        url: SETTINGS.SERVER_ADDR + "/login",
	        data: $this.serialize(),
	        cache: false,
	        success: function(json){
	            console.log("AJAX OK");
	            console.log(json);
	            if(json.response.status == "ok"){
	            	//refresh en etant connecté au server
            		location.reload(true);
	            }
	            else if(json.repsonse.status == "nok"){
	            	// connexion refused
	            	
	            }
	            else{
					alert("server authentification failed");
	            }
	        },
	        error: function(json, statut, erreur){
	            console.log("AJAX NOK");
	            alert("Désolé ! Une erreur serveur est survenue, réessayez, sinon actualisez la page.");
	        },
	        complete: function(){
	            console.log("AJAX DONE");
	        }
	    });
    });

    $('#form-inscription').on('submit', function(e) {
        e.preventDefault();
        $this = $(this);

        //ajouter form verification

 		$.ajax({
	        method: "POST",
	        url: SETTINGS.SERVER_ADDR + "/signup",
	        data: $this.serialize(),
	        cache: false,
	        success: function(json){
	            console.log("AJAX OK");
	            console.log(json);
	            if(json.response.status == "ok"){
	            	//refresh en etant connecté au server
            		location.reload(true);
	            }
	            else if(json.repsonse.status == "nok"){
	            	
	            }
	            else{
					alert("authentification failed");
	            }
	        },
	        error: function(json, statut, erreur){
	            console.log("AJAX NOK");
	            alert("Désolé ! Une erreur serveur est survenue, réessayez, sinon actualisez la page.");
	        },
	        complete: function(){
	            console.log("AJAX DONE");
	        }
	    });
    });
});