pragma solidity ^0.5.11;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Pulsation{
    uint public battement;

    constructor() public {
        battement = 0;
    }

    function ajouterBattement() public{
        battement = battement.add(1);
    }
}