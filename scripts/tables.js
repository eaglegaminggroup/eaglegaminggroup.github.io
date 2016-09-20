// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1062258359464-ue4mc5hk6fqrbamjb25m8h2svn406pv8.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(listMajors);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
 
 var tables = [];
 
function listMajors() {
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
    if (range.valueRanges.length > 0) {
      for(i = 0; i< range.valueRanges.length; i++)
      {
        var table = [];
        appendPre('\nRange ' + i + '\n');
        if(range.valueRanges[i].values.length > 0)
        {
          for(j = 0; j < range.valueRanges[i].values.length; j++)
          {
            var row = range.valueRanges[i].values[j];
            // Print columns A and E, which correspond to indices 0 and 4.
            appendPre(row[0] + ', ' + row[1]);
            if(row[0] !== undefined)
            {
              var player = {name: row[0], role: row[1]};
              table.push(player);
            }            
          }
          tables.push(table);
        }        
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  }).then(function() {
    listTables();
  });
}

function listTables() {
  var output = '';
  if(tables.length > 0)
  {
    for(i = 0; i < tables.length; i++)
    {
      output += '\nTable ' + (i+1) + ':\n';
      if(tables[i].length > 0)
      {
        output += '\nDM: ' + tables[i][0].name.substring(8);
        for(j = 2; j < tables[i].length; j++)
        {
          var player = tables[i][j];
          output += '\nName: ' + player.name + ' Class: ' + player.role;       
        }
      }
    }
  }
  alert(output);
}
// 
// function listTables() {
//   gapi.client.sheets.spreadsheets.values.batchGet({
//     spreadsheetId: '1PIU2fQWPJE6TgeZaiQKOTleS9PON7lQKWmCjTN_d0QI',
//     ranges: [
//       {},
//       {}      
//     ],
//   }).then(function(response) {
//     var ranges = response.result;
//     if (range.values.length > 0) {
//       appendPre('Player, Class:');
//       for (i = 0; range.values.length; i++) {
//         var row = range.values[i];
//         // Print columns A and E, which correspond to indices 0 and 4.
//         appendPre(row[0] + ', ' + row[1]);
//       }
//     } else {
//       appendPre('No data found.');
//     }
//   }, function(response) {
//     appendPre('Error: ' + response.result.error.message);
//   });
// }

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

