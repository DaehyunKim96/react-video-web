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


function VideoShowPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)

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
                    // setFilePath(response.data.filePath)

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

    const onClick = (e) =>{
        Axios.get('/api/video/getMusic').then(response=>
    {
        var musics = response.data.music;
        var start = response.data.start;
        var end = response.data.end;
        for (let step = 0; step < musics.length;step++){
            console.log(response.data.music[step]);
        }
        for (let step = 0; step < start.length;step++){
            console.log(start[step],end[step]);
        }
        
    })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }} >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

            </div>

            <Form onSubmit>
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
                        <img src="test.png" alt="Test" />
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

                <label>Recommended Songs</label>
                <div class = "song_list" style={{
                                width: '700px', height: '600px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'flex-start', flex:1, flexDirection: 'column',
                                paddingTop: '30px'
                            }}>
                <div class="song_info" style={{
                                width: '670px', height: '50px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', marginBottom: '30px'
                            }}>
                    <img></img>
                    <div class="song_name">뀨잇</div>
                    <div class="singer">뀨뀨잇</div>
                </div>
                <div class="song_info" style={{
                                width: '670px', height: '50px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', marginBottom: '30px'
                            }}>
                    <img></img>
                    <div class="song_name">뀨잇</div>
                    <div class="singer">뀨뀨잇</div>
                </div>
                </div>

                <br />
                <br />
                <Button type="primary" size="large" onClick ={onClick}>
                    Submit
                </Button>

            </Form>


        </div >
    )
}

export default VideoShowPage