// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract MyWallet is Ownable{

  struct Token{
      bytes32 ticker;
      address tokenAddress;
  }

  struct History{
      string action;
      bytes32 ticker;
      address _address;
      uint amount;
      uint64 creationTime;
  }

   bytes32[] public tickerList;
   mapping(bytes32 => Token) public tokenMapping;
   mapping(address => mapping(bytes32 => uint)) public balances;
   mapping(address => History[]) private txnHistory;

   modifier tokenExist(bytes32 _ticker){
      require(tokenMapping[_ticker].tokenAddress != address(0),"Wallet: token doesn't exist");
      _;
   }
   
   function getTickers() public view returns(bytes32[] memory){
      return tickerList;
   }
   
   function getHistory(address _address) view public returns(History memory){
      History[] storage histories = txnHistory[_address];
      return histories[histories.length - 1];
   }
   
   function addToken(bytes32 _ticker,address _tickerAddress) external onlyOwner{
      require(tokenMapping[_ticker].tokenAddress == address(0),"Wallet: Token already exist");
      tokenMapping[_ticker] = Token(_ticker,_tickerAddress);
      tickerList.push(_ticker);
   } 
   
   function deposit(uint _amount,bytes32 _ticker) external tokenExist(_ticker){
       IERC20 instance = IERC20(tokenMapping[_ticker].tokenAddress);
       require(instance.balanceOf(_msgSender()) >= _amount,"Deposit balance in your token contract");
       balances[_msgSender()][_ticker] += _amount;
       txnHistory[_msgSender()].push(History({action: "Deposit",
                                              ticker: _ticker,
                                              _address: _msgSender(),
                                              amount: _amount,
                                              creationTime: uint64(block.timestamp)}));
       instance.transferFrom(_msgSender(), address(this), _amount);
   
   }

   function depositETH() public payable{
      balances[_msgSender()]["ETH"] += msg.value;
      txnHistory[_msgSender()].push(History({action: "Deposit",
                                             ticker: "ETH",
                                             _address: _msgSender(),
                                             amount: msg.value,
                                             creationTime: uint64(block.timestamp)}));
    }
    
    function withdrawETH(uint amount) public{
       require(balances[_msgSender()]["ETH"] >= amount,"Withdrawal amount exceeded");
       balances[_msgSender()]["ETH"] -= amount;
       txnHistory[_msgSender()].push(History({action: "Withdraw",
                                              ticker: "ETH",
                                              _address: _msgSender(),
                                              amount: amount,
                                              creationTime: uint64(block.timestamp)}));
       (bool result,) = msg.sender.call{value: amount}("");
       require(result,"Error with the ETH withdrawal");
    }
   function withdraw(uint _amount,bytes32 _ticker)external tokenExist(_ticker){
        require(balances[_msgSender()][_ticker] >= _amount,"Wallet: insufficient balance");
        balances[_msgSender()][_ticker] -= _amount;
        txnHistory[_msgSender()].push(History({action: "Withdraw",
                                              ticker: _ticker,
                                              _address: _msgSender(),
                                              amount: _amount,
                                              creationTime: uint64(block.timestamp)}));
        IERC20(tokenMapping[_ticker].tokenAddress).transfer(_msgSender(), _amount);
   }
   
}