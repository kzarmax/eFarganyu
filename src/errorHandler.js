import Toast from 'react-native-simple-toast';

export default function errorHandler(error, showMessage = true, dispatch) {
    let message = "";
    console.log(error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        if (error.response.status == 401) {
            // if request is unauthenticated;
        }

        message = error.response.data.message;

    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message = error.message;
    } else {
        // Something happened in setting up the request that triggered an Error
        message = error.message;
    }

    if (showMessage) {
        // show error message
        Toast.show(message);
    }
}