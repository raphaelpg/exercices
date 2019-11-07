pragma solidity ^0.5.11;

contract CagnotteFestival{

    mapping (address => uint) organisateurs;

    constructor() public {
        organisateurs[msg.sender] = 100;
    }

    function estOrga(address orga) public view returns (bool){
        if (organisateurs[orga] > 0){
            return true;
        } else {
            return false;
        }
    }

    function transfererOrga(address orga, uint parts) public {
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(organisateurs[msg.sender] >= parts, "Valeur trop élevée");
        organisateurs[msg.sender] -= parts;
        organisateurs[orga] += parts;
    }
}