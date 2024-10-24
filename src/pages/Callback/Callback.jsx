import React from 'react'

const Callback = () => {


    function getCodeParams() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const code = params.get('code');
        return code;
    }

  return (
    <div>
        <h1>Hello, i'm callback</h1>
        <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  )
}

export default Callback