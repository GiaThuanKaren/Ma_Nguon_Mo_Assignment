import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "src/utils/lib/firebase";
import React from "react"
interface StateUseToken {
    tokenFCM: string;
    messaging: any;
}

function useToken() {
    const [tokenFCM, setTokenFCM] = React.useState<StateUseToken>();
    const HandleMessageIncoming = async function (messageVar: any) {
        try {
            onMessage(messageVar, (payload) => {
                console.log("Message received. 123 ", payload);
                // ...
            });
        } catch (error) {
            throw error;
        }
    };
    React.useEffect(() => {
        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);
        Notification.requestPermission((permission) => {
            if (permission == "granted") {
                getToken(messaging, {
                    vapidKey:
                        "BMgUWKZpVMcrKDPFuh-S571BQuacmd9Nlz1vnaJigmXSu7LDKOXuyEIpOo4zhVls2TarI0KV2wMomE_s_D5No74",
                })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log("TOKEN", currentToken);
                            localStorage.setItem("token_dev_to", currentToken)
                            onMessage(messaging, (payload) => {
                                console.log("Message received. 123123 ", payload);
                                // ...
                            });
                            setTokenFCM({
                                tokenFCM: currentToken,
                                messaging: messaging,
                            });
                            // Send the token to your server and update the UI if necessary
                            // ...
                        } else {
                            // Show permission request UI
                            console.log(
                                "No registration token available. Request permission to generate one."
                            );
                            // ...
                        }
                    })
                    .catch((err) => {
                        console.log("An error occurred while retrieving token. ", err);
                        throw err;
                        // ...
                    });
            } else {
            }
        });
    }, []);

    return { tokenFCM, HandleMessageIncoming };
}


export default useToken