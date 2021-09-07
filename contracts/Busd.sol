// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Busd is ERC20{
   constructor()ERC20("Binance USD","BUSD"){
     _mint(msg.sender,10000 * 10 ** decimals());
   }

}