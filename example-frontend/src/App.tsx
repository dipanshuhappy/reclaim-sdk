import React from 'react';
import './App.css';
import axios from 'axios'

const getCallbackUrl = process.env.REACT_APP_BACKEND_BASE_URL + '/home'
const getStatusUrl = process.env.REACT_APP_BACKEND_BASE_URL + '/status'

function App() {

  const [callbackUrl, setCallbackUrl] = React.useState<string | null>(null)
  const [callbackId, setCallbackId] = React.useState<string | null>(null)
  const [status, setStatus] = React.useState<string | null>(null)

  const getStatus = async (callbackId: string) => {
    const response = await axios.get(getStatusUrl + `/${callbackId}`);
    setStatus(response.data.status);
  }

  React.useEffect(() => {
    axios.get(getCallbackUrl)
      .then(response => {
        setCallbackId(response.data.callbackId)
        setCallbackUrl(response.data.url);
      })
  }, [])

  React.useEffect(() => {
    if (!callbackId) return;

    const interval = setInterval(() => {
      getStatus(callbackId)
    }, 1000);

    return () => clearInterval(interval);
  }, [callbackId]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <h2>Claim that you have a google account!</h2>

        {callbackUrl &&
          <a
            className="App-link"
            href={callbackUrl}
          >
            Claim it
          </a>
        }
        {status === 'verified' ? <h3>Thanks for submitting your link!</h3> : <div className='loader'></div>}
      </header>
    </div>
  );
}

export default App;
