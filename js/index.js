/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */ 
function dropdown() {
  document.getElementById("toc-drop").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// fetches json data from a site about game servers
async function load_server(url){
  try {
    response = await fetch(url, {
      cache: 'no-cache'
    })
    result = response.json()
    console.log(`Loaded ${url}`)
    return result
  } catch (error) {
    console.log("Failed to fetch remote address")
    return {online: false}
  }
}

// gets a rough estimation of ping to a site. Only works for addresses that will give a header response
async function ping(url) {
  try {
    let sendDate = (new Date()).getTime();
    await fetch(url, {
      mode: 'no-cors',
      cache: 'no-cache'
    })
    let recDate = (new Date()).getTime();
    // console.log('Approximate ping for ' + url + ' is ' + (recDate - sendDate) + ' ms')
    return recDate - sendDate
  } catch (error) {
    console.log("Failed to ping address")
  }
}




 window.onload = async function fill_tables() {
  const gameTable = document.querySelector('#game-table')
  thurman619 = await load_server('https://api.mcsrvstat.us/2/thurman619.com');
  tetricz = await load_server('https://api.mcsrvstat.us/2/play.tetricz.com');
  createTetricz = await load_server('https://api.mcsrvstat.us/2/create.tetricz.com')
  if (tetricz.online) {
    ping('https://t1.tetricz.com')
    tetricz.ping = (await ping('https://t1.tetricz.com'))
    console.log('play.tetricz.com is online')
    console.log(tetricz)
    gameTable.innerHTML += `<tr id="play.tetricz.com" class="table-contents">
                                <th><image src="${tetricz.icon}" alt="assets/default-minecraft.png" width="32" height="32"></th>
                                <th>Vanilla SMP</th>
                                <th>${tetricz.version}</th>
                                <th>play.tetricz.com</th>
                                <th>${tetricz.port}</th>
                                <th>${tetricz.debug.srv}</th>
                                <th>${tetricz.motd.html}</th>
                                <th>${tetricz.players.online}/${tetricz.players.max}</th>
                                <th>${tetricz.ping}</th>
                            </tr>`
  }else{
    console.log('play.tetricz.com is offline')
    gameTable.innerHTML += `<tr id="play.tetricz.com" class="table-contents">
                                <th><image src="assets/default-minecraft.png" width="32" height="32"></th>
                                <th>Vanilla SMP</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                            </tr>`
  }
  if (createTetricz.online) {
    ping('https://t1.tetricz.com')
    createTetricz.ping = (await ping('https://t1.tetricz.com'))
    console.log('cab.tetricz.com is online')
    console.log(createTetricz)
    gameTable.innerHTML += `<tr id="create.tetricz.com" class="table-contents">
                                <th><image src="${createTetricz.icon}" alt="assets/default-minecraft.png" width="32" height="32"></th>
                                <th>Create: Above and Beyond Modpack</th>
                                <th>cab.tetricz.com</th>
                                <th>${createTetricz.port}</th>
                                <th>${createTetricz.debug.srv}</th>
                                <th>${createTetricz.motd.html}</th>
                                <th>${createTetricz.players.online}/${createTetricz.players.max}</th>
                                <th>${createTetricz.ping}</th>
                            </tr>`
  }else{
    console.log('cab.tetricz.com is offline')
    gameTable.innerHTML += `<tr id="create.tetricz.com" class="table-contents">
                                <th><image src="assets/default-minecraft.png" width="32" height="32"></th>
                                <th>Create: Above and Beyond</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                            </tr>`
  }
}