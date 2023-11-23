import './App.css';
import {useState , useEffect } from 'react';
import { useRef } from 'react';
function App() {
   const [Down,setDown] = useState(false);
   const[ Low , setLow] = useState(null);
   const[ Medium , setMedium] = useState(null);
   const[ High , setHigh] = useState(null);
   const inputref = useRef(null);
   const [Url,setUrl] = useState('')
   function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    var resp =  (match&&match[7].length==11)? match[7] : false;
    setUrl(resp);
    console.log(Url);
    if (resp) {
      fetchdata(resp);
    }
   }
   const fetchdata = async(a)=>{
    
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${a}`;
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6f7b482cd9msh7256223d5c0819ep14ffc3jsnc16bc9ee9667',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result =  await response.json();
    const low  =  await result.formats[0].url;
    const medium = await result.formats[1].url;
    const high = await result?.formats[2]?.url;
    setLow(low);
    setMedium(medium);
    setHigh(high);
    setDown(true);
    
  } catch (error) {
    console.error(error);
  }
  }
   
  const HandleClick = (e)=>{
    e.preventDefault();
    youtube_parser(inputref.current.value);
    //fetchdata(inputref.current.value);
    inputref.current.value = "";
   
 }
  console.log(Low);
  console.log(Medium);
  console.log(High);
  return (
    <div className="App">
      <form onSubmit={HandleClick}className='forms'>
        <div className='inner-pad'>
        <div className='innercont'>
          <div className='innercontpad'>
          <h1>YouVid</h1>
          <p>You can't Download Shorts! But You <br/> can Download long videos</p>
          <div className='inputfield'>
          <input 
            className='inputfield1'
            type='text'
            ref={inputref}
            placeholder='Paste Youtube Link'
          />
          </div>
          <button className="butt" type='submit'>Search</button>
          </div>
        </div>
        <div className='downcont'>
        {Down ? <div className='pseudo'>
          <div className='pseudo1'>
            <div className='contin'><p className='para'>/// Low Quality upto 240p</p></div><div className='butin'><a href={Low}>Get</a></div>
          </div>
          <div className='pseudo1'>
          <div className='contin'><p className='para'>/// Medium Quality upto 480p</p></div><div className='butin'><a href={Medium}>Get</a></div>
          </div>
          <div className='pseudo1'>
          <div className='contin'><p className='para'>/// High Quality upto 720p</p></div><div className='butin'><a href={High}>Get</a></div>
          </div>
          <div className='pseudo1'>
          <div className='contin'></div><div className='butin'></div>
          </div>
        </div>:<div className='pseudo'>
          <div className='pseudo1'>
            <div className='cont1'></div><div className='but'></div>
          </div>
          <div className='pseudo1'>
          <div className='cont1'></div><div className='but'></div>
          </div>
          <div className='pseudo1'>
          <div className='cont1'></div><div className='but'></div>
          </div>
          <div className='pseudo1'>
          <div className='cont1'></div><div className='but'></div>
          </div>
        </div>}
        </div>
        </div>
      </form>
    </div>
  );
}

export default App;
