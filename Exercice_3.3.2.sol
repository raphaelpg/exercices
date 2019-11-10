pragma solidity ^0.5.12;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Pulsation{
    using SafeMath for uint;
    uint public battement;
    string private message;

    constructor(string memory messageSent) public {
        battement = 0;
        message = messageSent;
    }
    
    function printMessage() public view returns(string memory){
        return message;
    }

    function ajouterBattement() public returns (string memory){
        battement = battement.add(1);
        return message;
    }
}