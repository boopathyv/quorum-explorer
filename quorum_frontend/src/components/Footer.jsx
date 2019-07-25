import React from 'react';
import classNames from 'classnames';

import '../styles/components/Footer.css';

import { strings } from '../strings/component';

function Footer(props) {
	return (
		<div className={classNames('footer', 'container')}>
			<div className="footer__header">
				<div className="footer__header__title">{strings.FOOTER__HEADER}</div>
				<p className="footer__header__text">{strings.FOOTER__SUBHEADER}</p>
			</div>
			<div className="footer__company">
				<div className="footer__company__title">{strings.FOOTER__COMPANY}</div>
				<hr className="footer__line" />
				<div className="footer__company__links">
					<a href={strings.FOOTER__COMPANY__LINK__ONE} className="footer__link">
						Link 1
					</a>
					<a href={strings.FOOTER__COMPANY__LINK__TWO} className="footer__link">
						Link 2
					</a>
					<a
						href={strings.FOOTER__COMPANY__LINK__THREE}
						className="footer__link"
					>
						Link 3
					</a>
				</div>
			</div>
			<div className="footer__social">
				<div className="footer__social__title">{strings.FOOTER__SOCIAL}</div>
				<hr className="footer__line" />
				<div className="footer__social__links">
					<a href={strings.FOOTER__SOCIAL__LINK__ONE} className="footer__link">
						Link 1
					</a>
					<a href={strings.FOOTER__SOCIAL__LINK__TWO} className="footer__link">
						Link 2
					</a>
					<a
						href={strings.FOOTER__SOCIAL__LINK__THREE}
						className="footer__link"
					>
						Link 3
					</a>
				</div>
			</div>
		</div>
	);
}

export default Footer;
