import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import './Images.css';

class Images extends Component {

    state = {
        images: [],
        editRoute: false,
        imageEditId: null,
        imageSrc: null
    };

    render() {        
        
        if(this.state.editRoute){
            return(
                <Redirect to = {{
                    pathname: "/edit",
                    imageId: this.state.imageEditId,
                    imageSrc: this.state.imageSrc 
                }}/>
            )
        }

        let imageElements = this.state.images.map(image => {

            return(
                <div key = {image._id} className="Images">
                    <div className="content">
                        <img src={image.content} alt="img" className="photo"/>
                        <div className="btns">
                            <button onClick = {() => this.editImage(image._id, image.content)}>Edit</button>
                            <button onClick = {() => this.deleteImage(image._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        });

        return(
            <div className="Images">
                <div className="container">
                    {imageElements}
                </div>
            </div>
        )
    }
    

    componentDidMount(){

        axios.get("/image").then(response => {

            this.setState({images: response.data});

        }).catch(err => {

            console.log(err);
        })
    }

    editImage = (id, src) =>{
        
        this.setState({
            imageEditId: id,
            editRoute: true,
            imageSrc: src
        });
    }

    deleteImage = (id) =>{
        
        axios.delete(`/image/${id}`).then(response => {

            alert("Deleted");            
            this.setState({images: response.data});

        }).catch(err => {

            console.log(err);
        });
    }
}

export default Images;