pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract PaloToken {
    address public owner;
    uint256 public maximumSupply;
    uint256 public currentSupply;
    mapping(address => uint256) userBalances;

    event Mint(address receiver, uint256 amount, uint256 when);

    event Transfer(address sender, address receiver, uint256 amount, uint256 when);

    constructor(address _owner, uint256 _maximumSupply) {
        maximumSupply = _maximumSupply;
        owner = _owner;
    }

    function mint(address _receiver, uint256 _amount) external {
        require(owner == msg.sender, 'Only the owner can mint tokens!');
        require(_amount + currentSupply <= maximumSupply, 'Maximum supply cap has been reached!');
        userBalances[_receiver] += _amount;
        currentSupply += _amount;
        emit Mint(_receiver, _amount, block.timestamp);
    }

    function transfer(
        address _sender,
        address _receiver,
        uint256 _amount
    ) external {
        require(userBalances[_sender] >= _amount, "You don't have sufficient funds!");

        userBalances[_sender] -= _amount;
        userBalances[_receiver] += _amount;
        emit Transfer(_sender, _receiver, _amount, block.timestamp);
    }

    function balance(address _owner) external view returns (uint256) {
        return userBalances[_owner];
    }
}
