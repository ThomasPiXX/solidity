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

