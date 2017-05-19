//state object
appState = {
	results: [],
	pokeTeam: [],
	details: []
};

//mod function
function addResults(state, results) {
	state.results = results;
}

function addTeam(state, element){
	state.pokeTeam.push(element);
}
//callback and AJAX
const pokeApiUrl = 'http://pokeapi.co/api/v2/';

function getData(searchTerm) {
const query = searchTerm.toLowerCase();

if ($('#selectorId').val() === "name"){

	$.getJSON(pokeApiUrl+"pokemon/"+query+"/", function(data){
		addResults(appState, data);
		renderAbility(appState, $('.results'));
		});
	} else {
	 $.getJSON(pokeApiUrl+"ability/"+query+"/", function(data){
	 	addResults(appState, data);
		renderPoke(appState, $('.results'));
	 });
	}
}

function getPDetails(searchTerm){
	const query = searchTerm.toLowerCase();

	$.getJSON(pokeApiUrl+"pokemon/"+query+"/", function(data){
		addResults(appState, data);
		renderPokemonDetails(appState, $('.results'));
		});
}

function getADetails(searchTerm){
	const query = searchTerm.toLowerCase();
	 $.getJSON(pokeApiUrl+"ability/"+query+"/", function(data){
	 	addResults(appState, data);
		renderPoke(appState, $('.results'));
	 });
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.map(function(obj){
		return `
				<div class="row>
					<div class="col-12">
						<button class="ability-deets" type="button" name="ability" value="${obj.ability.name}">${obj.ability.name}</button>
						<div id="expand">
							<section>
								<p>"search worked"</p>
							</section>
						</div>
					</div>
				</div>
				`
	});
	element.html(abilityHTML);
}

function renderPoke(state, element){

	const nameHTML = state.results.pokemon.map(function(obj){
		 return `
				<div class="col-12">
					<button class="deets" type="button" name="name" value="${obj.pokemon.name}">${obj.pokemon.name}</button>
				</div>
			`
	});

	const abilityDetails = state.results.effect_entries.map(function(obj){
		return `
		Effect: ${obj.effect}
		`
	});

	element.html(`
			<h3>${state.results.name}</h3>
			<p>${abilityDetails}</p>
			<div class="row">${nameHTML.join("")}</div>`);

}

function renderPokemonDetails(state, element){
	const pokeAbility = state.results.abilities.map(function(obj){
		return `<button class="ability-deets" type="button" name="ability" value="${obj.ability.name}">${obj.ability.name}</button>`	
	});

	const pokeStats = state.results.stats.map(function(obj){
		return `
			<p>${obj.stat.name}: ${obj.base_stat}</p>
			`
	});

	element.html( `
		<div class="row">
				<div class="col-12">
					<p>Name: ${state.results.name}</p>
					<img src="${state.results.sprites.front_default}">
					<p>PokeDex Id Number: ${state.results.id}
					<p>Abilities</p>
					<div>${pokeAbility.join("")}</div>
					<p><u>Stats</u></p>
					<p>${pokeStats.join("")}</p>
				</div>
			</div>
	`);
	}

//event
	$(function watchSubmit(){
	$('.js-search-form').submit(function(event){
		event.preventDefault();
		const query = $('.js-query').val();
		getData(query);
	});

	//listeners on check/button

	$('.results').on("click", ".deets", function(event){
		event.preventDefault();
		const query = $(event.currentTarget).val();
		getPDetails(query);
	});

	$('.results').on("click", ".ability-deets", function(event){
		event.preventDefault();
		const query = $(event.currentTarget).val();
		console.log(query);
		getADetails(query);
	});

});

//do css
//add no results error
//change input to button
