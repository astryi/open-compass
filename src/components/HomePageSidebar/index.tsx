import './styles.scss';

const HomePageSidebar = () => {
    return <div className="home-page-sidebar">
        <h2>Saved Databases</h2>
        <ul>
            <li>Business DB (Secret)</li>
            <li>My personal DB (Secret)</li>
            <li>X org's Database</li>
            <li>Unnamed</li>
        </ul>
    </div>
}

export default HomePageSidebar;