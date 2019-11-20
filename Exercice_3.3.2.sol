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
    Pulsation pulse;
    
    constructor (string memory title) public{
        pulse = new Pulsation(title);
    }
    
    function provoquerUnePulsation() public returns (string memory){
        return pulse.ajouterBattement();
    }
}