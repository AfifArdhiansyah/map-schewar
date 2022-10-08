import { Tile } from "./Tile";

function BoardCoordinate({child}){
    return(
        <div className="coor">
            {child}
        </div>
    )
}

function Board({onDrop, team, validArea}){
    let validTiles
    if(validArea){
        validTiles = validArea
    }
    const tiles = []
    let id = 0
    for (let row = 16; row >= 0; row--) {
        for (let column = 0; column <= 16; column++) {
            if(row===0 || row ===16){
                if(column>0 && column <16) tiles.push(<BoardCoordinate child={column} key={id}/>)
                else tiles.push(<BoardCoordinate key={id}/>)
            }
            else if(column===0 || column===16){
                if(row>0 && row <16) tiles.push(<BoardCoordinate child={(row + 9).toString(36).toUpperCase()} key={id}/>)
                else tiles.push(<BoardCoordinate key={id}/>)
            }
            else{
                if(validArea){
                    if(validTiles.find((tile)=>tile==id))
                        tiles.push(<Tile row={(row + 9).toString(36).toUpperCase()} column={column} id={id} onDrop={onDrop} team={team} isValid={true} key={id}/>) 
                    else
                        tiles.push(<Tile row={(row + 9).toString(36).toUpperCase()} column={column} id={id} onDrop={onDrop} team={team} isValid={false} key={id}/>)
                }
                else tiles.push(<Tile row={(row + 9).toString(36).toUpperCase()} column={column} id={id} onDrop={onDrop} team={team} isValid={true} key={id}/>)
            }
            id++            
        }
        id++
    }
    return(
        <div>
            <div className="tileBoard">
                {tiles}
            </div>
        </div>        
    )       
}

export {Board}