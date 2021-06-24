import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]


function VideoUploadPage() {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [FilePath, setFilePath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    // Axios.post('/api/video/thumbnail', variable)
                    //     .then(response => {
                    //         if (response.data.success) {
                    //             setDuration(response.data.fileDuration)
                    //             setThumbnail(response.data.thumbsFilePath)
                    //         } else {
                    //             alert('Failed to make the thumbnails');
                    //         }
                    //     })


                } else {
                    alert('failed to save the video in server')
                }
            })


    }
    const onSubmit = (event) => {

        event.preventDefault();
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (VideoTitle === "" || Description === "" ||
            FilePath === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    //props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }

    const onClick = (e) =>{
        Axios.get('/api/video/getMusic').then(response=>
    {
        var musics = response.data.music;
        for (let step = 0; step < musics.length;step++){
            console.log(response.data.music[step]);
        }
        
    })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }} >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    { }

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>


                        )}

                    </Dropzone>
                    { }
                    <div>
                        <img src alt />
                    </div>

                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>

                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>

                <br />
                <br />
                <Button type="primary" size="large" onClick ={onSubmit}>
                    Submit
                </Button>

            </Form>


        </div >
    )
}

export default VideoUploadPage