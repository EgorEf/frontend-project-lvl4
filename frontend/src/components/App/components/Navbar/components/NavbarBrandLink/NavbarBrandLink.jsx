import { Link } from 'react-router-dom';

import ROUTES from 'routes';

const NavbarBrandLink = ({ className, children }) => (
  <Link className={className} to={ROUTES.main}>
    {children}
  </Link>
);

export default NavbarBrandLink;
