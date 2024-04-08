import styles from './Navigator.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import ShareIcon from '@mui/icons-material/Share';
import editIcon from '../images/Profile/edit.svg';
import { useNavigate } from 'react-router-dom';

const Navigator = (props) => {
    const navigate = useNavigate();
    const backHandler = () => {
        props.backHandler();
    }
    const navigateEditprofile = () => {
        navigate('/edit-profile');
    }
    return (
        <div className={styles.navigation} style={{
            position: props.type === 'overlay' ? 'absolute' : '',
            color: props.type === 'overlay' ? 'white' : 'black'

        }}>
            <div className={styles.left}>
                <div className='btncls' onClick={backHandler}><ArrowBackIcon /></div>
                <h3 className='text-xl font-semibold'>{props.heading}</h3>
            </div>
            <div className='btncls flex items-start space-x-4'>
                {props.icon === 'share' && <ShareIcon />}
                <img onClick={navigateEditprofile} src={editIcon} alt="" />
            </div>
        </div>
    )
}
export default Navigator;