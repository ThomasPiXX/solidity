//first  implementation


//function_keyword + function_name(parameter_list) + visibility {}


function helloWorld(bool_saysHello) public{
    //statement
}


contract MyContract {
    function myFunction() external pure {
        uint x = 5;
    }
}



//simple contract with 2 state variable

pragma solidity 0.8.4;

contract MyContract {
    uint x = 5;
    uint y = 10;

    function sum() external view returns(uint) {
        return x + y;
    }
}


//implicite return 

contract MyContract {
    uint x = 5;
    uint y = 10;

    function sum(uint x, uint y) external pure returns(uint z) {
        z = x + y;
    }
}

//quesiton to myself , variable state are changed while function are called therefore
/* it is only while function are executed and write to external which mean write to state(write to storage)
that it will cost gas fee otherwise function can run inside a contract without cost 
so its the action fo writing to storage that cost something */

/*
public - any contract or EOA can call into this function
external - only other contracts (external to the current contract) and EOAs can call, no internal calling
internal - only this contract along with its inheritance chain can call
private - only this contract can call
🚨 State variables work off the same exact criteria for visibility. State variables can be declared as public, private, or internal but not external.
*/

//fun example of a contract 


contract VendingMachine {
    mapping(string => uint) public inventory; // Tracks inventory of items like soda and chips
    mapping(string => uint) public prices;    // Tracks prices of items

    constructor() {
        // Initialize the inventory and prices
        inventory["soda"] = 100;  // 100 sodas in the vending machine
        inventory["chips"] = 100; // 100 bags of chips in the vending machine
        prices["soda"] = 1 ether; // Set price for soda
        prices["chips"] = 0.5 ether; // Set price for chips
    }

    // External function to purchase items
    function purchase(string calldata item, uint amount) external payable {
        require(inventory[item] >= amount, "Not enough inventory.");
        require(msg.value >= prices[item] * amount, "Not enough Ether provided.");
        
        inventory[item] -= amount; // Reduce the inventory by the purchased amount
        
        // Optionally refund any excess Ether sent
        if (msg.value > prices[item] * amount) {
            payable(msg.sender).transfer(msg.value - (prices[item] * amount));
        }
    }

    // Function to restock items
    function restock(string calldata item, uint amount) public {
        inventory[item] += amount;
    }
}


contract Contract {
    bool public isOpen;

    constructor(bool _isOpen) {
        isOpen = true;
    }
}


contract Contract {
    
    uint public x;
    
    constructor(uint _x){
        x = _x;
    }

    function add(uint _x) external view returns(uint){
        return x + _x;
    }

    function increment() external{
        x++;
    }
}

contract Contract{

    uint public x;


    constructor(uint _x){
        x = _x;
    }

    function double(uint _x) external pure returns(uint sum){

        sum = _x *2;
    }
}



const ethers = require('ethers');


 async function deposit(contract, charityId) {

    await contract.deposit({
        value: ethers.utils.parseEther('1')
    });
}

module.exports = deposit;