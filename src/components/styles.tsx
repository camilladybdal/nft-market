import styled from 'styled-components'

interface INav {
  open: boolean;
}

/* Header */
export const Logo = styled.h1`
    color: black;
    text-decoration: none !important;
    font-size: 1.7rem;
    font-weight: bold;
    font-family: 'Trebuchet MS';
    margin-block-start: 0;
    margin-block-end: 0;
`

export const Flexcontainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1em 1em 1.5em;
`

export const Ul = styled.ul<INav>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  font-weight: 500;

  a {
    text-decoration: none;
    text-transform: none;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #FF5959;
    }
  }

  li {
    margin-right: 2em;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(255, 89, 89, 0.98); //ff5959
    

    transform: ${(props) => props.open ? 'translateX(0)' : 'translateX(100%)'};
   
    position: fixed;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;

    transition: transform 0.3s ease-in-out;
    z-index: 9;
    justify-content: center;
    
    
    li {
      color: #000;
      margin-top: 3em;
      font-weight: bold;

      &:hover {
        color: rgba(253, 253, 253);
      }
    }
  }
`

export const Burger = styled.div<INav>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => props.open ? '#000' : '#000'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${(props) => props.open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${(props) => props.open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${(props) => props.open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${(props) => props.open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

/* Footer */
export const Ocean = styled.footer`
  height: 4.5rem;
  width: 100%;
  background: #FF5959;
  grid-row-start: 2;
  grid-row-end: 3;
`
