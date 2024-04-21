import { useEffect, useState } from 'react';
import './login.css'

function Registration() {
  const [data, setData] = useState('');
  const [username, setUsername]  = useState('');
  const [password, setPassword]  = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value)
  };
  const handlePassword = (event) => {
    setPassword(event.target.value)
  };

  const submit = async () => {
    try {
      console.log(username);
        const response = await fetch('http://127.0.0.1:3001/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const res = await response.text();

        console.log(res);
        setData(res);
    } catch (error) {
        console.error('Error:', error);
        setData("Registration Failed");
    }
}

  return (
    <>
      <div className="bg-gray-500 shadow-2xl w-fit px-10 py-6 flex flex-col gap-y-2 justify-center items-center m-2 p-2 maincontainer">
        <p className='text-3xl text-black-600'>Registration Form</p>
        <div className='m-2 w-11/12 flex  flex-row gap-x-4 gap-6 justify-center subContainer'>
          <div className='flex-col items-center'>
            <p className='h-8 m-2 text-white flex justify-center items-center'>Username</p>
            <p className='h-8 m-2 text-white flex justify-center items-center'>Password</p>
          </div>
          <div className='w-min flex-col'>
            <input className='h-8 m-2 w-auto username' value={username} onChange={handleUsername}></input>
            <input className='h-8 m-2 w-auto password' value={password} onChange={handlePassword}></input>
          </div>
        </div>
        <button className='text-white bg-black rounded-md w-auto h-8 px-2 border-black border-2 login' onClick={submit}>Register</button>
        <div className='text-white'>
            <a className="underline text-blue-100" href='../login'>Already have an Account? Login</a>
        </div>
        <p className='res'>{data}</p>
      </div>
    </>
  )
}

export default Registration;
