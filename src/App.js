import './App.css';
import { Board } from './components/Board';
import { DropdownTeam } from './components/DropdownTeam';
import { Leaderboard } from './components/Leaderboard';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      put: '',
      team: '',
      validArea: {},
      log: {},
      tilePosition : [],
      RENDER_EVENT : 'render-tile',
      SAVED_EVENT : 'saved-tile',
      STORAGE_KEY : 'TILE_POSITION',
      VALID_KEY : 'VALID_AREA',
    }
    this.onDropHandler = this.onDropHandler.bind(this)
    this.onDragStartHandler = this.onDragStartHandler.bind(this)
    this.onChooseTeamHandler = this.onChooseTeamHandler.bind(this)
    this.onDragHandler = this.onDragHandler.bind(this)
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this)
    this.lookValid = this.lookValid.bind(this)
    this.drawTile = this.drawTile.bind(this)
    this.loadDataFromStorage = this.loadDataFromStorage.bind(this)
    this.saveData = this.saveData.bind(this)
    this.generateTile = this.generateTile.bind(this)
  }

  componentDidMount() {
    if (typeof (Storage) !== undefined) {
      this.loadDataFromStorage();
    }
    window.addEventListener('load', this.drawTile());
  }

  componentWillUnmount() { 
    if (typeof (Storage) !== undefined) {
      this.loadDataFromStorage();
    }
    window.removeEventListener('load', this.drawTile())  
  }

  loadDataFromStorage() {
    //fetch data tile position
    const serializedData = localStorage.getItem(this.state.STORAGE_KEY);
    let data = JSON.parse(serializedData);
  
    if (data !== null) {
      this.state.tilePosition = []
      for (const tile of data) {
        this.state.tilePosition.push(tile);
      }
    }

    //fetch data valid area
    const serializedValid = localStorage.getItem(this.state.VALID_KEY);
    let valid = JSON.parse(serializedValid);
    if (valid !== null) {
      this.state.validArea = valid
    }
    document.dispatchEvent(new Event(this.state.RENDER_EVENT));
  }

  saveData() {
    if (typeof (Storage) !== undefined) {
      //save tile position
      const parsed = JSON.stringify(this.state.tilePosition);
      localStorage.setItem(this.state.STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(this.state.SAVED_EVENT));

      //save valid area
      const parsedValid = JSON.stringify(this.state.validArea);
      localStorage.setItem(this.state.VALID_KEY, parsedValid);
      document.dispatchEvent(new Event(this.state.SAVED_EVENT));
    }
  }

  generateTile(id, team, type) {
    return {
      id,
      team,
      type,
    }
  }

  onDragStartHandler(e){
    const element = e.target.id
    this.setState(()=>{
      return{
        put: element
      }
    })
  }

  onDragHandler(){
    const validTile = this.state.validArea['desa'+this.state.team]
    if(validTile){
      validTile.forEach(valid => {
        document.getElementById(valid).classList.add('over')
      });
    }
  }

  onDragLeaveHandler(){
    const overs = document.getElementsByClassName('over')
    while(overs.length){
      overs[0].classList.remove('over')
    }
  }

  onDropHandler(row, col, id, team){
    // console.log('row: ' + row + ' col: ' + col + ' put: ' + this.state.put)
    // console.log('id :', id)

    const element = document.getElementById(id)
    let dropElement

    if(this.state.put==='desa'){
      dropElement = 'D'+team
      element.classList.add('desa')
    }
    else if(this.state.put==='pasukan1'){
      dropElement = 'P1'
      element.classList.add('pasukan')
    }
    else if(this.state.put==='pasukan2'){
      dropElement = 'P2'
      element.classList.add('pasukan')
    }
    else if(this.state.put==='pasukan3'){
      dropElement = 'P3'
      element.classList.add('pasukan')
    }

    //new tile object
    const tileObject = this.generateTile(id, team, this.state.put)
    this.state.tilePosition.push(tileObject)
    document.dispatchEvent(new Event(this.state.RENDER_EVENT));

    this.setState((prevState)=>{
      let valid = Object.assign({}, prevState.validArea)
      let validTile = []
      if(this.state.validArea['desa'+team]){
        validTile = this.state.validArea['desa'+team]
      }
      
      //left
      let count = 0
      for(let i=id; i>id - id%18; i--){
        if(count>=2) break
        if(document.getElementById(i).classList.contains('tim'+team) || document.getElementById(i).classList.contains('desa')){
          validTile = validTile.filter((tile)=>{
              return tile != i
            })
        }
        else validTile.push(i)
        count++
      }
      //right
      count = 0
      for(let i=id+1; i<id - id%18 + 16; i++){
        if(count>=1) break
        if(document.getElementById(i).classList.contains('tim'+team) || document.getElementById(i).classList.contains('desa')){
          validTile = validTile.filter((tile)=>{
              return tile != i
            })
        }
        else validTile.push(i)
        count++
      }
      //top
      count = 0
      for(let i=id-18; i>1+18; i-=18){
        if(count>=1) break
        if(document.getElementById(i).classList.contains('tim'+team) || document.getElementById(i).classList.contains('desa')){
          validTile = validTile.filter((tile)=>{
              return tile != i
            })
        }
        else validTile.push(i)
        count++
      }
      //bottom
      count = 0
      for(let i=id+18; i<18*18-2*18; i+=18){
        if(count>=1) break
        if(document.getElementById(i).classList.contains('tim'+team) || document.getElementById(i).classList.contains('desa')){
          validTile = validTile.filter((tile)=>{
              return tile != i
            })
        }
        else validTile.push(i)
        count++
      }
      valid['desa'+team] = new Set(validTile)
      valid['desa'+team] = Array.from(valid['desa'+team])

      //log
      const message = 'row: ' + row + ' col: ' + col + ' put: ' + this.state.put
      let log = Object.assign({}, prevState.log)
      // const log = prevState.log
      log['tim'+team] = message
      return{
        validArea: valid,
        log: log
      }
    }, ()=>{
      this.saveData()
    })

    element.innerHTML = dropElement
    const teamChoose = 'tim'+team
    element.classList.add(teamChoose)

    const overs = document.getElementsByClassName('over')
    while(overs.length){
      overs[0].classList.remove('over')
    }
  }

  onChooseTeamHandler(choose, name){
    document.getElementById('dropdownMenuButton1').innerHTML = name
    this.setState(()=>{
      return{
        team: choose
      }
    })
  }

  drawTile(){
    this.state.tilePosition.forEach((tile)=>{
      // console.log(tile.id)
      const teamChoose = 'tim'+tile.team
      let value = ''
      const element = document.getElementById(tile.id)
      if(tile.type == 'desa'){
          element.classList.add('desa')
          element.classList.add('tim'+tile.team)
          value = 'D'+tile.team
          element.innerHTML = value
      }
      else{
          if(tile.type == 'pasukan1'){
              element.classList.add('tim'+tile.team)
              value = 'P1'
              element.innerHTML = value
          }
          else if(tile.type == 'pasukan2'){
              element.classList.add('tim'+tile.team)
              value = 'P2'
              element.innerHTML = value
          }
          else if(tile.type == 'pasukan3'){
              element.classList.add('tim'+tile.team)
              value = 'P3'
              element.innerHTML = value
          }
      }
    })    
  }

  lookValid(){
    console.log(this.state.validArea)
    // console.log(this.state.log)
    // console.log(this.state.tilePosition)
  //   this.state.tilePosition.forEach((tile)=>{
  //     // drawTile(tile.id, tile.team, tile.type)
  // })
  }

  render(){
    return (
      <div className="App d-flex">
        <Board onDrop={this.onDropHandler} team={this.state.team} validArea={this.state.validArea['desa'+this.state.team]} tilePosition={this.state.tilePosition}/>
        <div className='d-flex flex-column'>
          <div className='testDrag' id='desa' onDragStart={this.onDragStartHandler} onDrag={this.onDragHandler} onDragLeave={this.onDragLeaveHandler} draggable>Desa</div>
          <div className='testDrag' id='pasukan1' onDragStart={this.onDragStartHandler} onDrag={this.onDragHandler} onDragLeave={this.onDragLeaveHandler} draggable>Pasukan LV.1</div>
          <div className='testDrag' id='pasukan2' onDragStart={this.onDragStartHandler} onDrag={this.onDragHandler} onDragLeave={this.onDragLeaveHandler} draggable>Pasukan LV.2</div>
          <div className='testDrag' id='pasukan3' onDragStart={this.onDragStartHandler} onDrag={this.onDragHandler} onDragLeave={this.onDragLeaveHandler} draggable>Pasukan LV.3</div>
          <DropdownTeam onChooseTeam={this.onChooseTeamHandler}/>
          <button onClick={this.lookValid}>Lookkk</button>
          <Leaderboard/>
        </div>        
      </div>
    );
  }  
}

export default App;
