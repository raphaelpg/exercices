pragma solidity 0.5.12;

contract SceneOuverte {
    /*uint value;
    
    function set(uint _value) public{
        value = _value;
    }
    
    function get() public view returns (uint) {
        return value;
    }*/
    
    //0x71F76d7a47ca4554e4BF928FB39F537431BBc201
    
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
        tour += 1;
    }
    
    function getTour() public view returns (uint) {
        return tour;
    }
    
    function getArtisteEnCours() public view returns (string memory) {
        return passagesArtistes[tour-1];
    }
}