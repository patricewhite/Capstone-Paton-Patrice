//state object
appState = {
	results: [],
	pokeTeam: [],
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
const query = searchTerm;

if ($('#selectorId').val() === "name"){
	
	$.getJSON(pokeApiUrl+"pokemon/"+query+"/", function(data){
		addResults(appState, data);
		renderAbility(appState, $('.results'));
		});
} else {

}
// $.getJSON(pokeApiUrl+query+"/", function(data){
// 	//console.log(data);
// 	addResults(appState, data);
// 	//console.log(appState);
// 	renderPoke(appState, $('.results'));
// });
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.map(function(obj){
		return `
				<ul>
					<li>${obj.ability.name}</li>
				</ul>
				`
	});
	element.html(abilityHTML);
}
//event
	$(function watchSubmit(){
	$('.js-search-form').submit(function(event){
		event.preventDefault();
		const query = $('.js-query').val();
		getData(query);
	});
});