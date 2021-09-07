var table;

$("body").on('DOMSubtreeModified', "#navbarDropdown", async function() {
  var ticker = $('#navbarDropdown').find('strong').html();
    if( ticker != 'ETH'){
      $('.approveBtn').css('display','inline');
    }
  else{
      $('.approveBtn').css('display','none');
  }
  setTimeout(()=>{
    getBalance();
  },1000)
  

});
  

  if ( ! $.fn.DataTable.isDataTable( '#table_id' ) ) {
    table = $('#table_id').DataTable( {
      bDestroy: true,
      columns: [
          { data: 'action' },
          { data: 'ticker' },
          { data: 'address' },
          { data: 'amount' },
          { data: 'creationTime'}
          ]
      } );
     
}




    

  
  
  

