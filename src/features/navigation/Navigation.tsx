import React from 'react';
import { css } from 'emotion';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { Icons } from '../../ui/Icons';

export type NavigationProps = {};

export function Navigation(_: NavigationProps) {
  return (
    <Navbar className="bg-white" color="light" light>
      <Nav navbar className={navStyle}>
        <NavItem>
          <NavLink className="nav-link" to="/" exact>
            <Icons name="house-fill" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/transactions">
            <Icons name="bar-chart-steps" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/stocks">
            <Icons name="graph-up" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/news">
            <Icons name="newspaper" />
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

const navStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});
