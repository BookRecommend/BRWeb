import React, { useRef, useEffect, useCallback } from "react";
import ModalPortal from '../ModalPortal';
import "../style/Map.scss";
import "../style/Modal.scss";

const Modal = (props) => {

    const modalEl = useRef();

    const handleClickOutside = e => {
        if (modalEl.current && !modalEl.current.contains(e.target)){
        }
    };
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        document.body.style.cssText = `overflow: hidden;`
            return () => {
                window.removeEventListener("click", handleClickOutside);
                document.body.style.cssText = `overflow: ""; overflow-y: overlay;`
            }
    },[]);

    const onClick = useCallback(() => {
        
        if(props.callback !== null) {
            props.callback();
        }
        props.setModal(false);
    }, [props]);

    return (
        <ModalPortal>
            <div className="CloseCheckBox" onClick={props.clickoff ? onClick : null}></div>
            <div className="ModalBox">
                <div className="content" ref={modalEl}>
                    <h3>{props.title}</h3>
                    <p></p>
                    <p>{props.description}</p>
                    <div>
                        <button onClick={onClick} >닫기</button>
                    </div>
                </div>
            </div>
        </ModalPortal>  
    );
};
export default Modal;