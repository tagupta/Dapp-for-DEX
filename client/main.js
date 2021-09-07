Moralis.initialize('CKCCV0P1U1AWwiAq9D3ubgxu8WylV816R8vK27Xw');
Moralis.serverURL = 'https://mrkwuempr36s.moralisweb3.com:2053/server';
const DEX_ADDRESS = '0x7EB619E4552056051c750ECC4E20A1384eDFAC82'; 
var contractOwner;
var currentUser;
var instance;
var isAuthenticated = false;


init = async () => {
    window.web3 = await Moralis.Web3.enable();
    instance = new web3.eth.Contract(abi.dex, DEX_ADDRESS);
    console.log(instance);
    contractOwner = await instance.methods.owner().call();
    var workingUser = Moralis.User.current();
    if(workingUser){
        currentUser = workingUser.attributes.ethAddress;
        if(currentUser){
            isAuthenticated = true;
            $('.authUser').html("Authenticated");
            $('.authUser').addClass('disabled');
            if(contractOwner.toUpperCase() == currentUser.toUpperCase()){
                $('.admin').css('display','block');
            }
            else{
                $('.admin').css('display','none');
            }
            getBalance();
        }
        else{
            $('#toastMessage').html("Please authenticate yourself");
            $('.toast').toast('show');
        }
    }
    
    
}
init();

login = async () => {
    try {
        const user = await Moralis.Web3.authenticate();
        if(user){
            isAuthenticated = true;
            location.reload();
        }
        
        
    } catch (error) {
        const code = error.code;
        const message = error.message;
        $('#toastMessage').html(message);
        $('.toast').toast('show');
    }
}

logout = async () => {
    await Moralis.User.logOut();
    window.location.href = "index.html";
}

signUp = async (email, password) => {
    const user = new Moralis.User();
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    try {
        await user.signUp();
        console.log("Done Sign up");
        goToHome();

    } catch (error) {
        const code = error.code;
        const message = error.message;
        $('.modal').modal('hide'); 
        $('#toastMessage').html(message);
        $('.toast').toast('show');
    }

    
};

loginWithUsername = async (username, password) => {
    try {
        const user = await Moralis.User.logIn(username, password, { usePost: true });
        if(user){
            console.log(user);
            goToHome();
        }
        
    } catch (error) {
        const code = error.code;
        const message = error.message;
        console.log(message);
        $('.modal').modal('hide'); 
        $('#toastMessage').html(message);
        $('.toast').toast('show');

    }
}

function goToHome(){
    window.location.href = "accounts.html";
}

async function getBalance(){
    var ticker = $('#navbarDropdown').find('strong').html();
    var tokenBalance = await instance.methods.balances(currentUser,web3.utils.fromUtf8(ticker)).call();
    $('#balValue').html(web3.utils.fromWei(tokenBalance,"ether"));
}

async function addTokens(ticker,tickerAddress){
    var formatTicker = ticker.toUpperCase();
    await instance.methods.addToken(web3.utils.fromUtf8(formatTicker),tickerAddress).send({from: contractOwner},function(error,txHash){
        if (error) {
            $('#adminModal').modal('hide');
            $('#toastMessage').html("Error occured while adding token");
            $('.toast').toast('show');
        } else {
            $('#adminModal').modal('hide');
            $('#toastMessage').html("Successfully added token");
            $('.toast').toast('show');

            displayTokenList();
            goToHome();
        }
      });
}

async function displayTokenList(){
  var tickerList = await instance.methods.getTickers().call();
  for(var i = 0 ; i < tickerList.length ; i++){
      appendToken(web3.utils.hexToString(tickerList[i]),tickerList.length);
  }
  
}

async function approveDex(amt){
   var ticker = $('#navbarDropdown').find('strong').html();
   var tokenDetails = await instance.methods.tokenMapping(web3.utils.fromUtf8(ticker)).call();
   var tokenInstance = new web3.eth.Contract(abi.ERC20, tokenDetails[1]);
   await tokenInstance.methods.approve(DEX_ADDRESS,web3.utils.toWei(amt,'ether')).send({from: currentUser},function(error,txHash){
    if (error) {
        $('.approveBtn').html('Approve Dex');
        $('#toastMessage').html("Error occured while approving dex");
        $('.toast').toast('show');
    } else {
        $('#toastMessage').html("Successfully approved dex");
        $('.toast').toast('show');
    }
   });
}

