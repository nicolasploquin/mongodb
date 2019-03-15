// Insertion de 1000 clients un shards
var prenoms = ["Jameson","Madeline","Amir","Vladimir","Cedric","Giselle","Kaitlin","Abel","Gillian","Lilah","Reece","Kasper","Hayden","Samantha","Tashya","Aurora","Kennan","James","Teegan","Gabriel","Ezekiel","Garth","Leah","Brandon","Alec","Keegan","Theodore","Emi","Adele","Callum","Quail","Kaitlin","Yvette","Kato","Nerea","Madonna","Dieter","Plato","Jocelyn","Merrill","Devin","Valentine","Sylvia","Graiden","Kimberly","Britanni","Zeus","Stacey","Elaine","Ahmed","Quentin","Alfonso","Simon","Cara","Kelly","Hasad","Christopher","Xander","Lacey","Elijah","Faith","Adrienne","Tasha","Alfonso","Barclay","Sebastian","Austin","Harrison","Imogene","Brady","Ifeoma","Doris","Kennan","Giselle","Reed","Jerome","Ursa","Ann","Mason","Madison","Jackson","Aretha","Irene","Ashely","Boris","Coby","May","Libby","Joseph","Chaim","Maxwell","Len","Tanek","Nolan","Gavin","Montana","Noel","Zelda","Rhiannon","Conan"];

db = db.getSiblingDB("banque");

function reverse(texte){
	var res = texte.charAt(texte.length - 1).toUpperCase();
	for(var i = texte.length - 2; i >= 0 ; i--){
		res += texte.charAt(i).toLowerCase();
	}
	return res;
}


for(var i = 0; i < 10000000; i++){
  var prenom = prenoms[Math.floor(Math.random()*prenoms.length)];
  db.clients.insert({nom:reverse(prenom), prenom: prenom});
}
