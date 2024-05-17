import { useState } from 'react';
import { t } from "../../common/translation";

const GameIdHeader = ({gameId}) => {
    const [isCopied, setCopied] = useState(false);

    const handleCopy = () => {
        const tempInput = document.createElement('input');
        tempInput.value = gameId;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopied(true);
    };

    return (
        <div className='d-flex flex-wrap justify-content-between mb-1'>
            <div className='fs-5 mt-1'>{t('multiPlayerPage/gameId')} {gameId}</div>
            <button className='btn btn-primary' onClick={handleCopy}>
                {t('multiPlayerPage/copy') + " "}
                {isCopied ? <i className="bi bi-check-lg"/> : null}
            </button> 
        </div>
    )
}

export default GameIdHeader;