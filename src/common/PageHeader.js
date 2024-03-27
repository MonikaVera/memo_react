import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { HeaderContainer } from '../pages/styles/styles';
import { useNavigate } from 'react-router-dom';

const PageHeader = ({title, path}) => {
    const navigate = useNavigate();

    const handleOnArrowClick = () => {
        navigate(path);
    }
    return <HeaderContainer>
        <IconButton onClick={handleOnArrowClick}><ArrowBackIcon/></IconButton>
        <h1>{title}</h1>
    </HeaderContainer>
}

export default PageHeader;