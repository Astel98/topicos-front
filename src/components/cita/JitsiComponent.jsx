import React, { Component } from 'react';
import { alertaError, alertaSuccess } from '../../common/alertas';

class JitsiComponent extends Component {

    domain = 'meet.jit.si';
    api = {};

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            room: props.room ?? 'default-room',
            user: {
                name: props.name ?? 'NO IDENTIFICADO'
            },
            isAudioMuted: true,
            isVideoMuted: true
        }
    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: '100%',
            configOverwrite: { 
                prejoinPageEnabled: false,
                startWithAudioMuted: true, 
            },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.user.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        // return this.props.history.push('/thank-you');
        alertaSuccess('Meet finalizada')
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command) {
        this.api.executeCommand(command);;
        if (command == 'hangup') {
            // return this.props.history.push('/thank-you');
            alertaSuccess('Meet finalizada')
        }

        if (command == 'toggleAudio') {
            this.setState({ isAudioMuted: !this.state.isAudioMuted });
        }

        if (command == 'toggleVideo') {
            this.setState({ isVideoMuted: !this.state.isVideoMuted });
        }
    }

    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alertaError('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>
                <div id="jitsi-iframe" className="meet-card"></div>
                {/* <div class="item-center">
                    <span>Custom Controls</span>
                </div>
                <div class="item-center">
                    <span>&nbsp;&nbsp;</span>
                    <i onClick={() => this.executeCommand('toggleAudio')} className={`fas fa-2x grey-color ${isAudioMuted ? 'fa-microphone-slash' : 'fa-microphone'}`} aria-hidden="true" title="Mute / Unmute">A</i>
                    <i onClick={() => this.executeCommand('hangup')} className="fas fa-phone-slash fa-2x red-color" aria-hidden="true" title="Leave">A</i>
                    <i onClick={() => this.executeCommand('toggleVideo')} className={`fas fa-2x grey-color ${isVideoMuted ? 'fa-video-slash' : 'fa-video'}`} aria-hidden="true" title="Start / Stop camera">A</i>
                    <i onClick={() => this.executeCommand('toggleShareScreen')} className="fas fa-film fa-2x grey-color" aria-hidden="true" title="Share your screen">A</i>
                </div> */}

            </>
        );
    }
}

export default JitsiComponent;