import React, { useState } from "react";
import * as S from "./styles";
import { NavLink } from "react-router-dom";

const Burger: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <S.Burger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </S.Burger>

      <S.Flexcontainer>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <S.Logo> NFT Marketplace </S.Logo>
        </NavLink>

        <S.Ul open={open}>
          <NavLink
            to="/"
            // activeStyle={{
            //   fontWeight: 'bold',
            //   color: '#FF5959'
            // }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <li> MarketPlace Home </li>
          </NavLink>

          <NavLink
            to="/createcolortoken"
            activeStyle={{
              fontWeight: "bold",
              color: "#FF5959",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <li>Create Color Token</li>
          </NavLink>
          
          <NavLink
            to="/createtokens"
            activeStyle={{
              fontWeight: "bold",
              color: "#FF5959",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <li> Create Image Tokens </li>
          </NavLink>

          <NavLink
            to="/mytokens"
            activeStyle={{
              fontWeight: "bold",
              color: "#FF5959",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <li> My Tokens </li>
          </NavLink>

          <NavLink
            to="/creatordashbord"
            activeStyle={{
              fontWeight: "bold",
              color: "#FF5959",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <li> Creator Dashbord </li>
          </NavLink>

        </S.Ul>
      </S.Flexcontainer>
    </>
  );
};
export default Burger;
