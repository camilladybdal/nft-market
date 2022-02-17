import styled from 'styled-components'

/* Color Token Page */

export const Wrapper = styled.div`
    width: 100%;
    text-align: center;

`
export const CreateToken = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3em;
`

export const SubmitBtn = styled.input`
    background-color: white;
    border-color: grey;
    border-radius: 5%;
    border-width: 2px;
`

export const Color = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div {
        padding: 20px;
    }

    p {
        text-transform: capitalize;
        font-weight: bold;
        color: grey;
    }
`
export const ColorContainer = styled.div.attrs((props: {bgcolor: string}) => props)`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${(props) => props.bgcolor};
}
`


export const MainHeading = styled.h1`
    text-align: center;
`
export const FlexWrapper = styled.div`
    margin-top: 2em;
    margin-bottom: 2em;
    
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    
    justify-content: center;

    align-items: flex-start;
    
`
export const NftCard = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    border-style: solid;    
    border-width: 2px;
    border-color: grey;
    border-radius: 0.75rem;
    overflow: hidden;
    padding: 1em;
        
    img {
        width: 15rem;
        position: relative;
    }

    h2 {
        font-weight: bold;
    }
    
    p {
        font-weight: 400;
        color: grey;
        margin: 1rem;
    }

    button{
        background-color:#FF5959;
        color: white;
        padding: 15px 32px;
        border: none;
        text-align: center;
        display: inline-block;
        font-size: 1em;
    }
`


/* Form page */

export const FormWrapper = styled.div`
    display: flex;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;

`

export const Form = styled.div`
    display: flex;
    width: 25em;
    display: flex;
    flex-direction: column;
    padding: 1em;
    justify-content: center;
    
    input{
        margin-top: 2rem;
        border-style: solid;    
        text-align: center;
        background-color: white;
        border-color: grey;
        border-radius: 5%;
        border-width: 2px;

    }

    textarea{
        margin-top: 1rem;
        margin-top: 2rem;
        border-style: solid;    
        text-align: center;
        background-color: white;
        border-color: grey;
        border-radius: 5%;
        border-width: 2px;
        height: 10em;
    }

    button {
        background-color:#FF5959;
        color: white;
        padding: 15px 32px;
        border: none;
        text-align: center;
        display: inline-block;
        font-size: 1em;
    }

    img {
        width : 25em;
    }
`


