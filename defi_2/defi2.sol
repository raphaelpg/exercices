pragma solidity ^0.5.12;
//pragma experimental ABIEncoderV2;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract MarketIllustrator {
    using SafeMath for uint;
    
    mapping (address => uint) private administrateurs;
    mapping (address => string) public illustrateurs;
    mapping (address => uint) public reputation;
    mapping (address => uint) public bannis;
    
    constructor() public {
        administrateurs[msg.sender] = 1;
    }
    
    function inscription(string memory nom) public{
        require(bannis[msg.sender] == 0, "Vous avez été bannis");
        illustrateurs[msg.sender] = nom;
        reputation[msg.sender] = 1;
    }
    
    function bannir(address illustrateur) public{
        require(administrateurs[msg.sender] == 1, "Vous n'êtes pas administrateur");
        reputation[illustrateur] = 0;
        bannis[illustrateur] = 1;
    }
}