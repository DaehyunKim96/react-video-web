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


function VideoSub() {

    const [MusicArtist, setMusicArtist] = useState("")
    const [MusicTitle, setMusicTitle] = useState("")
    const [MusicLink, setMusicLink] = useState("")
    const [MusicPath, setMusicPath] = useState("")
    const [Private, setPrivate] = useState(0)

    const onArtistChange = (e) => {
        setMusicArtist(e.currentTarget.value)
    }

    const onTitleChange = (e) => {
        setMusicTitle(e.currentTarget.value)
    }

    const onLinkChange = (e) => {
        setMusicLink(e.currentTarget.value)
    }

    const onPathChange = (e) => {
        setMusicPath(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onClick = (event) => {

        event.preventDefault();

        // if (user.userData && !user.userData.isAuth) {
        //     return alert('Please Log in First')
        // }

        if (MusicArtist === "" || MusicTitle === "" ||
            MusicLink === "" || MusicPath === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            artist: MusicArtist,
            title: MusicTitle,
            link: MusicLink,
            path: MusicPath
        }

        Axios.post('/api/video//uploadmusics', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                } else {
                    alert('Failed to upload video')
                }
            })

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

    // const onClick = (e) =>{
    //     Axios.get('/api/video/getMusic').then(response=>
    // {
    //     var musics = response.data.music;
    //     var start = response.data.start;
    //     var end = response.data.end;
    //     for (let step = 0; step < musics.length;step++){
    //         console.log(response.data.music[step]);
    //     }
    //     for (let step = 0; step < start.length;step++){
    //         console.log(start[step],end[step]);
    //     }
        
    // })
    // }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }} >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>

            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    { }

                    { }
                    <div>
                        <img src alt />
                    </div>

                </div>
                <br />
                <br />
                <label>Artist</label>
                <Input
                    onChange={onArtistChange}
                    value={MusicArtist}
                />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={MusicTitle}
                />
                <br />
                <br />
                <label>Link</label>
                <Input
                    onChange={onLinkChange}
                    value={MusicLink}
                />
                <br />
                <br />
                <label>Path</label>
                <Input
                    onChange={onPathChange}
                    value={MusicPath}
                />
                <Button type="primary" size="large" onClick ={onClick}>
                    Submit
                </Button>

            </Form>


        </div >
    )
}

export default VideoSub