async function depositTokens(amt){
    var ticker = $('#navbarDropdown').find('strong').html();
    if(ticker == 'ETH'){
     var _amt = amt.toString();
     var amtToWei = web3.utils.toWei(_amt,"ether");
     await instance.methods.depositETH().send({value: amtToWei,from: currentUser},function(error,txHash){
        if (error) {
            $('#toastMessage').html("Error occured while depositing ETH");
            $('.toast').toast('show');
        } else {
            instance.methods.balances(currentUser,web3.utils.fromUtf8(ticker.toString())).call()
                .then(function(result){
                    $('#balValue').html(web3.utils.fromWei(result,"ether"));
                    
                });
               
            $('#toastMessage').html("Successfully deposited ETH");
            $('.toast').toast('show');
            
        }
      });
      var history = await instance.methods.getHistory(currentUser).call();
      appendTableRow(history);
    }
    else{
        var amtToWei = web3.utils.toWei(amt,"ether");
        await instance.methods.deposit(amtToWei,web3.utils.fromUtf8(ticker)).send({from: currentUser},function(error,txHash){
            if (error) {
                $('#toastMessage').html(`Error occured while depositing ${ticker}`);
                $('.toast').toast('show');
            } else {
                instance.methods.balances(currentUser,web3.utils.fromUtf8(ticker.toString())).call()
                .then(function(result){
                    $('#balValue').html(web3.utils.fromWei(result,"ether"));
                    
                });
                $('#toastMessage').html(`Successfully deposited ${ticker}`);
                $('.toast').toast('show');
            }
        });
      var history = await instance.methods.getHistory(currentUser).call();
      appendTableRow(history);
    }
}

async function withdrawTokens(amount){
    var ticker = $('#navbarDropdown').find('strong').html();
    var _amount = web3.utils.toWei(amount.toString(),'ether');
    if(ticker == 'ETH'){
      await instance.methods.withdrawETH(_amount).send({from: currentUser},(error,txHash) =>{
        if (error) {
            $('#toastMessage').html(`Error occured while withdrawing ETH`);
            $('.toast').toast('show');
        } else {
            instance.methods.balances(currentUser,web3.utils.fromUtf8(ticker.toString())).call()
            .then(function(result){
                $('#balValue').html(web3.utils.fromWei(result,"ether"));
            });
            $('#toastMessage').html(`Successful withdrawn of ETH`);
            $('.toast').toast('show');
        }
      });
      var history = await instance.methods.getHistory(currentUser).call();
      appendTableRow(history);
    }
    else{
      await instance.methods.withdraw(_amount,web3.utils.fromUtf8(ticker)).send({from: currentUser},(error,txHash) =>{
            if (error) {
                $('#toastMessage').html(`Error occured while withdrawing ${ticker}`);
                $('.toast').toast('show');
            } else {
                instance.methods.balances(currentUser,web3.utils.fromUtf8(ticker.toString())).call()
                .then(function(result){
                    $('#balValue').html(web3.utils.fromWei(result,"ether"));
                    
                });
                $('#toastMessage').html(`Successful withdrawn of ${ticker}`);
                $('.toast').toast('show');
            }
          });
      var history = await instance.methods.getHistory(currentUser).call();
      appendTableRow(history);
    }

}

async function placeLimitOrder(amount,price){
    var side = $('#limitSideDropdown').find('strong').html();
    var ticker = $('#navbarDropdown').find('strong').html();
    var _amount = web3.utils.toWei(amount.toString(),"ether");
    if(ticker == 'ETH'){
        $('#toastMessage').html("Not allowed for ETH");
        $('.toast').toast('show');
    }
    else{
        if(side == 'BUY'){
          await instance.methods.createLimitOrder(0,web3.utils.fromUtf8(ticker.toString()),_amount,price).send({from: currentUser},function(error,txHash){
            if (error) {
                $('#toastMessage').html(`Error: Limit BUY Order for ${ticker}`);
                $('.toast').toast('show');
            } else {
                $('#toastMessage').html(`Success: Limit BUY Order for ${ticker}`);
                $('.toast').toast('show');
            }
          })
        }
        else if(side == 'SELL'){
            await instance.methods.createLimitOrder(1,web3.utils.fromUtf8(ticker.toString()),_amount,price).send({from: currentUser},function(error,txHash){
                if (error) {
                    $('#toastMessage').html(`Error: Limit SELL Order for ${ticker}`);
                    $('.toast').toast('show');
                } else {
                    $('#toastMessage').html(`Success: Limit SELL Order for ${ticker}`);
                    $('.toast').toast('show');
                }
              })
        }
    }
}

async function placeMarketOrder(amount){
    var side = $('#mktSideDropdown').find('strong').html();
    var ticker = $('#navbarDropdown').find('strong').html();
    var _amount = web3.utils.toWei(amount.toString(),"ether");
    if(ticker == 'ETH'){
        $('#toastMessage').html("Not allowed for ETH");
        $('.toast').toast('show');
    }
    else{
       if(side == 'BUY'){
         await instance.methods.createMarketOrder(0,web3.utils.fromUtf8(ticker.toString()),_amount).send({from: currentUser},function(error,txHash){
            if (error) {
                $('#toastMessage').html(`Error: Market BUY Order for ${ticker}`);
                $('.toast').toast('show');
            } else {
                $('#toastMessage').html(`Success: Market BUY Order for ${ticker}`);
                $('.toast').toast('show');
            }
         })
       }
       else if(side == 'SELL'){
        await instance.methods.createMarketOrder(1,web3.utils.fromUtf8(ticker.toString()),_amount).send({from: currentUser},function(error,txHash){
            if (error) {
                $('#toastMessage').html(`Error: Market SELL Order for ${ticker}`);
                $('.toast').toast('show');
            } else {
                $('#toastMessage').html(`Success: Market SELL Order for ${ticker}`);
                $('.toast').toast('show');
            }
         })
       }
    }

}