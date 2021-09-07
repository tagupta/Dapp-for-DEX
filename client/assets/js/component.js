$(document).ready(function () {
    menu();
    adminModalBox();
    toastBox();
  });

  function menu(){
      var buttonTxt;
      if(isAuthenticated){
        buttonTxt = "Authenticated";
      }
      else{
        buttonTxt = "Authenticate Yourself";
      }
    var menu = `<nav class="navbar navbar-expand-md navbar-dark sticky-top">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="accounts.html"><strong>Accounts</strong></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="marketPlace.html"><strong>Place Orders</strong></a>
                                </li>
                                <li class="nav-item dropdown tokenList">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <strong>ETH</strong>
                                    </a>
                                    <div id="tokenItems" class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button class='btn tokenBtn dropdown-item' onclick="getToken('ETH')">ETH</button>
                                    </div>
                                </li>
                            </ul>

                            <ul class="navbar-nav ml-auto">
                            <button type="button" class="btn myBtnStyle nav-item authUser" onclick="login()" style="margin: 0.5rem">${buttonTxt}</button>
                            <button type="button" class="btn myBtnStyle nav-item admin" onclick="showTokensModal()" style="margin: 0.5rem;display: none">Admin</button>
                            <button type="button" class="btn myBtnStyle nav-item" onclick="logout()" style="margin: 0.5rem">Log out</button>
                            </ul>
                        </div>
                    </div>
                </nav>`;

    $('#menu').html(menu);
  }

  function adminModalBox(){
      var division = 
      `<div class="modal fade" id="adminModal" tabindex="-1" role="dialog" aria-labelledby="adminModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Admin Portal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="ticker" class="col-form-label">Token Symbol</label>
                <input type="text" class="form-control" id="ticker" aria-describedby="emailHelp" placeholder="Ticker">
              </div>
              <div class="form-group">
                <label for="contractAddress" class="col-form-label">Contract Address</label>
                <input type="text" class="form-control" id="contractAddress" placeholder="Address">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" onclick = "addTokens($('#ticker').val(),$('#contractAddress').val())">Add Token</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      <script>
         $(document).ready(function () {
              setTimeout(() => {
                displayTokenList();
              }, 1000)
            });
      </script>
    </div>`;
    $('#boxAdmin').append(division);
  }

  function toastBox(){
      var toast = 
      `<div class="toast" data-delay="3000" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <img id="actionImg" src="assets/img/error.png" class="rounded mr-2" alt="Error">
                <span id="toastMessage"></span>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
       </div>`;
    $('#toastBoxx').append(toast);
  }