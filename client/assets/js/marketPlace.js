$("body").on('DOMSubtreeModified', "#navbarDropdown", async function() {
    var ticker = $('#navbarDropdown').find('strong').html();
      if( ticker == 'ETH'){
      }
    else{
        setTimeout(()=>{
            getPendingLimitOrders();
            getPendingMarketOrders();
          },1000)
    }
  });

  $("body").on('DOMSubtreeModified', "#pendingLimitOrder", async function() {
    var ticker = $('#navbarDropdown').find('strong').html();
      if( ticker == 'ETH'){
      }
    else{
        setTimeout(()=>{
            getPendingLimitOrders();
          },1000)
    }
  });

  $("body").on('DOMSubtreeModified', "#pendingMarketOrder", async function() {
    var ticker = $('#navbarDropdown').find('strong').html();
      if( ticker == 'ETH'){
      }
    else{
        setTimeout(()=>{
            getPendingMarketOrders();
          },1000)
    }
  });