import { NavLink } from "react-router-dom";
import "./Footer.css";
import ScrollToTop from "./Scroller";

function Footer() {
	return (
		<>
			<div className="footer-section">
				<div className="footer-about-section">
					<h3 className="footer-about-us">About College</h3>
					<p>
						An Autonomous Institute Affiliated to Savitribai Phule
						Pune University, Approved by AICTE, Accredited by NBA
						(UG Programs), Accredited by NAAC With "A" Grade
						MHRD-NIRF Rank: 201-250
					</p>
					<a
						className="jspmrscoe-websitelink"
						href="https://www.jspmrscoe.edu.in/"
					>
						Go to Official website
					</a>
				</div>

				<div className="footer-quick-links">
					<h3>Quick Links</h3>
					{/* <NavLink className="footer-navlinks" id="footer-home-navlink" to="/">
              Home
          </NavLink> */}
					<NavLink className="footer-navlinks" to="/">
						<ScrollToTop />
						Home
					</NavLink>

					<NavLink className="footer-navlinks" to="/alumni_talk">
						<ScrollToTop />
						Alumni Talk
					</NavLink>
					<NavLink className="footer-navlinks" to="/feed">
						<ScrollToTop />
						Feed
					</NavLink>
					<NavLink className="footer-navlinks" to="/events">
						<ScrollToTop />
						Events
					</NavLink>
					<NavLink className="footer-navlinks" to="/about">
						<ScrollToTop />
						About Us
					</NavLink>
				</div>
				<div className="footer-address">
					<h3>Address</h3>
					<p>
						S.NO 85/2, Pune-Mumbai bypass Highway, Tathawade,
						Pune-33, Maharashtra - 411033
					</p>
				</div>
				<div className="contact-us">
					<h3>Contact us</h3>
					<p>alumni@jspmrscoe.edu.in</p>

					<h3
						className="social-media-footer"
						id="footer-social-media"
					>
						Find us on:
					</h3>
					<a
						className="logo-a"
						href="https://www.linkedin.com/school/jspm-s-rajarshi-shahu-college-of-engineering/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="linkedin"
							class="svg-inline--fa fa-linkedin fa-w-14"
							role="img"
							id="insta"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
						>
							<path
								fill="current color"
								d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
							></path>
						</svg>
					</a>
					<a
						className="logo-a"
						href="https://www.instagram.com/jspmrscoe_official/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="instagram"
							className="svg-inline--fa fa-instagram fa-w-14"
							role="img"
							id="insta1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
						>
							<path
								fill="current color"
								d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
							></path>
						</svg>
					</a>
					<a
						className="logo-a"
						href="https://www.youtube.com/channel/UC4Pc9V7-QjsJZKkUS8I0iqw/featured"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="youtube"
							className="svg-inline--fa fa-youtube fa-w-18"
							role="img"
							id="you"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 576 512"
						>
							<path
								fill="current color"
								d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
							></path>
						</svg>
					</a>
					<a
						className="logo-a"
						href="https://www.jspmrscoe.edu.in/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="globe"
							class="svg-inline--fa fa-globe fa-w-14"
							role="img"
							id="website"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 496 512"
						>
							<path
								fill="current color"
								d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
							></path>
						</svg>
					</a>
				</div>
			</div>
		</>
	);
}

export default Footer;
