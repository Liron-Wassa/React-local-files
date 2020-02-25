import React, { Component } from 'react';
import axios from 'axios';
import './Upload.css';

class Upload extends Component {

    state = {
        src: "",
        selectedFile: null
      };

    render() {
        
        // console.log(this.state.src);
        // console.log(this.state.selectedFile);

        return (
            <div className="Upload">
                <input type="file" onChange = {this.inputFile}/>
                <button onClick = {this.loadToServer}>Submit</button>
                <br/>
                {this.state.src ?

                    <img src={this.state.src} alt="img"/> :

                null}
            </div>
        )
    }

    loadToServer = () =>{

        let formData = new FormData();
    
        formData.append('image', this.state.selectedFile);
    
        const config = {headers: {"content-type": "multipart/form-data"}}
        
        axios.post(`/image`, formData, config).then(response => {
                 
            if(response.status === 201){

                alert("Added to images");
            }
    
        }).catch(err => {
    
          console.log(err);
            
        });
    }
    
      inputFile = (event) => {
    
        const file = event.target.files[0];
    
        this.setState({selectedFile: file});
    
        if(file){
    
          const reader = new FileReader();
    
          reader.addEventListener("load", () => {
    
            this.setState({src: reader.result});
    
          });
    
          reader.readAsDataURL(file);
    
        }
    }
}

export default Upload;