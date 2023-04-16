import './index.css';
import Messages from '../messages';
import Rooms from '../rooms';

function HomePage() {
    return (
        <div className={ 'home-page' }>
            <Rooms />
            <Messages />
        </div>
    )
}

export default HomePage;