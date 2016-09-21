$(window).load( function(){
  var today = new Date();
  var day = today.getDay();
  var hour = today.getHours();
  if(day === 4 && hour >= 17 || day === 5)
  {
    checkAuth();
  }
  else {
    $('.tables-unavailable').removeClass('hidden');
  }
});

var CLIENT_ID = '1062258359464-ue4mc5hk6fqrbamjb25m8h2svn406pv8.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadSheetsApi();
  }
}

function loadSheetsApi() {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(readTables);
}

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
    var tablesList = range.valueRanges;
    if (tablesList.length > 0) {
      for(i = 0; i< tablesList.length; i++)
      {
        var table = [];
        if(tablesList[i].values.length > 0)
        {
          for(j = 0; j < tablesList[i].values.length; j++)
          {
            var row = tablesList[i].values[j];
            if(row[0] !== undefined && row[0] !== 'Player')
            {
              var player = {name: row[0], role: row[1]};
              table.push(player);
            }
          }
          tables.push(table);
        }
      }
    } else {
      //appendPre('No data found.');
    }
  }, function(response) {
    //appendPre('Error: ' + response.result.error.message);
  }).then(function() {
    showTables();
  });
}

function showTables() {
  var output = '';
  if(tables.length > 0)
  {
    output += '<div class="row">';
    for(i = 0; i < tables.length; i++)
    {
      if(tables[i].length > 1)
      {
        output += '<div class="col-md-4 col-sm-6"><ul class="list-group">';
        output += '<li class="list-group-item list-group-item-primary"><span class="badge badge-primary">' + (tables[i].length-1) + '</span> ' + tables[i][0].name.substring(8) + '</li>';
        for(j = 1; j < tables[i].length; j++)
        {
          var player = tables[i][j];
          output += '<li class="list-group-item"><span class="label label-default label-' + player.role.toLowerCase() + ' pull-right">' + player.role + '</span> ' + player.name + '</li>';
        }
        output += '</ul></div>';
      }      
    }
    output += '</div>';
  }
  $('#tables').append(output);
}