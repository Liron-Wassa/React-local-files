import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import './Edit.css';

class Edit extends Component {

    state = {
        src: "",
        selectedFile: null,
        imagesRoues: false
    };

    imageId = this.props.location.imageId;

    render() {
        
        if(this.state.imagesRoues){

            return(
                <Redirect to = "/images"/>
            )
        }

        return (
            <div className="Edit">
                <input type="file" onChange = {this.inputFile}/>
                <button onClick = {this.updateImage}>Update</button>
                <br/>
                {this.state.src ?

                    <img src={this.state.src} alt="img"/> :

                <img src={this.props.location.imageSrc} alt="img"/>}
            </div>
        )
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

    updateImage = () => {
        
        let formData = new FormData();
    
        formData.append('image', this.state.selectedFile);
    
        const config = {headers: {"content-type": "multipart/form-data"}}

        axios.put(`/image/${this.imageId}`, formData, config).then(response => {
                  
            if(response.status === 201){

                alert("Updated");
                this.setState({imagesRoues: true});
            }
    
        }).catch(err => {
    
          console.log(err);
            
        });
    }
}

export default Edit;