
function DropdownTeam_Item({team, onChooseTeam}){
  const teamId = 'team'+team
  const teamName = 'Tim '+team 
  return(
    <li><button id={teamId} className="dropdown-item" onClick={()=>onChooseTeam(team, teamName)}>Tim {team}</button></li>
  )
}

function DropdownTeam({onChooseTeam}){
    const teams = []
    for (let team = 1; team <= 25; team++) {
      teams.push(<DropdownTeam_Item team={team} onChooseTeam={onChooseTeam} key={team}/>)      
    }
    return(
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Pilih Tim
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {teams}
            </ul>
        </div>
    )
}

export {DropdownTeam}