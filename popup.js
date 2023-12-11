 //look for it when you will get your precious time and do correct and now do fucking study of your endsem bybyee! all the best..
jQuery(function(){
  chrome.storage.sync.get(['total','limit'], function(budget){
    $('#total').text(budget.total||0);
    $('#limit').text(budget.limit||'not set');
  });

  $('#spendamount').click(function(){
    chrome.storage.sync.get(['total','limit'], function(budget){
      var newtotal = 0;
      if(budget.total)
      {
        newtotal+=parseInt(budget.total);
      }
      var amount = $('#amount').val();
      if(amount) 
      {
        newtotal += parseInt(amount);
      } 
      
      chrome.storage.sync.set({'total': newtotal},function()
      {
        console.log("after setting new total");
        if(amount+newtotal>=budget.limit)
        {
          console.log("amount matched limit reached");
          var notifOptions={

            type:'basic',
            iconUrl:'icon48.png',
            title:'Limit Reached!',
            message:"You've reached your limit"
          };
          chrome.notifications.create('limitNotif',notifOptions);
        }
        $('#total').text(newtotal);
          $('#amount').val('');
          
      }); 
         /* $('#total').text(newtotal);
          $('#amount').val('');*/
          
       
    });
  });
});
