pragma solidity ^0.5.11;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cogere {
    using SafeMath for uint;
    uint public placesRestantes = 10000;
    uint private depensesTotales;
    string[] private sponsors;

    mapping (address => uint) organisateurs;
    mapping (address => bool) festivaliers;

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

    function transfererOrga(address orga, uint parts) public view {
        require(orga != address(0), "address 0");
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(organisateurs[msg.sender] >= parts, "Valeure trop élevée");
        organisateurs[msg.sender].sub(parts);
        organisateurs[orga].add(parts);
    }

    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0, "Plus de places");
        festivaliers[msg.sender] = true;
    }

    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(destinataire != address(0), "address(0)");
        require(montant > 0, "Valeure trop élevée");
        destinataire.transfer(montant);
    }

    function comptabiliserDepense(uint montant) private view{
        depensesTotales.add(montant);
    }

    function () external payable{

    }

    function sponsoriser(string memory nom) public payable{
        require(msg.sender != address(0), "address 0");
        require(msg.value >= 30 ether, "Montant minimum 30 Ethers");
        sponsors.push(nom);
    }
}

contract CagnotteFestival is Cogere{}