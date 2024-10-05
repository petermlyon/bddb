//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

struct User {
	string tgHash;
	string displayName;
	string description;
	string company;
	string jobTitle;
	string bioUrl;
}

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	// State Variables
	address public immutable owner;
	mapping(address => User) public userData;
	mapping(address => bool) public userList;
	address[] public addressArray;
	uint256 public numAddresses = 0;


	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event UserChange(
		address indexed setter,
		User newUser
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	function compareStrings(string memory _a, string memory _b) private pure returns(bool) {
			return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
	}

	/**
	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	 *
	 * @param _displayName (string memory) - new greeting to save on the contract
	 */
	function userAddress(string memory _displayName) public view returns (address) {
    for (uint i=0; i<addressArray.length; i++) {
			if (compareStrings(userData[addressArray[i]].displayName, _displayName)) {
				return addressArray[i];
			}
		}
		return address(0x0);
	}

	/**
	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	 *
	 * @param _newUser (User memory) - new greeting to save on the contract
	 */
	function addUser(User memory _newUser) public payable {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Adding user '%s' from %s",
			_newUser.displayName,
			msg.sender
		);

		require(userAddress(_newUser.displayName) == address(0x0), "Username Already Taken");

		userList[msg.sender] = true;
		userData[msg.sender] = _newUser;
		addressArray.push(msg.sender);
		numAddresses += 1;

		// emit: keyword used to trigger an event
		emit UserChange(msg.sender, _newUser);
	}

	modifier onlyUsers {
		require(userList[msg.sender], "This user does not exist");
		_;
	}
	

	/**
	 * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	 *
	 * @param _modifiedUser (User memory) - new greeting to save on the contract
	 */
	function updateUser(User memory _modifiedUser) public payable onlyUsers {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Updating user '%s' from %s",
			_modifiedUser.displayName,
			msg.sender
		);

		address nameUser = userAddress(_modifiedUser.displayName);

		require(nameUser == address(0x0) || nameUser == msg.sender, "Username Already Taken");

		userData[msg.sender] = _modifiedUser;

		// emit: keyword used to trigger an event
		emit UserChange(msg.sender, _modifiedUser);
	}

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
