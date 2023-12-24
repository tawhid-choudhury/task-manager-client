import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-tmnavy text-neutral-content">
                <aside>
                    <p>Developed By<br />Tawhid Al Muhamin Choudhury <br /> 2023</p>
                </aside>
                <nav>
                    <header className="footer-title">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <Link to="https://www.linkedin.com/in/tawhid-choudhury-0360072a4/"><p className='text-2xl'><FaLinkedin /></p></Link>
                        <Link to="https://www.facebook.com/tawhid.chy.507"><p className='text-2xl'><FaFacebookSquare /></p></Link>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;