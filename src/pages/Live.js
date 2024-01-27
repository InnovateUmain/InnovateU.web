/* eslint-disable @next/next/no-sync-scripts */
import React, { use, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const Live = () => {
    const router = useRouter();
    const userinfo = useSelector((state) => state.userData);
    console.log(userinfo.name);
    useEffect(() => {

    function getUrlParams(url) {
        let urlStr = url.split('?')[1];
        const urlSearchParams = new URLSearchParams(urlStr);
        const result = Object.fromEntries(urlSearchParams.entries());
        return result;
    }


        // Generate a Token by calling a method.
        // @param 1: appID
        // @param 2: serverSecret
        // @param 3: Room ID
        // @param 4: User ID
        // @param 5: Username
    const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = userinfo.name + userID;
    const appID = 848970913;
    const serverSecret = "dff9ca600104e84ce5123954723aea0c";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    
        // You can assign different roles based on url parameters.
        let role = getUrlParams(window.location.href)['role'] || 'Host';
        router.query.role=="h123" ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;
        let config = {}
        if(role === 'Host'){
            config = {
               turnOnCameraWhenJoining: true,
               showMyCameraToggleButton: true,
               showAudioVideoSettingsButton: true,
               showScreenSharingButton: true,
               showTextChat: true,
               showUserList: true,
         }
        }
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: document.querySelector("#root"),
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: {
                            role,
                },
            },
            sharedLinks: [{
                name: 'Join as an audience',
                url:
                window.location.protocol + '//' +
                window.location.host +
                window.location.pathname +
                '?roomID=' +
                roomID +
                '&role=Audience',
            }],
            ...config
            });

            
        
    },[])
  return (
    <div>
         <style jsx global>{`
          #footer {
            display: none;
          }
          #navbar {
            display: none;
          }
        `}</style>
      <div id='root' className='h-[100vh] w-[100vw]'>

      </div>
      <script src="https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js"></script>
<script>

</script>
    </div>
  )
}

export default Live
