pragma solidity 0.5.12;//--> Préférable d'utiliser une version unique.

import "./Token.sol";
import "./SafeMath.sol";
import "./Pausable.sol";

contract Crowdsale is Pausable {
	using SafeMath for uint256;//-->Pense à importer une version stable de SafeMath d'abord
	Token public tok;
   	address payable public escrow;// Address of Escrow Provider Wallet--> Doit être Payable et privé
	uint256 public savedBalance = 0; // Total amount raised in ETH
	mapping (address => uint256) public balances; // Balances in incoming Ether--> Rajouter public
    bool public crowdsaleEnd;
    uint public target;

	// Initialization → Penser à instancier le Token tok
	constructor(address payable _escrow, uint _target) public{
		// add address of the specific contract
		escrow = _escrow;
		tok = new Token();
		target = _target;
	}

	//→ Attention risque de réentrance! Opération escrow.transfer doit être en dernier
	//→ Rajouter transfert de token
	function() payable external whenNotPaused {
		(bool success,) = escrow.call.value(msg.value)('');
	    require(success);
	    bool successToken = tok.transfer(msg.sender, msg.value);//Suppose que le taux est 1 Token = 1 Wei
	    require(successToken);
	}

	function invest() payable external whenNotPaused {
		balances[msg.sender] = balances[msg.sender].add(msg.value);
		savedBalance = savedBalance.add(msg.value);
		bool successToken = tok.transfer(msg.sender, msg.value);//Suppose que le taux est 1 Token = 1 Wei
	    require(successToken);
	}
	
	function setEnd() external onlyOwner {
	    crowdsaleEnd = true;
	}
	
	function giveMoneyBack() external whenNotPaused {
	    require(msg.sender != address(0));
	    require(crowdsaleEnd);
	    require(savedBalance < target);
	    savedBalance = savedBalance.sub(balances[msg.sender]);
	    uint amount = balances[msg.sender];
	    balances[msg.sender] = 0;
	    msg.sender.transfer(amount);
	}
}