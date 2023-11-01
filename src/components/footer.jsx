import {Link} from 'react-router-dom'
import instagramIcon from '../assets/Instagram_logo_darkblue.png'
import facebookIcon from '../assets/Facebook_logo_darkblue.png'
import youtubeIcon from '../assets/YouTube_logo_darkblue.png'
import twitterIcon from '../assets/Twitter_logo_darkblue.png'
import linkedinIcon from '../assets/Linkedin_logo_darkblue.png'

function Footer() {
    return (
        <>
        <footer>
         <div className="socialMedia">
            <img src={instagramIcon} alt="Instagram icon"/>
            <img src={facebookIcon} alt="Facebook icon"/>
            <img src={youtubeIcon} alt="Youtube icon"/>
            <img src={twitterIcon} alt="Twitter icon"/>
            <img src={linkedinIcon} alt="Linkedin icon"/>
        </div>
      <p>©2023 All Right Reserved by Nadia, Zeynep, and Rino</p>
      </footer>
        
        </>
    )
}

export default Footer