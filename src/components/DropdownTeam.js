
function DropdownTeam_Item({team, onChooseTeam}){
  const teamId = 'team'+team
  const teamName = 'Tim '+team 
  return(
    <li><button id={teamId} className="dropdown-item" onClick={()=>onChooseTeam(team, teamName)}>Tim {team}</button></li>
  )
}

function DropdownTeam({onChooseTeam, group}){
    const teams = []
    if(group==1){
      //group 1
      for (let team = 1; team <= 25; team++) {
        teams.push(<DropdownTeam_Item team={team} onChooseTeam={onChooseTeam} key={team}/>)      
      }
    }
    else if(group==2){
      //group 2
      for (let team = 26; team <= 50; team++) {
        teams.push(<DropdownTeam_Item team={team} onChooseTeam={onChooseTeam} key={team}/>)      
      }
    }
    else if(group==3){
      //group 3
      for (let team = 51; team <= 75; team++) {
        teams.push(<DropdownTeam_Item team={team} onChooseTeam={onChooseTeam} key={team}/>)      
      }
    }  
    
    
    return(
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle mt-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Pilih Tim
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {teams}
            </ul>
        </div>
    )
}

export {DropdownTeam}