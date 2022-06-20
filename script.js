// defines the list of oncologists and the searchbar
const oncologistList = document.getElementById('oncologistList');
const searchBar = document.getElementById('searchBar');
let njOncologists = [];


searchBar.addEventListener('keyup', (e) => {
    // converts searched city/zip code into lowercase string
    const searchString = e.target.value.toLowerCase();
    // filters for items that include searched city/zip code on the list of NJ doctors
    const filteredOncologists = njOncologists.filter((oncologist) => {
        return (
            oncologist.City.toLowerCase().includes(searchString) ||
            oncologist.ZIP.toLowerCase().includes(searchString)
        );
    });
    // displays any doctors found that match search query
    displayOncologists(filteredOncologists);
});

const loadOncologists = async () => {
    try {
        //tries to load data for oncologists from an external website and prints error to console if any error occurs
        const res = await fetch('https://raw.githubusercontent.com/mujtabaraja/blah/main/oncofinder2database.json');
        njOncologists = await res.json();
        displayOncologists(njOncologists);
    } catch (err) {
        console.error(err);

        
    }
};

const displayOncologists = (oncologist) => {
    const htmlString = oncologist
        .map((oncologist) => {
            // code below uses html to create the text in the boxes providing information about each doctor
            return `
            
            <ul class="oncologist">
                <h2><b>${oncologist.Name}</b></h2>
                <p><b>Speciality:</b> ${oncologist.Speciality} <br></br>
                <b> Number:</b> ${oncologist.Number} <br></br>
                <b> Address:</b> ${oncologist.Address} <br></br>
                <b> ZIP:</b> ${oncologist.ZIP} <br></br>
                <b> City:</b> ${oncologist.City} <br></br>
                <b> State:</b> ${oncologist.State} </p>
                <img src="${oncologist.image}"></img>

            </ul>
        `;
        })
        .join('');
        oncologistList.innerHTML = htmlString;
};

loadOncologists()

$("nav ul li").click(function(){
    var xcoord = $(this).data("xcoord");
    
    $("nav div").stop().animate({marginLeft:xcoord}, 500, "easeInOutExpo");
    $(this).addClass("active");
    $("nav ul li").not(this).removeClass("active");
    
  });