
function Tile({row, column, id, onDrop, team, isValid, onDragStart}){
    const dragTile = (e)=>{
        const teamChoose = 'tim'+team
        document.getElementById(id).innerHTML = ''
        document.getElementById(id).classList.remove(teamChoose)
        document.getElementById(id).classList.remove('desa')
    }
    const over = (e, id)=>{
        if(isValid)e.preventDefault()     
    }
    const leave = (id)=>{
        //left
        for(let i=id; i>id - id%18; i--){
            document.getElementById(i).classList.remove('over')
        }
        //right
        for(let i=id; i<id - id%18 + 16; i++){
            document.getElementById(i).classList.remove('over')
        }
        //top
        for(let i=id; i>1+18; i-=18){
            document.getElementById(i).classList.remove('over')
        }
        //bottom
        for(let i=id; i<18*18-2*18; i+=18){
            document.getElementById(i).classList.remove('over')
        }
        
    }
    return(
        <div 
            id={id}
            className="tile" 
            onDrag={(e)=>dragTile(e)}
            onDragStart={(e)=>onDragStart(e)}
            onDrop={()=>onDrop(row, column, id, team)}  
            onDragOver={(e)=> over(e, id)}
            // onDragLeave={()=>leave(id)}
            draggable
        >
        </div>
    )
}

export {Tile}