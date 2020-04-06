import axios from 'axios';

const YOUTUBE_TOKEN = "SEU TOKEN";

const GetInformationsMusic = async Url => {

    const musicId = String(Url).split("?v=")[1];
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${musicId}&key=${YOUTUBE_TOKEN}&part=snippet`;
    
    console.log(url);

     const response = await axios.get(url);
     return response.data;
}

export default GetInformationsMusic;