import profil from '../images/profil.png'
import "../components/assets/sidebar.css"

const Sidebar = () => {

    return(
        <div className="sidebar">
            <div className="content-sidebar">
                <div className="small-sidebar">
                    <img src={profil} alt="profil" title="profil" className='my_profil' />
                    {/* <img src="imo" alt="imo" title="imo"/>
                    <img src="boite" alt="boite" title="boite" /> */}
                </div>
                <div className="recent">
                    <input type="text" placeholder="Search"  className='search'/>
                    <div className='recent-down'>
                        <h4>Recent</h4>
                        <div className='friend'>
                            <div className='my-friend'>
                                <img src={profil} alt="profil" title="profil" className='profil-recent' />
                                <div className='name-friend'>
                                    <span className='name'>Jeannot</span>
                                    <div className='alert-msg'>Last message</div>
                                </div>
                            </div>
                            <div className='container-hr'><div className='hr'></div></div>
                        </div>
                        <div className='friend'>
                            <div className='my-friend'>
                                <img src={profil} alt="profil" title="profil" className='profil-recent' />
                                <div className='name-friend'>
                                    <span className='name'>Jeannot</span>
                                    <div className='alert-msg'>Last message</div>
                                </div>
                            </div>
                            <div className='container-hr'><div className='hr'></div></div>
                        </div>
                        <div className='friend'>
                            <div className='my-friend'>
                                <img src={profil} alt="profil" title="profil" className='profil-recent' />
                                <div className='name-friend'>
                                    <span className='name'>Jeannot</span>
                                    <div className='alert-msg'>Last message</div>
                                </div>
                            </div>
                            <div className='container-hr'><div className='hr'></div></div>
                        </div>
                        <div className='friend'>
                            <div className='my-friend'>
                                <img src={profil} alt="profil" title="profil" className='profil-recent' />
                                <div className='name-friend'>
                                    <span className='name'>Jeannot</span>
                                    <div className='alert-msg'>Last message</div>
                                </div>
                            </div>
                            <div className='container-hr'><div className='hr'></div></div>
                        </div>
                        <div className='friend'>
                            <div className='my-friend'>
                                <img src={profil} alt="profil" title="profil" className='profil-recent' />
                                <div className='name-friend'>
                                    <span className='name'>Jeannot</span>
                                    <div className='alert-msg'>Last message</div>
                                </div>
                            </div>
                            <div className='container-hr'><div className='hr'></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar