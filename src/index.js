import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      listOfVideos: [],
      loadingStatus: null ,
      currentVideoUrl: '',
      comment: '',
      listOfComments: [],
      likeStatus: 'Like',
      isLoadingError: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingStatus: "LOADING",
    isLoadingError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    isLoadingError: true
  })
}
this.setState({
  listOfVideos: myJson.items
})
console.log(this.state.listOfVideos)
  this.setState({
    loadingStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingStatus: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDAyYIU0uRJadfSwFyYvrEhv86RfTGuqnM`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  listOfVideos: myJson.items,
  loadingStatus: "LOADED"
})
console.log(this.state.listOfVideos)
this.setState({
  currentVideoUrl: this.state.listOfVideos[0].id.videoId
})
console.log("currentVideoUrl" , this.state.currentVideoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("listOfVideos" , this.state.listOfVideos)
}
setCurrentUrl = (id) => {

  this.setState({
    currentVideoUrl: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    listOfComments: [...this.state.listOfComments, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.likeStatus == "Like"){
  this.setState({
    likeStatus: 'Liked'
  })
  } else {
      this.setState({
    likeStatus: 'Like'
  })
  }

}
  render() {
    let videos = this.state.listOfVideos.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input  style={{ marginLeft:"450px",width:"430px"}} placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.isLoadingError ? (<h1>No search found</h1>): (
  <iframe src={`https://www.youtube.com/embed/${this.state.currentVideoUrl}`} style={{height: '350px', width: '850px', float : 'left'}}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '300px', float : 'right'}}>
        {this.state.loadingStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button  style={ {
  marginLeft: "790px" ,backgroundColor:" red",padding:'12px'}}onClick={this.likeButton}>{this.state.likeStatus}</button>
{this.state.listOfComments.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input style ={{outline: 0 ,border: '0',
    borderBottom: '2px solid #484a56',width:'300px'}} onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input  style ={{outline: 0,
    border: '0',
    borderBottom: '2px solid #484a56',
    marginLeft:"45px", width:'300px'}}onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button  style={{marginLeft:'580px', width:'120px'}}onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));