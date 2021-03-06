
function setDropdown(text){
 alert(text);
}

function showTokensModal(){
    $('#adminModal').modal('show');
}

function appendToken(ticker){
    var item = `<button class='btn tokenBtn dropdown-item' onclick="getToken('${ticker}')">${ticker}</button>`;
    $('#tokenItems').append(item);
}

function getToken(ticker){
  $('#navbarDropdown').html(ticker).wrapInner("<strong></strong>");
}

function getMarketSide(side){
  $('#mktSideDropdown').html(side).wrapInner("<strong></strong>");
}

function getLimitSide(side){
  $('#limitSideDropdown').html(side).wrapInner("<strong></strong>");
}

function getPendLimitSide(side){
  $('#pendingLimitOrder').html(side).wrapInner("<strong></strong>");
}

function getPendMarketSide(side){
  $('#pendingMarketOrder').html(side).wrapInner("<strong></strong>");
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + " " + month + " " + year + " " + hour + ':' + min + ':' + sec ;
  return time;
}

function appendTableRow(lstTxn){
  var act = lstTxn.action;
  var ticker = web3.utils.toUtf8(lstTxn.ticker);
  var address = lstTxn._address;
  var amt = web3.utils.fromWei(lstTxn.amount,'ether');
  var time = `${timeConverter(lstTxn.creationTime)}`;
  
  var table = $('#table_id').DataTable();
  table.row.add( {
    "action": act,
    "ticker":  ticker,
    "address": address,
    "amount":  amt,
    "creationTime": time
} ).draw();
}

function appendOrdersRows(order){
  var id = order.id;
  var trader = order.trader;
  var amount = web3.utils.fromWei(order.amount,'ether') + " " + web3.utils.toUtf8(order.ticker);
  var price =  order.price + ' ETH / ' + web3.utils.toUtf8(order.ticker);
  var filled = order.filled;

  var row = 
   `<tr>
     <th scope="row">${id}</th>
     <td>${trader}</td>
     <td>${amount}</td>
     <td>${price}</td>
     <td>${filled}</td>
    </tr>`;
  
  $('#limitOrderTable').append(row);
  
}

function appendMarketOrdersRows(order){
  var id = order.id;
  var trader = order.trader;
  var amount = web3.utils.fromWei(order.amount,'ether') + " " + web3.utils.toUtf8(order.ticker);
  var filled = order.filled;

  var row = 
   `<tr>
     <th scope="row">${id}</th>
     <td>${trader}</td>
     <td>${amount}</td>
     <td>${filled}</td>
    </tr>`;

    $('#marketOrderTable').append(row);
}


