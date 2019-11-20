pragma solidity ^0.5.12;
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

//Lottery with 100 finney ticket price, Prize is set when deploying the contract, random number selected from 0 to 255.
contract Loto{
    using SafeMath for uint;
    uint public prize;//total cash prize to set during deployment
    uint public individualPrize;//prize divided by number of winners
    uint public ticketPrice;
    uint public totalTickets;
    uint8 private luckyNumber;//the lucky number will be choosen between 0 and 255
    uint private winners;//number of winners
    uint public openingDay;
    uint public lotteryDay;
    bool public tirage;
    bytes32 private _blockHash;
    string public test;

    mapping(address => bool) private members;//only members can activate the random lottery number selection
    mapping(address => uint8) private participantsNumbers;//numbers selected by the players
    mapping(address => bool) private participants;//to know if an address ia a player
    mapping(uint => uint) private numbersIterations;//times a number has been selected by the players
 
    constructor(uint lotteryBlock) public payable{
        members[msg.sender] = true;
        prize = msg.value;
        openingDay = (block.number-1).add(1);
        lotteryDay = openingDay.add(lotteryBlock);
        ticketPrice = 100 finney;
        tirage = false;
    }
    
    function buyTicket(uint8 number) public payable {
        require(members[msg.sender] == false, "Members can't participate");
        require(msg.value >= ticketPrice, "Ticket price is 100 finney");
        require(number <= 255, "Your guess number is to big, must be between 0 and 255");
        require(( (block.number-1).add(1) ) < lotteryDay, "Lottery ticket sales are closed");
        participantsNumbers[msg.sender] = number;
        participants[msg.sender] = true;
        numbersIterations[number] = numbersIterations[number].add(1);
        totalTickets = totalTickets.add(1);
        if (msg.value > ticketPrice) {
            prize.add(msg.value.sub(ticketPrice));//if msg value > ticketPrice, the excess money goes to the lottery prize
        }
    }
    
    function showYourNumber() public view returns (uint8){
        require(participants[msg.sender] == true, "You don't have any ticket");
        return participantsNumbers[msg.sender];
    }
    
    function showCurrentDay() public view returns (uint){
        return (block.number-1).add(1);
    }
    
    function pickNumber() public returns (uint) {
        require((block.number-1).add(1) >= lotteryDay, "Too early, lottery is still open");
        luckyNumber = uint8(uint(blockhash(lotteryDay-1)) % 256);
        winners = numbersIterations[luckyNumber];//Number of winners
        if (winners > 0){
            individualPrize = prize / winners;//Prize is divided by number of winners
        }
        tirage = true;
        return luckyNumber;
    }
    
    function claimPrize() public {
        require(tirage == true, "Too early, lottery is still open");
        require((block.number-1).add(1) >= lotteryDay, "Too early, lottery is still open");
        require(participants[msg.sender] == true, "You don't have any ticket");
        require(participantsNumbers[msg.sender] == luckyNumber, "Sorry, you didn't bet on the right number");
        require(prize > 0, "Lottery prize is empty");
        msg.sender.transfer(individualPrize);
        participants[msg.sender] = false;//players can only claim once
    }
}