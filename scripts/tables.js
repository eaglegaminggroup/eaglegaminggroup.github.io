$(window).load( function(){
  // get today
  var today = new Date();
  var day = today.getDay();
  var hour = today.getHours();
  
  // if between Thursday at 5pm and Friday at midnight
  if(day === 4 && hour >= 17 || day === 5)
  {
    gapi.load('client', init);
  }
  else {
    // show unavailable element
    $('.tables-unavailable').removeClass('hidden');
  }
});

// set api key and load 
function init() {
  gapi.client.setApiKey('AIzaSyClqptXueR8OxUDbzJj6l0DRvKLf0eQle4');
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(readTables);
}

// array of tables
var tables = [];

function readTables() {
  gapi.client.sheets.spreadsheets.values.batchGet({
    spreadsheetId: '1PIU2fQWPJE6TgeZaiQKOTleS9PON7lQKWmCjTN_d0QI',
    ranges: [
      'Current Tables!I11:J18',
      'Current Tables!K11:L18',
      'Current Tables!M11:N18',
      'Current Tables!I20:J27',
      'Current Tables!K20:L27'
    ]
  }).then(function(response) {
    var range = response.result;
    // list of tables
    var tablesList = range.valueRanges;
    if (tablesList.length > 0) {
      for(i = 0; i < tablesList.length; i++)
      {
        // list of players = a single table
        var playersList = tablesList[i].values;
        // table object
        var table = {};
        if(playersList.length > 2)
        {
          // add dm to table object
          table.dm = playersList[0][0].substring(8);
          table.players = [];
          for(j = 1; j < playersList.length; j++)
          {
            // single player = array of name and class
            var row = playersList[j];
            if(row[0] !== undefined && row[0] !== 'Player')
            {
              // add player to player list
              var player = {name: row[0], role: row[1]};
              table.players.push(player);
            }
          }
          tables.push(table);
        }
      }
    } else {
      logError('No data found.');
    }
  }, function(response) {
    logError('Error: ' + response.result.error.message);
  }).then(function() {
    showTables();
    // var out = '';
    // for(i = 0; i < tables.length; i++)
    // {
    //   out += '\nTable ' + (i+1) + ': ' + tables[i].dm;
    //   for(j = 0; j < tables[i].players.length; j++)
    //   {
    //     out += '\n' + tables[i].players[j].name + ' - ' + tables[i].players[j].role;
    //   }
    // }
    // alert(out);
  });
}

function showTables() {
  // create the row
  var output = '<div class="row">';
  for(i = 0; i < tables.length; i++)
  {
    if(tables[i].players.length > 0)
    {
      // create a div col and list group and add the DM name and num players as first primary item
      output += '<div class="col-md-4 col-sm-6"><ul class="list-group">';
      output += '<li class="list-group-item list-group-item-primary"><span class="badge badge-primary">' + tables[i].players.length + '</span> ' + tables[i].dm + '</li>';
      for(j = 0; j < tables[i].players.length; j++)
      {
        // add each player and their class to the list group
        var player = tables[i].players[j];
        output += '<li class="list-group-item"><span class="label label-default label-' + player.role.toLowerCase() + ' pull-right">' + player.role + '</span> ' + player.name + '</li>';
      }
      // close list group and div col
      output += '</ul></div>';
    }      
  }
  // close row
  output += '</div>';
  // append elements to the tables div
  $('#tables').append(output);
}

function logError(message)
{
  if(window.console && window.console.log)
  {
    console.log(message);
  }
}