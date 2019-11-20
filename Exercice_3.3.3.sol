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

    function ajouterTacTic(Pulsation _tic, Pulsation _tac)public{
        contratTic = _tic;
        contratTac = _tac;
    }

    function mouvementsBalancier() public {
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