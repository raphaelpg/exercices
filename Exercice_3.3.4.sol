pragma solidity ^0.5.11;

contract Pulsation {
    uint public battement;
    string public _message;

    constructor(string memory titre) public {
        battement = 0;
        _message = titre;
    }

    function ajouterBattement() public returns(string memory){
        battement += 1;
        return _message;
    }
}

contract Pendule {

    string[] public balancier;
    Pulsation contratTic;
    Pulsation contratTac;
    bool tour;
    string retour;

    constructor() public {
        contratTic = new Pulsation("tic");
        contratTac = new Pulsation("tac");
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
        }
    }
}