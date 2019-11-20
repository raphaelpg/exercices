pragma solidity ^0.5.11;

contract Pulsation {
    uint public battement;
    string public _message;
    uint public compteur;

    constructor(string memory titre) public {
        battement = 0;
        _message = titre;
        compteur = 0;
    }

    function ajouterBattement() public returns(string memory){
        if (compteur != 0 && compteur % 5 == 0){
            battement += 1;
            compteur += 1;
            return "Criii";
        } else {
            battement += 1;
            compteur += 1;
            return _message;
        }
    }
}

contract Pendule {

    string[] public balancier;
    uint public tailleBalancier;
    Pulsation contratTic;
    Pulsation contratTac;
    bool tour;
    string retour;

    constructor() public {
        contratTic = new Pulsation("tic");
        contratTac = new Pulsation("tac");
        tailleBalancier = 0;
    }

    function mouvementsBalancier(uint k) public {
        for (uint i = 0; i < (k + 1); i++) {
            if (tour == false) {
                retour = contratTic.ajouterBattement();
                tour = true;
            } else {
                retour = contratTac.ajouterBattement();
                tour = false;
            }
            balancier.push(retour);
            tailleBalancier += 1;
        }
    }
    
    function inspection() public view returns (uint){
        require(tailleBalancier > 0, "Balancier vide");
        for (uint i = 0; i < (tailleBalancier); i++){
            if (bytes(abi.encodePacked(balancier[i])).length == bytes("Criii").length){
                if( keccak256(abi.encodePacked(balancier[i])) == keccak256("Criii")){
                    return i;
                }
            }
        }
    }
}