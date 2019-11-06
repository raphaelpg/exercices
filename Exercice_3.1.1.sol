pragma solidity 0.5.11;

contract SceneOuverte {
    string[12] passagesArtistes;
    uint creneauxLibres = 12;
    uint tour;

    function sInscrire(string memory _nomDArtiste) public {
        if(creneauxLibres > 0){
            passagesArtistes[12-creneauxLibres] = _nomDArtiste;
            creneauxLibres -= 1;
        }
    }

    function passerArtisteSuivant() public {
        if (getTour() < 12){
            tour += 1;
        }
    }

    function getTour() public view returns (uint) {
        return tour;
    }

    function getArtisteEnCours() public view returns (string memory) {
        if (getTour() <= 12){
            return passagesArtistes[tour-1];
        } else {
            return "FIN";
        }
    }
}