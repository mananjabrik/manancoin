// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MananCoin is ERC20 {
    constructor () ERC20("MananCoin", "MC"){
        _mint(msg.sender, 20000000000000000000);
    }
    function decimals() public view virtual override returns (uint8) {
        return 9;
    }
}